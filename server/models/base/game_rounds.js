const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const fields = {
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      IsNull: function(value) {
        if (value == '') {
          console.log('name can not be null');
          throw new Error('name can not be null')
        }
      }
    }
  },
  state: {
    /* created	   0 created	新建
        open	     1 open	开始签到
        ready	     2 ready	结束签到，准备开始
        starting	 3 starting	开始前倒计时中
        started	   4 started	游戏已开始
        completed	 5 completed	游戏已结束
        disabled	 6 disabled	游戏已关闭
    */
    type: DataTypes.STRING(24),
    defaultValue: 'created'
  },
  creator_id: DataTypes.INTEGER,
  start_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      IsNull: function(value) {
        if (value == '') {
          console.log('start_at can not be null');
          throw new Error('start_at can not be null')
        }
      }
    }
  },
  end_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      IsNull: function(value) {
        if (value == '') {
          console.log('end_at can not be null');
          throw new Error('end_at can not be null')
        }
      }
    }
  },
  desc: DataTypes.TEXT, //游戏描述
  award_desc: DataTypes.TEXT,
  host: DataTypes.STRING(128), //游戏主办方
  duration: { //游戏时间，多少秒
    type: DataTypes.INTEGER,
    defaultValue: '0',
    allowNull: false,
    validate: {
      IsNull: function(value) {
        if (value == '') {
          console.log('duration can not be null');
          throw new Error('duration can not be null')
        }
      }
    }
  },
  code: { //缺省值为空，必填
    type: DataTypes.STRING(24),
    allowNull: false,
    defaultValue: '',
    validate: {
      IsNull: function(value) {
        if (value == '') {
          console.log('code can not be null');
          throw new Error('code can not be null')
        }
      }
    }
  },
  appid: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: ''
  },
  contact_required: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  number: {
    type: DataTypes.STRING(45), // get game_round by number
    unique: true                // add unique index
  },
  color: {
    type: DataTypes.STRING(16), // Hex + opacity
  },
  wx_auth_scope: {
    type: DataTypes.STRING(1), // B: snsapi_base, U: snsapi_userinfo
    defaultValue: 'U'
  },
  total_scores: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 游戏总分数
  result_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 游戏总票数
  player_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 游戏总人数
  visit_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 游戏访问量
  virtual_result_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 虚拟游戏总票数
  virtual_visit_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 虚拟游戏访问量
  publish_at: {
    type: DataTypes.DATE
  }
}

const dpfields = {
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      IsNull: function(value) {
        if (value == '') {
          console.log('name can not be null');
          throw new Error('name can not be null')
        }
      }
    }
  },
  state: {
    /* created	   0 created	新建
        open	     1 open	开始签到
        ready	     2 ready	结束签到，准备开始
        starting	 3 starting	开始前倒计时中
        started	   4 started	游戏已开始
        completed	 5 completed	游戏已结束
        disabled	 6 disabled	游戏已关闭
    */
    type: DataTypes.STRING(24),
    defaultValue: 'created'
  },
  creator_id: DataTypes.INTEGER,
  start_at: {
    type: DataTypes.DATE
  },
  end_at: {
    type: DataTypes.DATE
  },
  desc: DataTypes.TEXT, //游戏描述
  award_desc: DataTypes.TEXT,
  host: DataTypes.STRING(128), //游戏主办方
  score: { //游戏时间，多少秒
    type: DataTypes.INTEGER,
    defaultValue: '0'
  },
  duration: { //游戏时间，多少秒
    type: DataTypes.INTEGER,
    defaultValue: '0',
    allowNull: false,
    validate: {
      IsNull: function(value) {
        if (value == '') {
          console.log('duration can not be null');
          throw new Error('duration can not be null')
        }
      }
    }
  },
  code: { //缺省值为空，必填
    type: DataTypes.STRING(24),
    allowNull: false,
    defaultValue: '',
    validate: {
      IsNull: function(value) {
        if (value == '') {
          console.log('code can not be null');
          throw new Error('code can not be null')
        }
      }
    }
  },
  appid: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: ''
  },
  contact_required: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  number: {
    type: DataTypes.STRING(45), // get game_round by number
    unique: true                // add unique index
  },
  color: {
    type: DataTypes.STRING(16), // Hex + opacity
  },
  wx_auth_scope: {
    type: DataTypes.STRING(1), // N: snsapi_base, U: snsapi_userinfo
    defaultValue: 'N'
  },
  total_scores: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 游戏总分数
  result_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 游戏总票数
  player_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 游戏总人数
  visit_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 游戏访问量
  virtual_result_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 虚拟游戏总票数
  virtual_visit_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 虚拟游戏访问量
  publish_at: {
    type: DataTypes.DATE
  }
}

function getFields(){
  return Object.assign({}, fields)
}

function getDpFields(){
  return Object.assign({}, dpfields)
}
module.exports = {
  getFields,
  getDpFields,
  dpfields,
  fields
}
