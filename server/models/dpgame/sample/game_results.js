const { generteTableName } = require('../../common/helper')
const { fields } = require('../../base/game_results')
const { code } = require('./base')
const tableName = generteTableName( code, 'game_results')


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DpSampleGameResult', fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName,
    // 并且希望 deletedA t被称为 destroyTime(请记住启用paranoid以使其工作)
    deletedAt: 'deleted_at',
    paranoid: true,
  })
}
