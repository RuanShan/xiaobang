
/**
 * 取得砍价游戏基本信息
 * @param {*} data - game_round_id，game_player_id
 */

var basePath = '/gapi/dpsample'

/**
 * 取得游戏基本信息
 * @param {*} number - game_round number
 * @return {Object} gameRound - number, playPath, state, color, code
 * @return {Object} gamePlayer - current gamePlayer { openid, nickname, avatar }
 * @return {Array} gameAlbums - {}
 * @return {Array} slides - {}
 * @return {Object} wxJsConfig - { shareUrl }
 * @return {Number} playerCount -
 * @return {Number} resultCount -
 */
export const getInfoForControl = (data) => mockfetch(basePath  + '/getInfoForControl', data, 'POST')
export const getInfo = (data) => mockfetch(basePath  + '/getInfo', data, 'POST')
export const getGameResult = (data) => mockfetch(basePath  + '/getGameResult', data, 'POST')

export const confirmAnswer = (data) => mockfetch(basePath  + '/confirmAnswer', data, 'POST')
export const getRanking = (data) => mockfetch(basePath  + '/getRanking', data, 'POST')
export const setAchievebycode = (data) => mockfetch(basePath  + '/setAchievebycode', data, 'POST')


function mockfetch(url, params, method){
  let apiname = url.split('/').pop()
  let data = {}
  if( apiname == 'getInfo'){
    data = {

      gameRound:{
        code: 'dpsample',
        contact_required: true,
        name: 'this is game name placeholder.',
        state: 'open', // 游戏状态
        duration: 30  // 游戏时长
      },
      gamePlayer:{
        avatar: '/static/shared/image/avatar.jpg',
        token: 'token', // 跳过注册
        openid: 'previewer'
      },
      wxConfig:{

      }
    }
  }

  if( apiname == 'setAchievebycode'){
    data={
      rt:0,
      score: 100,
      rank: 1,
      beat: 100,
      bestScore: 999
    }
  }


  if( apiname == 'getRanking'){
    data={
      allPlayer: [{avatar: '/static/shared/image/girlImg.jpg', nickname: 'girl',max_score: 999 },
        {avatar: '/static/shared/image/manImg.jpg', nickname: 'boy',max_score: 111 }],
      thisPlayer:{ avatar: '/static/shared/image/manImg.jpg', nickname: 'boy',max_score: 111, rank: 2 }
    }
  }


  return new Promise( function(resolve, reject){
    resolve( data )
  })
}
