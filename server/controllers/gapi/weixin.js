const messageContent = require('../constant')

var config = require('../../config/weixin');
const WechatAPI = require('co-wechat-api');
const wechatApi = new WechatAPI(config.appid, config.secret);

module.exports=class WeixinController {

  /**
   *
   * @param {*} ctx
   *            ctx.body.url
   *            ctx.body.shareurl
   */
  static async getWxJsConfig(ctx) {
    //try {
      let url = ctx.request.body.url
      let shareurl = ctx.request.body.shareurl
      var param = {
        debug: false,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        url: url
      };
      let ticket = await wechatApi.getLatestTicket()
      console.debug("getLatestTicket=", ticket, "url=", url)

      let data = await wechatApi.getJsConfig(param);
      if (shareurl) {
        var link = wechat_config.authdomain + '/wapi/v1/wechatauth/gameshareurl?shareurl=' + encodeURIComponent(shareurl)
        data.link = link
      }
      console.debug(" getWxJsConfig data = ", data)
      ctx.body = data

    // } catch (error) {
    //   ctx.throw(messageContent.ResponeStatus.CommonError, 'can not get wx js config fail' + ': ' + error, {
    //     expose: true
    //   })
    // }
  }


}
