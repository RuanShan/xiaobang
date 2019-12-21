import fetch from '@/config/fetch'

/**
 * 取得砍价游戏基本信息
 * @param {*} data - game_round_id，game_player_id
 */

var basePath = '/gapi/games/bargain'

export const getInfo = ( number, data) => fetch(basePath + '/' + number + '/getInfo', data, 'POST')

export const addPlayer = ( number, data) => fetch(basePath + '/' + number + '/addPlayer', data, 'POST')

export const setAchievebycode = ( number, data) => fetch(basePath + '/' + number + '/setAchieve', data, 'POST')

export const getRanking = ( number, data) => fetch(basePath + '/' + number + '/getRanking', data, 'POST')

export const getRoundState = ( number, data) => fetch(basePath + '/' + number + '/getRoundState', data, 'POST')

export const getPlayerInfo = ( number, data) => fetch(basePath + '/' + number + '/getPlayerInfo', data, 'POST')

export const setRaisedResult = ( number, data) => fetch(basePath + '/' + number + '/setRaisedResult', data, 'POST')

export const getRaisedResultRank = ( number, data) => fetch(basePath + '/' + number + '/getRaisedResultRank', data, 'POST')
