const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const fields = {
  openid: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  }, //
  game_round_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  nickname: DataTypes.STRING(128),
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  score: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
    defaultValue: '0'
  },
  max_score: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
    defaultValue: '0'
  },
  avatar: {
    type: DataTypes.STRING(300),
    allowNull: false,
    defaultValue: ''
  },
  cellphone: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: ''
  },
  realname: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: ''
  },
  token: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: ''
  },
  ip:DataTypes.STRING(64),
  share_code: {
    type: DataTypes.STRING(64),
    defaultValue: ''
  },
  parent_id:{
    type: DataTypes.INTEGER(11),
    defaultValue: 0
  }
}
const indexes = [{fields:['game_round_id']}]

function getFields(){
  return Object.assign({}, fields)
}

function getIndexes(){
  return [].concat(indexes)
}

module.exports = {
  getFields,
  getIndexes,
  fields
}
