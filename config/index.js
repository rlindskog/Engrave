import dotenv from 'dotenv'
dotenv.config()

export default {
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV
}
