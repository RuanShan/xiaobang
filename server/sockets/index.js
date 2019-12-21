
const IO  = require( 'socket.io')
const redisAdapter  = require('socket.io-redis');
const DpSampleSocket  = require('./dpgame/sample')
const DpPintuSocket  = require('./dpgame/pintu')
const DpYiySocket  = require('./dpgame/yiy')
const DpQiandaoSocket  = require('./dpgame/qiandao')
const DpCounterSocket  = require('./dpgame/counter')
function sockets( server ){
  let path = process.env.SOCKETIO_PATH || '/socket.io'
  const adapter =  redisAdapter({ host: '127.0.0.1', port: 6379 })
  const io = IO(server, { transports: [ 'websocket' ],  path,  adapter  })
  console.log( "socket server bind path", path )
  // 拼图socket
  DpSampleSocket.bind(io)
  DpPintuSocket.bind(io)
  DpYiySocket.bind(io)
  DpQiandaoSocket.bind(io)
  DpCounterSocket.bind(io)
  return io
}


module.exports={ sockets }
