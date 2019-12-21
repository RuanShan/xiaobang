// 处理游戏运行控制逻辑
// 操作 数据库实现游戏的运行逻辑
// 这里不创建任何数据库记录，只是读取和跟新状态
const {
  Sequelize,
  DpSampleGameRound,
  DpSampleGamePlayer,
  DpSampleGameResult
} = require('../../index')
const {
  DpGameRoundStates
} = require('../../constant')

const {
  redis
} = require('../../../services/redis')
const {
  addDpyiyGameResultsJob
} = require('../../../jobs/game_result_job')


// 游戏流程控制
// 游戏流程
// PC端（控制端） 准备开始-> 玩家签到 -> 点击开始游戏 ->(开始前倒计时)->游戏进行中-> 游戏结束 ->显示排名
// 移动端(游戏端)

class SampleRunner {

  constructor(number) {
    this.number = number
  }

  /**
   * 开放游戏，用户可以注册
   * @param {*}
   */
  async openRound() {
    console.log('openRound');
    let round = await this.getGameRound()
    await round.update({
      state: DpGameRoundStates.open
    })
    return round
  }
  /**
   * 开始游戏，save the round start_at time in the db
   * @param {*}
   * return  updated game_round
   */
  async startRound() {
    let round = await this.getGameRound()
    await round.update({
      start_at: new Date(),
      state: DpGameRoundStates.started
    })
    this.AddPlayersToMemoryDb()
    return round
  }
  async GetRoundAllPlayers() {
    let round = await this.getGameRound()
    let gameroundid = round.id
    let gamePlayers = await DpSampleGamePlayer.findAll({
      where: {
        game_round_id: gameroundid
      }
    })
    return gamePlayers
  }

  async AddPlayersToMemoryDb() {
    console.log('=============AddPlayersToMemoryDb============');
    let round = await this.getGameRound()
    let gameroundid = round.id
    let game_round = await DpSampleGameRound.findByPk(gameroundid)

    const players = await this.GetRoundAllPlayers()
    let key = await this.getRedisKey(gameroundid)
    console.log('key---:', key);
    console.log(typeof(key));

    await redis.del(key)

    console.log('aaaaaaaaaaaaaaa');

    let playerList = []
    players.forEach((player) => {
      let param = {
        [player.id]:0
      }
      redis.hmset(key, param)
    })

    var store = await redis.hgetall(key);

    console.log('store----:',store);

  }

  async updatePlayerScore(playerid, score) {
    console.log('============updatePlayerScore===========');
    let round = await this.getGameRound()
    let gameroundid = round.id
    let key = await this.getRedisKey(gameroundid)
    console.log('playerid===:', playerid, 'score=====:', score);
    let param = {
      [playerid]:score
    }
    redis.hmset(key, param)

    redis.hgetall(key, (error, players) => {
      console.log('updatePlayerScore-----------------:',players);
    })

  }

  async insertGameResult(playerid, score) {
    let round = await this.getGameRound()
    let gameroundid = round.id

    console.log('playerid===:', playerid, 'score=====:', score);

    let gameResultParams = {
      game_player_id: playerid,
      score: score,
      game_round_id: gameroundid,
      start_at: round.start_at
    }

    let gameResult = DpSampleGameResult.build(gameResultParams)
    let result = await gameResult.save()

  }

  async getRedisKey(gameroundid) {
    let round = await this.getGameRound()
    return `${round.name}:${gameroundid}`
  }

  async getRedisPlayerScores(gameroundid) {
    console.log('==============getRedisPlayerScores==============');
    let key = await this.getRedisKey(gameroundid)
    console.log('key++++:',key);
    var p = new Promise((resolve) => {
      redis.hgetall(key, (error, players) => {
        console.log('players-----------------:',players);
        if (error || !players) resolve([])
        else {
          var ar = new Array()
          for (var playerid in players) {
            var player = JSON.parse(players[playerid])
            ar.push({
              player_id: playerid,
              score: players[playerid]
            })
          }
          resolve(ar)
        }
      })
    })
    return p
  }
  /**
   * 取得玩家信息，在数据库取得，以便显示玩家列表
   * @param {} gameroundid
   */
  async getAllPlayers() {
    let round = await this.getGameRound()
    let gameroundid = round.id
    let gamePlayers = await DpSampleGamePlayer.findAll({
      where: {
        game_round_id: gameroundid
      }
    })
    console.log('getAllPlayers----:',gamePlayers);
    return gamePlayers
  }
  /**
   * 取得玩家信息，在数据库取得，以便显示玩家列表
   * @param {} gameroundid
   */
  async getAllResults() {
    console.log('============getAllResults=============');
    let round = await this.getGameRound()
    let gameroundid = round.id
    let gameResults = await DpSampleGameResult.findAll({
      where: {
        game_round_id: gameroundid
      },
      include: [{
        attributes: ['nickname', 'avatar', 'openid'],
        association: 'GamePlayer'
      }]
    })
    return gameResults
  }

  /**
   * 取得玩家成绩，结果按照成绩排序
   * 开始游戏后，缓存中取得
   * @param {} gameroundid
   */
  async getPlayerScores() {
    let round = await this.getGameRound()
    let gameroundid = round.id
    // [{ player_id: playerid,   score }]
    let playerScores = await this.getRedisPlayerScores(gameroundid)
    //console.log("GetPlayerScores", playerScores)
    let players = new Array()
    if (players) {
      playerScores.forEach((x) => {
        let player = {
          player_id: x.player_id,
          score: x.score
        }
        players.push(player)
      })
    }
    players.sort((a, b) => {
      return b.score - a.score
    })
    return players
  }
  /**
   * 结束游戏
   * @param {*}
   */
  async endRound() {
    let state = 'completed'
    let round = await this.getGameRound()
    let gameroundid = round.id

    var players = await this.getRedisPlayerScores(gameroundid)
    var updates = []
    players.sort((a, b) => {
      return (b.score - a.score)
    })
    for (var i = 0; i < players.length; i++) {
      let player = players[i]
      let res = DpSampleGamePlayer.update({
        rank: i+1,
        score: player.score,
        max_score: player.score
      }, {
        where: {
          id: player.player_id
        }
      })
      updates.push(res)
    }
    await Promise.all(updates)
    await DpSampleGameRound.update({
      state: state,
      end_at: Sequelize.fn('NOW')
    }, {
      where: {
        id: gameroundid
      }
    })
    let game_round = await DpSampleGameRound.findByPk(gameroundid)
    addDpyiyGameResultsJob(game_round, players )
    return game_round
  }

  /**
   * 重置游戏，便于调试使用，即设置游戏状态为created
   * @param {*}
   */
  async resetRound() {
    let round = await this.getGameRound()
    await round.update({
      state: DpGameRoundStates.created
    })

    let now = new Date();

    let res = await DpSampleGameResult.update({
      deleted_at: now
    }, {
      where: {
        game_round_id: round.id
      }
    })

    return round
  }

  async getGameRound() {
    return await DpSampleGameRound.findOne({
      where: {
        number: this.number
      }
    })
  }
}

module.exports = SampleRunner
