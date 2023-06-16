import { createLogger, format, transports } from 'winston';
import { Context, Next } from 'koa';
// const { getClientIP } = require('../utils/ip')
import getClientIP from './ip';
import "winston-daily-rotate-file";
// import { DATASOURCE } from '../config';

// 创建Winston日志记录器
const logger = createLogger({
  level: 'info',
  transports: [
    new transports.DailyRotateFile({
      level: 'warn', // 只在级别为warn及以上时输出到文件
      filename: 'public/logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`),
      ),
    }),
    new transports.Console({
      level: 'info', // 只在级别为info及以上时输出到控制台
      format: format.combine(
        format.colorize({ all: true }),
        format.align(),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`),
      ),
    })
  ],
});

// 创建中间件函数 
export function loggerMount() {
  return async (ctx: Context, next: Next) => {
    const ip = getClientIP(ctx.req);
    ctx.info = (...args: any[]) => {
      logger.info(`[${ip} ${ctx.method}  ${ctx.url}]` + args.join(' '));
      // logger.info(DATASOURCE);
      // logger.info(process.env);
    };

    ctx.error = (...args: any[]) => {
      logger.error(`[${ip} ${ctx.method}  ${ctx.url}]` + args.join(' '));
    }

    ctx.warn = (...args: any[]) => {
      logger.warn(`[${ip} ${ctx.method} ${ctx.url}]` + args.join(' '));
    }

    await next();
  };
}
