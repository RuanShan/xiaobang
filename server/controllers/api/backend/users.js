const bcrypt = require('bcryptjs')
const {
  User
} = require('../../../models')
const secret = require('../../../config/secret')

module.exports=class Users {
  /**
   * 取得游戏相关信息，并返回客户端，初始化游戏
   * @param {*}
   * @return {*}
   */
  static async show(ctx) {
    console.log( " ctx.state.user ", ctx.state.user )
    let id = ctx.state.user.id
    let user = await User.findByPk( id, { attributes:['id', 'cellphone'], include:[ {association: 'WxMpUser'}]} )

    let json = { roles: ['admin'],
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin',
      mpuser: user.WxMpUser
    }
    ctx.body = json
  }

  /**
   * 添加一个用户
   * @param {Object} user { cellphone, password }
   * @return {*}
   */
  static async create(ctx){
    let userParams = ctx.request.body.user

    let saltRounds  = secret.saltRounds
    var hash = bcrypt.hashSync(userParams.password, saltRounds)
    userParams.encrypted_password = hash

    let user = await User.create( userParams )

    ctx.body = user

  }
}
