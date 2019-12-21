
module.exports=class MessagesController {
  /**
   * show game round
   * @param {*} req
   * @param {*} res
   */
  static async form(ctx) {

    let type = ctx.query.type

    let title = '个人报修'
    if( type == 1){
      title = '企业办公电脑'
    }else if(type == 2){
      title = '企业网络故障'
    }else if(type == 3){
      title = '企业办公电脑'
    }else if(type == 4){
      title = '企业服务器、存储'
    }
    await ctx.render( 'messages/new', { title } )

  }

  static async create(ctx) {


  }
}
