const Koa = require('koa')
const json = require('koa-json')
//const logger =require('koa-logger')

const path = require('path')
const serve = require('koa-static')
const historyApiFallback = require('koa2-history-api-fallback')
const KoaRouter = require('koa-router')
const koaBodyparser = require('koa-bodyparser')
const session = require('koa-session') // session for flash messages

const http = require('http')
const xmlParser = require('koa-xml-body')
const { userAgent } = require('koa-useragent');
const secret = require('./config/secret')
const app = new Koa()
const router = new KoaRouter()
const {
  logger,
  httpLogger
} = require('./helpers/logger')

const port = process.env.API_SERVER_PORT || 3000
const env = process.env.NODE_ENV


// 处理微信请求
// app.use(xmlParser({key: 'body'})) // key 必须为 body， co-wechat 需要使用。
app.use(koaBodyparser())
app.use(json())
//app.use(logger())

app.use(async function(ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  httpLogger.info('%s %s - %s', ctx.method, ctx.url, ms)
})
app.use(userAgent)

app.use(async function(ctx, next) { //  如果JWT验证失败，返回验证失败信息
  try {
    await next()
  } catch (err) {
    console.debug("err->", err)
    if (err.status === 401) {
      // 处理JWT验证失败
      if (ctx.url.match(/^\/api\/backend/)) {
        ctx.status = 401
        ctx.body = {
          success: false,
          token: null,
          info: 'Protected resource, use Authorization header to get access'
        }
      }
    } else {
      logger.error(err)
      throw err
    }
  }
})


// set signed cookie keys for JWT cookie & session cookie
app.keys = [secret.sessionSecret];

// session for flash messages (uses signed session cookies, with no server storage)
app.use(session(app)); // note koa-session@3.4.0 is v1 middleware which generates deprecation notice

// app.on('error', function (err, ctx) {
//  console.log('server error', err)
// })



// 微信第三方授权需要页面展示。
const koaHandlebars = require('koa-handlebars')
const handlebars = require('handlebars')
// handlebars templating
app.use(koaHandlebars({
  cache: env !== "development",
  root: __dirname,
  defaultLayout: "main",
  handlebars: handlebars,
  extension: ['html'],
  viewsDir: 'views',
  partialsDir: path.join('views', 'partials'),
  layoutsDir: path.join('views', 'layouts'),
  //helpers: handlebarsHelper
}))

const messages = require('./routes/messages.js')
router.use('/messages', messages.routes())
const messagesApi = require('./routes/api/messages.js')
router.use('/api/messages', messagesApi.routes())

app.use(router.routes()) // 将路由规则挂载到Koa上。
app.use(historyApiFallback())
app.use(serve(path.resolve('public'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录



const server = http.createServer(app.callback())

const db = require('./config/db')


db().then(() => {
  server.listen(port)

  server.on('listening', function() {
    console.log('ok, server is running')
  })

  function gracefulShutdown(cb) {
    server.close(function(err) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      //if(cb) cb()
    })
    setTimeout(() => {
      console.log('Finished closing connections')
      process.exit(0)
    }, 1500)
  }

  // process SIGINT on linux..
  process.on('SIGINT', () => {
    console.log('process on SIGINT');
    gracefulShutdown()
  })

  // for nodemon
  // process.on('SIGUSR2', function () {
  //   console.log('process on SIGUSR2');
  //   gracefulShutdown(function () {
  //     process.kill(process.pid, 'SIGUSR2');
  //   })
  // })
  console.info(`${process.version} listening on port ${port}`);

})

module.exports = server
