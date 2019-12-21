const gameConfig = require('../config/game')
const wxConfig = require('../config/weixin') // 取得缺省微信公众号appid
const wxopenConfig = require('../config/wxopen')
const { redis }= require('../services/redis')
const WxOpenOauth2 = require( '../lib/wxopen/oauth2')

const {
  ComponentAPI,
  API,
  Oauth
} = require('es-wechat-open-api');

var wxOpenOauth = {}

const appid = wxopenConfig.appid

const componentAPI = new ComponentAPI({
  componentAppId: wxopenConfig.appid,
  componentAppSecret: wxopenConfig.secret,
  getComponentTicket: async () => {
    const ticket = await redis.get(`${wxopenConfig.appid}:ComponentVerifyTicket`);
    return ticket;
  },
  getComponentToken: async () => {
    const ticket = await redis.get(`${wxopenConfig.appid}:componentAccessToken`);
    return ticket;
  },
  saveComponentToken: async componentToken => {
    await redis.set(`${wxopenConfig.appid}:componentAccessToken`, JSON.stringify(componentToken));
  }
})


async function getUserToken(openid){
  const token = await redis.get(`${openid}:userToken` );
  return JSON.parse(token);
}
async function saveUserToken(openid, token){
  await redis.set(`${openid}:userToken`, JSON.stringify(token));
}

async function getAuthorizerToken(){
  // 授权公众号
  var store = await redis.hmget("wxmp", [this.appId + '_access_token', this.appId + '_refresh_token'] );

  store = {
    accessToken:store[0],
    refreshToken:store[1]
  }
  // return token;
  return store;
}
async function saveAuthorizerToken(accessToken, refreshToken){
  let store = {accessToken, refreshToken};

  // await redis.set(`${this.appId}:authorizerToken`, JSON.stringify(store));
  redis.hmset('wxmp', {
    [this.appId + '_access_token']: accessToken,
    [this.appId + '_refresh_token']: refreshToken
  })
}



// 缺省公众号，取得授权用户的基本信息，如头像，昵称
var defaultOauth = CreateOpenOauth(  wxConfig.appid )
var defaultAPI = CreateAPI(  wxConfig.appid )

/**
 * 取得当前游戏微信授权用URL，以便取得openid, 头像等
 * 如果有appid，即使用开放平台第三方授权，如果没有，使用软山公众号授权
 * @param {appid} 公众号appid
 * @param {gameUrl} 取得授权后，游戏回调URL
 * @return {String} 微信授权用URL
 */
function getAuthorizeURL( appid, url , wx_auth_scope){
  console.log('---------------getAuthorizeURL----------------');
  let oauth = defaultOauth
  console.log('wx_auth_scope=:',wx_auth_scope);
  if( typeof(appid) == 'string' && appid.length >0){
    oauth = CreateOpenOauth( appid )
  }
  let authorizeURL =''
  url = encodeURIComponent(url)
  //redirect_url
  //let authorizeURL = oauth.getAuthorizeURL("http://testwx.natapp4.cc/authwx/game?gameurl=http://testwx.natapp4.cc/ztoupiao.html?number="+number,'','snsapi_userinfo')
  if(wx_auth_scope=='B'){
    authorizeURL = oauth.getAuthorizeURL(`${gameConfig.urlBase}/api/wxopen_oauth/gameshare-done-easy?gameurl=${url}`,``,'snsapi_base')
  }else{
    authorizeURL = oauth.getAuthorizeURL(`${gameConfig.urlBase}/api/wxopen_oauth/gameshare-done?gameurl=${url}`,``,'snsapi_userinfo')
  }
  return authorizeURL
}

async function getWxJsConfig( appid,url){
  let api = defaultAPI
  console.log('url-------------------:',url);
  //https://testwx.natapp4.cc/game/ztoupiao/e082c98ee2928e1642c46882375d939e/entry
  //https://testwx.natapp4.cc/game/ztoupiao/e082c98ee2928e1642c46882375d939e/entry
  if( typeof(appid) == 'string' && appid.length >0){
    api = CreateAPI( appid )
  }
  let param = {
    appId:appid,
    debug: true,
    jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "translateVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"],
    url: url
  }
  let wxJsConfig = await api.getJsConfig(param)

  return wxJsConfig
}



function CreateOpenOauth( appid ){

  let options = {
    getUserToken:getUserToken,
    saveUserToken:saveUserToken,
    componentApi:componentAPI,
    appId: appid
  }
  // 第三方 授权公众号，取得授权用户的基本信息，如头像，昵称
  let oauth = new WxOpenOauth2(options)
  return oauth
}

function CreateAPI( appid ){

  let options = {
    getToken:getAuthorizerToken,
    saveToken:saveAuthorizerToken,
    componentApi:componentAPI,
    appId: appid
  }
  // 第三方 授权公众号，取得授权用户的基本信息，如头像，昵称
  let api = new API(options)
  return api
}

module.exports = {
  defaultOauth,
  CreateOpenOauth,
  componentAPI,
  getAuthorizeURL,
  getWxJsConfig
};
