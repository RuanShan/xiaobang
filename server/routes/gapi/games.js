const game  =require(  '../../controllers/gapi/games.js')
const albums  =require(  '../../controllers/gapi/albums.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()
router.prefix('/:code/:number')

router.post('/setAchieve', game.setAchieve)
router.post('/setAchieveBySpeed', game.setAchieveBySpeed)
router.post('/getInfo', game.getInfo)
router.post('/addPlayer', game.addPlayer)
router.post('/getRanking', game.getRanking)
router.post('/getRoundState', game.getRoundState)
router.post('/getPlayerInfo', game.getPlayerInfo)
router.post('/setRaisedResult', game.setRaisedResult)
router.post('/getRaisedResultRank', game.getRaisedResultRank)





//  routes /photos/
//  routes /albums/
// const albumsRouter = koaRouter()
// albumsRouter.post('/createBeforeDirectUpload', albums.createBeforeDirectUpload)
// router.use('/albums', albumsRouter.routes(), albumsRouter.allowedMethods());

module.exports=router
