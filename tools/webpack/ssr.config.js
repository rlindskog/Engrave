const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const NodeExternals = require('webpack-node-externals')
const path = require('path')
const rootDir = require('app-root-dir')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const webpack = require('webpack')
const { isDev } = require('../../config')

const ssrConfig = {
  target: 'node',
  entry: {
    ssr: path.resolve(rootDir.get(), 'src', 'shared', 'index')
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(rootDir.get(), 'dist', 'shared'),
    filename: '[name].bundle.js'
  },
  externals: [NodeExternals()],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test:/\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueSSRPlugin({
      filename: 'ssr.bundle.json',
      entry: 'ssr'
    })
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}

if (isDev) {
  ssrConfig.plugins.unshift(
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin()
  )
}


module.exports = ssrConfig
