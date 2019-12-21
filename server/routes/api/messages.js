const messages  =require( '../../controllers/api/messages.js')
const Router  =require( 'koa-router')
const router = new Router()


router.post('/', messages.create)


// router.post('/weixin_open', weixin.createRound)
// router.post('/gameRound', gameRound.createRound)

module.exports=router
