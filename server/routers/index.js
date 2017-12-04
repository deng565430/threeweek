/*
	路由
*/

const router = require('koa-router')();

const home = require('./home');

router.use('/index', home.routes(), home.allowedMethods());


module.exports = router;