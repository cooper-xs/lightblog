import 'reflect-metadata';
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import setupRouter from './routes';
import routerResponse from './utils/routerResponse';
// 允许静态资源
import static_serve from 'koa-static';
import { AppDataSource } from './config/data-source';
import { loggerMount } from './utils/winstonLogger';
import errorHandler from './utils/errorHandler';

async function start() {
  const app = new Koa();

  // 注册中间件, 注意顺序
  app.use(cors({ origin: 'http://localhost:8080' }));
  app.use(static_serve(__dirname + '/assets'));
  app.use(bodyParser());
  app.use(loggerMount());
  app.use(routerResponse);
  app.use(errorHandler);

  const router = new Router();
  setupRouter(router);
  app.use(router.routes()).use(router.allowedMethods());

  app.listen(3000, () => {
    console.log('后端运行在: http://localhost:3000');
  });
}

// 引导程序bootstrap
async function bootstrap() {
  try {
    await AppDataSource.initialize();
    await start();
  } catch (error) {}
}

bootstrap();
