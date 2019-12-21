const auth = require('../controllers/user.js')
const koaRouter  = require('koa-router')
const router = koaRouter()

router.get('/user/:id', auth.getUserInfo) // 定义url的参数是id
router.post('/user', auth.postUserAuth)

module.exports = router
