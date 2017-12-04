const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
// 编译css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        NODE_ENV: '"prod"'
      }
    }),
    // 监听文件变化
    new LiveReloadPlugin({
      appendScriptTag: true
    }),
    // 分离css输出路径
    new ExtractTextPlugin('css/[name].[hash:5].css'),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    // css 压缩
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    // 代码分离 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
      filename: 'public/common/[name]-[hash:5].js'
    })
  ]
} 