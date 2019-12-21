const {
  getUsersModel,
  getWxMpUsersModel,
  getPostModel,
  getTermModel,
  getRelationshipModel,
  getGameAlbumModelByCode,
  getGameResultModelByCode,
  getGamePlayerModelByCode
} = require('../../../helpers/model')

const {
  ZTouPiaoGameRound, SharedPhotoRelationship,
  ZTouPiaoGamePlayer,
  ZTouPiaoGameResult,
  ZTouPiaoGameDay
} = require('../../../models')
const {
  Sequelize
} = require('../../../models')
const Op = Sequelize.Op;

// const { logger } = require('../../helpers/logger')
const md5 = require('md5');
const moment = require('moment');
const GameRoundModel = ZTouPiaoGameRound


module.exports=class base {
  /**
   * 取得游戏相关信息，并返回客户端，初始化游戏
   * @param {*}
   * @return {*}
   */
  // static async login(ctx) {
  //   try {
  //     console.log('-----------login-----------');
  //     console.log('ctx.request.body--:', ctx.request.body);
  //     let params = ctx.request.body
  //     let cellphone = params.cellphone
  //     let secret = params.secret
  //
  //     let User = getUsersModel()
  //
  //     let userInfo = await User.findOne({
  //       attributes: ['id', 'cellphone', 'password'],
  //       where: {
  //         cellphone: cellphone
  //       }
  //     })
  //
  //     console.log('userInfo---:', userInfo);
  //
  //     if (userInfo != null) {
  //       let password = userInfo.password
  //       let secretString = 'md5' + cellphone + password + 'md5'
  //       if (secret == md5(secretString)) {
  //         ctx.body = {
  //           userId: userInfo.id,
  //           res: 'login success!'
  //         }
  //       } else {
  //         ctx.body = {
  //           res: 'Wrong password !'
  //         }
  //         throw ('Wrong password !')
  //       }
  //     } else {
  //       ctx.body = {
  //         res: 'Wrong username !'
  //       }
  //       throw ('Wrong username !')
  //     }
  //
  //   } catch (e) {
  //     console.log('error!:', e);
  //   }
  // }

  // static async check(ctx) {
  //   try {
  //     console.log('-----------check-----------');
  //     let params = ctx.request.body
  //     let username = params.username
  //     let secret = params.secret
  //
  //     let users = getusers()
  //
  //     let userInfo = await users.findOne({
  //       attributes: ['username', 'password'],
  //       where: {
  //         username: username
  //       }
  //     })
  //
  //     if (userInfo != null) {
  //       let password = userInfo.password
  //       let secretString = 'md5' + username + password + 'md5'
  //       if (secret == md5(secretString)) {
  //         ctx.body = {
  //           res: 'login success!'
  //         }
  //       } else {
  //         ctx.body = {
  //           res: 'Wrong password !'
  //         }
  //         throw ('Wrong password !')
  //       }
  //     } else {
  //       ctx.body = {
  //         res: 'Wrong username !'
  //       }
  //       throw ('Wrong username !')
  //     }
  //
  //   } catch (e) {
  //     console.log('error!:', e);
  //   }
  // }

  static async modifyGameRound(ctx) {
    try {
      console.log('==================modifyGameRound=================');
      let body = ctx.request.body;
      console.log('body---:', body);
      let number = body.number
      let code = body.code
      let duration = body.duration
      let gamename = body.name;
      let gamedesc = body.desc;

      let gameRound = await GameRoundModel.findOne({
        where: {
          number: number
        }
      })

      gameRound = await gameRound.update({
        name: gamename,
        desc: gamedesc,
        duration: duration
      })
      ctx.body = gameRound
    } catch (e) {
      console.log('error!:', e);
    }
  }

  static async modifyDesc(ctx) {
    try {
      console.log('==================modifyDesc=================');
      let body = ctx.request.body;
      let number = body.number
      let code = body.code
      let gamedesc = body.desc;

      let gameRound = await GameRoundModel.findOne({
        where: {
          number: number
        }
      })

      gameRound = await gameRound.update({
        desc: gamedesc
      })
      ctx.body = gameRound
    } catch (e) {
      console.log('error!:', e);
    }
  }

  static async getGameRoundInfo(ctx) {
    console.log('=============getGameRoundInfo===========');
    let params = ctx.query
    let userId = params.id

    let gameRounds = await GameRoundModel.findAll({
      where: {
        user_id: userId
      }
    })

    ctx.body = gameRounds
  }

  static async removeGameRound(ctx) {
    let body = ctx.request.body;
    console.log('body---:', body);
    let round_id = body.round_id

    let res = await GameRoundModel.destroy({
      where: {
        id: round_id
      }
    })
    ctx.body = res
  }

  static async getWxMpUsers(ctx){
    console.log('==================getWxMpUsers================');
    let user_id = ctx.state.user.id;
    let WxMpUsersModel = getWxMpUsersModel()

    let WxMpUsers = await WxMpUsersModel.findAll({
      where:{
        user_id:user_id
      }
    })
    console.log('WxMpUsers=============:',WxMpUsers);
    ctx.body = WxMpUsers
  }

  static async removeWxMpUsers(ctx){
    console.log('=============removeWxMpUsers==============');
    let user_id = ctx.state.user.id;
    let WxMpUsersModel = getWxMpUsersModel()

    await WxMpUsersModel.destroy({
      where:{
        user_id:user_id
      }
    })

    ctx.body = {
      res:'remove success!'
    }

  }

  static async clearData(ctx){
    console.log('=============clearData==============');
    let code = ctx.request.body.code
    let gameRoundId = ctx.request.body.gameRoundId
    let AlbumModel = getGameAlbumModelByCode(code)
    let PlayerModel = getGamePlayerModelByCode(code)
    let ResultModel = getGameResultModelByCode(code)

    await AlbumModel.destroy({
      where:{
        game_round_id:gameRoundId
      }
    })

    await PlayerModel.destroy({
      where:{
        game_round_id:gameRoundId
      }
    })

    await ResultModel.destroy({
      where:{
        game_round_id:gameRoundId
      }
    })

    await SharedPhotoRelationship.destroy({
      where:{
        viewable_id:gameRoundId,
        viewable_type:'slide'
      }
    })
    ctx.body = {
      res:'clear over!'
    }
  }

  static async getResultInfo(ctx){
    let body = ctx.request.body
    let time = body.time
    let game_round_id = body.game_round_id

    let start_at = moment(time).format('YYYY-MM-DD')
    let end_at  = moment(time).add(1,'day').format('YYYY-MM-DD')

    let results = await ZTouPiaoGameResult.findAll({
      attributes: ['score', 'created_at'],
      where:{
        game_round_id:game_round_id,
        created_at:{
          [Op.between]: [start_at, end_at]
        }
      }
    })

    let gameResultsInfo = {
      '0点':0,
      '1点':0,
      '2点':0,
      '3点':0,
      '4点':0,
      '5点':0,
      '6点':0,
      '7点':0,
      '8点':0,
      '9点':0,
      '10点':0,
      '11点':0,
      '12点':0,
      '13点':0,
      '14点':0,
      '15点':0,
      '16点':0,
      '17点':0,
      '18点':0,
      '19点':0,
      '20点':0,
      '21点':0,
      '22点':0,
      '23点':0,
    }

    for(var i=0;i<results.length;i++){
      console.log('score',results[i].score);
      let key = moment(results[i].created_at).hour()+'点'
      console.log('key---:',key);
      console.log('gameResultsInfo[key]',gameResultsInfo[key]);
      if(gameResultsInfo[key]==undefined||gameResultsInfo[key]==null){
        console.log('aaas');
        gameResultsInfo[key] = 0;
      }
      gameResultsInfo[key]+=results[i].score;
    }

    console.log(gameResultsInfo);


    ctx.body = gameResultsInfo
  }

  static async getAlbumResultInfo(ctx){
    let body = ctx.request.body
    let gamePlayerId = body.gamePlayerId
    let game_round_id = body.game_round_id
    let time = body.time

    let start_at = moment(time).format('YYYY-MM-DD')
    let end_at  = moment(time).add(1,'day').format('YYYY-MM-DD')

    let results = await ZTouPiaoGameResult.findAll({
      attributes: ['score', 'created_at'],
      where:{
        game_round_id:game_round_id,
        to_game_player_id:gamePlayerId,
        created_at:{
          [Op.between]: [start_at, end_at]
        }
      }
    })

    let gameResultsInfo = {
      '0点':0,
      '1点':0,
      '2点':0,
      '3点':0,
      '4点':0,
      '5点':0,
      '6点':0,
      '7点':0,
      '8点':0,
      '9点':0,
      '10点':0,
      '11点':0,
      '12点':0,
      '13点':0,
      '14点':0,
      '15点':0,
      '16点':0,
      '17点':0,
      '18点':0,
      '19点':0,
      '20点':0,
      '21点':0,
      '22点':0,
      '23点':0,
    }

    for(var i=0;i<results.length;i++){
      console.log('score',results[i].score);
      let key = moment(results[i].created_at).hour()+'点'
      console.log('key---:',key);
      console.log('gameResultsInfo[key]',gameResultsInfo[key]);
      if(gameResultsInfo[key]==undefined||gameResultsInfo[key]==null){
        console.log('aaas');
        gameResultsInfo[key] = 0;
      }
      gameResultsInfo[key]+=results[i].score;
    }

    console.log(gameResultsInfo);


    ctx.body = gameResultsInfo
  }

  static async getGameDayInfo(ctx){
    let body = ctx.request.body
    let start_at = body.start_at
    let end_at = body.end_at
    let game_round_id = body.game_round_id

    let gameDays = await ZTouPiaoGameDay.findAll({
      attributes: ['visit_count', 'day'],
      where:{
        game_round_id:game_round_id,
        created_at:{
          [Op.between]: [start_at, end_at]
        }
      }
    })

    let gameDaysInfo = {}

    for(var i=0;i<gameDays.length;i++){
      console.log('count',gameDays[i].visit_count);
      let key = moment(gameDays[i].day).format('YYYY-MM-DD')
      if(!gameDaysInfo[key]){
        console.log('aaa');
        gameDaysInfo[key] = 0;
      }
      gameDaysInfo[key]+=gameDays[i].visit_count;
    }

    console.log(gameDaysInfo);

    ctx.body = gameDaysInfo
  }

  static async getExportInfo(ctx){
    let body = ctx.request.body;
    let game_round_id = body.game_round_id;
    let code = body.code;

    let GameAlbum = getGameAlbumModelByCode(code)

    let gameAlbum = await GameAlbum.findAll({
      where: {
        game_round_id:game_round_id
      },
      include: [{
        association: 'GamePlayer'
      }],
    })

    ctx.body = gameAlbum
  }

}
