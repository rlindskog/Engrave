// import dotenv from 'dotenv'
// dotenv.config()
require('dotenv').config()
module.exports = {
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,

  isDev: process.env.NODE_ENV !== 'production',
  isProd: process.env.NODE_ENV === 'production'
}
