import 'reflect-metadata';
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import routerResponse from './utils/routerResponse';
import static_serve from 'koa-static';
import { AppDataSource } from './config/data-source';
import { loggerMount } from './utils/winstonLogger';
import errorHandler from './utils/errorHandler';
import session from 'koa-session'

async function start() {
  const app = new Koa();

  app.use(cors({ origin: 'http://localhost:8080' }));
  app.use(static_serve(__dirname + '/assets'));
  app.use(bodyParser());
  app.use(loggerMount());
  app.use(errorHandler);
  app.use(routerResponse);
  app.use(router.routes()).use(router.allowedMethods());
  app.keys = ['lightblogkey', 'adminkey', 'mykey'];
  app.use(session({
    key: 'koa:sess', // cookie key
    maxAge: 1 * 60 * 1000, // 1分钟过期
  }, app))

  app.listen(3000, () => {
    console.log('后端运行在: http://localhost:3000');
  });
}

// 引导程序bootstrap
async function bootstrap() {
  try {
    await AppDataSource.initialize();
    await start();
  } catch (error) {
    console.error('启动异常: ', error);
  }
}

bootstrap();
