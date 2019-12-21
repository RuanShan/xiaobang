const { fields } = require('../../base/posts')
const { code, getTableName } = require('./base')
const tableName = getTableName('posts')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('ZTouPiaoPost', fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  return model
}
