function buildGameAssociations(db) {
  buildUserAssociations( db )

  // 为公共模型添加关系


  buildSharedAssociations( db )
  buildZTouPiaoAssociations(db)
  buildDpQiandaoAssociations( db )
  // 为每种游戏添加关系，游戏可能使用了公共模型，如 投票游戏使用 图片，文章

  let models = Object.values(db)
  models.forEach((model) => {
    let rex = /([\w]+)GameRound$/
    let matches = rex.exec(model.name)
    if (Array.isArray(matches)) {
      let gameRoundModel = model
      // 为每个游戏添加关系
      let code = matches[1]

      //let paramModel = models.find((m) => m.name == (code + "GameRoundParam"))
      let playerModel = models.find((m) => m.name == (code + "GamePlayer"))
      let resultModel = models.find((m) => m.name == (code + "GameResult"))
      let dayModel = models.find((m) => m.name == (code + "GameDay"))

      // 游戏参数， 成语，复读机等
      console.log("buildGameAssociations " + code + "GamePlayer," + code + "GameResult," + " GameRound="+ gameRoundModel.tableName)

      if (playerModel && resultModel) {
        // keep association name same for all games
        // ZhaobabaGameRound.hasMany( ZhaobabaGamePlayer, { foreignKey: 'game_round_id', as: 'gamePlayers'})
        // ZhaobabaGamePlayer.hasMany( ZhaobabaGameResult, {foreignKey: 'game_player_id', as: 'gameResults'})
        // 由于未知原因 表中外键约束会统一 与 bargain_game_xxx 建立，
        // 如： zxg_game_results_ibfk_1: bargain_game_round.id
        // 这里使用 constraints:false 不创建外键约束，在fields 里定义索引
        gameRoundModel.hasMany(playerModel, {
          constraints:false,
          foreignKey: 'game_round_id',
          as: 'GamePlayers'
        })
        gameRoundModel.hasMany(resultModel, {
          constraints:false,
          foreignKey: 'game_round_id',
          as: 'GameResults'
        })
        playerModel.hasMany(resultModel, {
          constraints:false,
          foreignKey: 'game_player_id',
          as: 'GameResults'
        })
        playerModel.belongsTo(gameRoundModel, {
          constraints:false,
          foreignKey: 'game_round_id',
          as: 'GameRound'
        })
        resultModel.belongsTo(playerModel, {
          constraints:false,
          foreignKey: 'game_player_id',
          as: 'GamePlayer'
        })
      }

      // 玩家有多个GameDay
      if (playerModel && dayModel) {
        playerModel.hasMany(dayModel, {
          foreignKey: 'game_player_id',
          as: 'GameDays'
        })
      }

    }
  })
}

function buildZTouPiaoAssociations(db){
  let SharedPhoto = db.SharedPhoto
  let SharedTerm = db.SharedTerm
  let SharedPhotoRelationship = db.SharedPhotoRelationship
  let SharedTermRelationship = db.SharedTermRelationship

    let ZTouPiaoComment = db.ZTouPiaoComment
    //let ZTouPiaoCommentRelationship = db.ZTouPiaoCommentRelationship
    let ZTouPiaoPost = db.ZTouPiaoPost
    let gameRoundModel = db.ZTouPiaoGameRound
    let ZTouPiaoAlbum = db.ZTouPiaoAlbum
    let playerModel = db.ZTouPiaoGamePlayer
    let resultModel = db.ZTouPiaoGameResult
    // ZTouPiaoComment.belongsToMany(ZTouPiaoPost, {
    //   through:{
    //     model: ZTouPiaoCommentRelationship,
    //     scope: {
    //         viewable_type: 'post'
    //     }
    //   },
    //   constraints:false,
    //   foreignKey: 'viewable_id',
    //   otherKey: 'comment_id',
    //   as: 'Comments'
    // })

    ZTouPiaoPost.hasMany(ZTouPiaoComment, {

      constraints:false,
      foreignKey: 'commentable_id',
      otherKey: 'comment_id',
      scope: {
        commentable: 'post'
      },
      as: 'Comments'
    })
    ZTouPiaoComment.belongsTo(ZTouPiaoPost, {
      foreignKey: 'commentable_id',
      constraints: false,
      as: 'Post'
    })

    ZTouPiaoAlbum.hasMany(ZTouPiaoComment, {
      foreignKey: 'commentable_id',
      constraints: false,
      scope: {
        commentable: 'album'
      },
      as: 'Comments'
    })
    ZTouPiaoComment.belongsTo(ZTouPiaoAlbum, {
      foreignKey: 'commentable_id',
      constraints: false,
      as: 'Album'
    })

    ZTouPiaoComment.belongsTo(playerModel, {
      foreignKey: 'created_by',
      as: 'GamePlayer'
    })

    // 投票类游戏 有Album

    console.log("buildZTouPiaoAssociations " )
    // album and player
    ZTouPiaoAlbum.belongsTo(playerModel, {
      foreignKey: 'game_player_id',
      as: 'GamePlayer'
    })
    // 作品有多个投票
    ZTouPiaoAlbum.hasMany(resultModel, {
      foreignKey: 'to_game_player_id',
      constraints:false,
      as: 'GameResults'

    })

    // 玩家有多个作品
    playerModel.hasMany(ZTouPiaoAlbum, {
      foreignKey: 'game_player_id',
      as: 'Albums'
    })

    // album and photo
    SharedPhoto.belongsTo(ZTouPiaoAlbum, {
      foreignKey: 'album_id',
      // Should on update and on delete constraints be enabled on the foreign key.
      // we should move album to viewable_id, viewable_type album
      constraints: false,
      as: 'Album'
    })
    ZTouPiaoAlbum.hasMany(SharedPhoto, {
      foreignKey: 'album_id',
      constraints: false,
      as: 'Photos'
    })

    // round and slide
    gameRoundModel.belongsToMany(SharedPhoto, {
      through:{
        model: SharedPhotoRelationship,
        scope: {
            viewable_type: 'slide'
        }
      },
      constraints:false,
      foreignKey: 'viewable_id',
      otherKey: 'photo_id',
      as: 'Slides'
    })

    //  支持查找分配了x分类的游戏
    //  findAll( { include:[{association:'TermRelationships', where:{ taxon_id: xxx } }]})
    gameRoundModel.hasMany(SharedTermRelationship, {
      foreignKey: 'viewable_id',
      scope: {
        viewable_type: 'round'
      },
      as: 'TermRelationships'
    });
    // round and term 游戏属于多个分类
    gameRoundModel.belongsToMany(SharedTerm, {
      through:{
        model: SharedTermRelationship,
        scope: {
            viewable_type: 'round'
        }
      },
      foreignKey: 'viewable_id',
      otherKey: 'term_id',
      as: 'Terms'
    })




}

// 大屏签到特别关系
function buildDpQiandaoAssociations(db){
  let DpQiandaoGameAward = db.DpQiandaoGameAward
  let DpQiandaoGameAwardPlayer = db.DpQiandaoGameAwardPlayer
  let DpQiandaoGamePlayer = db.DpQiandaoGamePlayer

  // DpQiandaoGameAward.belongsToMany(DpQiandaoGamePlayer, {
  //   foreignKey: 'game_award_id',
  //   as: 'GameAwardPlayers'
  // })



  DpQiandaoGameAward.belongsToMany(DpQiandaoGamePlayer, {
    through:{
      model: DpQiandaoGameAwardPlayer
    },
    constraints:false,
    foreignKey: 'game_award_id',
    otherKey: 'game_player_id',
    as: 'GamePlayers'
  })
}

// copy to zgame_site
function buildSharedAssociations(db) {
  // 为公共模型添加关系
  let SharedPost = db.SharedPost
  let SharedPhoto = db.SharedPhoto
  let SharedTerm = db.SharedTerm
  let SharedPhotoRelationship = db.SharedPhotoRelationship
  let SharedTermRelationship = db.SharedTermRelationship

  SharedPost.belongsToMany(SharedPhoto, {
    through:{
      model: SharedPhotoRelationship,
      scope: {
          viewable_type: 'cover'
      }
    },
    constraints:false,
    foreignKey: 'viewable_id',
    otherKey: 'photo_id',
    as: 'Covers'
  })

  SharedPost.belongsToMany(SharedTerm, {
    through:{
      model: SharedTermRelationship,
      scope: {
          viewable_type: 'post'
      }
    },
    foreignKey: 'viewable_id',
    otherKey: 'term_id',
    as: 'Terms'
  })

  //  支持查找分配了几个分类的文章
  //  findAll( { include:[{association:'TermRelationships', where:{ taxon_id: xxx } }]})
  SharedPost.hasMany(SharedTermRelationship, {
    foreignKey: 'viewable_id',
    scope: {
      viewable_type: 'post'
    },
    as: 'TermRelationships'
  })

  // 支持图片查找关系，以便删除图片时，删除关系
  SharedPhoto.hasMany(SharedPhotoRelationship, {
    foreignKey: 'photo_id',
    as: 'PhotoRelationship'
  })
}

// 构建后台用户相关关系
function buildUserAssociations( db ){
  let User = db.User
  let WxMpUser = db.WxMpUser
  // 用户有一个授权公众账号
  User.hasOne(WxMpUser, {
    foreignKey: 'user_id',
    as: 'WxMpUser'
  })

}
module.exports = {
  buildGameAssociations,
  buildSharedAssociations,
  buildZTouPiaoAssociations,
  buildDpQiandaoAssociations
}
