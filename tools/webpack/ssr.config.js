const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const NodeExternals = require('webpack-node-externals')
const path = require('path')
const rootDir = require('app-root-dir')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const webpack = require('webpack')
const config = require('../../config')
const isDev = config.isDev

const ssrConfig = {
  target: 'node',
  entry: {
    ssr: path.resolve(rootDir.get(), 'src', 'shared', 'index'),
    vendor: [
      'vue',
      'vuex',
      'vue-router',
      'vuex-router-sync'
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(rootDir.get(), 'dist', 'shared'),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CLIENT: false,
        SERVER: true
      }
    }),
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
    new FriendlyErrorsWebpackPlugin({
      messages: ['[ssr]'],
    })
  )
  // Just use the name so HMR doesn't get confused.
  ssrConfig.output.filename = '[name].bundle.js'
} else {
  // add a hash for cash busting.
  ssrConfig.output.filename = '[name].[chunkhash].bundle.js'
}



module.exports = ssrConfig
