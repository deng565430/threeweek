// 开发版本
const Devwebpack = require('./config/webpack.dev');
// 上线版本
const Prodwebpack = require('./config/webpack.prod');

switch (process.env.NODE_ENV) {
  case 'dev':
    module.exports = Devwebpack;
    break;
  case 'prod':
    module.exports = Prodwebpack;
    break;
  default:
    module.exports = Devwebpack;
    break;
};
