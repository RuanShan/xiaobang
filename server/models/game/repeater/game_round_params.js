const { code, getTableName } = require('./base')
const tableName = getTableName('game_round_params')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('GameRoundParam', {
    game_round_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    param_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    param_value:{
      type: DataTypes.STRING(1024),
      allowNull: false,
      defaultValue: ''

    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  return model
}
