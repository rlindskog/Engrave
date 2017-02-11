import path from 'path'
import rootDir from 'app-root-dir'
import serialize from 'serialize-javascript'
import fs from 'fs'
import { createBundleRenderer } from 'vue-server-renderer'
import ssrBundle from '../../dist/shared/ssr.bundle.json'

// get the code from the json file from vue-ssr-webpack-plugin
const ssrCode = ssrBundle.files[ssrBundle.entry]
const bundleRenderer = createBundleRenderer(ssrCode)

// old way
// const bundleRenderer = createBundleRenderer(ssrBundle.files['ssr.bundle.js'])

// indexTemplate
const index = fs.readFileSync(
  path.resolve(rootDir.get(), 'dist', 'client', 'index.template.html'), 'UTF-8'
)

// split the index file into pieces so we can stream it.
function parseIndex(template) {
  const contentMarker = '<!-- APP -->'
  const i = template.indexOf(contentMarker)
  return {
    head: template.slice(0, i),
    tail: template.slice(i + contentMarker.length)
  }
}

const indexHTML = parseIndex(index)

// the request handler...
export default (req, res) => {
  let s = Date.now()
  const context = { url: req.url }
  const renderStream = bundleRenderer.renderToStream(context)

  // stream the html...
  // write the head on the first chunk
  renderStream.once('data', chunk => {
    res.write(indexHTML.head)
  })

  // now the write the ssr.config.js shit (where the <!-- APP -->  marker was)
  renderStream.on('data', chunk => {
    res.write(chunk)
  })

  renderStream.on('end', () => {
    if (context.initialState) {
      res.write(`
        <script>
          window.__INITIAL_STATE__ = ${
            serialize(context.initialState, { isJSON: true })
          }
        </script>
      `)
      res.end(indexHTML.tail)
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })

  // handle errors...
  renderStream.on('error', err => {
    if (err && err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    }
    res.status(500).end('Internal Error 500')
    console.error(`error during render : ${req.url}`)
    console.error(err)
  })
}

// If you want, we can handle templating here...
// function renderPage(initialStatehtml, clientCode) {
//   return `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="utf-8">
//         <title>Engrave</title>
//         <meta name="mobile-web-app-capable" content="yes"/>
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"/>
//       </head>
//       <body>
//         <!-- APP -->
//       </body>
//      </html>
//
//   `
// }
