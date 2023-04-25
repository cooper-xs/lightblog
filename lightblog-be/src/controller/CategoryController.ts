import { Context } from 'koa';
import ArticleService from '../service/ArticleService';
import CategoryService from '../service/CategoryService';
import { tool } from '../utils/tool';

export default class CategoryController {
    /** 添加新分类
     */
    public static async addCategory(ctx: Context) {
        try {
            let {
                categoryName,
                categoryAliasName,
                description,
                parentId,
            } = ctx.request.body;

            if (!categoryName) {
                ctx.fail('分类名称不能为空');
                return;
            }

            if (!categoryAliasName) {
                ctx.fail('分类别名不能为空');
                return;
            }

            // 检查分类名是否已存在
            if (await CategoryService.getCategoryByName({categoryName})) {
                ctx.fail('分类名称已存在');
                return;
            }

            // 格式化别名
            categoryAliasName = tool.formatUrlPath(categoryAliasName);

            // 检查分类别名是否已存在
            if (await CategoryService.getCategoryByAliasName({categoryAliasName})) {
                ctx.fail('分类别名已存在');
                return;
            }

            // 检查父分类id是否存在
            if (parentId) {
                const parentCategory = await CategoryService.getCategoryById(parentId);
                if (!parentCategory) {
                    ctx.fail('父分类不存在');
                    return;
                }
            }

            const params = {
                categoryName,
                categoryAliasName,
                description,
                parentId,
            };

            CategoryService.addCategory(params);

            ctx.success('添加新分类成功');
        } catch (err) {
            console.log(err);
            ctx.fail('添加新分类失败');
        }
    }

    /** 修改分类
     */
    public static async updateCategory(ctx: Context) {
        try {
            let {
                categoryId,
                categoryName,
                categoryAliasName,
                description,
                parentId,
            } = ctx.request.body;

            // 查找原先数据
            const category = await CategoryService.getCategoryById(categoryId);

            if (!category) {
                ctx.fail('分类不存在');
                return;
            }

            if (!categoryName) {
                ctx.fail('分类名称不能为空');
                return;
            }

            if (!categoryAliasName) {
                ctx.fail('分类别名不能为空');
                return;
            }

            // 检查分类名是否已存在
            const category1 = await CategoryService.getCategoryByName({categoryName});
            if (category1 && category1.categoryId !== categoryId) {
                ctx.fail('分类名称已存在');
                return;
            }

            // 格式化别名
            categoryAliasName = tool.formatUrlPath(categoryAliasName);

            // 检查分类别名是否已存在
            const category2 = await CategoryService.getCategoryByAliasName({categoryAliasName});
            if (category2 && category2.categoryId !== categoryId) {
                ctx.fail('分类别名已存在');
                return;
            }

            // 检查父分类id是否存在
            if (parentId) {
                const parentCategory = await CategoryService.getCategoryById(parentId);
                if (!parentCategory) {
                    ctx.fail('父分类不存在');
                    return;
                }
            }

            // 检查父分类不能是自己
            if (categoryId === parentId) {
                ctx.fail('父分类不能是自己');
                return;
            }

            const params = {
                categoryId,
                categoryName,
                categoryAliasName,
                description,
                parentId,
            };

            CategoryService.updateCategory(params);

            ctx.success('修改分类成功');
        } catch (err) {
            console.log(err);
            ctx.fail('修改分类失败');
        }
    }

    /** 删除分类
     */
    public static async deleteCategory(ctx: Context) {
        try {
            const { categoryId } = ctx.params;

            // 查找原先数据
            const category = await CategoryService.getCategoryById(categoryId);

            if (!category) {
                ctx.fail('分类不存在');
                return;
            }

            // 检查是否有子分类
            const childCategoryList = await CategoryService.getCategoryByParentId(categoryId);
            if (childCategoryList.children.length > 0) {
                ctx.fail('请先删除子分类');
                return;
            }

            // 检查是否有文章
            const articleList = await ArticleService.getArticleByCategoryId(categoryId);

            if (articleList.length > 0) {
                ctx.fail('请先删除该分类下的文章');
                return;
            }

            CategoryService.deleteCategory(categoryId);

            ctx.success('删除分类成功');

        } catch (err) {
            console.log(err);
            ctx.fail('删除分类失败');
        }
    }

    /** 根据父标签id查询分类的列表
     */
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