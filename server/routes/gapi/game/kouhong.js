const game  =require(  '../../../controllers/gapi/games/kouhong.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()

router.get('/set_achieve', game.setAchieve)

module.exports=router
