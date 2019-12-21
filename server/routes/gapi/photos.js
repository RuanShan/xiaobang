const photos  =require( '../../controllers/photos.js')
const koaRouter  =require( 'koa-router')
const router = koaRouter()
router.post('/create', photos.createBeforeDirectUpload)

module.exports=router
