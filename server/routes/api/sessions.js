const Sessions  =require(  '../../../controllers/api/sessions.js')
const Router  =require(  'koa-router')
const router = new Router()

router.post('/', Sessions.create)

module.exports=router
