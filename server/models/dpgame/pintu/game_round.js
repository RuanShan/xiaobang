
const { getDpFields } = require('../../base/game_rounds')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_rounds')


module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('DpPintuGameRound', getDpFields(), {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  addHooks( model)
  bindMethods(model)

  return model
}

function addHooks(model) {
  model.addHook('beforeCreate', 'set_defults', (game, options) => {
    game.code = 'dppintu'

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
    id: this.id,
    number: this.number,
    state: this.state,
    name: this.name,
    desc: this.desc,
    award_desc: this.award_desc,
    start_at: this.start_at,
    end_at: this.end_at,
    contact_required: this.contact_required,
    duration: this.duration,
    host: this.host,
    code:this.code,
    playPath: playPath
  }

}

// 取得游戏中每一行的随机位置
function getRandomList() {

  var dataList = [];
  for (var i = 0; i < 50; i++) {
    dataList.push(Math.round(Math.random() * 3)); //可均衡获取0到1的随机整数。
  }
  return dataList
}
