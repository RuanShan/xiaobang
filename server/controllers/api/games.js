const messageContent = require('../constant')
const db = require('../../models')
const {
  getGameRoundModelByCode,
  getRoundInstance,
  getGameRoundParamModelByCode
} = require('../../helpers/model')

const {
  IdiomGameRoundParam
} = require('../../models')

const {
  addGameRoundJob
} = require('../../jobs/game_round_state_job')
// const WechatAPI = require('co-wechat-api');
// var OAuth = require('co-wechat-oauth');
// const config = require(`../../../config/wechat.${process.env.NODE_ENV}.json`);
// const wechat_config = config.wechat;
// const wechatApi = new WechatAPI(wechat_config.appid, wechat_config.secret);
// var wechatOAuth = new OAuth(wechat_config.appid, wechat_config.secret);
//


module.exports = class GameRoundController {


  /**
   * get the rounds with options
   * @param {*} ctx
   */
  async getRounds(ctx) {
    try {
      var opts = {}
      if (ctx.request.body) {
        var {
          ids,
          limit,
          offset
        } = ctx.request.body
        opts = {
          ids,
          limit,
          offset
        }
      }
      var allrounds = [] //await dbOperation.MySqlOperation.GetRounds(opts)
      if (allrounds) {
        ctx.body = allrounds
        ctx.status = 200
      }
    } catch (error) {
      ctx.throw(messageContent.ResponeStatus.CommonError, 'can not get rounds', {
        expose: true
      })
    }
  }
  /**
   * create one round of a game, and add the round to the mememory db
   * @param {*} req
   * @param {object} game_round { p_ }
   */
  static async createRound(ctx) {
    let gameRoundParams = ctx.request.body.game_round
    let keyWords = gameRoundParams.p_idiom_startwith
    try {

      // code 在 url 中 或者 在参数中 game_round
      let code = ctx.params.code || gameRoundParams.code
      let Model = getGameRoundModelByCode(code)
      let gameRoundParamModel = getGameRoundParamModelByCode(code)

      let model = await Model.create(gameRoundParams)

      if (model) {
        // 如果有开始和结束时间，默认需要自动根据时间改变游戏状态
        if (model.start_at != null && model.end_at != null) {
          addGameRoundJob(model)
        }

        let keys = Object.keys(gameRoundParams)

        for (let i = 0; i < keys.length; i++) {
          if (keys[i].indexOf('p_') == 0) {
            let key = keys[i];
            let value = gameRoundParams[key]

            let param = {
              game_round_id: model.id,
              param_name: key,
              param_value: value
            }
            await gameRoundParamModel.create(param);
          }
        }

        let param = await IdiomGameRoundParam.findAll({
          where: {
            game_round_id: model.id
          }
        })

        if(param){
          for(let i=0;i<param.length;i++){
            model.dataValues[param[i].dataValues.param_name] = param[i].dataValues.param_value
          }
        }
        ctx.body = model
        ctx.status = 201
      }
    } catch (error) {
      console.log(" error ", error)
      ctx.throw(messageContent.ResponeStatus.UnprocessableEntity, `create round fail: ` + error, {
        expose: true
      })
    }
  }
  /**
   * update round information, such as name, description
   * /:code/:id  在路径中,  ctx.params 获取
   * @param {*} ctx
   */
  static async updateRound(ctx) {
    var gameroundid = parseInt(ctx.params.id)

    console.log("ctx.query, ctx.params", ctx.query, ctx.params)
    var gameRoundParams = ctx.request.body.game_round
    let keyWords = gameRoundParams.p_idiom_startwith
    let code = ctx.params.code || gameRoundParams.code

    try {
      let round = await getRoundInstance(code, gameroundid)
      let GameRoundParamModel = getGameRoundParamModelByCode(code)
      await round.update(gameRoundParams)

      let keys = Object.keys(gameRoundParams)
      let params = keys.reduce((grps, key)=>{
        if (key.indexOf('p_') == 0) {
          grps[key] = gameRoundParams[key]
        }
        return grps
      }, {})

      await GameRoundController.handleGameRoundParams( round, params )
      // IdiomGameRoundParam, 有的游戏没有 IdiomGameRoundParam
      if( GameRoundParamModel ){
        let param = await GameRoundParamModel.findAll({
          where: {
            game_round_id: round.id
          }
        })

        if(param){
          for(let i=0;i<param.length;i++){
            round.dataValues[param[i].dataValues.param_name] = param[i].dataValues.param_value
          }
        }
      }



      ctx.body = round

    } catch (error) {
      ctx.throw(error, {
        expose: true
      })
    }
  }
  /**
   * show game round
   * @param {*} req
   * @param {*} res
   */
  static async showRound(ctx) {
    try {
      var gameroundid = parseInt(ctx.params.id)
      let code = ctx.params.code
      let round = await getRoundInstance(code, gameroundid)

      let param = await IdiomGameRoundParam.findAll({
        where: {
          game_round_id: round.id
        }
      })

      if(param){
        for(let i=0;i<param.length;i++){
          round.dataValues[param[i].dataValues.param_name] = param[i].dataValues.param_value
        }
      }

      ctx.body = round
      ctx.status = 200
    } catch (error) {
      ctx.throw(messageContent.ResponeStatus.CommonError, `show round ${ctx.params.id} fail: ` + error, {
        expose: true
      })
    }
  }
  // /**
  //  * delete round will delete the player of the round and the award of the player
  //  * @param {} req
  //  * @param {*} res
  //  */
  // async deleteRound(ctx) {
  //   try {
  //     var game_round_id = parseInt(ctx.params.id)
  //     await dbOperation.MemoryDbOperation.DeleteRound(game_round_id)
  //     await dbOperation.MySqlOperation.DeleteAwardsOfRound(game_round_id)
  //     await dbOperation.MySqlOperation.DeletePlayersOfRound(game_round_id)
  //     await dbOperation.MySqlOperation.DeleteRound(game_round_id)
  //     ctx.status = 200
  //   } catch (error) {
  //     ctx.throw(messageContent.ResponeStatus.CommonError, `delete round ${ctx.params.id} fail: ` + error, {
  //       expose: true
  //     })
  //   }
  // }

  static async handleGameRoundParams(gameRound,  gameRoundParams ){
    let GameRoundParamModel = getGameRoundParamModelByCode(gameRound.code)
    let createdGameRoundParams = []
    let keys = Object.keys(gameRoundParams)

    for (let i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('p_') == 0) {
        let key = keys[i];
        let value = gameRoundParams[key]

        let res = await GameRoundParamModel.findOne({
          where: {
            game_round_id:  gameRound.id,
            param_name: key
          }
        })

        if (res) {
          let param = {
            param_name: key,
            param_value: value
          }
          await res.update(param);
        } else {
          let param = {
            game_round_id:  gameRound.id,
            param_name: key,
            param_value: value
          }
          let gameParam = await GameRoundParamModel.create(param);
          createdGameRoundParams.push( gameParam)
        }
      }
    }
    return createdGameRoundParams
  }

}
