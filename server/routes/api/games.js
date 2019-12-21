const api  =require(  '../../controllers/api/games.js')
const Router  =require(  'koa-router')
const router = new Router()
router.prefix('/:code')

router.post('createRound','/', api.createRound)

router.post('/:id', api.updateRound)
router.put('/:id', api.updateRound)
router.get('/:id', api.showRound)
//router.put('updateRound','/:id', api.updateRound)

module.exports=router
