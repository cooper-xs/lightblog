import { Context } from 'koa';
import ArticleService from '../service/ArticleService';
import ArticleTagReferencedService from '../service/ArticleTagReferencedService';
import CategoryService from '../service/CategoryService';
import TagService from '../service/TagService';
import { newArticle, QueryAsPageByCategoryAndTags, QueryAsPageByKeyword } from '../types/article';
import { tool } from '../utils/tool';

export default class ArticleController {
    /** 添加新文章
     * 添加新文章, 需要指定文章标题和别名
     * 文章别名不能重复
     * 文章别名会作为文章的访问路径
     * 文章别名只能包含字母, 数字, 下划线, 中划线
     */
    public static async addArticle(ctx: Context) {
        try {
            let {
                title,
                postAliasName,
            } = ctx.request.body;

            if (!title) {
                ctx.fail('文章标题不能为空');
                return;
            }
            if (!postAliasName) {
                ctx.fail('文章别名不能为空');
                return;
            }
            
            // 检查文章名是否已存在
            if (await ArticleService.getArticleByTitle(title)) {
                ctx.fail('文章标题已存在');
                return;
            }

            // 格式化别名
            postAliasName = tool.formatUrlPath(postAliasName);

            // 检查别名是否已存在
            if (await ArticleService.getArticleByAliasName(postAliasName)) {
                ctx.fail('文章别名已存在');
                return;
            }

            const params: newArticle = {
                title,
                postAliasName,
            };

            const article = ArticleService.addArticle(params);

            ctx.success('添加新文章成功', article);
        } catch (err) {
            console.log(err);
            ctx.fail('添加新文章失败');
        }
    }
    
    public static async updateArticle(ctx: Context) {
        try {
            // todo 更新文章内容
        } catch (err) {
            console.log(err);
            ctx.fail('更新文章失败');
        }
    }

    /** 删除文章 */
    public static async deleteArticle(ctx: Context) {
        try {
            let { articleId } = ctx.params;

            articleId = tool.toNumber(articleId);

            // 检查文章是否存在
            const article = await ArticleService.getArticleById(articleId);
            if (!article) {
                ctx.success('文章已经删除或不存在');
                return;
            }

            // 检查文章是否有标签约束
            const atr = await ArticleTagReferencedService.getArticleTagReferencedByArticleId(articleId);
            if (atr) {
                // 删除约束
                atr.map(async (item) => {
                    await ArticleTagReferencedService.deleteArticleTagReferencedById(item.atrId);
                });
            }

            // 删除文章
            await ArticleService.deleteArticle(articleId);

            ctx.success('删除文章成功');
        } catch (err) {
            console.log(err);
            ctx.fail('删除文章失败');
        }
    }

    /** 分页查询文章列表
     * 查询文章列表, 可以指定分类和标签, 并指定分页条件
     * default: page=1, limit=7, 即查询第一页, 每页7条
     * 当查询分类为父级分类时, 会查询该父级分类下的所有子分类
     * 查询的标签tag可以设置多个, 用逗号分隔, 如: tagIds=1,2,3
     */
    public static async getArticleList(ctx: Context) {
        try {
            // 检查参数
            let { page, limit, categoryId, tagIds } = ctx.query;
            
            page = tool.toNumber(page, 1);

            limit = tool.toNumber(limit, 7);
            
            // 将分类id查询为包括他的子分类id的数组(如有)
            categoryId = tool.toNumber(categoryId);
            let categoryIds = null;
            if(categoryId) {
                // 获取分类, 检查是不是父级分类
                const category = await CategoryService.getCategoryById(categoryId); 
                if (!category) { // 如果分类不存在, 查询所有分类
                    categoryIds = undefined;
                } else if (category.parentId === null) { // 是父级分类
                    const categorys = await CategoryService.getCategoryByParentId(categoryId);
                    categoryIds = categorys.children.map((item) => item.categoryId);
                    categoryIds.push(categoryId);// 加上父分类本身
                } else { // 不是父级分类, 直接使用
                    categoryIds = [categoryId];
                }
            }
            
            tagIds = tagIds ? tagIds.split(',').map(Number).filter(Boolean) : undefined;


            // 将参数封装为QueryAsPageByCategoryAndTags类型对象
            const params: QueryAsPageByCategoryAndTags = {
                page,
                limit,
                categoryIds,
                tagIds,
            };

            // 获取文章列表
            const res = await ArticleService.getArticleOrderByTopAndTime(params);
            
            // 获取文章标签信息
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
            // 获取文章标签信息
            for (const article of res.list) {
                const tags = await TagService.getTagByArticleId(article.articleId);
                article.tags = tags.map(tag => ({
                    tagId: tag.tagId,
                    tagName: tag.tagName,
                    tagAliasName: tag.tagAliasName,
                }));
            }
            // 将文章列表返回给前端
            ctx.success('获取文章列表成功', res);
        } catch (err) {
            console.log(err);
            ctx.fail('获取文章列表失败');
        }
    }

    /** 查询文章详细内容 */
    public static async getArticleByIdForShow(ctx: Context) {
        try {
            let { articleId } = ctx.params;
            
            articleId = tool.toNumber(articleId);
            
            if (!articleId) {
                ctx.fail('文章 id 不能为空');
                return;
            }

            const article = await ArticleService.getArticleByIdForDetail(articleId);

            if (!article) {
                ctx.fail('文章不存在');
                return;
            }

            // 获取文章分类信息
            if (article.category.categoryId !== null) { // 如果该文章没有分类信息，则跳过
                const category = await CategoryService.getCategoryById(article.category.categoryId);
                article.category = {
                    categoryId: category.categoryId,
                    categoryName: category.categoryName,
                    categoryAliasName: category.categoryAliasName,
                };
            }

            // 获取文章标签信息
            const tags = await TagService.getTagByArticleId(article.articleId);
            article.tags = tags.map(tag => ({
                tagId: tag.tagId,
                tagName: tag.tagName,
                tagAliasName: tag.tagAliasName,
            }));
            
            ctx.success('获取文章成功', article);
        } catch (err) {
            console.log(err);
            ctx.fail('获取文章失败');
        }
    }

    /** 关键字搜索文章 */
    public static async searchArticle(ctx: Context) {
        try {
            let { page, limit, keywords } = ctx.query;
            
            page = tool.toNumber(page, 1);

            limit = tool.toNumber(limit, 7);

            keywords = tool.formatUrlPath(keywords);

            keywords = keywords ? keywords.split('%20').map(String).filter(Boolean) : undefined;

            if (!keywords) {
                ctx.fail('关键字不能为空');
                return;
            }

            const params: QueryAsPageByKeyword = {
                page,
                limit,
                keywords,
            };

            const res = await ArticleService.getArticleByKeyword(params);

            ctx.success('搜索文章成功', res);
        } catch (err) {
            console.log(err);
            ctx.fail('搜索文章失败');
        }
    }
}