const { code, getTableName } = require('./base')
const tableName = getTableName('game_round_params')
const { getFields } = require('../../base/game_round_params')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('ZTouPiaoGameRoundParam', getFields(), {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  return model
}
