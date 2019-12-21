const api  =require(  '../../controllers/api/dpgames.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()

router.prefix('/:code')
router.post('/', api.createRound)

router.post('/:id' ,api.updateRound)
router.put('/:id' ,api.updateRound)

router.get('/:id' ,api.showRound)

module.exports=router
