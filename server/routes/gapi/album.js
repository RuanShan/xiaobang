const album  =require( '../../controllers/gapi/albums.js')
const koaRouter  =require( 'koa-router')
const router = koaRouter()
router.prefix('/:number')

router.post('/getAlbumsInfo', album.createBeforeDirectUpload)
router.post('/modifyAlbum', album.modifyAlbum)

router.post('/createPoster', album.createPosterBeforeDirectUpload)
router.post('/getPoster', album.getPoster)
router.post('/modifyPoster', album.modifyPoster)

router.post('/createDesc', album.createDescBeforeDirectUpload)



module.exports=router
