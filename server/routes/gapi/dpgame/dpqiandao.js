const game  =require(  '../../../controllers/gapi/dpgame/qiandao.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()

router.post('/getInfoDp', game.getInfoDp)

router.post('/addPlayer', game.addPlayer)
router.post('/createAward', game.createAward)
router.post('/createAwardPlayer', game.createAwardPlayer)
router.post('/updateGameRoundState', game.updateGameRoundState)
router.post('/clearAwardPlayer', game.clearAwardPlayer)
router.post('/getAwardResult', game.getAwardResult)
router.post('/getAwardResultCount', game.getAwardResultCount)





module.exports=router
