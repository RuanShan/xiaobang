const Redis = require('ioredis');
const redis = new Redis({ keyPrefix: "zgame:" });

redis.on('ready', () => {
    console.error( 'redis is ready');
})
redis.on('error', (error) => {
  console.error( 'connect redis fail: ' + error);
})

module.exports = {
  redis
}
