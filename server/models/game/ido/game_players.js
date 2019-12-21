const { fields } = require('../../base/game_players')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_players')

module.exports = (sequelize, DataTypes) => {

  const model = sequelize.define('IdoGamePlayer',fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  return model

}
