
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Message', {
    username: {
      type: DataTypes.STRING(24),
      defaultValue: ''
    },
    title: {
      type: DataTypes.STRING(128),
      defaultValue: ''
    },
    address: {
      type: DataTypes.STRING(255),
      defaultValue: ''
    },
    mobile: {
      type: DataTypes.STRING(16),
      defaultValue: ''
    },
    status: {
      type: DataTypes.STRING(12),
       // 文章状态，'public', 'draft'
    },
    desc: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },

  }, {
    underscored: true,
    timestamps: true,
    tableName: 'messages'
  })
  return model
}
