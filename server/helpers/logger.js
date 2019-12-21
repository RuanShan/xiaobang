let  path  = require('path')
let log4js  = require('log4js')

const config = require('../config/log4js.js')

log4js.configure( config )

const  logger = log4js.getLogger();
const  httpLogger = log4js.getLogger('http');
const  wxlogger = log4js.getLogger('wx');
const  socketioLogger = log4js.getLogger('socketio');

logger.info( "log4js initialized")

module.exports = {
  wxlogger,
  httpLogger,
  logger,
  socketioLogger
}
