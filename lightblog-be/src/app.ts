import "reflect-metadata";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import router from "./routes";
import routerResponse from "./utils/routerResponse";
import { AppDataSource } from "./config/data-source";
import { logger } from './utils/logger';
require ('dotenv').config();

AppDataSource.initialize()
    .then(() => {
        const app = new Koa();
        
        // 注册中间件, 注意顺序
        app.use(cors());
        app.use(bodyParser());
        app.use(logger());
        app.use(routerResponse());

        app.use(router.routes()).use(router.allowedMethods());
        app.listen(3000, () => {
            console.log("后端运行在: http://localhost:3000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
        