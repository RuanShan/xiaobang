/// 第三方平台授权绑定
const queryString  =require( 'query-string')
const { wxlogger }= require('../../helpers/logger')
const {
  componentAPI
} = require('../../helpers/wxopen');
const { redis } = require('../../services/redis');
const router = require('koa-router')(); // router middleware for koa
const WechatEncrypt = require('wechat-encrypt')
const xml2js = require('xml2js')
const wxopenConfig = require('../../config/wxopen')
const gameConfig = require('../../config/game')

const {
  getWxMpUsersModel,
  getUsersModel,
  getGameRoundModelByCode
} = require('../../helpers/model')


/**
 * 将微信定时推送的componentTicket存储在redis之中
 * @param {*} req
 * @param {*} res
 */
router.post('/ticket', async (ctx) => {

  let xml = ctx.request.xmlBody // 解析XML数据成JS对象

  let {
    AppId,
    Encrypt
  } = xml.xml
  let {
    encodingAESKey,
    token
  } = wxopenConfig
  let wechatEncrypt = new WechatEncrypt({
    appId: AppId[0],
    encodingAESKey,
    token
  })

  if (AppId && Encrypt) {
    let str = wechatEncrypt.decode(Encrypt[0]) // 解密数据
    let xml2 = await convertXml2Json(str, {}) // 解析XML数据成JS对象
    let {
      ComponentVerifyTicket,
      infoType
    } = xml2
    wxlogger.info( 'set componentVerifyTicket' )

    await redis.set(`${wxopenConfig.appid}:ComponentVerifyTicket`, ComponentVerifyTicket);

    // redis.get(`${wxopenConfig.appid}:ComponentVerifyTicket`, function(err, result) {
    //   console.log('result--:', result);
    // });

  }

  ctx.body = "success"
})

// /wechat/auth/${componentAppId}
// /wechat/message/${componentAppId}/:authorizerAppId
// /wechat/oauth/${componentAppId}/:authorizerAppId

router.post('/message', async (ctx) => {

})

/**
 * 第三方取得微信公众号授权,必须在页面跳转，否则腾讯会提示：授权入口页所在域名：空  路径：/api/wxopen/auth，
 * 通过微信扫码
 * @param {*} req
 * @param {*} res
 */

// router.get('/auth', async (ctx) => {
//
//   var authorizeURL = await componentAPI.getAppWebAuthorizeURL(`${gameConfig.urlBase}/api/wxopen/authdone`)
//   //
//   await ctx.render( 'api/wxopen/auth', { layout: false, url: authorizeURL})
//
// })

/**
 * 第三方取得微信公众号授权后回调  路径：/wxopen/authdone
 * @param {*} req
 * @param {*} res
 */
// router.get('/authdone', async (ctx) => {
//
//   let auth_code = ctx.query.auth_code
//   let expires_in = ctx.query.expires_in
//
//   let userId = ctx.state.user.id
//
//   getAuthorInfo('1', auth_code, expires_in)
//
//   ctx.body = {
//     auth_code: auth_code,
//     expires_in: expires_in
//   }
// })
//
// async function getAuthorInfo(userId, auth_code, expires_in) {
//
//   try{
//     console.log('auth_code--:', auth_code);
//     var info = {}
//     info = await componentAPI.getAuthorizationInfo(auth_code)
//     console.log('authorization_info====:', info);
//     var authorizer_appid = info.authorization_info.authorizer_appid
//     var authorizer_access_token = info.authorization_info.authorizer_access_token
//     var authorizer_refresh_token = info.authorization_info.authorizer_refresh_token
//     var func_info = info.authorization_info.func_info
//
//     info = await componentAPI.getAuthorizerInfo(authorizer_appid)
//     console.log('authorizer_info====:', info);
//
//     var nick_name = info.authorizer_info.nick_name
//     var head_img = info.authorizer_info.head_img
//     var user_name = info.authorizer_info.user_name
//     var principal_name = info.authorizer_info.principal_name
//     var signature = info.authorizer_info.signature
//
//
//     redis.hmset('wxmp', {
//       [authorizer_appid + '_access_token']: authorizer_access_token,
//       [authorizer_appid + '_refresh_token']: authorizer_refresh_token
//     })
//
//     let wxMpUserModel = getWxMpUsersModel();
//     let wxMpUser = {
//       nick_name: nick_name,
//       head_img: head_img,
//       user_name: user_name,
//       alias: principal_name,
//       wx_token: signature,
//       appid: authorizer_appid,
//       access_token: authorizer_access_token,
//       refresh_token: authorizer_refresh_token
//     }
//
//     wxMpUser = await wxMpUserModel.create(wxMpUser)
//
//     let user = getUsersModel()
//     let userInfo = await user.findOne({
//       where: {
//         id: userId
//       }
//     })
//
//     await userInfo.update({
//       appid: authorizer_appid
//     })
//   }catch(e){
//     console.log('error--:',e);
//   }
//
// }

const xmlParser = new xml2js.Parser({
  explicitRoot: false,
  explicitArray: false
})

// 解板XML数据
function convertXml2Json(str) {
  return new Promise(function(resolve, reject) {
    xmlParser.parseString(str, function(err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}


module.exports = router;
