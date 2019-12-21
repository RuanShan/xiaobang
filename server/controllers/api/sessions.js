let bcrypt = require('bcryptjs')
let jwt = require( 'jsonwebtoken')
const moment = require('moment');
const {
  getUsersModel
} = require('../../helpers/model')
const secret = require('../../config/secret')


module.exports=class Sessions {
  /**
   * 取得游戏相关信息，并返回客户端，初始化游戏
   * @param {*}
   * @return {*}
   */
  static async create(ctx) {
    try {
      console.log('-----------login-----------');
      console.log('ctx.request.body--:', ctx.request.body);
      let params = ctx.request.body
      let cellphone = params.cellphone
      let password = params.password

      let User = getUsersModel()

      let userInfo = await User.findOne({
        attributes: ['id', 'cellphone', 'encrypted_password'],
        where: {
          cellphone: cellphone
        }
      })

      if (userInfo != null) {

        let valid = bcrypt.compareSync(password, userInfo.encrypted_password); // false

        if (valid) {
          const userToken = {
            cellphone: userInfo.cellphone,
            id: userInfo.id
          }
          //TODO 中国时区为准，第二天的pm03:00过期， 不满足 4小时 第三天 pm03:00，过期，
          let now = moment();
          let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')

          let _3_am = moment(tomorrow+' 3:00:00',"YYYY-MM-DD h:mm:ss");

          console.log('_3_am----:',_3_am);

          let df_time = _3_am-now

          if(df_time<14400000){
            df_time = df_time+86400000
          }

          console.log('df_time---:',df_time);

          const token = jwt.sign(userToken, secret.jwtSecret, { expiresIn: df_time } ) // 签发token
          ctx.body = {
            success: true,
            token: token // 返回token
          }

        } else {
          ctx.body = {
            success: false, // success标志位是方便前端判断返回是正确与否
            info: '用户明和密码不匹配！'
          }
        }
      } else {
        ctx.body = {
           success: false,
           info: '用户不存在！' // 如果用户不存在返回用户不存在
         }
      }

    } catch (e) {
      console.log('error!:', e);
    }
  }

}
