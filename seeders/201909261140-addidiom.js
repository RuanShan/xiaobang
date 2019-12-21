// https://github.com/sequelize/cli/blob/master/docs/FAQ.md


'use strict';

let logger = require('../server/helpers/logger')

let strjson = require('../doc/games/idiom.json')

// npx sequelize db:seed  --seed 201909261140-addidiom --config "server/config/seeddb.js"
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return doWork(queryInterface)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};


async function doWork(queryInterface) {
  //
  // let trancates = ['idiom_info_2'].map((t) => {
  //   return `truncate ${t}`
  // })
  //
  // console.log('trancates---:', trancates);
  // let sql = trancates.join(';') + ';'
  //
  // await queryInterface.sequelize.query(sql)

  console.log('strjson----:',strjson);
  console.log('strjson.length--:',strjson.length);
  console.log('strjson[0].word',strjson[0].word);

  let idioms=[]

  for(let i=0;i<strjson.length;i++){
    let param = {
      idiom_name:strjson[i].word,
      idiom_pinyin:strjson[i].pinyin,
      create_at: '2019-09-26',
      update_at: '2019-09-26'
    }
    idioms.push(param)
  }

  return await queryInterface.bulkInsert("idiom_info_2", idioms, {})

  // return null;
}
