const { fields } = require('../../base/comments')
const { code, getTableName } = require('./base')
const tableName = getTableName('comments')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('ZTouPiaoComment', fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  return model
}
