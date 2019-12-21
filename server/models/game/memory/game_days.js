const { getFields } = require('../../base/game_days')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_days')
const fields = getFields()

module.exports = (sequelize, DataTypes) => {

    return sequelize.define('MemoryGameDay', fields, {
      createdAt: 'created_at', updatedAt:'updated_at',
      tableName: tableName
    })
}
