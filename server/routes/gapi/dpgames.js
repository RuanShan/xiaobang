const game  =require(  '../../controllers/gapi/dpgames.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()
router.prefix('/:code/:number')

router.get('/getInfoDp', game.getInfoDp)
router.post('/setAchieveForSpeed', game.setAchieveForSpeed)
router.post('/getInfo', game.getInfo)
router.post('/addPlayer', game.addPlayer)
router.post('/getRanking', game.getRanking)

module.exports=router
