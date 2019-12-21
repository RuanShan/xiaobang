const code = 'dpyiy'

function getTableName( baseName ){
  let table_name = (process.env.GAME_TABLE_PREFIX == 'yes' ? code + '_' +baseName : baseName)
  return table_name
}
module.exports = {
  code,
  getTableName
}
