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
 * 为当前的游戏添加计划任务，定时开始游戏，结束游戏
 * @param {*} gameround
 */
async function addAllGameRoundJob( code ) {
  let GameRound = getGameRoundModelByCode( code )

  let allrounds = await GameRound.findAll({
    where:{
      code: code,
      state:{
        [Op.notIn]: [ 'disabled', 'completed'  ]
      }
    }
  })

  // completed, disabled

  if (allrounds.length>0) {
    for (var i = 0; i < allrounds.length; i++) {
      addGameRoundStartJob(allrounds[i])
      addGameRoundEndJob(allrounds[i])
    }
  }
}

function addGameRoundJob(gameRound) {
  addGameRoundStartJob(gameRound)
  addGameRoundEndJob(gameRound)
}
//
async function addGameRoundStartJob(gameround) {
  const GameRound = getGameRoundModelByCode( gameround.code )

  if ((gameround.start_at instanceof Date) && (gameround.end_at instanceof Date)) {
    //游戏状态为 ‘新建’， 才可以开始
    console.debug(" gameround.start_at= ", gameround.start_at.toLocaleString())
    if (gameround.start_at < new Date() && gameround.end_at > new Date() && gameround.state == 'created') {
      GameRound.update({
        state: 'started'
      }, {
        where: {
          id: gameround.id
        }
      })
    } else if ((gameround.start_at > new Date()) && (gameround.state == 'created')) {
      console.log('set start job');
      let startDate = gameround.start_at
      let gameRoundId = gameround.id
      const job = new CronJob({
        cronTime: startDate,
        timeZone: 'Asia/Shanghai',
        onTick: async function() {
          let gameRound = await GameRound.findByPk( gameRoundId )

          console.log('new gameRound----:',gameRound.start_at);
          console.log('startDate----:',startDate);
          // 1.检查是否已经开始，2.检查当前时间是否等于开始时间
          // 2.考虑延时，60秒之内为有效
          if(moment(startDate).isSame(moment(gameRound.start_at))){
            const d = new Date();
            let from = moment().subtract({
              minutes: 5
            }).toDate()
            let to = moment().add({
              minutes: 5
            }).toDate()
            GameRound.update({
              state: 'started'
            }, {
              where: {
                id: gameRoundId,
                start_at: {
                  [Op.gte]: from,
                  [Op.lte]: to
                },
                state:{
                  [Op.ne]:'disabled'
                }
              }
            })
            console.log('Specific date:', startDate, ', onTick at:', d, from, to);
          }
        }
      });
      console.debug("job start=", job)
      job.start();
    }
  }
}

function addGameRoundEndJob(gameround) {
  const GameRound = getGameRoundModelByCode( gameround.code )
  const GamePlayer = getGamePlayerModelByCode( gameround.code )
  const GameResult = getGameResultModelByCode( gameround.code )
  const GameDay = getGameDayModelByCode( gameround.code )

  if ((gameround.start_at instanceof Date) && (gameround.end_at instanceof Date)) {
    //游戏状态为 ‘新建’， 才可以开始
    console.log(" gameround.start_at= ", gameround.start_at.toLocaleString())
    if (gameround.end_at < new Date() && gameround.state != 'completed') {
      GameRound.update({
        state: 'completed'
      }, {
        where: {
          id: gameround.id
        }
      })
    } else if ((gameround.end_at > new Date()) && (gameround.state != 'completed')) {
      let startDate = gameround.end_at
      let gameRoundId = gameround.id
      const job = new CronJob({
        cronTime: startDate,
        timeZone: 'Asia/Shanghai',
        onTick: async function() {
          let gameRound = await GameRound.findOne({
            id: gameRoundId
          })
          console.debug('new gameRound----:',gameRound);
          // 1.检查是否已经开始，2.检查当前时间是否等于开始时间
          // 2.考虑延时，60秒之内为有效
          if(moment(startDate).isSame(moment(gameRound.end_at))){
            const d = new Date();
            let min = moment().subtract({
              minutes: 5
            }).toDate()
            let max = moment().add({
              minutes: 5
            }).toDate()

            // 所有参与者
            let albumCountPromise = await GamePlayer.findOne({
              where:{
                game_round_id:gameRoundId
              },
              attributes: ['game_round_id', [Sequelize.fn('COUNT', Sequelize.col('game_round_id')),'count']],
              group: 'game_round_id',
              raw: true
            })
            // 所有分数
            let totalScoresPromise = await GameResult.findOne({
              where:{
                game_round_id:gameRoundId
              },
              attributes: ['game_round_id', [Sequelize.fn('SUM', Sequelize.col('score')),'count']],
              group: 'game_round_id',
              raw: true
            })

            // 投票次数
            let totalResultsPromise = await GameResult.findOne({
              where:{
                game_round_id:gameRoundId
              },
              attributes: ['game_round_id', [Sequelize.fn('COUNT', Sequelize.col('game_round_id')),'count']],
              group: 'game_round_id',
              raw: true
            })
            // 访问次数
            let visitCountPromise = await GameDay.findOne({
              where:{
                game_round_id:gameRoundId
              },
              attributes: ['game_round_id', [Sequelize.fn('SUM', Sequelize.col('visit_count')),'count']],
              group: 'game_round_id',
              raw: true
            })

            let [player_count,total_scores,result_count,visit_count] = await Promise.all( [ albumCountPromise, totalScoresPromise, totalResultsPromise, visitCountPromise ])

            GameRound.update({
              visit_count:visit_count.count,
              player_count:player_count.count,
              total_scores:total_scores.count,
              result_count:result_count.count,
              state: 'completed'
            }, {
              where: {
                id: gameRoundId,
                end_at: {
                  [Op.gte]: min,
                  [Op.lte]: max
                }
              }
            })
            console.log('Specific date:', startDate, ', onTick at:', d, min, max);
          }
        }
      })
      console.debug("job end=", job)
      job.start()
    }
  }
}

module.exports={
  addAllGameRoundJob,
  addGameRoundJob,
  addGameRoundStartJob,
  addGameRoundEndJob
}
