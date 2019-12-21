
const { fields } = require('../../base/game_day_fields')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_days')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DpYiyGameDay',fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })
}
