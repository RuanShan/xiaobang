const code = 'ztoupiao'

function getTableName( baseName ){
  return (process.env.GAME_TABLE_PREFIX == 'yes' ? code + '_' +baseName : baseName)
}


module.exports = {
  code,
  getTableName
}
