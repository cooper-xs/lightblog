import { Context } from 'koa';
 
export function logger() {
    return async (ctx: Context, next: () => Promise<void>) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(`method=${ctx.method} url=${ctx.url} status=${ctx.status}  t=${ms}ms`);
    };
}
