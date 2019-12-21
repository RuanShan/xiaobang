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
const queryString  =require(  'query-string')

const {
  defaultOauth,
  CreateOpenOauth
} = require('../helpers/wxopen');

// 根据用户给的url，附加微信用户信息
router.get('/gameshare-done', async (ctx) => {
  console.log('==================gameshare-done====================');
  // TODO 取得游戏gameround
  // TODO 取得游戏用户公众号appid，即gameround.user.appid， 然后根据公众号获取授权
  let appid = ctx.query.appid
  let oauth = CreateOpenOauth(appid)
  console.log('ctx.query--:',ctx.query);

  let gameurl = ctx.query.gameurl
  console.log('gameurl---:',gameurl);
  const parsed = queryString.parse(gameurl)
  console.log('parsed----:',parsed);

  let query = ctx.query.state
  let parent_share_code = ctx.query.share_code
  let albumId = ctx.query.albumId
  let left_player_id = ctx.query.left_player_id
  console.log('gameshare-done parent_share_code :',parent_share_code);
  let code = ctx.query.code
  var userInfo = await oauth.getUserByCode(code);
  let params = 'openid=' + userInfo.openid + '&headimgurl=' + userInfo.headimgurl + '&nickname=' + encodeURIComponent(userInfo.nickname) + '&sex=' + userInfo.sex +
    '&language=' + userInfo.language + '&country=' + encodeURIComponent(userInfo.country) + '&province=' + encodeURIComponent(userInfo.province) + '&city=' + encodeURIComponent(userInfo.city)

  var gameRound_code = gameurl.substring(gameurl.lastIndexOf('/')+1,gameurl.indexOf('.html'))

  gameRound_code = gameRound_code.split('-')[0]

  let GameRound = getGameRoundModelByCode(gameRound_code)
  let GamePlayer = getGamePlayerModelByCode(gameRound_code)
  let GameAlbum = getGameAlbumModelByCode(gameRound_code)
  let GameDay = getGameDayModelByCode(gameRound_code)

  let number = gameurl.substr(gameurl.indexOf('number')+7)

  let gameRound = await GameRound.findOne({
    where: {
      number
    }
  })

  let gamePlayer = await GamePlayer.findOne({
    where: {
      openid:userInfo.openid,
      game_round_id:gameRound.id
    }
  })


  if ((gameRound_code == 'ztoupiao'||gameRound_code == 'moon')&&(gamePlayer == null || gamePlayer == undefined)) {
    let parent_gamePlayer = {id:0}
    console.log(parent_share_code!='undefined'&&parent_share_code!=null);
    if(parent_share_code!='undefined'&&parent_share_code!=null){
      console.log('11111');
      parent_gamePlayer = await GamePlayer.findOne({
        where: {
          game_round_id:gameRound.id,
          share_code:parent_share_code
        }
      })
    }
    console.log('parent_gamePlayer---:',parent_gamePlayer);

    let gamePlayer = {
      openid: userInfo.openid,
      nickname: userInfo.nickname,
      avatar: userInfo.headimgurl,
      game_round_id: gameRound.id,
      score: 0,
      max_score: 0,
      parent_id:parent_gamePlayer.id
    }
    var options = {
      fields: ['openid', 'nickname', 'avatar', 'game_round_id', 'score', 'max_score', 'token','share_code','parent_id']
    }
    gamePlayer = await GamePlayer.create(gamePlayer, options)

  }
  // 检查 gameurl是否有url参数
  let redirecturl = gameurl.indexOf('?') > 0 ? (gameurl + '&' + params) : (gameurl + '?' + params)
  if(left_player_id!='undefined'&&left_player_id!=null){
    redirecturl = redirecturl+'&left_player_id='+left_player_id
  }
  if(albumId!='undefined'&&albumId!=null){
    redirecturl = redirecturl+'#/albums/'+albumId
  }
  ctx.session['token'] = gameRound.number+'_'+userInfo.openid
  ctx.redirect(redirecturl)
})

router.get('/gameshare-done-easy', async (ctx) => {
  console.log('==================gameshare-done-easy====================');
    // TODO 取得游戏gameround
    // TODO 取得游戏用户公众号appid，即gameround.user.appid， 然后根据公众号获取授权
    let appid = ctx.query.appid
    let oauth = CreateOpenOauth(appid)

    console.log('ctx.query----------------------,',ctx.query);

    let gameurl = ctx.query.gameurl

    console.log('gameurl---:',gameurl);
    const parsed = queryString.parse(gameurl)
    console.log('parsed----:',parsed);

    let query = ctx.query.state
    let parent_share_code = ctx.query.share_code
    let albumId = ctx.query.albumId
    let left_player_id = ctx.query.left_player_id
    console.log('gameshare-done-easy parent_share_code :',parent_share_code);

    let code = ctx.query.code
    var userInfo = await oauth.getUserByCode(code);
    let params = 'openid=' + userInfo.openid

    var gameRound_code = gameurl.substring(gameurl.lastIndexOf('/')+1,gameurl.indexOf('.html'))

    gameRound_code = gameRound_code.split('-')[0]
    let GameRound = getGameRoundModelByCode(gameRound_code)
    let GamePlayer = getGamePlayerModelByCode(gameRound_code)
    let GameAlbum = getGameAlbumModelByCode(gameRound_code)
    let GameDay = getGameDayModelByCode(gameRound_code)

    let number = gameurl.substr(gameurl.indexOf('number')+7)
    let gameRound = await GameRound.findOne({
      where: {
        number
      }
    })

    let gamePlayerPromise = await GamePlayer.findOne({
      where: {
        openid:userInfo.openid,
        game_round_id:gameRound.id
      }
    })


    if ((gameRound_code == 'ztoupiao'||gameRound_code == 'moon')&&(gamePlayerPromise == null || gamePlayerPromise == undefined)) {
      let parent_gamePlayer = {id:0}
      if(parent_share_code!='undefined'){
        parent_gamePlayer = await GamePlayer.findOne({
          where: {
            game_round_id:gameRound.id,
            share_code:parent_share_code
          }
        })
      }
      let gamePlayer = {
        openid: userInfo.openid,
        nickname: userInfo.nickname,
        avatar: userInfo.headimgurl,
        game_round_id: gameRound.id,
        score: 0,
        max_score: 0,
        parent_id:parent_gamePlayer.id
      }
      var options = {
        fields: ['openid', 'nickname', 'avatar', 'game_round_id', 'score', 'max_score', 'token', 'share_code','parent_id']
      }
      gamePlayerPromise = await GamePlayer.create(gamePlayer, options)

    }
    // 检查 gameurl是否有url参数
    let redirecturl = gameurl.indexOf('?') > 0 ? (gameurl + '&' + params) : (gameurl + '?' + params)
    console.log('left_player_id----:',left_player_id);
    console.log(left_player_id!='undefined');
    if(left_player_id!='undefined'&&left_player_id!=null){
      redirecturl = redirecturl+'&left_player_id='+left_player_id
    }
    if(albumId!='undefined'&&albumId!=null){
      redirecturl = redirecturl+'#/albums/'+albumId
    }
    ctx.session['token'] = gameRound.number+'_'+userInfo.openid
    ctx.redirect(redirecturl)
})
module.exports = router;
