import { Context } from 'koa';
import ArticleService from '../service/ArticleService';
import ArticleTagReferencedService from '../service/ArticleTagReferencedService';
import TagService from '../service/TagService';
import { tool } from '../utils/tool';

export default class ArticleTagReferencedController {
    /** 添加文章-标签关联 */
    public static async addArticleTagReferenced(ctx: Context) {
        try {
            let { articleId, tagId } = ctx.request.body;

            articleId = tool.toNumber(articleId);
            tagId = tool.toNumber(tagId);

            // 检查文章是否存在
            const article = await ArticleService.getArticleById(articleId);
            if (!article) {
                ctx.fail('文章不存在');
                return;
            }

            // 检查标签是否存在
            const tag = await TagService.getTagById(tagId);
            if (!tag) {
                ctx.fail('标签不存在');
                return;
            }

            const params = {
                articleId,
                tagId,
            };

            // 检查文章-标签关联是否已存在
            const atr = await ArticleTagReferencedService.getArticleTagReferenced(params);
            if (atr) {
                ctx.fail('文章-标签关联已存在');
                return;
            }

            const articleTagReferenced = await ArticleTagReferencedService.addArticleTagReferenced(params);

            ctx.success('添加文章-标签关联成功', articleTagReferenced);
        } catch (err) {
            console.log(err);
            ctx.fail('添加文章-标签关联失败');
        }
    }

    /** 删除文章-标签关联 */
    public static async deleteArticleTagReferenced(ctx: Context) {
        try {
            let { articleId, tagId } = ctx.request.body;

            articleId = tool.toNumber(articleId);
            tagId = tool.toNumber(tagId);

            // 检查文章是否存在
            const article = await ArticleService.getArticleById(articleId);
            if (!article) {
                ctx.fail('文章不存在');
                return;
            }

            // 检查标签是否存在
            const tag = await TagService.getTagById(tagId);
            if (!tag) {
                ctx.fail('标签不存在');
                return;
            }

            const params = {
                articleId,
                tagId,
            };

            // 检查文章-标签关联是否已存在
            const atr = await ArticleTagReferencedService.getArticleTagReferenced(params);
            if (!atr) {
                ctx.success('文章-标签关联已经删除或不存在')
                return;
            }

            const articleTagReferenced = await ArticleTagReferencedService.deleteArticleTagReferencedById(atr.atrId);

            ctx.success('删除文章-标签关联成功', articleTagReferenced);
        } catch (err) {
            console.log(err);
            ctx.fail('删除文章-标签关联失败');
        }
    }
}