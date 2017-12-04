/*
	子路由
*/
import Router from 'koa-router';
const router = Router();
import index from '../controllers/index';

export default router
  .get('/',index.index())
  .get('/update',index.update())