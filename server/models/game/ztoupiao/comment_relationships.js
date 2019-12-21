const { code, getTableName } = require('./base')
const tableName = getTableName('comment_relationships')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('ZTouPiaoCommentRelationship', {
    comment_id: {
      type: DataTypes.INTEGER,
    },
    viewable_id: {
      type: DataTypes.INTEGER,
    },
    type:{
      type: DataTypes.STRING(64),
      validate: {
        isIn: {
           args: [['post', 'album']],
           msg: "Must be post, album."
         }
      }
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })
  return model
}
