import { Context } from 'koa';
import { Discuss } from '../entities/Discuss';
import { DiscussRepository } from '../config/data-source';
import { tool } from '../utils/tool';
import ArticleService from '../service/ArticleService';
import UsersService from '../service/UsersService';
import DiscussService from '../service/DiscussService';

export default class DiscussController {
    public static async addDiscuss(ctx: Context) {
        try {
            let {
                articleId,
                userId,
                content,
                parentId
            } = ctx.request.body;

            articleId = tool.toNumber(articleId);
            userId = tool.toNumber(userId);
            parentId = tool.toNumber(parentId);

            console.log(articleId, userId, content, parentId);

            if(!articleId) {
                ctx.fail('文章ID不能为空');
                return;
            }
            if(!userId) {
                ctx.fail('用户ID不能为空');
                return;
            }
            if(!content) {
                ctx.fail('评论内容不能为空');
                return;
            }
            const article = await ArticleService.getArticleById(articleId);
            if(!article) {
                ctx.fail('文章不存在');
                return;
            }
            const user = await UsersService.getUserById(userId);
            if(!user) {
                ctx.fail('用户不存在');
                return;
            }
            const parentDiscuss = await DiscussService.getDiscussById(parentId);
            if(!parentDiscuss) {
                ctx.fail('父评论不存在');
                return;
            }

            const params = {
                articleId,
                userId,
                content,
                parentId
            };

            const res = await DiscussService.addDiscuss(params);

            ctx.success('添加评论成功', res);
        } catch (err) {
            console.log(err);
            ctx.fail('添加评论失败');
        }
    }

    public static async getDiscussListByArticleId(ctx: Context) {
        try {
            let { articleId } = ctx.params;

            articleId = tool.toNumber(articleId);

            if(!articleId) {
                ctx.fail('文章ID不能为空');
                return;
            }

            const article = await ArticleService.getArticleById(articleId);
            if(!article) {
                ctx.fail('文章不存在');
                return;
            }

            const res = await DiscussService.getDiscussByArticleId(articleId);

            ctx.success('获取评论列表成功', res);
        } catch (err) {
            console.log(err);
            ctx.fail('获取评论列表失败');
        }
    }
}