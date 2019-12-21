const { generteTableName } = require('../../common/helper')
const { fields } = require('../../base/game_day_fields')
const { code } = require('./base')
const tableName = generteTableName( code, 'game_days')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DpSampleGameDay',fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })
}
