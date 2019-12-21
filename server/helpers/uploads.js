const path = require ('path');
// 取得上传文件保存路径
function getFileSavePath( filename, gameRound, gamePlayerId){
  // /public/uploads/:code/:id/:player_id/:key.jpg
  let gameRoundId = gameRound.id+''
  gamePlayerId = gamePlayerId+''
  return path.join( './uploads', gameRound.code,gameRoundId,gamePlayerId, filename )
}

function getFolderPath(gameRound, gamePlayerId){
  // /public/uploads/:code/:id/:player_id/:key.jpg
  let gameRoundId = gameRound.id+''
  gamePlayerId = gamePlayerId+''
  return path.join( './uploads', gameRound.code,gameRoundId,gamePlayerId)
}

module.exports={ getFileSavePath,  getFolderPath }
