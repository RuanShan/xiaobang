import fetch from '@/config/fetch'

/**
 * 取得砍价游戏基本信息
 * @param {*} data - game_round_id，game_player_id
 */

var basePath = '/gapi/record'

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
export const getInfo = (data) => fetch(basePath  + '/getInfo', data, 'POST')
export const setResult = (data) => fetch(basePath  + '/setResult', data, 'POST')
export const getContent = (data) => fetch(basePath  + '/getContent', data, 'POST')
