let config = {
  "appenders": {
    "access": {
      "type": "dateFile",
      "filename": "log/access.log",
      "pattern": "-yyyy-MM-dd",
      "category": "http"
    },
    "app": {
      "type": "file",
      "filename": "log/app.log",
      "maxLogSize": 10485760,
      "numBackups": 3
    },
    "wx": {
      "type": "file",
      "filename": "log/wx.log",
      "maxLogSize": 10485760,
      "numBackups": 3
    },
    "socketio": {
      "type": "file",
      "filename": "log/socketio.log",
      "maxLogSize": 10485760,
      "numBackups": 3
    },
    "errorFile": {
      "type": "file",
      "filename": "log/errors.log",
      "maxLogSize": 10485760,
      "numBackups": 3
    },
    "errorFileFilter": {
      "type": "logLevelFilter",
      "level": "ERROR",
      "appender": "errorFile"
    },
    errorMail: {
      type: 'lib/log4js-smtp',
      transport: {
        plugin: 'smtp',
        options: {
          host: process.env.LOG4JS_ERROR_SMTP_HOST || 'smtp.example.com',
          port: process.env.LOG4JS_ERROR_SMTP_PORT || 888,
          secureConnection: true, // use SSL
          secure: true, // upgrade later with STARTTLS
          auth: {
            user: process.env.LOG4JS_ERROR_SMTP_USER || 'user',
            pass: process.env.LOG4JS_ERROR_SMTP_PASSWORD || 'pass'
          },
        }
      },
      recipients: process.env.LOG4JS_ERROR_MAIL_ADDRESS || 'none@example.com',
      sender: process.env.LOG4JS_ERROR_SMTP_USER || 'none@example.com'

    },
    "errorMailFilter": {
      "type": "logLevelFilter",
      "level": process.env.LOG4JS_ERROR_MAIL_LEVEL || "OFF",
      "appender": "errorMail"
    },
    "console": {
      "type": "stdout"
    }
  },
  "categories": {
    "default": {
      "appenders": ["app", "errorFileFilter", "errorMailFilter"],
      "level": "DEBUG"
    },
    "wx": {
      "appenders": ["wx"],
      "level": "DEBUG"
    },
    "socketio": {
      "appenders": ["socketio"],
      "level": "INFO"
    },
    "http": {
      "appenders": ["access", "console"],
      "level": "DEBUG"
    }
  },
  "pm2": true,
  "pm2InstanceVar": "ZGAME_INSTANCE_ID"

}

module.exports= config
