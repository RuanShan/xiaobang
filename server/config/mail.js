let config = {
  host: process.env.MESSAGE_SMTP_HOST || 'smtp.example.com',
  port: process.env.MESSAGE_SMTP_PORT || 888,
  secureConnection: true, // use SSL
  secure: true, // upgrade later with STARTTLS
  user: process.env.MESSAGE_SMTP_USER || 'user',
  pass: process.env.MESSAGE_SMTP_PASSWORD || 'pass'

}

module.exports= config
