const {
  ZTouPiaoGameRound,
  SharedPhotoRelationship,
  ZTouPiaoGamePlayer,
  ZTouPiaoGameResult,
  ZTouPiaoGameDay,
  SharedTerm,
  ZTouPiaoGameRoundParam,
  ZTouPiaoPost,
  ZTouPiaoComment,
  ZTouPiaoCommentRelationship
} = require('../../../models')
const {
  getPagination
} = require('../../../helpers/pagination')
const {
  getPhotoRelationshipModel,
  getPhotoModel,
  getVoteStyleModelByCode,
  getTermRelationshipModel,
  getGameRoundParamModelByCode
} = require('../../../helpers/model')

const {
  Sequelize
} = require('../../../models')

const Op = Sequelize.Op;
const moment = require('moment');
const { GameRoundStates } = require( '../../../models/constant')
const { GameRoundParamDefaults } = require( '../../../models/base/game_round_params')
const { addGameRoundStartJob, addGameRoundEndJob } = require('../../../jobs/game_round_ztoupiao_state_job')

const GameRoundModel = ZTouPiaoGameRound

module.exports=class GameRounds {


  static async update(ctx) {
    try {
      console.log('++++++++++++++++++++++modifyGameRound=================');
      let body = ctx.request.body;
      console.log('body---:', body);
      let id = ctx.params.id
      let termList = body.terms
      let gameRoundAttributes = body.gameRound
      let TermRelationshipModel = getTermRelationshipModel()

      let gameRound = await GameRoundModel.findOne({
        where: {
          id
        }
      })

      console.log('gameRoundAttributes start_at--:',gameRoundAttributes.start_at);
      console.log('gameRound start_at--:',gameRound.start_at);
      console.log(moment(gameRound.start_at).format("YYYYMMDDhhmmss")==moment(gameRoundAttributes.start_at).format("YYYYMMDDhhmmss"));
      let requireGameRoundStartJob = false;
      let requireGameRoundEndJob = false;

      if(moment(gameRound.start_at).format("YYYYMMDDhhmmss")!=moment(gameRoundAttributes.start_at).format("YYYYMMDDhhmmss")){
        console.log('update requireGameRoundStartJob');
        requireGameRoundStartJob = true
      }

      if(moment(gameRound.end_at).format("YYYYMMDDhhmmss")!=moment(gameRoundAttributes.end_at).format("YYYYMMDDhhmmss")){
        console.log('update requireGameRoundEndJob');
        requireGameRoundEndJob = true
      }
      //如果用户改变state   disabled=> any, 这时需要添加计划任务，以便服务器重启时，无需处理所有disabled的
      if( gameRoundAttributes.state != null && gameRound.state == GameRoundStates.disabled &&  gameRound.state != gameRoundAttributes.state ){
        requireGameRoundStartJob = true
        requireGameRoundEndJob = true
      }


      gameRound = await gameRound.update(gameRoundAttributes, {
        fields: ['name', 'desc', 'color', 'state', 'start_at', 'end_at', 'publish_at']
      })

      if(requireGameRoundStartJob){
        addGameRoundStartJob(gameRound);
      }

      if(requireGameRoundEndJob){
        addGameRoundEndJob(gameRound);
      }

      let createdGameRoundParams = await GameRounds.handleGameRoundParams( gameRound, gameRoundAttributes )
      // 更新游戏 color,description等没有传 termList参数，这里可能为空
      if( termList ){
        await TermRelationshipModel.destroy({
          where:{
            viewable_type:gameRound.code,
            viewable_id:gameRound.id
          }
        })
        //termList.length>0
        console.log('termList===:',termList);
        for(let i=0;i<termList.length;i++){
          let term_relationship = {
            viewable_type:gameRound.code,
            viewable_id:gameRound.id,
            term_id:termList[i]
          }
          await TermRelationshipModel.create(term_relationship)
        }
      }
      ctx.body = gameRound
    } catch (e) {
      console.log('error!:', e);
    }
  }

  static async modifyDesc(ctx) {
    try {
      console.log('==================modifyDesc=================');
      let body = ctx.request.body;
      let number = body.number
      let code = body.code
      let gamedesc = body.desc;

      let gameRound = await GameRoundModel.findOne({
        where: {
          number: number
        }
      })

      gameRound = await gameRound.update({
        desc: gamedesc
      })
      ctx.body = gameRound
    } catch (e) {
      console.log('error!:', e);
    }
  }

  /**
   * 根据条件取得游戏信息列表
   * @param {*}
   * @return {*}  { gameRounds, total, page, pageSize }
   */
  static async index(ctx) {
    console.log('=============getGameRoundInfo===========');

    let userId = ctx.state.user.id
    let pagination = getPagination(ctx.query)
    let options = Object.assign({}, pagination, {
      where: {
        user_id: userId
      }
    })

    let {
      rows,
      count
    } = await GameRoundModel.findAndCountAll(options)
    pagination.total = count;

    let player_count,result_count,visit_count = {}

    await ZTouPiaoGamePlayer.findAll({
      attributes: ['game_round_id', [Sequelize.fn('COUNT', Sequelize.col('game_round_id')),'count']],
      group: 'game_round_id',
      raw: true
    }).then(function(result) {
      player_count = result
    })

    await ZTouPiaoGameResult.findAll({
      attributes: ['game_round_id', [Sequelize.fn('COUNT', Sequelize.col('game_round_id')),'count']],
      group: 'game_round_id',
      raw: true
    }).then(function(result) {
      result_count = result
    })

    await ZTouPiaoGameDay.findAll({
      attributes: ['game_round_id', [Sequelize.fn('SUM', Sequelize.col('visit_count')),'count']],
      group: 'game_round_id',
      raw: true
    }).then(function(result) {
      visit_count = result
    })

    for(var i=0;i<rows.length;i++){
      for(var j=0;j<result_count.length;j++){
        if(rows[i].id == result_count[j].game_round_id){
          rows[i].dataValues.result_count = result_count[j].count;
          break;
        }
        if(j == result_count.length-1){
          rows[i].dataValues.result_count = 0
        }
      }

      for(var j=0;j<visit_count.length;j++){
        if(rows[i].id == visit_count[j].game_round_id){
          rows[i].dataValues.visit_count = visit_count[j].count;
          break;
        }
        if(j == visit_count.length-1){
          rows[i].dataValues.visit_count = 0
        }
      }

      for(var j=0;j<player_count.length;j++){
        if(rows[i].id == player_count[j].game_round_id){
          rows[i].dataValues.player_count = player_count[j].count;
          break;
        }
        if(j == player_count.length-1){
          rows[i].dataValues.player_count = 0
        }
      }
    }

    let res = Object.assign(pagination, {
      gameRounds: rows
    })

    ctx.body = res
  }

  /**
   * 创建 gameround
   * @param {object} gameRound, 包括创建gameround所需要的属性 { name, desc, code, start_at, end_at }
   * @return {object}  { gameRound  }
   */
  static async create(ctx) {
    let body = ctx.request.body;
    console.debug('body---:', body);
    let gamename = body.name;
    let gamedesc = body.desc;
    let code = body.code;
    let duration = body.duration
    let user_id = ctx.state.user.id
    let start_at = body.start_at;
    let end_at = body.end_at;
    // TODO 创建管理员用 预览用户 { openid: 'admin' },  gameRound.createGamePlayer({})
    // FIXME 修正开始和结束时间
    let gameRoundParams = {
      user_id: user_id,
      name: gamename,
      desc: gamedesc,
      code: code,
      duration: duration,
      start_at: start_at,
      end_at: end_at

    }
    let gameRound = await GameRoundModel.create(gameRoundParams)
    let playerParams = {
        openid: 'admin',
        nickname: 'previewer',
        avatar: 'http://wx.qlogo.cn/mmopen/VX7U0xDSUxiaYgiasax2BWhlFuXmDaGvibY27Zknyy2WWrgNQwHvTfrKicupics0tdlFqBWGicy3heHOyRKPrBvEibFZtHCicf8zyKkr/0'
    }
    let player = await gameRound.createGamePlayer( playerParams )
    let gameDay = await player.createGameDay( {game_round_id: gameRound.id})

    ctx.body = gameRound
  }

  static async show(ctx) {
    let gid = ctx.params.id;
    console.log('body---:', ctx.params);

    let TermRelationshipModel = getTermRelationshipModel()

    let gameRound = await GameRoundModel.findByPk(gid, {
      include: [{
        association: 'Slides'
      }]
    })

    let termList = await TermRelationshipModel.findAll({
      where:{
        viewable_type:gameRound.code,
        viewable_id:gameRound.id
      }
    })

    console.log('termList----:',termList);

    gameRound.dataValues.termList = termList

    ctx.body = gameRound
  }

  static async removeGameRound(ctx) {
    let body = ctx.request.body;
    console.log('body---:', body);
    let round_id = body.round_id

    let res = await GameRoundModel.destroy({
      where: {
        id: round_id
      }
    })
    ctx.body = res
  }

  static async removeSlide(ctx) {
    let body = ctx.request.body;
    console.log('body---:', body);
    let photo_id = body.photo_id
    let round_id = body.round_id

    let PhotoRelationshipModel = getPhotoRelationshipModel()

    let res = await PhotoRelationshipModel.destroy({
      where: {
        photo_id: photo_id,
        viewable_id: round_id,
        viewable_type: 'slide'
      }
    })
    ctx.body = res
  }

  static async bindPhotoRelationship(ctx) {
    console.log('==========bindPhotoRelationship=========');
    console.log(require('../../../models'));
    console.log('ctx.request.body', ctx.request.body);
    let body = ctx.request.body;
    let newImg = body.newImg;
    let round_id = body.round_id;

    let gameRound = await GameRoundModel.findByPk(round_id)
    console.log('gameRound:', gameRound);
    let SharedPhoto = getPhotoModel()
    let Photo = await SharedPhoto.findOne({
      where: {
        id: newImg.id
      }
    })
    console.log('Photo:', Photo);
    let res = await gameRound.addSlides(Photo)
    console.log('res', res);
    ctx.body = res
  }

  static async getWxMpUsers(ctx) {
    console.log('==================getWxMpUsers================');
    let body = ctx.request.body;
    let user_id = body.user_id

    let UsersModel = getUsersModel()
    let WxMpUsersModel = getWxMpUsersModel()

    let user = await UsersModel.findOne({
      where: {
        id: user_id
      }
    })
    console.log('user=========:', user);

    if (user.appid) {
      let WxMpUsers = await WxMpUsersModel.findAll({
        where: {
          appid: user.appid
        }
      })
      console.log('WxMpUsers=============:', WxMpUsers);
      ctx.body = WxMpUsers
    }
  }

  static async getVoteStyle(ctx) {
    const key= 'p_vote_rule'
    // 缺省投票规则一个账号每天投一票
    const defaultVoteStyle =  GameRoundParamDefaults.p_vote_rule
    let id = ctx.params.id
    let gameRound = await GameRoundModel.findByPk( id )

    const GameRoundParamModel = getGameRoundParamModelByCode( gameRound.code )

    let voteStyle = await GameRoundParamModel.findOne({
      where: {
        game_round_id: id,
        param_name: key
      }
    })

    if (voteStyle) {
      ctx.body = voteStyle
    } else {
      ctx.body = defaultVoteStyle
    }
  }

  static async setVoteStyle(ctx) {
    console.log('==========setVoteStyle=========');
    let id = ctx.params.id
    let param = ctx.request.body
    let code = param.code
    let voteStyle = param.voteStyle
    console.log('voteStyleData---:', voteStyle);
    let gameRound = await GameRoundModel.findByPk( id )
    const GameRoundParamModel = getGameRoundParamModelByCode( gameRound.code )

    let createdGameRoundParams = GameRounds.handleGameRoundParams( gameRound, {p_vote_rule: voteStyle } )

    ctx.body = voteStyle
  }

  static async createPost(ctx){
    let postParam = ctx.request.body
    console.log('postParam---:',postParam);
    let post = await ZTouPiaoPost.create(postParam)

    ctx.body = post
  }

  static async modifyPost(ctx){
    let body = ctx.request.body
    let post_id = body.id
    let postParam = body.postParam

    let post = await ZTouPiaoPost.findOne({
      where:{
        id:post_id
      }
    })

    await post.update(postParam)

    ctx.body = post
  }

  static async deletePost(ctx){
    let body = ctx.request.body
    let post_id = body.id
    let post = await ZTouPiaoPost.destroy({
      where:{
        id:post_id
      }
    })

    ctx.body = {
      res:'ok'
    }
  }

  static async getAllPost(ctx){
    let body = ctx.request.body
    let game_round_id = body.gameRoundId

    let posts = await ZTouPiaoPost.findAll({
      where:{
        game_round_id:game_round_id
      }
    })

    ctx.body = posts
  }

  static async getPostDetail(ctx){
    let body = ctx.request.body
    let post_id = body.id

    let post = await ZTouPiaoPost.findOne({
      where:{
        id:post_id
      }
    })

    ctx.body = post
  }

  /**
   * 创建 gameround
   * @param {object} gameRoundParams, 包括创建gameRoundParam { p_ 开头的属性 }
   * @return {array}  { gameRoundParam  }
   */
  static async handleGameRoundParams( gameRound, gameRoundParams ){

    let GameRoundParamModel = getGameRoundParamModelByCode( gameRound.code )
    let createdGameRoundParams = []
    let keys = Object.keys(gameRoundParams)
    let roundid = gameRound.id
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('p_') == 0) {
        let key = keys[i];
        let value = gameRoundParams[key]

        let res = await GameRoundParamModel.findOne({
          where: {
            game_round_id: roundid,
            param_name: key
          }
        })

        if (res) {
          let param = {
            param_name: key,
            param_value: value
          }
          await res.update(param);
        } else {
          let param = {
            game_round_id: roundid,
            param_name: key,
            param_value: value
          }
          let gameParam = await GameRoundParamModel.create(param);
          createdGameRoundParams.push( gameParam)
        }
      }
    }
    return createdGameRoundParams
  }
}
