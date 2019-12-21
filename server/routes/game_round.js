const gameRound  =require( '../controllers/game_round.js')
const Router  =require( 'koa-router')
const router = new Router()

router.get('/unauthorized', gameRound.unauthorized)

router.get('/:code/:number/entry', gameRound.entry)


// router.post('/weixin_open', weixin.createRound)
// router.post('/gameRound', gameRound.createRound)

module.exports=router
