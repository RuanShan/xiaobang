const {
  componentAPI
} = require('../../../helpers/wxopen');
const gameConfig = require('../../../config/game')

const { redis } = require('../../../services/redis')
const { getUsersModel }= require('../../../helpers/model')

module.exports=class WxOpen {

  /**
   * 第三方取得微信公众号授权URL  路径：/api/backend/wxopen/auth， 管理端调用
   * @param {*} req
   * @param {*} res
   */
  static async auth(ctx) {
    // 微信回调页面没有user.token无法进入backend, 但是授权回调时，需要用户Id，以便创建用户的mpuser
    // 这里需要把token添加到请求后面
    // FIXME 用户授权回来后，token可能过期问题。
    var authorizeURL = await componentAPI.getAppWebAuthorizeURL(`${gameConfig.urlBase}/api/backend/wxopen/authdone?token=${ctx.state.token}`)
    await ctx.render( 'api/backend/wxopen/auth', { layout: false, url: authorizeURL})

  }


/**
 * 第三方取得微信公众号授权后回调  路径：/api/backend/wxopen/authdone
 * @param {*} req
 * @param {*} res
 */
  static async authdone(ctx) {

    let auth_code = ctx.query.auth_code
    let expires_in = ctx.query.expires_in
    // jwt token 中数据
    let userId = ctx.state.user.id
    getAuthorInfo(userId, auth_code, expires_in)

    await ctx.render( 'api/backend/wxopen/authdone', { layout: false })
  }
}

async function getAuthorInfo(userId, auth_code, expires_in) {

  try{
    var info = {}
    info = await componentAPI.getAuthorizationInfo(auth_code)
    var authorizer_appid = info.authorization_info.authorizer_appid
    var authorizer_access_token = info.authorization_info.authorizer_access_token
    var authorizer_refresh_token = info.authorization_info.authorizer_refresh_token
    var func_info = info.authorization_info.func_info

    info = await componentAPI.getAuthorizerInfo(authorizer_appid)

    var nick_name = info.authorizer_info.nick_name
    var head_img = info.authorizer_info.head_img
    var user_name = info.authorizer_info.user_name
    var principal_name = info.authorizer_info.principal_name
    var signature = info.authorizer_info.signature


    redis.hmset('wxmp', {
      [authorizer_appid + '_access_token']: authorizer_access_token,
      [authorizer_appid + '_refresh_token']: authorizer_refresh_token
    })

    let User = getUsersModel()
    let user= await User.findOne({
      where: {
        id: userId
      }
    })

    let wxMpUserAttrs = {
      nick_name: nick_name,
      head_img: head_img,
      user_name: user_name,
      alias: principal_name,
      wx_token: signature,
      appid: authorizer_appid,
      access_token: authorizer_access_token,
      refresh_token: authorizer_refresh_token
    }
    let wxMpUser = await user.createWxMpUser(wxMpUserAttrs)


  }catch(e){
    console.log('error--:',e);
  }

}
