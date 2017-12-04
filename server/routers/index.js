/*
	路由
*/
import Router from 'koa-router';
const router = Router();

import home from './home';

router.use('/index', home.routes(), home.allowedMethods());


export default router;