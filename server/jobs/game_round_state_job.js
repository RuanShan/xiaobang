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
          if( gameRound != null){
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
          let gameRound = await GameRound.findByPk( gameRoundId )
          if( gameRound != null){
            // 1.检查是否已经开始，2.检查当前时间是否等于开始时间
            // 2.考虑延时，60秒之内为有效
            if(moment(startDate).isSame(moment(gameRound.end_at))){
              const d = new Date();

              // 所有参与者
              let albumCountPromise = GamePlayer.count({
                where:{
                  game_round_id:gameRoundId
                }
              })
              // 所有分数
              let totalScoresPromise = GameResult.sum('score', {
                where:{
                  game_round_id:gameRoundId
                }
              })
              // 投票次数
              let totalResultsPromise = GameResult.count({
                where:{
                  game_round_id:gameRoundId
                }
              })
              // 访问次数
              let visitCountPromise = GameDay.sum('visit_count', {
                where:{
                  game_round_id:gameRoundId
                }
              })

              let [player_count,total_scores,result_count,visit_count] = await Promise.all( [ albumCountPromise, totalScoresPromise, totalResultsPromise, visitCountPromise ])

              // visit_count 可能为 NaN
              GameRound.update({
                visit_count: ( visit_count || 0),
                player_count:( player_count || 0),
                total_scores:( total_scores || 0),
                result_count:( result_count || 0),
                state: 'completed'
              }, {
                where: {
                  id: gameRoundId
                }
              })
              // 处理每一种游戏特别的统计
              // ztoupiao
              //
            }
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
