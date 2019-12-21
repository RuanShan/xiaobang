const api  =require(  '../../controllers/api/game_rounds.js')
const koaRouter  =require(  'koa-router')
const router = koaRouter()

router.post('/', api.createRound)

router.post('/:code/:id', api.updateRound)

router.get('/:code/:id', api.showRound)

//router.delete('/:id' ,api.updateRound)

module.exports=router
