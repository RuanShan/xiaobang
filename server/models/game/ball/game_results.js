const { getFields } = require('../../base/game_results')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_results')
const fields = getFields()

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('BallGameResult', fields, {
      createdAt: 'created_at', updatedAt:'updated_at',
      tableName: tableName
    })
}
