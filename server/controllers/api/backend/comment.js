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
  ZTouPiaoCommentRelationship,
  ZTouPiaoAlbum
} = require('../../../models')

module.exports=class Comment {
  static async createComment(ctx){
    let body = ctx.request.body
    let commentParam = body.commentParam
    let relationshipParam = body.relationshipParam

    let comment = await ZTouPiaoComment.create(commentParam)
    let relationship = await ZTouPiaoCommentRelationship.create(relationshipParam)

    ctx.body = comment
  }

  static async getAllComment(ctx){
    console.log('===============getAllComment=============');
    let body = ctx.request.body
    let type = body.type
    let viewable_id = body.viewable_id
    let res = {}
    if(type == 'post'){
      res = await ZTouPiaoPost.findOne({
        where:{
          id:viewable_id
        },
        include: [{
          association: 'Comments'
        }]
      })
    }else if (type == 'album') {
      res = await ZTouPiaoAlbum.findOne({
        where:{
          id:viewable_id
        },
        include: [{
          association: 'Comments'
        }]
      })
    }

    ctx.body = res
  }

  static async getCommentDetail(ctx){
    console.log('==============getCommentDetail===============');
    let body = ctx.request.body
    let comment_id = body.id

    let comment = await ZTouPiaoComment.findOne({
      where:{
        id:comment_id
      }
    })

    ctx.body = comment
  }

  static async deleteComment(ctx){
    let body = ctx.request.body
    let comment_id = body.id

    let comment = await ZTouPiaoComment.destroy({
      where:{
        id:comment_id
      }
    })

    ctx.body = {
      res:'ok'
    }
  }
}
