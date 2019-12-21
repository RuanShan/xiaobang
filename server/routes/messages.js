const messages  =require( '../controllers/messages.js')
const Router  =require( 'koa-router')
const router = new Router()

router.get('/form', messages.form)

// router.post('/weixin_open', weixin.createRound)
// router.post('/gameRound', gameRound.createRound)

module.exports=router
