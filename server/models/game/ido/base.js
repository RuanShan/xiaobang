const code = 'ido'

function getTableName( baseName ){
  let table_name = (process.env.GAME_TABLE_PREFIX == 'yes' ? code + '_' +baseName : baseName)
  console.log('table_name-----:',table_name);
  return table_name
}
module.exports = {
  code,
  getTableName
}
