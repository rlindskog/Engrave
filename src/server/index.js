import bodyParser from 'body-parser'
import express from 'express'
import http from 'http'
import jwt from 'jsonwebtoken'
import path from 'path'
import rootDir from 'app-root-dir'
import socketIO from 'socket.io'
import pageHandler from './pageHandler'
import api from './api'
import config from '../../config'

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
    noInfo: true,
    quiet: true,
    stats: 'none'
  }))
  app.use(hotMiddleware(compiler))
}

// middleware
app.use(express.static(path.resolve(rootDir.get(), 'dist', 'client')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// the api routes
app.use('/api', api)

// handle pages :)
app.get('*', pageHandler)

function delay() {
  let x = 0
  while (x < 599999999) {
    x++
  }
}

// hello world!
server.listen(config.PORT, config.HOST, err => {
  if (err) throw err
  // To change console log, edit tools/webpack/server.config.js FriendlyErrorsWebpackPlugin()
})

io.on('connection', socket => {
  console.log('socket server connected...')
  socket.on('letter', data => {
    let letter = data.letter
    if (letter.length == 1) {
      // save to the data base...
      // delay()
      io.sockets.emit('letter', { letter } ) // add user data later...
    }
  })
})
