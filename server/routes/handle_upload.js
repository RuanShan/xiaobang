const upload  =require(  '../controllers/handle_upload.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()

router.post('/', upload.handleUpload)



module.exports=router
