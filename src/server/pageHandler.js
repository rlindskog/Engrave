import fs from 'fs'
import HTMLStream from 'vue-ssr-html-stream'
import path from 'path'
import rootDir from 'app-root-dir'
import { createBundleRenderer } from 'vue-server-renderer'

// import ssrBundle from '../../dist/shared/ssr.bundle.json'

// create the renderer using memory-fs or native fs, depending on NODE_ENV
const createRenderer = fs => {
  const jsonBundle = fs.readFileSync(
    path.resolve(rootDir.get(), 'dist', 'shared', 'ssr.bundle.json'), 'UTF-8'
  )
  const ssrBundle = JSON.parse(jsonBundle)
  const ssrCode = ssrBundle.files[ssrBundle.entry]
  return createBundleRenderer(ssrCode)
}

// watch SSR bundle in memory-fs if in development
let bundleRenderer
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const ssrConfig = require('../../tools/webpack/ssr.config')
  const ssrCompiler = webpack(ssrConfig)
  const MFS = require('memory-fs')
  const mfs = new MFS()
  ssrCompiler.outputFileSystem = mfs
  ssrCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    bundleRenderer = createRenderer(fs)
  })
} else {
  bundleRenderer = createRenderer(fs)
}

// indexTemplate
const template = fs.readFileSync(
  path.resolve(rootDir.get(), 'dist', 'client', 'index.template.html'), 'UTF-8'
)

// the request handler...
export default (req, res) => {
  const context = { url: req.url }
  const renderStream = bundleRenderer.renderToStream(context)

  const htmlStream = new HTMLStream({ template, context })

  renderStream
    .on('error', err => {
        if (err && err.code === 404) {
          res.status(404).end('404 | Page Not Found')
        }
        res.status(500).end('Internal Error 500')
        console.error(`error during render : ${req.url}`)
        console.error(err)
      })
    .pipe(htmlStream)
    .pipe(res)
}
