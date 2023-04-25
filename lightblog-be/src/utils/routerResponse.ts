import { Context } from 'koa';

export default function routerResponse(option = {} as any) {
    return async function (ctx, next) {
        ctx.success = function (msg: 'success', data) {
            console.log('msg: ', msg);
            if(data) {
                console.dir(data, { depth: null });
            }

            ctx.type = option.type || 'json';
            ctx.body = {
                code: option.successCode || 20000,
                msg: option.successMsg || 'success',
                data: data,
            };
        };

        ctx.fail = function (msg = 'fail', code = 10010) {
            console.log('msg: ', msg);

            ctx.type = option.type || 'json';
            ctx.body = {
                code: option.failCode || code,
                msg: option.successMsg || msg,
            };
        };

        await next();
    };
}
