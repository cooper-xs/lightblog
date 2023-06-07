import { Context, Next } from 'koa';
import { ParamsError, DataValidationError, DataNotFoundError, NoAdminError } from '../errors';

// 导出一个错误处理中间件
export default async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    
    if (err instanceof ParamsError) {
      ctx.status = 400;
      ctx.body = { message: err.message };
    } else if (err instanceof DataNotFoundError) {
      ctx.status = 404;
      ctx.body = { message: err.message };
    } else if (err instanceof DataValidationError) {
      ctx.status = 409;
      ctx.body = { message: err.message };
    } else if (err instanceof NoAdminError) {
      ctx.status = 401;
      ctx.body = { message: err.message };
    } else {
      ctx.status = 500;
      ctx.body = { message: '服务器内部错误' };
    }
    if(ctx.status === 500) {
      ctx.error(err);
    } else {
      ctx.warn(err);
    }
  }
}
