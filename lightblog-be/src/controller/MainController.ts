import { Context } from 'koa';
import ArticleService from '../service/ArticleService';
import CategoryService from '../service/CategoryService';
import TagService from '../service/TagService';
import { QueryAsPageByCategoryAndTags } from '../types/article';

export default class MainController {
    public static async getArticleList(ctx: Context) {
        try {
            // 1. 检查参数
            let { page, limit, categoryId, tagIds } = ctx.query;
            
            page = page ? Number(page) : 1;

            limit = limit ? Number(limit) : 7;
            
            // 将分类id查询为包括他的子分类id的数组(如有)
            categoryId = categoryId ? Number(categoryId) : undefined;
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
            ctx.success(res);
        } catch (err) {
            console.log(err);
            ctx.fail('获取文章列表失败');
        }
    }

    public static async getArticleByIdForShow(ctx: Context) {
        try {
            let { articleId } = ctx.params;
            
            articleId = articleId ? Number(articleId) : undefined;
            
            if (!articleId) {
                ctx.fail('文章 id 不能为空');
                return;
            }

            const article = await ArticleService.getArticleById({ articleId });

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
            
            ctx.success(article);
        } catch (err) {
            console.log(err);
            ctx.fail('获取文章失败');
        }
    }

    public static async getCategoryListFromParent(ctx: Context) {
        try {
            let { parentId } = ctx.params;

            console.log('parentId', parentId);

            parentId = parentId ? Number(parentId) : undefined;

            if (!parentId) {
                // 查询所有分类
                const categoryList = await CategoryService.getAllCategory();
                ctx.success(categoryList);
            } else {
                // 查询指定分类, 以及它的子分类
                const categoryList = await CategoryService.getCategoryByParentId(parentId);
                categoryList.parent = await CategoryService.getCategoryById(parentId);
                ctx.success(categoryList);
            }
        } catch (err) {
            console.log(err);
            ctx.fail('获取分类列表失败');
        }
    }
}