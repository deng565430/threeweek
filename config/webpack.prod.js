const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
// 编译css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('./config');

const Prodwebpack = Object.assign({}, config, {
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
    // 压缩js  也可以使用 uglifyjs-webpack-glugin
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    // 分离css之后的路径
    new ExtractTextPlugin('public/css/[name]-[hash:5].css'),
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
})
module.exports = Prodwebpack