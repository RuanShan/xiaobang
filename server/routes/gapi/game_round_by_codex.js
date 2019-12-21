const api  =require(  '../../controllers/gapi/game_round.js')
const Router  =require(  'koa-router')
const router = new Router()
router.prefix('/:code')
router.get('showRoundByNumber','/:number', api.showRoundByNumber)

module.exports=router
