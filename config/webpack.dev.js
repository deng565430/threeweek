const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
// 编译分离css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // 入口文件
  entry: {
    index: [
      path.join(__dirname, '../static/js/index.js')
    ]
  },
  // 输出文件
  output: {
    // 输出名称 hash:5 生成 哈希值
    filename: 'js/[name].[hash:5].js',
    // 输出的路径
    path: path.resolve(__dirname, '../dist')
  },
  // 依赖模块
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    // DefinePlugin 允许创建一个在编译时可以配置的全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"dev"'
      }
    }),
    // 监听文件变化
    new LiveReloadPlugin({
      appendScriptTag: true
    }),
    // 分离css之后的路径
    new ExtractTextPlugin('css/[name].[hash:5].css')
  ]
} 