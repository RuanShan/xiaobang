const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
// gameRound 返回json中 键值对形式如下： {param_name}: param_value
// 为了不与gameRound中字段重复, param_name 以 'p_' 开头

// 微信分享通用参数
// p_wxshare_title: 活动分享标题
// p_wxshare_ptitle： 选手分享标题
// p_wxshare_desc：分享描述

// 游戏 ztoupiao
// 参数 p_vote_rule: 投票规则
GameRoundParamDefaults = {
  p_vote_rule: { day: 1, style: "sum", sum: 1, times: 1 }
}
// 游戏 idiom
// 参数 p_idiom_startwith: 成语出题的开始字

// 游戏 repeater
// 参数 p_content
const fields = {
  game_round_id: {
    type:DataTypes.INTEGER,
    allowNull: false
  },
  param_name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  param_value:{
    // param_values saved in json, mysql 5.7 support json, server mysql is 5.5
    type: DataTypes.STRING(1024),
    allowNull: false,
    defaultValue: '',
    get() {
      const val = this.getDataValue('param_value');
      return JSON.parse( val )
    },
    set(val) {
      this.setDataValue('param_value', JSON.stringify(val));
    }
  }
}


function getFields(){
  return Object.assign({}, fields)
}


module.exports = {
  getFields,
  GameRoundParamDefaults
}
