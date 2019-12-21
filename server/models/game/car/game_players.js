const { getFields } = require('../../base/game_players')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_players')
const fields = getFields()

module.exports = (sequelize, DataTypes) => {

  const model = sequelize.define('CarGamePlayer',fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  bindMethods(model)
  return model

}

function bindMethods(model) {
  model.prototype.getInfo = getInfo
}

// 返回到游戏端的信息, 用于显示游戏成绩信息
async function getInfo() {

  let isSuc = this.score < this.max_score
  let score = this.score
  let bestScore = this.max_score //bestScore
  let rank = await this.currentPositionDesc()
  let beat = await this.beat()

  return {
    id: this.id,
    token: this.token,
    openid: this.openid,
    avatar: this.avatar,
    nickname: this.nickname,
    isSuc,
    score,
    bestScore,
    rank,
    beat
  }
}
