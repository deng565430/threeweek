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
        NODE_ENV: '"prod"'
      }
    }),
    // 监听文件变化
    new LiveReloadPlugin({
      appendScriptTag: true
    }),
    // 分离css输出路径
    new ExtractTextPlugin('public/css/[name]-[hash:5].css'),
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
      // 增加缓存
      names: ['vendor', 'manifest'],
      filename: 'public/scripts/common/[name].[hash:5].min.js'
    })
  ]
} 