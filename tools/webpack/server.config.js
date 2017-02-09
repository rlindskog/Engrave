const path = require('path')
const rootDir = require('app-root-dir')
const NodeExternals = require('webpack-node-externals')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  target: 'node',
  entry: {
    server: [
      path.resolve(rootDir.get(), 'src', 'server', 'index')
    ]
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.resolve(rootDir.get(), 'dist', 'server'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  externals: [NodeExternals()],
  node: {
    __filename: true,
    __dirname: true
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  devtool: 'inline-source-map'
}
