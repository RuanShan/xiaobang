const { fields } = require('../../base/game_rounds')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_rounds')


module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('WastesortingGameRound', fields, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  addHooks(model)
  bindClassMethods(model)
  bindMemberMethods(model)

  return model
}

function addHooks(model) {
  model.addHook('beforeCreate', 'set_defults', (game, options) => {
    game.code = 'rubbish'
  })
}

const permittedAttributes = ['number', 'state', 'name', 'desc', 'award_desc', 'start_at', 'end_at', 'code', 'duration', 'host', 'color']

function bindClassMethods(model) {
  model.getAllInfoByNumber = async function(number) {
    let gameRound = model.findOne({
      attributes: permittedAttributes,
      where: {
        number
      }
    })
    let playerCount = model.count({
      where: {
        number
      },
      include: 'GamePlayers'
    })
    let resultCount = model.count({
      where: {
        number
      },
      include: 'GameResults'
    })

    let results = await Promise.all([gameRound,playerCount, resultCount])

    let info = results[0]
    info.playPath = info.getPlayPath()
    info.playerCount = results[1]
    info.resultCount = results[2]
    return info
  }


}


function bindMemberMethods(model) {
  model.prototype.getInfo = getInfo
  model.prototype.getRandomList = getRandomList
}

/**
 * 取得游戏相关信息，用于初始化游戏
 * @param {*} url
 * @return {返回值类型} wxConfig or null
 */

function getInfo() {

  let playPath = this.getPlayPath()
  let dataList = this.getRandomList()

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
    code: this.code,
    color: this.color,
    duration: this.duration,
    playPath
  }

}

// 取得游戏中每一行的随机位置
function getRandomList() {

  var dataList = [];
  for (var i = 0; i < 300; i++) {
    dataList.push(Math.round(Math.random())); //可均衡获取0到1的随机整数。
  }
  return dataList
}
