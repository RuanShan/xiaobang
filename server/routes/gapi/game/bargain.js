const game  =require(  '../../../controllers/gapi/game/bargain.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()

router.get('/game-info', game.gameInfoWx)

module.exports=router
