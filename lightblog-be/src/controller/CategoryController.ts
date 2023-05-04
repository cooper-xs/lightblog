import { Context } from 'koa';
import { DataValidationError, ParamsError } from '../errors';
import ArticleService from '../service/ArticleService';
import CategoryService from '../service/CategoryService';
import { tool } from '../utils/tool';

export default class CategoryController {
  // 依赖注入
  private readonly _articleService: ArticleService;
  private readonly _categoryService: CategoryService;

  public constructor(private readonly ctx: Context) {
    this._articleService = new ArticleService(ctx);
    this._categoryService = new CategoryService(ctx);
  }

  /** 添加新分类 */
  public async addCategory() {
    let { categoryName, categoryAliasName, description, parentId } = this.ctx.request.body;

    parentId = tool.toNumber(parentId);

    if (!categoryName) {
      throw new ParamsError('分类名称不能为空');
    }

    if (!categoryAliasName) {
      throw new ParamsError('分类别名不能为空');
    }

    // 检查分类名是否已存在
    if (await this._categoryService.getCategoryByName(categoryName)) {
      throw new DataValidationError('分类名称已存在');
    }

    // 格式化别名
    categoryAliasName = tool.formatUrlPath(categoryAliasName);

    // 检查分类别名是否已存在
    if (await this._categoryService.getCategoryByAliasName(categoryAliasName)) {
      throw new DataValidationError('分类别名已存在');
    }

    // 检查父分类id是否存在
    if (parentId) {
      const parentCategory = await this._categoryService.getCategoryById(parentId);
      if (!parentCategory) {
        throw new DataValidationError('父分类不存在');
      }
    }

    const params = {
      categoryName,
      categoryAliasName,
      description,
      parentId,
    };

    const category = await this._categoryService.addCategory(params);

    return category;
  }

  /** 修改分类 */
  public async updateCategory() {
    let { categoryId, categoryName, categoryAliasName, description, parentId } = this.ctx.request.body;

    categoryId = tool.toNumber(categoryId);

    parentId = tool.toNumber(parentId);

    if (!categoryName) {
      throw new ParamsError('分类名称不能为空');
    }

    if (!categoryAliasName) {
      throw new ParamsError('分类别名不能为空');
    }

    // 查找原先数据
    const category = await this._categoryService.getCategoryById(categoryId);

    if (!category) {
      throw new DataValidationError('分类不存在');
    }

    // 检查分类名是否已存在
    const category1 = await this._categoryService.getCategoryByName(categoryName);
    if (category1 && category1.categoryId !== categoryId) {
      throw new DataValidationError('分类名称已存在');
    }

    // 格式化别名
    categoryAliasName = tool.formatUrlPath(categoryAliasName);

    // 检查分类别名是否已存在
    const category2 = await this._categoryService.getCategoryByAliasName(categoryAliasName);
    if (category2 && category2.categoryId !== categoryId) {
      throw new DataValidationError('分类别名已存在');
    }

    // 检查父分类id是否存在
    if (parentId) {
      const parentCategory = await this._categoryService.getCategoryById(parentId);
      if (!parentCategory) {
        throw new DataValidationError('父分类不存在');
      }
    }

    // 检查父分类不能是自己
    if (categoryId === parentId) {
      throw new DataValidationError('父分类不能是自己');
    }

    const params = {
      categoryId,
      categoryName,
      categoryAliasName,
      description,
      parentId,
    };

    const newCategory = await this._categoryService.updateCategory(params);

    return newCategory;
  }

  /** 删除分类 */
  public async deleteCategory() {
    let { categoryId } = this.ctx.query;

    categoryId = tool.toNumber(categoryId);

    // 查找原先数据
    const category = await this._categoryService.getCategoryById(categoryId);

    if (!category) {
      throw new DataValidationError('分类不存在');
    }

    // 检查是否有子分类
    const childCategoryList = await this._categoryService.getCategoryByParentId(categoryId);
    if (childCategoryList.children.length > 0) {
      throw new DataValidationError('请先删除该分类下的子分类');
    }

    // 检查是否有文章
    const articleList = await this._articleService.getArticleByCategoryId(categoryId);

    if (articleList.length > 0) {
      throw new DataValidationError('请先删除该分类下的文章');
    }

    const res = await this._categoryService.deleteCategory(categoryId);

    return res;
  }

  /** 查询分类的列表, 如果有父标签则返回其子标签 */
  public async getCategoryList() {
    let { parentId, categoryAliasName } = this.ctx.query;

    parentId = tool.toNumber(parentId);

    // 如果不存在id但存在别名, 则根据别名先查询id
    if (!parentId && categoryAliasName) {
      const category = await this._categoryService.getCategoryByAliasName(categoryAliasName);
      if (category) {
        parentId = category.categoryId;
      }
    }

    let categoryList = null;

    if (!parentId) {
      // 查询所有分类
      categoryList = await this._categoryService.getAllCategory();
    } else {
      // 查询指定分类, 以及它的子分类
      categoryList = await this._categoryService.getCategoryByParentId(parentId);
      categoryList.parent = await this._categoryService.getCategoryById(parentId);
    }

    return categoryList;
  }
}
