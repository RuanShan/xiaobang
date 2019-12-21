module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('DpQiandaoGameAwardPlayer', {
    game_round_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    game_player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    game_award_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    scores:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    certificate_code:{
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    award_time:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'dpqiandao_game_award_players',
  })

  return model
}
