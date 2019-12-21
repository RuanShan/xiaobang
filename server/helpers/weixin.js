const Sequelize = require('sequelize')
const Op = Sequelize.Op
const wechatConfig = require('../config/weixin')
const fetch = require('node-fetch')
const {
  WxMpUser
} = require('../models')
const {
  getGameRoundParamModelByCode
} = require('./model')

const {
  logger
} = require('../helpers/logger')

// 游戏授权用URL， 微信自动回复获取游戏授权url
function getWxAuthApiUrl() {
  let gameURLBase = process.env.GAME_URL_BASE
  return gameURLBase + '/authwx/game'

}

function getWxJsConfigApiUrl() {
  let gameURLBase = process.env.GAME_URL_BASE
  return gameURLBase + '/gapi/weixin/getJsConfig'
}

/**
 * get weixin js sdk config
 * @param {*} url
 * @return {返回值类型} wxConfig or null
 */
async function getWxJsConfig(url, gameRound, gamePlayer) {

  console.log('getWxJsConfig', process.env.SUPPORT_RUNLIN)
  if (process.env.SUPPORT_RUNLIN == 'yes') {
    return getWxJsConfigForRunlin(url, gameRound)
  } else if (process.env.SUPPORT_WXOPEN == 'yes') {
    return getWxJsConfigByWxOpen(url, gameRound, gamePlayer)
  }

  var wxConfig = {}
  try {

    let body = {
      url: url
    }
    let apiurl = getWxJsConfigApiUrl()

    let res = await fetch(apiurl, {
      timeout: 2000,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post'
    })
    if (res) {
      let data = await res.json()
      wxConfig = {
        appId: data['appId'],
        timestamp: data['timestamp'],
        nonceStr: data['nonceStr'],
        signature: data['signature']
      }
    }
  } catch (err) {
    console.error("got error-", err);
  }

  wxConfig.shareUrl = getWxShareUrl(gameRound)

  return wxConfig
}


/**
 * 根据 gameRoundParam 中配置设置微信分享标题
 * @param {object} gameRound - 成语结尾汉字集合
 * @return {object} config - {title, desc, ptitle }
 */
async function getWxShareConfig( gameRound ){
  // title, desc
  let code = gameRound.code
  let GameRoundParamModel = getGameRoundParamModelByCode(code)
  // 有的游戏可能没有 GameRoundParamModel
  let config = { title: gameRound.name, desc: '请点击查看详情...', ptitle: gameRound.name}
  if( GameRoundParamModel ){
    let keys = ['p_wxshare_title', 'p_wxshare_ptitle','p_wxshare_desc']
    let gps = await GameRoundParamModel.findAll( {where: { game_round_id: gameRound.id, param_name:{ [Op.in]: keys }  }})
    let paramTitle = gps.find((gp)=>{
      return gp.param_name == 'p_wxshare_title'
    })
    let paramPtitle = gps.find((gp)=>{
      return gp.param_name == 'p_wxshare_ptitle'
    })
    let paramDesc = gps.find((gp)=>{
      return gp.param_name == 'p_wxshare_desc'
    })
    if(paramTitle){
      config.title = paramTitle.param_value
    }
    if(paramPtitle){
      config.ptitle = paramPtitle.param_value
    }
    if(paramDesc){
      config.desc = paramDesc.param_value
    }
  }
  return config
}

function getWxShareUrl(gameRound) {
  if (process.env.SUPPORT_RUNLIN == 'yes') {
    return getWxShareUrlForRunlin(gameRound)
  }

  const gameUrlBase = process.env.GAME_URL_BASE

  let shareUrl = getWxAuthApiUrl() + '?' + 'gameurl=' + gameUrlBase + gameRound.getPlayPath()

  return shareUrl
}

/**
 * 取得微信jssdk config 通过微信第三方api
 * @param {object} gameRound - 成语结尾汉字集合
 * @return {object} config - {title, desc, ptitle }
 */
async function getWxJsConfigByWxOpen(url, gameRound, gamePlayer) {

  try{
    let gameURLBase = process.env.GAME_URL_BASE
    ////wait for findOne

    let wxMpUser = await WxMpUser.findOne({
      where: {
        user_id: gameRound.user_id
      }
    })
    let appid = wechatConfig.appid
    if (wxMpUser) {
      appid = wxMpUser.appid
    }

    console.log('appid-----:', appid);

    let body = {
      appid: appid,
      url: url
    }

    let res = await fetch(gameURLBase + '/authwx/wxjsconfig', {
      timeout: 2000,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post'
    })
    let data = await res.json()
    //console.log('data----:', data);
    let wxConfig = {
      appId: appid,
      timestamp: data['timestamp'],
      nonceStr: data['nonceStr'],
      signature: data['signature'],
      shareUrl: process.env.GAME_URL_BASE + '/game/'+gameRound.code+'/' + gameRound.number + '/entry?share_code=' + gamePlayer.share_code
    }
    let shareConfig = await getWxShareConfig( gameRound )
    return Object.assign( wxConfig, shareConfig)
  }catch(e){
    logger.error('wxConfig', e)
    console.log('wxConfig err--:',e);
  }

}

/**
 * get weixin js sdk config
 * @param {*} url
 * @return {返回值类型} wxConfig or null
 */
async function getWxJsConfigForRunlin(url, gameRound) {

  const GAME_HOST = 'gm.vwweixin.faw-vw.com'
  //http://10.224.40.46:8060/wechatclient/taskcenter/getForGamesign.html
  const RUNLIN_GET_WX_PARAM_URL = "http://client.vw-dealer-wechat.faw-vw.com/wechatclient/taskcenter/getForGamesign.html"
  //const RUNLIN_GET_WX_PARAM_URL="http://10.224.40.46:8060/wechatclient/taskcenter/getForGamesign.html"
  const RUNLIN_SHARE_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%{appid}&redirect_uri=http%3A%2F%2Fclient.vw-dealer-wechat.faw-vw.com%2Fwechatclient%2Fgame%2F%{game_round_id}%2Fcupcheck_in%2FgotoGame.html&response_type=code&scope=snsapi_userinfo&state=&component_appid=wxd180d4eb5fb062fe#wechat_redirect'


  let wxConfig = {}
  try {
    let params = `?authorizerAppid=${gameRound.appid}&url=${encodeURIComponent(url)}`
    console.log(" RUNLIN_GET_WX_PARAM_URL+params ", RUNLIN_GET_WX_PARAM_URL + params)
    let res = await fetch(RUNLIN_GET_WX_PARAM_URL + params, {
      timeout: 2000,
      method: 'post'
    })
    if (res) {
      let data = await res.json()

      wxConfig = {
        appId: data['appid'],
        timestamp: data['timestamp'],
        nonceStr: data['nonceStr'],
        signature: data['signature']
      }
    }

    let runlinredirecturl = `http://client.vw-dealer-wechat.faw-vw.com/wechatclient/game/${gameRound.id}/bargaincheck_in/gotoGame.html?`
    let runlinshareurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${gameRound.appid}&redirect_uri=${encodeURIComponent(runlinredirecturl)}&response_type=code&scope=snsapi_userinfo&state=""&component_appid=wxd180d4eb5fb062fe#wechat_redirect`

    wxConfig.shareUrl = getWxShareUrlForRunlin(gameRound)
    console.debug("wxConfig=", wxConfig)

  } catch (err) {
    console.error("got error-", err);
  }
  return wxConfig
}

function getWxShareUrlForRunlin(gameRound) {

  let runlinredirecturl = `http://client.vw-dealer-wechat.faw-vw.com/wechatclient/game/${gameRound.number}/${gameRound.code}check_in/gotoGame.html`
  let runlinshareurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${gameRound.appid}&redirect_uri=${encodeURIComponent(runlinredirecturl)}&response_type=code&scope=snsapi_userinfo&state=""&component_appid=wxd180d4eb5fb062fe#wechat_redirect`

  if (gameRound.code == 'bargain') {
    runlinredirecturl = `http://client.vw-dealer-wechat.faw-vw.com/wechatclient/game/${gameRound.id}/bargaincheck_in/gotoGame.html?`
    runlinshareurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${gameRound.appid}&redirect_uri=${encodeURIComponent(runlinredirecturl)}&response_type=code&scope=snsapi_userinfo&state=""&component_appid=wxd180d4eb5fb062fe#wechat_redirect`
  }
  //`/{gameRound.number}/searchaliencheck_in/gotoGame.html`
  if (gameRound.code == 'zhaobaba') {
    runlinredirecturl = `http://client.vw-dealer-wechat.faw-vw.com/wechatclient/game/${gameRound.number}/searchaliencheck_in/gotoGame.html`
    runlinshareurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${gameRound.appid}&redirect_uri=${encodeURIComponent(runlinredirecturl)}&response_type=code&scope=snsapi_userinfo&state=""&component_appid=wxd180d4eb5fb062fe#wechat_redirect`
  }
  if (gameRound.code == 'dppintu') {
    runlinredirecturl = `http://client.vw-dealer-wechat.faw-vw.com/wechatclient/game/${gameRound.number}/picturepuzzlecheck_in/gotoGame.html`
    runlinshareurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${gameRound.appid}&redirect_uri=${encodeURIComponent(runlinredirecturl)}&response_type=code&scope=snsapi_userinfo&state=""&component_appid=wxd180d4eb5fb062fe#wechat_redirect`
  }

  if (gameRound.code == 'dpyiy') {
    runlinredirecturl = `http://client.vw-dealer-wechat.faw-vw.com/wechatclient/game/${gameRound.number}/yiycheck_in/gotoGame.html`
    runlinshareurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${gameRound.appid}&redirect_uri=${encodeURIComponent(runlinredirecturl)}&response_type=code&scope=snsapi_userinfo&state=""&component_appid=wxd180d4eb5fb062fe#wechat_redirect`
  }

  if (gameRound.code == 'car') {
    runlinredirecturl = `http://client.vw-dealer-wechat.faw-vw.com/wechatclient/game/${gameRound.number}/carcheck_in/gotoGame.html`
    runlinshareurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${gameRound.appid}&redirect_uri=${encodeURIComponent(runlinredirecturl)}&response_type=code&scope=snsapi_userinfo&state=""&component_appid=wxd180d4eb5fb062fe#wechat_redirect`
  }

  return runlinshareurl
}


module.exports={ getWxJsConfig, getWxShareUrl,
  getWxJsConfigApiUrl, getWxAuthApiUrl
 }
