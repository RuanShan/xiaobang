const idiom  =require(  '../../../controllers/gapi/game/idiom.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()

router.get('/makeData', idiom.makeData)
router.post('/getInfo', idiom.getInfo)
router.post('/confirmAnswer', idiom.confirmAnswer)
router.post('/getRanking', idiom.getRanking)
router.post('/setAchievebycode', idiom.setAchievebycode)

router.get('/makeCommon', idiom.makeCommon)

module.exports=router
