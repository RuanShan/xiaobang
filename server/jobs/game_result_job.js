const {
  CronJob
} = require('cron')
const moment = require('moment')

const Sequelize =require('sequelize')

const Op = Sequelize.Op;

const {
  getGameRoundModelByCode,
  getGamePlayerModelByCode,
  getGameResultModelByCode,
  getGameDayModelByCode
} = require('../helpers/model')

/**
 * 摇一摇游戏结束后创建每个用户的成绩
 * @param {*} gameround
 * @param {Array} playerScores - [{ player_id, score}]
 */
async function addDpyiyGameResultsJob(gameround, playerScores) {
  const GameRound = getGameRoundModelByCode( gameround.code )
  const GameResult = getGameResultModelByCode( gameround.code )

      console.log('set start job');
      let startDate = gameround.start_at
      let gameRoundId = gameround.id
      const job = new CronJob({
        cronTime: new Date(),
        start:true,
        runOnInit: true,
        timeZone: 'Asia/Shanghai',
        onTick: async function() {

          for(let i=0; i< playerScores.length; i++){
            let {player_id, score } = playerScores[i]
            let gameResultParams = {
              game_player_id: player_id,
              score: score,
              game_round_id: gameRoundId,
              start_at: gameround.start_at,
              end_at: gameround.end_at
            }

            await GameResult.create(gameResultParams)
          }

        }
      });
      console.debug("job start=", job)

}


module.exports={
  addDpyiyGameResultsJob
}
