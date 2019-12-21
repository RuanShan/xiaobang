const code = 'zhaobaba'

function getTableName( baseName ){
console.log('process.env.GAME_TABLE_PREFIX------:',process.env.GAME_TABLE_PREFIX);
  let table_name = (process.env.GAME_TABLE_PREFIX == 'yes' ? code + '_' +baseName : baseName)
  console.log('table_name-----:',table_name);
  return table_name
}
module.exports = {
  code,
  getTableName
}
