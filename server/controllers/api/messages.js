const {
  Message
} = require('../../models')
const {
  addMessageJob
} = require('../../jobs/message_job')
module.exports=class MessagesController {
  /**
   * show game round
   * @param {*} req
   * @param {*} res
   */
  static async create(ctx) {
    let messageParams = ctx.request.body.message

    try {
      let model = await Message.create(messageParams)
      addMessageJob( model )
      ctx.body = model
    } catch (e) {
      ctx.throw( 401, 'can not create message', {
        expose: true
      })
    }


  }
}
