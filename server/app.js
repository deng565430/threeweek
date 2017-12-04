import path from 'path';
import Koa2 from 'koa';
import convert from 'koa-convert';
import views from 'koa-views';
import serve from 'koa-static';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';


import CONFIG from './config/config.js';
import routers from './routers/index';


const app = new Koa2();

// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(serve(CONFIG.get('staticDir')));

// 配置服务端模版渲染引擎中间件
app.use(views(CONFIG.get('viewDir'), {
	extension: 'ejs'
}))

// 初始化路由
app.use(routers.routes()).use(routers.allowedMethods());

// 监听启动端口
app.listen(CONFIG.get('prot'), () => {
	console.log(`The server is start at prot ${CONFIG.get('prot')}`);
});

export default app;