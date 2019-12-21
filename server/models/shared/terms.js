module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('SharedTerm', {
    name: {
      type: DataTypes.STRING(255),
      defaultValue: ''
    },
    slug: {
      type: DataTypes.STRING(255),
      defaultValue: ''
    },
    desc: {
      type: DataTypes.STRING(255),
      defaultValue: ''
    },
    parent_id: {
      type: DataTypes.INTEGER,
    },
    group: {
      type: DataTypes.STRING(16), // 取值 gameRound, post, 需要建立索引
    },
    hierarchy_level:{
      type: DataTypes.INTEGER,
    }
  }, {
    hierarchy: { levelFieldName: 'hierarchy_level', foreignKey: 'parent_id',
      // throughTable 使用 shared_term_relationships, 这个表定义term与其他数据的关系，也包括自己
      throughTable: 'shared_term_ancestors',
      throughForeignKey: 'ancestor_id',
      throughKey: 'term_id'
    },
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'shared_terms'
    //underscored: true,
    //underscoredAll: true  //
  })
  // model.isHierarchy();
  return model
}
