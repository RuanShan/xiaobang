module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('IdiomWord', {
    idiom_name: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    name_reverce: {
      type: DataTypes.STRING(24),      
      allowNull: false
    },
    idiom_pinyin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idiom_pinyin_str:{
      type: DataTypes.STRING
    },
    idiom_meaning:{
      type: DataTypes.STRING
    },
    idiom_from:{
      type: DataTypes.STRING
    },
    idiom_example:{
      type: DataTypes.STRING
    },
    is_common:{
      type: DataTypes.INTEGER
    }
  }, {
    createdAt: 'create_at',
    updatedAt: 'update_at',
    tableName: 'idiom_words',
    indexes: [
      // add a FULLTEXT index
      { name: 'idiom_names_name_and_reverce', fields: ['idiom_name', 'name_reverce'] }
    ],
    engine: 'MyISAM'
  })

  return model
}
