
const router = require('koa-router')(); // router middleware for koa
const {
  getGameRoundModelByCode,
  getGamePlayerModelByCode,
  getGameResultModelByCode,
  getGameAlbumModelByCode,
  getGamePhotoModelByCode,
  getVoteStyleModelByCode,
  getGameDayModelByCode
} = require('../helpers/model')
var weixinConfig = require('../config/weixin');
const {
  getWxJsConfig
} = require('../helpers/wxopen')

var OAuth = require('co-wechat-oauth');
const URL = require("url");
var client = new OAuth(weixinConfig.appid, weixinConfig.secret);

// 处理所有游戏的授权链接
router.get('/game', async (ctx) => {
  let gameurl = ctx.query.gameurl
  var url = client.getAuthorizeURL(weixinConfig.authdomain + '/authwx/gameshare-done?gameurl=' + gameurl, 'state', 'snsapi_userinfo');
  console.log("auth2-url", url)
  ctx.redirect(url)
})

// 处理所有游戏的分享链接
router.get('/gameshare', async (ctx) => {
  let shareurl = ctx.query.shareurl
  var url = client.getAuthorizeURL(weixinConfig.authdomain + '/authwx/gameshare-done?gameurl=' + shareurl, 'state', 'snsapi_userinfo');
  ctx.redirect(url)
})

// 根据用户给的url，附加微信用户信息
router.get('/gameshare-done', async (ctx) => {
  console.log("response.header=", ctx.response.header)

  let gameurl = ctx.query.gameurl
  console.log('gameurl---:',gameurl);
  let code = ctx.query.code
  console.log('code----:',code);
  var token = await client.getAccessToken(code);
  var accessToken = token.data.access_token;
  var openid = token.data.openid;

  var userInfo = await client.getUser(openid);
  console.log('userInfo-------------:', userInfo);

  var gameRound_code = gameurl.substring(gameurl.lastIndexOf('/')+1,gameurl.indexOf('.html'))

  gameRound_code = gameRound_code.split('-')[0]

  console.log('gameRound_code--:',gameRound_code);

  var nickname = userInfo.nickname;
  var headimgurl = userInfo.headimgurl;
  let number = gameurl.substr(gameurl.indexOf('number')+7)

  let GameRound = getGameRoundModelByCode(gameRound_code)
  let GamePlayer = getGamePlayerModelByCode(gameRound_code)
  let GameAlbum = getGameAlbumModelByCode(gameRound_code)
  let GameDay = getGameDayModelByCode(gameRound_code)

  console.log('number=====:',number);

  let gameRound = await GameRound.findOne({
    where: {
      number
    }
  })

  let gamePlayerPromise = await GamePlayer.findOne({
    where: {
      openid:openid,
      game_round_id:gameRound.id
    }
  })


  if (gameRound_code == 'ztoupiao'&&(gamePlayerPromise == null || gamePlayerPromise == undefined)) {
    console.log('1111111111111111');
    let gamePlayer = {
      openid: openid,
      nickname: nickname,
      avatar: headimgurl,
      game_round_id: gameRound.id,
      score: 0,
      max_score: 0
    }
    var options = {
      fields: ['openid', 'nickname', 'avatar', 'game_round_id', 'score', 'max_score', 'token']
    }
    gamePlayerPromise = await GamePlayer.create(gamePlayer, options)

    let gameDay = {
      game_player_id: gamePlayerPromise.id,
      visit_count: 0
    }

    gameDay = await GameDay.create(gameDay)
    console.log('1 gameDay--:', gameDay);
  }


  let params = 'openid=' + userInfo.openid + '&headimgurl=' + userInfo.headimgurl + '&nickname=' + encodeURIComponent(userInfo.nickname) + '&sex=' + userInfo.sex +
    '&language=' + userInfo.language + '&country=' + userInfo.country + '&province=' + userInfo.province + '&city=' + userInfo.city
  console.log("ctx.query= ", ctx.query, token.data, gameurl + (params))
  // 检查 gameurl是否有url参数
  let redirecturl = gameurl.indexOf('?') > 0 ? (gameurl + '&' + params) : (gameurl + '?' + params)
  ctx.redirect(redirecturl)
})

router.post('/wxjsconfig', async (ctx) => {
  let appid = ctx.request.body.appid
  let url = ctx.request.body.url
  var wxjsconfig = await getWxJsConfig(appid,url);
  ctx.body = wxjsconfig
})
module.exports = router;
