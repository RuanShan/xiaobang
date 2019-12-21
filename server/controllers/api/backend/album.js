const {
  getGameAlbumModelByCode,
  getGamePlayerModelByCode,
  getGamePhotoModelByCode
} = require('../../../helpers/model')
const {
  getPagination
} = require('../../../helpers/pagination')
module.exports=class album {
  static async getAlbums(ctx) {
    console.debug('===============getAlbum===============');
    console.debug('ctx.request.body---:', ctx.request.body);
    let pagination = getPagination(ctx.request.body.listQuery)
    let q = ctx.request.body.listQuery.q
    let o = ctx.request.body.o

    let code = ctx.request.body.code
    let options = Object.assign({
      where: q,
      order: o
    }, pagination, {
      include: [{
        association: 'Photos'
      }]
    })
    console.debug('options---:', options);
    let GameAlbumModel = getGameAlbumModelByCode(code)

    let { rows, count} = await GameAlbumModel.findAndCountAll(options)
    let res = Object.assign(pagination, { albums: rows, count })
    ctx.body = res
  }
  static async createAlbum(ctx) {
    console.debug('===============createAlbum===============');
    console.debug('ctx.request.body', ctx.request.body);
    let code = ctx.request.body.code
    let GamePlayerModel = getGamePlayerModelByCode(code)
    let playerParam = ctx.request.body.player
    let playerOptions = {
      fields: ['openid', 'nickname', 'avatar', 'game_round_id']
    }
    let player = await GamePlayerModel.create(playerParam, playerOptions)

    let GameAlbumModel = getGameAlbumModelByCode(code)
    let albumOptions = {
      fields: ['name', 'desc', 'game_player_id','game_round_id', 'type', 'position']
    }

    let albumParam = ctx.request.body.album
    albumParam.game_player_id = player.id
    let album = await GameAlbumModel.create(albumParam, albumOptions)
    ctx.body = album
  }

  static async removeAlbum(ctx){
    console.debug('===============removeAlbum===============');
    console.debug('ctx.request.body', ctx.request.body);
    let album = ctx.request.body.album
    let code = ctx.request.body.code

    let GameAlbumModel = getGameAlbumModelByCode(code)

    let res = await GameAlbumModel.destroy({
      where: {
        id:album.id
      }
    })
    ctx.body = res
  }

  static async modifyAlbum(ctx){
    console.debug('===============modifyAlbum===============');
    let albumData = ctx.request.body.album;
    let code = ctx.request.body.code
    let removeFileList = ctx.request.body.removeFileList

    console.debug('albumData---:',albumData);

    let GameAlbumModel = getGameAlbumModelByCode(code)

    let album = await GameAlbumModel.findOne({
      where: {
        id:albumData.id
      }
    })

    album = await album.update({
      name:albumData.name,
      desc:albumData.desc
    })

    let PhotoModel = getGamePhotoModelByCode(code)

    removeFileList.map(async (param) => {
      console.debug(" param ", param)
      let res = await PhotoModel.destroy({
        where: {
          album_id: album.id,
          id: param.name
        }
      })
    })

    ctx.body = album
  }

}
