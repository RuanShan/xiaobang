const {
  CronJob
} = require('cron')
var nodemailer = require('nodemailer');
const moment = require('moment')

var config = require('../config/mail');

//配置邮件
var transporter = nodemailer.createTransport({
    host: config.host,
    secureConnection: true,
  	secure: true,
    port:994,
    auth: {
        user: config.user,
        pass: config.pass,
    }
});
console.debug("transporter config",config);
//发送邮件
var sendmail = function(message, html){
    var option = {
        from:"no-reply@getstore.cn",
        to:"haoguang20@163.com"
    }
    option.subject = "报修："+ message.title
    option.html= html;
    transporter.sendMail(option, function(error, response){
        if(error){
            console.log("fail: " + error);
        }else{
            console.log("success: " + response.message);
        }
    });
}
/**
 * 摇一摇游戏结束后创建每个用户的成绩
 * @param {*} message
 * @param {Array} playerScores - [{ player_id, score}]
 */
async function addMessageJob(message) {
  let date = moment( message.created_at )
  const job = new CronJob({
    cronTime: new Date(),
    start:true,
    runOnInit: true,
    timeZone: 'Asia/Shanghai',
    onTick: async function() {
      //调用发送邮件
      let content = `
      <p>类型：${message.title}</p>
      <p>姓名：${message.username}</p>
      <p>电话：${message.mobile}</p>
      <p>地址：${message.address}</p>
      <p>描述：${message.desc}</p>
      <p>时间：${date.format()}</p>
      `
      sendmail(message, content);
    }
  })



}


module.exports={
  addMessageJob
}
