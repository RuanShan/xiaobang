const { fields } = require('../../base/game_results')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_results')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DpYiyGameResult', fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName,
    // 并且希望 deletedA t被称为 destroyTime(请记住启用paranoid以使其工作)
    deletedAt: 'deleted_at',
    paranoid: true,
  })
}
