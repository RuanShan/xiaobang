const { fields } = require('../../base/game_results')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_results')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('DpQiandaoGameResult', fields, {
      createdAt: 'created_at', updatedAt:'updated_at',
      tableName: tableName
    })
}
