const game  =require( '../../controllers/gapi/base_by_code.js')
const koaRouter  =require( 'koa-router')
const router = koaRouter()
router.prefix('/:code')

router.post('/:number/setAchieve', game.setAchieve)
router.post('/:number/gameresult', game.getGameResult)
router.post('/:number/postMsg', game.postMsg)
module.exports=router
