const webpack = require('webpack');
// 编译css
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 处理html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 监控浏览器自动更新
const LiveReloadPlugin = require('webpack-livereload-plugin');

const config = require('./config');

const Devwebpack = Object.assign({}, config, {
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
    // 抽取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      // 增加缓存
      names: ['vendor', 'manifest'],
      filename: 'public/scripts/common/[name].[hash:5].min.js',
      minChunks: 2
    }),
    // 分离css之后的路径
    new ExtractTextPlugin('public/css/[name]-[hash:5].css'),
    // 生成html文件
    new HtmlWebpackPlugin({
      filename: './views/layout.html',
      template: 'src/widget/layout.html',
      // inject 有四个选项值 true, body, head, false. 默认值，script标签位于html文件的 body 底部。 false 不插入生成的 js 文件，只是单纯的生成一个 html 文件
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: './views/index.html',
      template: 'src/views/index.js',
      inject: false,
      // 指定引入哪些js
      chunks: ['vendor', 'index', 'tag']
    }),
    new HtmlWebpackPlugin({
      filename: './widget/index.html',
      template: 'src/widget/index.html',
      inject: false
    }),
  ]
}) 

module.exports = Devwebpack;