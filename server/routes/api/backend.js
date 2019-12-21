
const setting  =require(  '../../controllers/api/backend/setting.js')
const base  =require(  '../../controllers/api/backend/base.js')
const Users  =require(  '../../controllers/api/backend/users.js')
const GameRounds  =require(  '../../controllers/api/backend/game_rounds.js')
const Comments  =require(  '../../controllers/api/backend/comment.js')

const Posts  =require(  '../../controllers/api/backend/post.js')
const term  =require(  '../../controllers/api/backend/term.js')
//const wxOpen  =require(  '../../controllers/wxopen.js'

const Photos  =require(  '../../controllers/photos.js')
const Album  =require(  '../../controllers/api/backend/album.js')
const Wxopen  =require(  '../../controllers/api/backend/wxopen.js')

const Router  =require(  'koa-router')
const router = new Router()

router.get('/users/show', Users.show)
router.post('/users', Users.create)
router.get('/game_rounds', GameRounds.index)
router.get('/game_rounds/:id', GameRounds.show)
router.put('/game_rounds/:id', GameRounds.update)
router.post('/game_rounds/addGameRound', GameRounds.create)

router.get('/game_rounds/:id/getVoteStyle', GameRounds.getVoteStyle)
router.post('/game_rounds/:id/setVoteStyle', GameRounds.setVoteStyle)

router.post('/game_rounds/createPost', GameRounds.createPost)
router.post('/game_rounds/modifyPost', GameRounds.modifyPost)
router.post('/game_rounds/deletePost', GameRounds.deletePost)
router.post('/game_rounds/getAllPost', GameRounds.getAllPost)
router.post('/game_rounds/getPostDetail', GameRounds.getPostDetail)

router.post('/comments/createComment', Comments.createComment)
router.post('/comments/deleteComment', Comments.deleteComment)
router.post('/comments/getAllComment', Comments.getAllComment)
router.post('/comments/getCommentDetail', Comments.getCommentDetail)



router.del('/slides/removeSlide', GameRounds.removeSlide)
router.post('/photos/bindPhotoRelationship', GameRounds.bindPhotoRelationship)
router.post('/photos/:code/create', Photos.createBeforeDirectUpload)
router.post('/photos/search', Photos.search)
router.del('/photos/removePhoto', Photos.removePhoto)

router.get('/posts', Posts.index)
router.get('/posts/:id', Posts.getPostDetail)

router.post('/albums/createAlbum', Album.createAlbum)
router.post('/albums/getAlbums', Album.getAlbums)
router.del('/albums/removeAlbum', Album.removeAlbum)
router.put('/albums/modifyAlbum', Album.modifyAlbum)


// router.get('/game_rounds/getGameRoundInfo', base.getGameRoundInfo)
router.del('/game_rounds/removeGameRound', base.removeGameRound)
router.put('/game_rounds/modifyGameRound', base.modifyGameRound)
router.get('/users/getWxMpUsers', base.getWxMpUsers)
router.del('/users/removeWxMpUsers', base.removeWxMpUsers)
router.post('/game_rounds/modifyDesc', base.modifyDesc)
router.del('/game_rounds/clearData', base.clearData)
router.post('/game_results/getResultInfo', base.getResultInfo)
router.post('/game_days/getGameDayInfo', base.getGameDayInfo)
router.post('/game_results/getAlbumResultInfo', base.getAlbumResultInfo)
router.post('/export/getExportInfo', base.getExportInfo)



router.post('/posts/addPost', Posts.addPost)
// router.get('/base/getPostInfo', Posts.getPostInfo)
router.del('/posts/removePost', Posts.removePost)
router.del('/covers/removeCover', Posts.removeCover)
// router.get('/base/getPostDetail', Posts.getPostDetail)
router.put('/posts/modifyPost', Posts.modifyPost)


router.post('/terms/addTerm', term.addTerm)
router.post('/terms/getTermInfo', term.getTermInfo)
router.del('/terms/removeTerm', term.removeTerm)
router.get('/terms/getTermDetail', term.getTermDetail)
router.put('/terms/modifyTerm', term.modifyTerm)

router.get('/wxopen/auth', Wxopen.auth)
router.get('/wxopen/authdone', Wxopen.authdone)

module.exports=router
