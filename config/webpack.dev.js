const path = require('path');
const webpack = require('webpack');
// 监控浏览器自动更新
const LiveReloadPlugin = require('webpack-livereload-plugin');
// 编译分离css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件
  entry: {
    index: [
      path.join(__dirname, '../src/public/scripts/index.es'),
      path.join(__dirname, '../src/public/scripts/indexadd.js')
    ],
    tag: [
      path.join(__dirname, '../src/public/scripts/tag.es')
    ]
  },
  // 输出文件
  output: {
    // 输出名称 hash:5 生成 哈希值
    filename: 'public/scripts/[name].[hash:5].js',
    // 输出的路径
    path: path.join(__dirname, '../build/')
  },
  // 依赖模块
  module: {
    rules: [
      {
        test: /\.es$/,
        exclude: /(node_modules|bower_components)/,
        loaders: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
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
    new ExtractTextPlugin('public/css/[name]-[hash:5].css'),
    // 抽取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      // 增加缓存
      names: ['vendor', 'manifest'],
      filename: 'public/scripts/common/[name].[hash:5].min.js'
    }),
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
} 