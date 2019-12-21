const {
  getGameRoundModelByCode,
  getUsersModel
} = require('../helpers/model')
const {
  componentAPI
} = require('../helpers/wxopen')

module.exports=class Upload {
  static async handleUpload(ctx){
    console.log('======handleUpload:',ctx);
    let img = ctx.request.body
    ctx.body = img
  }
}
