const game  =require(  '../../../controllers/gapi/game/ztoupiao.js')
const albums  =require(  '../../../controllers/gapi/albums.js')

const koaRouter  =require(  'koa-router')
const router = koaRouter()
router.prefix('/:number')

router.post('/setAchieve', game.setAchieve)
router.post('/getInfo', game.getInfo)
router.post('/addPlayer', game.addPlayer)
router.post('/getRanking', game.getRanking)
router.post('/getRoundState', game.getRoundState)

router.post('/getNewAlbumInfo', game.getNewAlbumInfo)
router.post('/getHotAlbumInfo', game.getHotAlbumInfo)
router.post('/getAlbumInfo', game.getAlbumInfo)
router.post('/increaseVisitCount', game.increaseVisitCount)
router.post('/searchAlbums', game.searchAlbums)
router.post('/getPostInfo', game.getPostInfo)
router.post('/getPostDetailInfo', game.getPostDetailInfo)

router.post('/addComment', game.addComment)
// router.post('/getPostDetailInfo', game.getPostDetailInfo)



router.post('/getMyWorkInfo', game.getMyWorkInfo)
router.post('/thumbUp', game.thumbUp)

router.post('/createGameDay',game.createGameDay)


//  routes /photos/
//  routes /albums/
const albumsRouter = koaRouter()
albumsRouter.post('/createBeforeDirectUpload', albums.createBeforeDirectUpload)
router.use('/albums', albumsRouter.routes(), albumsRouter.allowedMethods());

module.exports=router
