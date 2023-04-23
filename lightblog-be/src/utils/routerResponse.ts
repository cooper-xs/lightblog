import { Context } from 'koa';

export default function routerResponse(option = {} as any) {
    return async function (ctx, next) {
        ctx.success = function (data) {
            // 以树状结构打印对象
            console.dir(data, { depth: null });

            ctx.type = option.type || 'json';
            ctx.body = {
                code: option.successCode || 20000,
                msg: option.successMsg || 'success',
                data: data,
            };
        };

        ctx.fail = function (msg = 'fail', code = 10010) {
            ctx.type = option.type || 'json';
            ctx.body = {
                code: option.failCode || code,
                msg: option.successMsg || msg,
            };
        };

        await next();
    };
}
