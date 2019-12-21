const  { GameConstant } = require('../../constant')
const { fields } = require('../../base/game_players')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_players')

module.exports = (sequelize, DataTypes) => {

  const model = sequelize.define('DpPintuGamePlayer',fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  addHooks(model)
  bindMethods(model)
  return model

}

function addHooks(model) {
  model.addHook('beforeCreate', 'set_defult_score', (player, options) => {
    player.score = GameConstant.maxTime
    player.max_score = GameConstant.maxTime
  })
}

function bindMethods(model) {
  model.prototype.getInfo = getInfo
}

// 返回到游戏端的信息, 用于显示游戏成绩信息
async function getInfo() {

  let isSuc = ((this.score == this.max_score) & this.score != 9999.99)
  let score = this.score
  let bestScore = this.max_score //bestScore
  let rank = await this.currentPositionAsc()
  let beat = await this.beatAsc()

  return {
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
