const game  =require(  '../../../controllers/gapi/game/zhaobaba.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()
router.prefix('/:code/:number')

router.post('/setAchieve', game.setAchieve)
router.post('/gameresult', game.getGameResult)
router.post('/postMsg', game.postMsg)
router.post('/getRanking', game.getRanking)

module.exports=router
