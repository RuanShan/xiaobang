// 处理游戏运行控制逻辑
// 操作 数据库实现游戏的运行逻辑
// 这里不创建任何数据库记录，只是读取和跟新状态
const {
  KouHongGameRound,
  KouHongGamePlayer
} = require('../../index')
const {
  GameRoundStates
} = require('../../constant')

// 游戏流程控制
// 游戏流程
// PC端（控制端）
// 准备开始-> 玩家签到 -> 点击开始游戏 ->(开始前倒计时)->游戏进行中-> 游戏结束 ->显示排名
class KouHongRunner {
  constructor(number) {
    this.number = number
  }

  /**
   * 开放游戏，用户可以注册
   * @param {*}
   */
  async openRound() {
    console.log('openRound');
    console.log('GameRoundStates--:',GameRoundStates);
    let round = await this.getGameRound()
    await round.update({
      state: GameRoundStates.open
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
      state: GameRoundStates.started
    })
    return round
  }
  /**
   * 取得玩家信息，在数据库取得，以便显示玩家列表
   * @param {} gameroundid
   */
  async getAllPlayers() {
    let round = await this.getGameRound()
    let gameroundid = round.id
    let gamePlayers = await KouHongGamePlayer.findAll({
      where: {
        game_round_id: gameroundid
      }
    })
    return gamePlayers
  }
  /**
   * 取得玩家成绩，结果按照成绩排序
   * 开始游戏后，缓存中取得
   * @param {} gameroundid
   */
  async getPlayerScores() {
    let gameroundid = this.gameroundid
    let players = await this.getAllPlayers()

    players.sort((a, b) => {
      return a.score - b.score
    })
    return players
  }
  /**
   * 结束游戏
   * @param {*}
   */
  async endRound() {

    let round = await this.getGameRound()
    await round.update({
      state: GameRoundStates.completed
    })
    return round
  }

  /**
   * 重置游戏，便于调试使用，即设置游戏状态为created
   * @param {*}
   */
  async resetRound() {
    let round = await this.getGameRound()
    await round.update({
      state: GameRoundStates.created
    })
    return round
  }
  /**
   * 控制台点击开始游戏时，添加玩家到缓存
   * return player information include the id of the player
   */
  async AddPlayersToMemoryDb() {
    //let gameroundid = this.gameroundid
    //const players = await this.getAllPlayers()
    //await dbOperation.MemoryDbOperation.AddBatchPlayersToRound( gameroundid, players )
  }


  /**
   * update player score
   * return award
   * @param {*} awardid
   */
  async updatePlayerScore(playerid, score) {
    //let gameroundid = this.gameroundid
    //await dbOperation.MemoryDbOperation.UpdatePlayerScore(gameroundid, playerid, score)
  }

  async getGameRound() {
    return await KouHongGameRound.findOne({
      where: {
        number: this.number
      }
    })
  }
}

module.exports=ZhaobabaRunner
