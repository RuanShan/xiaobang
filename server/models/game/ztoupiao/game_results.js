const { fields } = require('../../base/game_results')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_results')

module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('ZTouPiaoGameResult', fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: tableName
  })

  function computeGameRoundResultCount(instance){
    // 更新 album.score
    //instance.

  }
  // Method 2
  Model.addHook('afterDestroy', 'RecomputeGameRoundResultCount', computeGameRoundResultCount)
  // Method 3
  Model.addHook('afterCreate', 'RecomputeGameRoundResultCount', computeGameRoundResultCount)

  return Model
}
