import { Context } from 'koa';
import ArticleService from '../service/ArticleService';
import CategoryService from '../service/CategoryService';
import TagService from '../service/TagService';
import { ArticleItemView } from '../types';

export default class ArticleController {
    public static async getById(ctx: Context) {
        try {
            const { id } = ctx.params;
            const result = await ArticleService.getArticleById(id);
            ctx.success(result);
        } catch (err) {
            console.log(err);
            ctx.fail('获取文章失败');
        }
    }

    public static async getList(ctx: Context) {
        try {
            // 1. 检查参数
            let { page, limit, categoryId, tagIds } = ctx.query;
            
            // 将 page、limit 和 categoryId 转换为数字类型
            page = Number(page);
            limit = Number(limit);
            categoryId = Number(categoryId);
    
            // 将 tagIds 参数从逗号分隔的字符串转换为数字数组
            tagIds = tagIds ? tagIds.split(',').map(Number).filter(Boolean) : undefined;
    
            // console.log('controller 层 参数检查:');
            // console.log('page', page, typeof page);
            // console.log('limit', limit, typeof limit);
            // console.log('categoryId', categoryId, typeof categoryId);
            // console.log('tagIds', tagIds, Array.isArray(tagIds) ? 'array' : typeof tagIds);
            
            // 2. 调用 service 层, 获取文章列表
            const res = await ArticleService.getArticleOrderByTopAndTime({ page, limit, categoryId, tagIds });
            
            // 3. 调用 service 层, 获取文章标签信息
            for (const article of res.list) {
                if (article.category.categoryId !== null) { // 如果该文章没有分类信息，则跳过
                    const category = await CategoryService.getCategoryById(article.category.categoryId);
                    article.category = {
                        categoryId: category.categoryId,
                        categoryName: category.categoryName,
                        categoryAliasName: category.categoryAliasName,
                    };
                }
            }
            // 4. 调用 service 层, 获取文章标签信息
            for (const article of res.list) {
                const tags = await TagService.getTagByArticleId(article.articleId);
                article.tags = tags.map(tag => ({
                    tagId: tag.tagId,
                    tagName: tag.tagName,
                    tagAliasName: tag.tagAliasName,
                }));
            }
            // 5. 将文章列表返回给前端
            ctx.success(res);
        } catch (err) {
            console.log(err);
            ctx.fail('获取文章列表失败');
        }
    }
}