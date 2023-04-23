import "reflect-metadata";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import router from "./routes";
import routerResponse from "./utils/routerResponse";
import { AppDataSource } from "./config/data-source";
import { logger } from './utils/logger';
import './config'
import { TOKEN_CONF } from './config/index';
import koaJWT from 'koa-jwt';

AppDataSource.initialize()
    .then(() => {
        const app = new Koa();
        
        // 注册中间件, 注意顺序
        app.use(cors());
        app.use(bodyParser());
        app.use(logger());
        app.use(routerResponse());

        // 身份认证错误中间件（token失效时触发）
        // app.use(async (ctx, next) => {
        //     return next().catch((err: any) => {
        //         if (err.status === 401) {
        //             ctx.fail(err.message, 401);
        //         } else {
        //             throw err;
        //         }
        //     });
        // });

        // 注册 koa-jwt 中间件，可以在上下文中直接获取用户信息(ctx.state.user)
        // app.use(
        //     koaJWT({ secret: TOKEN_CONF.secretKey, algorithms: ['HS256'] }).unless({
        //         path: [/^\/auth\/login/, /^\/auth\/register/],
        //     }),
        // );
            
        app.use(router.routes()).use(router.allowedMethods());
        app.listen(3000, () => {
            console.log("后端运行在: http://localhost:3000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
        