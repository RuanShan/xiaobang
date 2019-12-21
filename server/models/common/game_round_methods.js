const gameConfig = require('../../config/game')
const {
  generateCode
}  = require('./helper')

function bindGameRoundMethods( db ){

  let models = Object.values(db)
  models.forEach((model)=>{
    let rex = /([\w]+)GameRound$/
    if( rex.test(model.name)){
      bindCommonMethods( model )
      // 如果是大屏游戏
      if( /^Dp/.test( model.name) ){
        bindDpMethods(model)
      }else{
        bindMethods(model)
      }
      //sequelizePaginate.paginate(model)
      addHooks( model )
    }
  })

  function bindCommonMethods( model ){
    model.prototype.isDpGame = function() {
      return /^dp/.test( this.code)
    }

    model.prototype.getPlayPath = function() {
      // 支持大屏游戏 code 以dp开头的认为是大屏游戏，游戏路径为 /${code}-play.html?number=${number}
      if( this.isDpGame()){
        return `/${this.code}-play.html?number=${this.number}`
      }
      return `/${this.code}.html?number=${this.number}`
    }
    model.prototype.getPlayUrl = function() {
      return gameConfig.urlBase + this.getPlayPath()
    }
    // 取得游戏入口路径，授权路径
    model.prototype.getEntryUrl = function(){
      return process.env.GAME_URL_BASE + '/game/'+this.code+'/' + this.number + '/entry'
    }
  }

  function bindDpMethods(model) {
    console.log("bindDpMethods", model.name)

    model.prototype.getControlUrl = function() {
      return gameConfig.urlBase + `/${this.code}-control.html?number=${this.number}`
    }

  }

  function bindMethods(model) {


  }
}


function addHooks( model ){
  model.addHook( 'beforeCreate', 'generate_number', (game, options) => {
   game.code = model.name.replace('GameRound','').toLowerCase()
   game.number =  generateCode()
  })

}

module.exports = {
  bindGameRoundMethods
}
