const game  =require(  '../../../controllers/gapi/games/bargain.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()

router.get('/game-info', game.gameInfoWx)

module.exports=router
