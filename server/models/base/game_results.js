const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const fields ={
  game_round_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  game_player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, //助力人
  to_game_player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, //被助力的人
  // to_album_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   defaultValue: '0'
  // }, //被投票的作品
  score: {
    type: DataTypes.FLOAT(10, 2), // 如拼图，计算 0.00 秒
    allowNull: false,
    defaultValue: '0'
  },
  ip:DataTypes.STRING(64),
  start_at: DataTypes.DATE,
  end_at: DataTypes.DATE
}


function getFields(){
  return Object.assign({}, fields)
}
module.exports = {
  getFields,
  fields
}
