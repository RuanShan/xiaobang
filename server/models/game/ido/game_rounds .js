const { fields } = require('../../base/game_rounds')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_rounds')


module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('IdoGameRound', fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  addHooks(model)

  return model
}

function addHooks(model) {
  model.addHook('beforeCreate', 'set_defults', (game, options) => {
    game.code = code

  })
}
