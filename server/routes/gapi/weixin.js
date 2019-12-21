const api  =require(  '../../controllers/gapi/weixin')
const koaRouter  =require(  'koa-router')
const router = koaRouter()

router.post('/getJsConfig', api.getWxJsConfig)

module.exports=router
