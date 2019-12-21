const {
  getGameRoundModelByCode,
  getUsersModel,
  getWxMpUsersModel
} = require('../helpers/model')
const {
  getAuthorizeURL

} = require('../helpers/wxopen')

const wechatConfig = require('../config/weixin');
const queryString = require( 'query-string')

module.exports=class GameRoundController {
  /**
   * 游戏入口，h5游戏，大屏游戏的手机端
   * @param {*} req
   * @param {*} res
   */
  static async entry(ctx) {
    console.log('================entry================');
    try {
      let code = ctx.params.code
      let number = ctx.params.number

      let share_code = ctx.query.share_code
      let albumId = ctx.query.albumId

      let query = ctx.query
      console.log('query---:',query);

      let gameRoundModel = getGameRoundModelByCode(code);

      let gameRound = await gameRoundModel.findOne({
        where: {
          number
        }
      })

      let wxMpUsersModel = getWxMpUsersModel()

      let wx_mp_user = await wxMpUsersModel.findOne({
        where: {
          user_id: gameRound.user_id
        }
      })

      // 新创建的用户，appid 可能为空, 使用缺省的appid作为授权公众号
      let appid = wechatConfig.appid
      if(wx_mp_user){
        appid = wx_mp_user.appid
      }

      let url = gameRound.getPlayUrl()
      // 画月亮游戏
      if(query.left_player_id!=null&&query.left_player_id!=undefined){
        url = url+'&left_player_id='+query.left_player_id
      }
      console.log('query.share_code---',query.share_code);
      if(query.share_code!=null&&query.share_code!=undefined&&query.share_code!='null'){
        url = url+'&share_code='+share_code
      }
      // 投票游戏
      if(query.albumId!=null&&query.albumId!=undefined&&query.albumId!='null'){
        url = url+'&albumId='+albumId
      }
      console.log('url-----:',url);
      let authorizeURL = getAuthorizeURL( appid, url,gameRound.wx_auth_scope)
      console.log('authorizeURL***********:',authorizeURL);
      ctx.redirect(authorizeURL)
    } catch (error) {
      console.log(error);
    }
  }


  static async unauthorized(ctx){
    console.log('ctx.params',ctx.query);
    let code = ctx.query.code
    let number = ctx.query.number
    let url=''
    if(code&&number){
      url = process.env.GAME_URL_BASE+"/game/"+code+"/"+number+"/entry"
    }

    await ctx.render( 'unauthorized', {url:url})
  }
}
