const record  =require(  '../../../controllers/gapi/game/record.js')
const koaRouter  =require(  'koa-router')
const multiparty  =require(  'koa2-multiparty')

const router = koaRouter()

router.post('/getInfo', record.getInfo)
router.post('/setResult', record.setResult)
router.post('/getContent', record.getContent)




module.exports=router
