import fetch from '@/config/fetch'

/**
 * 取得砍价游戏基本信息
 * @param {*} data - game_round_id，game_player_id
 */

var basePath = '/gapi/ztoupiao'

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
export const getGameInfo = ( number, data) => fetch(basePath + '/' + number + '/getInfo', data, 'POST')

export const postMsg = ( number, data) => fetch(basePath + '/' + number + '/addPlayer', data, 'POST')

export const setAchievebycode = ( number, data) => fetch(basePath + '/' + number + '/setAchieve', data, 'POST')

export const getRanking = ( number, data) => fetch(basePath + '/' + number + '/getRanking', data, 'POST')

export const getRoundState = ( number, data) => fetch(basePath + '/' + number + '/getRoundState', data, 'POST')

export const searchAlbums = ( number, data) => fetch(basePath + '/' + number + '/searchAlbums', data, 'POST')

export const getNewAlbumInfo = ( number, data) => fetch(basePath + '/' + number + '/getNewAlbumInfo', data, 'POST')

export const getHotAlbumInfo = ( number, data) => fetch(basePath + '/' + number + '/getHotAlbumInfo', data, 'POST')

export const getAlbumInfo = ( number, data) => fetch(basePath + '/' + number + '/getAlbumInfo', data, 'POST')

export const increaseVisitCount = ( number, data) => fetch(basePath + '/' + number + '/increaseVisitCount', data, 'POST')

export const getPostInfo = ( number, data) => fetch(basePath + '/' + number + '/getPostInfo', data, 'POST')

export const getPostDetailInfo = ( number, data) => fetch(basePath + '/' + number + '/getPostDetailInfo', data, 'POST')

export const addComment = ( number, data) => fetch(basePath + '/' + number + '/addComment', data, 'POST')


export const getMyWorkInfo = ( number, data) => fetch(basePath + '/' + number + '/getMyWorkInfo', data, 'POST')

export const getMyCardInfo = ( number, data) => fetch(basePath + '/' + number + '/getMyCardInfo', data, 'POST')

export const thumbUp = ( number, data) => fetch(basePath + '/' + number + '/thumbUp', data, 'POST')
