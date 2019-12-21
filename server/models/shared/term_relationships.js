module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('SharedTermRelationship', {
    viewable_type:{
      type: DataTypes.STRING(16)
      // post: 文章分类，code: 游戏的code，

    },
    viewable_id: {
      type: DataTypes.INTEGER,
    },
    term_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'shared_term_relationships'
  })
  return model
}
