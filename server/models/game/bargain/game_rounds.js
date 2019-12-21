const { fields } = require('../../base/game_rounds')
const { code, getTableName } = require('./base')
const tableName = getTableName('game_rounds')


module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('BargainGameRound', {
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
    },
    initial_score: { type: DataTypes.BIGINT(11), defaultValue: '0' }, // 砍价开始额度
    final_score: { type: DataTypes.BIGINT(11), defaultValue: '0' },   // 砍价最终额度
    unit_score: { type: DataTypes.BIGINT(11), defaultValue: '0' },   // 每次砍价最高额度
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: tableName
  })

  addHooks(model)
  bindMethods(model)

  return model
}

function addHooks(model) {
  model.addHook('beforeValidate', 'set_defults', (game, options) => {
    game.code = code
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
    duration: this.duration,
    initial_score:this.initial_score,
    final_score:this.final_score,
    unit_score:this.unit_score
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
