const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const fields = {
  created_by:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  content: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  commentable_id: {
    type: DataTypes.INTEGER,
  },
  commentable:{
    type: DataTypes.STRING(16),
    validate: {
      isIn: {
         args: [['post', 'album']],
         msg: "Must be post, album."
       }
    }
  }
}

function getFields(){
  return Object.assign({}, fields)
}

module.exports = {
  getFields,
  fields
}
