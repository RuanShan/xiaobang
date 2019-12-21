const {
  GameRoundStates
} = require('../../constant')
var moment = require('moment')
const { dpfields } = require('../../base/game_rounds')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_rounds')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('DpYiyGameRound', dpfields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName,
    getterMethods: {
      displayStartAt() {
        let mo = moment(this.start_at)
        //2018年12月27日 10:00
        return mo.format("YYYY年MM月DD日 hh:mm");
      },
      displayEndAt() {
        let mo = moment(this.end_at)
        //2018年12月27日 10:00
        return mo.format("YYYY年MM月DD日 hh:mm");
      }
    },

  })
  addHooks(model)
  bindMethods(model)

  return model
}

function addHooks(model) {
  model.addHook('beforeCreate', 'set_defults', (game, options) => {
    game.code = code

  })
}

function bindMethods(model) {
  model.prototype.getInfo = getInfo
  model.prototype.getRandomList = getRandomList

}

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

function getRandomList() {

  var dataList = [];
  for (var i = 0; i < 50; i++) {
    dataList.push(Math.round(Math.random() * 3)); //可均衡获取0到1的随机整数。
  }
  return dataList
}
