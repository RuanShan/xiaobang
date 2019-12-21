const { fields } = require('../../base/game_rounds')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_rounds')


module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('JiaoziGameRound', fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  addHooks(model)
  bindMethods(model)

  return model
}

function addHooks(model) {
  model.addHook('beforeCreate', 'set_defults', (game, options) => {
    game.code = 'zhaobaba'

  })
}

function bindMethods(model) {
  model.prototype.getInfo = getInfo
  model.prototype.getRandomList = getRandomList

}

/**
 * 取得游戏相关信息，用于初始化游戏
 * @param {*} url
 * @return {返回值类型} wxConfig or null
 */

function getInfo() {

  let dataList = this.getRandomList()
  let playPath = this.getPlayPath()

  return {
    number: this.number,
    state: this.state,
    name: this.name,
    desc: this.desc,
    state: this.state,
    award_desc: this.award_desc,
    start_at: this.start_at,
    end_at: this.end_at,
    host: this.host,
    dataList,
    playPath,
    code: this.code,
    duration: this.duration
  }

}

// 取得游戏中每一行的随机位置
function getRandomList() {

  var dataList = [];
  for (var i = 0; i < 50; i++) {
    dataList.push(Math.random() * 14); //可均衡获取0到14的随机整数。
  }
  return dataList
}
