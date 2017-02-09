const path = require('path')
const rootDir = require('app-root-dir')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    client: [
      // 'webpack-hot-middleware/client?path=/__what&timeout=2000&overlay=false',
      'webpack-hot-middleware/client',
      path.resolve(rootDir.get(), 'src', 'client', 'index')
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir.get(), 'src', 'client', 'index.template.html'),
      filename: 'index.template.html'
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  devtool: 'inline-source-map',
  // devServer: {
  //   hot: true,
  //   contentBase: path.resolve(rootDir.get(), 'src', 'client'),
  //   open: true,
  //   port: 3000,
  //   stats: 'errors-only'
  // }
}
