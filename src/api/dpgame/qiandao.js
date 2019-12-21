import fetch from '@/config/fetch'

/**
 * 取得砍价游戏基本信息
 * @param {*} data - game_round_id，game_player_id
 */

var basePath = '/gapi/dpqiandao'

export const getGameInfoForDp = (data) => fetch(basePath  + '/getInfoDp', data,'POST')

export const getGameResult = (number, data) => fetch(basePath + number + '/getInfo', data, 'POST')

// export const postMsg = (number, data) => fetch(basePath + number + '/addPlayer', data, 'POST')
export const createAwardPlayer = (data) => fetch(basePath + '/createAwardPlayer', data, 'POST')
export const updateGameRoundState = (data) => fetch(basePath + '/updateGameRoundState', data, 'POST')
export const clearAwardPlayer = (data) => fetch(basePath + '/clearAwardPlayer', data, 'POST')
export const getAwardResult = (data) => fetch(basePath + '/getAwardResult', data, 'POST')
export const getAwardResultCount = (data) => fetch(basePath + '/getAwardResultCount', data, 'POST')




// export const setAchieveForSpeed = (number, data) => fetch(basePath + number + '/setAchieveForSpeed', data, 'POST')
//
// export const getRanking = (number, data) => fetch(basePath + number + '/getRanking', data, 'POST')
