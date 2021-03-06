import api from './api'
import config from '../../config'
import express from 'express'
import http from 'http'
import rootDir from 'app-root-dir'
import socketIO from 'socket.io'
import path from 'path'
import pageHandler from './pageHandler'

// dev dependencies
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import clientConfig from '../../tools/webpack/client.config'

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

// dev middleware
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(clientConfig)
  app.use(devMiddleware(compiler, {
    publicPath: clientConfig.output.publicPath,
    // open: true,
    // noInfo: true,
    // quiet: true,
    stats: 'none'
  }))
  app.use(hotMiddleware(compiler))
}


// middleware
app.use(express.static(path.resolve(rootDir.get(), 'dist', 'client')))


// the api routes
app.use('/api', api)

// handle pages :)
app.get('*', pageHandler)

// hello world!
server.listen(config.PORT, config.HOST, err => {
  if (err) throw err
  // To change console log, edit tools/webpack/server.config.js FriendlyErrorsWebpackPlugin()
})

io.on('connection', socket => {
  console.log(socket.nsp)
  socket.on('letter', data => {
    if (data.letter.length == 1) {
      console.log(data.letter)
    }
  })
  console.log('connect')
})
