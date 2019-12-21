const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const fields = {
  game_round_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  title:{
    type: DataTypes.STRING(300),
    allowNull: false,
    defaultValue: ''
  },
  content: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  publish_at: {
    type: DataTypes.DATE
  }
}

function getFields(){
  return Object.assign({}, fields)
}

module.exports = {
  getFields,
  fields
}
