const path = require('path')
const rootDir = require('app-root-dir')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { isDev, isProd } = require('../../config')

const clientConfig = {
  entry: {
    client: [
      path.resolve(rootDir.get(), 'src', 'client', 'index')
    ],
    vendor: [
      'vue',
      'vuex',
      'vue-router',
      'vuex-router-sync'
    ]
  },
  output: {
    path: path.resolve(rootDir.get(), 'dist', 'client'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new HtmlPlugin({
      template: path.resolve(rootDir.get(), 'src', 'client', 'index.template.html'),
      filename: 'index.template.html'
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },

}

// dev config
if (isDev) {
  // entrt
  clientConfig.entry.client.unshift('webpack-hot-middleware/client')

  // plugins
  clientConfig.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin()
  )

  // devtool
  clientConfig.devtool = 'inline-source-map'
}

module.exports = clientConfig
