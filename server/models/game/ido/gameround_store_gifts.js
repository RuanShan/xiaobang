module.exports = (sequelize, DataTypes) => {
  return sequelize.define('IdoGameRoundStoreGift', {
    game_round_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    gift_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'null'
    },
    remaining: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
  }, {
    tableName:'ido_gameround_store_gifts',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
