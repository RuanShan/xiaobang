const {
  getUsersModel,
  getGameRoundModelByCode,
  getWxMpUsersModel,
  getPostModel,
  getTermModel,
  getTermRelationshipModel
} = require('../../../helpers/model')
const {
  getPagination
} = require('../../../helpers/pagination')
module.exports=class term {

  static async getTermInfo(ctx) {
    console.log('===getTermInfo===');
    let body = ctx.request.body
    console.log('body---:',body);
    let group = body.group
    console.log('group---:',group);
    // 分类的分页由于有子分类，所以查询100个，希望能够包含所有
    let query = Object.assign( { limit: 100 }, ctx.query)
    let pagination = getPagination( query)
    // TODO suport other query
    let options =Object.assign( {hierarchy: true,where:{group:group}}, pagination )
    let TermModel = getTermModel()

    // find root only,  include  children,
    let {rows, count} = await TermModel.findAndCountAll(options)
    pagination.total = count

    let res = Object.assign(pagination, {  terms: rows } )

    let terms = res.terms

    //console.debug('terms----:',terms);

    ctx.body = terms
  }

  static async addTerm(ctx) {
    let body = ctx.request.body;
    console.debug('body---:', body);
    let name = body.name;
    let slug = body.slug;
    let desc = body.desc;
    let parent_id = body.parent_id
    let group = body.group

    let term = {
      name: name,
      slug: slug,
      desc: desc,
      group:group
    }
    if (parent_id > 0) {
      term.parent_id = parent_id
      term.parentId= parent_id
    }
    let TermModel = getTermModel()
    term = await TermModel.create(term)
    console.debug('term----:', term);
    ctx.body = term
  }

  static async removeTerm(ctx) {
    let body = ctx.request.body;
    console.debug('body---:', body);
    let id = body.id

    let TermModel = getTermModel()
    let res = await TermModel.destroy({
      where: {
        id: id
      }
    })

    let RelationshipModel = getTermRelationshipModel()

    await RelationshipModel.destroy({
      where: {
        term_id: id
      }
    })
    ctx.body = res
  }

  static async getPostInfo(ctx) {
    let PostModel = getPostModel()

    let post = await PostModel.findAll({})

    ctx.body = post
  }

  static async getTermDetail(ctx) {
    console.debug('ctx:',ctx.query);
    let body = ctx.query;
    let id = body.id
    let TermModel = getTermModel()

    let term = await TermModel.findOne({
      where: {
        id: id
      }
    })

    ctx.body = term
  }


  static async modifyTerm(ctx) {
    try {
      let body = ctx.request.body;
      console.debug('body---:', body);
      let id = body.id
      let name = body.name;
      let slug = body.slug;
      let desc = body.desc;
      let parent_id = body.parent_id

      let TermModel = getTermModel()
      let term = await TermModel.findOne({
        where: {
          id: id
        }
      })

      if (parent_id > 0) {
        term = await term.update({
          name: name,
          slug: slug,
          desc: desc,
          parent_id: parent_id,
          parentId: parent_id
        })
      } else {
        term = await term.update({
          name: name,
          slug: slug,
          desc: desc
        })
      }


      ctx.body = term
    } catch (e) {
      console.debug('error!:', e);
    }
  }
}
