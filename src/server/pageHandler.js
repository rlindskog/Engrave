import fs from 'fs'
import HTMLStream from 'vue-ssr-html-stream'
import path from 'path'
import rootDir from 'app-root-dir'
import { createBundleRenderer } from 'vue-server-renderer'

import ssrBundle from '../../dist/shared/ssr.bundle.json'

// get the code from the json file from vue-ssr-webpack-plugin
const ssrCode = ssrBundle.files[ssrBundle.entry]
const bundleRenderer = createBundleRenderer(ssrCode)

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
