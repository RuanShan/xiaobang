// 取得当前游戏ID
function getGameRoundNumber( socket ){

  const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
  console.log( "newNamespace = ", newNamespace.name)
  // broadcast to all clients in the given sub-namespace
  let number = newNamespace.name.split('-')[2]
  return number
}

module.exports={ getGameRoundNumber }
