'use strict';
require( "dotenv" ).config()
module.exports = {
    development: {
      database: process.env.DB_NAME || 'wechatmore_dev',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      dialect: 'mysql',
      logging: true,
      dialectOptions: {
        multipleStatements: true
      }
    }
};
