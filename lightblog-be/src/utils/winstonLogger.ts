import { createLogger, format, transports } from 'winston';
import { Context, Next } from 'koa';

// 创建Winston日志记录器
const logger = createLogger({
  level: 'info',
  transports: [
    new transports.File({
      filename: 'logs/server.log',
      level: 'error', // 只在级别为error及以上时输出到文件
      format: format.combine(
        format.timestamp(),
        format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
    }),
    new transports.Console({
      level: 'info', // 只在级别为info及以上时输出到控制台
      format: format.combine(
        format.colorize(),
        format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
    })
  ],
});

// 创建中间件函数 
export function loggerMount() {
  return async (ctx: Context, next: Next) => {
    ctx.info = (...args: any[]) => {
      logger.info(`[${ctx.ip} ${ctx.url} ${ctx.method}]` + args.join(' '));
      // console.info(`[${ctx.ip} ${ctx.url} ${ctx.method}]`, ...args);
    };

    ctx.error = (...args: any[]) => {
      logger.error(`[${ctx.ip} ${ctx.url} ${ctx.method}]` + args.join(' '));
      // console.error(`[${ctx.ip} ${ctx.url} ${ctx.method}]`, error.stack || error.message || error);
    }

    await next();
  };
}
