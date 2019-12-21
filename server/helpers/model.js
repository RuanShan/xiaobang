const db = require('../models')

function getGameRoundParamModelByCode(code){
  let basename = 'gameroundparam'
  return getModelByCode(code, basename)
}

function getCompanies() {
  let basename = 'companies'
  return getModel(basename)
}

function getPostModel(){
  let basename = 'post'
  return getModel(basename)
}

function getTermRelationshipModel(){
  let basename = 'TermRelationship'
  return getModel(basename)
}

function getPhotoRelationshipModel(){
  let basename = 'PhotoRelationship'
  return getModel(basename)
}

function getTermModel(){
  return db.SharedTerm
}

function getPhotoModel(){
  return db.SharedPhoto
}

function getWxMpUsersModel(){
  return db.WxMpUser
}

function getUsersModel(){

  return db.User
}
  // code代表游戏类型
function getGameRoundModelByCode(code) {

  let basename = 'gameround'
  return getModelByCode(code, basename)
}

function getVoteStyleModelByCode(code) {
  let basename = 'votestyle'
  return getModelByCode(code, basename)
}

function getGameDayModelByCode(code) {
  let basename = 'gameday'
  return getModelByCode(code, basename)
}

function getGamePlayerModelByCode(code) {

  let basename = 'gameplayer'
  return getModelByCode(code, basename)
}


function getGameResultModelByCode(code) {

  let basename = 'gameresult'
  return getModelByCode(code, basename)
}

function getGameAlbumModelByCode(code) {

  let basename = 'album'
  return getModelByCode(code, basename)
}

function getGamePhotoModelByCode(code) {

  //let basename = 'Photo'
  //return getModelByCode(code, basename)
  return db.SharedPhoto
}

function getModelByCode(code, basename) {
    if (typeof(code) != 'string') {
      throw "code requires a string"
    }
    let re = new RegExp(code+basename+'$', 'i')
    let sequelize = db.sequelize
    let modelByCode = null
    for( let [key, model] of Object.entries(sequelize.models)){
      // DpPintuGameRound, DpPintuGamePlayer
      if (re.test(model.name)) {
        modelByCode = model
        break
      }
    }
    return modelByCode
}

function getModel(basename) {
    if (typeof(basename) != 'string') {
      throw "basename requires a string"
    }
    let re = new RegExp(basename, 'i')
    let sequelize = db.sequelize
    let Model = null
    for( let [key, model] of Object.entries(sequelize.models)){
      // DpPintuGameRound, DpPintuGamePlayer
      if (re.test(model.name)) {
        Model = model
        break
      }
    }
    return Model
}

// 查找一局游戏
async function getRoundInstance( code, id ){

  let model = getGameRoundModelByCode( code )
  let instance = await model.findByPk( id )
  return instance
}


module.exports={
getRoundInstance,
getModel,
getModelByCode,
getGamePhotoModelByCode,
getGameAlbumModelByCode,
getGameResultModelByCode,
getGamePlayerModelByCode,
getGameDayModelByCode,
getVoteStyleModelByCode,
getGameRoundModelByCode,
getUsersModel,
getWxMpUsersModel,
getPhotoModel,
getTermModel,
getPhotoRelationshipModel,
getTermRelationshipModel,
getPostModel,
getCompanies,
getGameRoundParamModelByCode
 }
