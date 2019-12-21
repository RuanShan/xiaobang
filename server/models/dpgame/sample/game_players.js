const { generteTableName } = require('../../common/helper')
const { fields } = require('../../base/game_players')
const { code } = require('./base')
const tableName = generteTableName( code, 'game_players')


module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op

  const Model = sequelize.define('DpSampleGamePlayer', fields , {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName

  })


  Model.prototype.getInfo =  async function () {

    let isSuc = this.score == this.max_score
    let score = this.score
    let bestScore = this.max_score //bestScore
    let rank = await this.currentPositionDesc()
    let beat = await this.beat()

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

  return Model

}
