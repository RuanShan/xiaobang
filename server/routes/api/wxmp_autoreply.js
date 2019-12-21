// 处理微信公众号自动回复，测试使用

'use strict';

const router = require('koa-router')() // router middleware for koa
const wechat = require('co-wechat')
const WechatAPI = require('co-wechat-api')
const queryString = require('query-string')
const xmlParser = require('koa-xml-body')

const { getGameRoundModelByCode } = require('../../helpers/model')
const { redis }= require('../../services/redis')

const game_host = process.env.GAME_URL_BASE
var wechatConfig = require('../../config/weixin');

var api = new WechatAPI(wechatConfig.appid, wechatConfig.secret,
  async function() {
    const ticket = await redis.get(`${wechatConfig.appid}:accessToken`);
    return ticket;
  },
  async function(token) {
    await redis.set(`${wxopenConfig.appid}:accessToken`, JSON.stringify(token));
  });

router.post('/',  wechat(wechatConfig).middleware(async (message, ctx) => {
  // TODO
  let matches = null
  console.log("message = ", message)
  if (/^yiy[0-9]+/.test( message.Content )) {
    let gid =  /[0-9]+/.exec( message.Content )
    let user = await api.getUser( message.FromUserName );
    return [{
      title: '摇一摇',
      description: '参看大屏幕参加，切勿转发此链接给同事',
      picurl: 'http://otest.oss-cn-beijing.aliyuncs.com/dgame/yiy.jpg',
      url: `${game_host}/game-yiy/${gid}/checkin-wx?openid=${message.FromUserName}&nickname=${user.nickname}&headimgurl=${(user.headimgurl)}`
    }];
  }else if (/^gshare[0-9]+/.test( message.Content )) {
    //取得游戏连接，
      let gid =  /[0-9]+/.exec( message.Content )
      let gameround =  await game_rounds.findById( parseInt(gid) )
      let gameurl = `${game_host}/game-${gameround.code}/${gid}/checkin-wx`
      let url = `${game_host}/wapi/v1/wechatauth/gameshareurl?shareurl=${encodeURIComponent(gameurl)}`
      return {
        type: 'text',
        content: `${gameround.name}: ${url}`
      }
  }else if (/^g[0-9]+/.test( message.Content )) {
      let gid =  /[0-9]+/.exec( message.Content )
      let user = await api.getUser( message.FromUserName );
      let gameround =  await game_rounds.findById( parseInt(gid) )
      return {
        type: 'text',
        content: `<a href="${game_host}/game-${gameround.code}/${gid}/checkin-wx?openid=${message.FromUserName}&nickname=${user.nickname}&headimgurl=${(user.headimgurl)}"> ${gameround.name} </a>`
      }
  }else if (matches=/^gs([a-z]+)([0-9])*/.exec( message.Content )) { // list game_rounds offset
      let code = matches[1]
      let offset =  parseInt(matches[2]) || 0
      let Model = getGameRoundModelByCode( code )

      let limit = 10
      let gamerounds =  await Model.findAll( {where:{code}, limit, offset} )
      //console.log( "gamerounds= ", gamerounds)
      let content = gamerounds.map((g)=>{ return `${g.name}(${g.id}-${g.code})` }).join('|')
      if( content.length == 0 ){ content = "没有数据"}
      return {
        type: 'text',
        content: content
      }
  }else if (  matches=/^gu([a-z]+)([0-9]+)/.exec( message.Content )) {
    console.log('matches------:',matches);
    // ex. gudppintu9
    let code = matches[1]
    let model = getGameRoundModelByCode( code )
    let gid =   matches[2]

    //let user = await api.getUser( message.FromUserName )
    let gameround =  await model.findOne( {where:{id:gid, code}})

    let content = '没有这个游戏'

    if( gameround!= null){
      let url = gameround.getEntryUrl()
      content =`<a href="${url}"> ${gameround.name} </a>`

      if( gameround.isDpGame()){        
        content = content + (`<a href="${gameround.getControlUrl()}"> ${gameround.name}-控制端 </a>`)
      }
    }

    return {
      type: 'text',
      content: content
    }

  } else {
    return {
      content: message.Content,
      type: 'text'
    };
  }
}))
router.get('/', wechat(wechatConfig).middleware(async (message, ctx) => {
  // echo for handshake
  return {
    content: message.Content,
    type: 'text'
  };
}))


module.exports = router;
