const moon  =require( '../../../controllers/gapi/game/moon.js')
const koaRouter  =require( 'koa-router')
const multiparty  =require( 'koa2-multiparty')

const router = koaRouter()

router.post('/savePhoto', moon.savePhoto)
router.post('/getInfo', moon.getInfo)
router.post('/getMatchResult', moon.getMatchResult)
router.post('/getNewWxJsConfig', moon.getNewWxJsConfig)
router.post('/testCompare', multiparty(), moon.testCompare)


module.exports=router
