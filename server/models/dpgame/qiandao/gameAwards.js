module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('DpQiandaoGameAward', {
    game_round_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    name: DataTypes.STRING,
    position: DataTypes.INTEGER, // 奖品抽奖时排列顺序
    prize_count:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    prize_name:{
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    type:{
      type: DataTypes.STRING(255),
      defaultValue: ''
    },
    score:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    money:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    at_percent:{
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    day_play_count_limit:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    day_share_plus:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    game_cdays_required:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    game_days_required:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    wx_card_id:{
      type: DataTypes.STRING(255),
      defaultValue: ''
    },
    day_first_achieved_required:{
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: '0'
    },
    day_probability:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    day_prize_count:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    now_date:{
      type:DataTypes.DATE
    },
    now_prize_count:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    taxon:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'dpqiandao_game_awards',
  })

  return model
}
