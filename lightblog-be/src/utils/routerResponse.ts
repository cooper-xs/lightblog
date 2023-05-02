import { Context, Next } from 'koa';

/** 统一返回格式的中间件 */
export default async function routerResponse(ctx: Context, next: Next) {
  const res = await next();

  ctx.body = res;

  // console.dir(ctx.body, { depth: null }); // 以递归的形式打印对象
  ctx.info(`请求结果: ${JSON.stringify(ctx.body)}`);

  // 如果没有返回数据，并且状态码为 200 则设置状态码为 204
  if (!ctx.body && ctx.status === 200) {
    ctx.status = 204;
  }
  const data = ctx.body;
  // 如果返回的数据为对象类型，则按照统一格式进行处理
  ctx.body = {
    code: 20000,
    data: data,
  };
  // 在执行完之后，手动抛出异常，让 errorHandler 中间件统一处理错误信息
  if (ctx.status >= 400) {
    throw new Error(`请求失败，状态码为 ${ctx.status}`);
  }
}
