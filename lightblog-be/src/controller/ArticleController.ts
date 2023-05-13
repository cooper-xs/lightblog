import { Context } from 'koa';
import ArticleService from '../service/ArticleService';
import ArticleTagReferencedService from '../service/ArticleTagReferencedService';
import CategoryService from '../service/CategoryService';
import TagService from '../service/TagService';
import {
  ArticleDetailView,
  newArticle,
  QueryAsPageByCategoryAndTags,
  QueryAsPageByKeyword,
  updateArticle,
} from '../types/article';
import { tool } from '../utils/tool';
import MarkdownIt from 'markdown-it';
import { DataNotFoundError, DataValidationError, ParamsError } from '../errors';
import DiscussService from '../service/DiscussService';
import { Article } from '../entities/Article';
import { ViewCategory } from '../types/category';

const md = new MarkdownIt();

export default class ArticleController {
  // 依赖注入
  private readonly _articleService: ArticleService;
  private readonly _categoryService: CategoryService;
  private readonly _tagService: TagService;
  private readonly _articleTagReferencedService: ArticleTagReferencedService;
  private readonly _discussService: DiscussService;
  public constructor(private readonly ctx: Context) {
    this._articleService = new ArticleService(ctx);
    this._categoryService = new CategoryService(ctx);
    this._tagService = new TagService(ctx);
    this._articleTagReferencedService = new ArticleTagReferencedService(ctx);
    this._discussService = new DiscussService(ctx);
  }

  /** 添加新文章
   * 添加新文章, 需要指定文章标题和别名
   * 文章别名不能重复
   * 文章别名会作为文章的访问路径
   * 文章别名只能包含字母, 数字, 下划线, 中划线
   */
  public async addArticle() {
    let { title, postAliasName } = this.ctx.request.body;

    if (!title) {
      throw new ParamsError('文章标题不能为空');
    }
    if (!postAliasName) {
      throw new ParamsError('文章别名不能为空');
    }

    // 检查文章名是否已存在
    const existingTitle = await this._articleService.getArticleByTitle(title);
    if (existingTitle) {
      throw new DataValidationError('文章标题已存在');
    }

    // 格式化别名
    postAliasName = tool.formatUrlPath(postAliasName);

    // 检查别名是否已存在
    const existingAliasName = await this._articleService.getArticleByAliasName(postAliasName);
    if (existingAliasName) {
      throw new DataValidationError('文章别名已存在');
    }

    const params: newArticle = {
      title,
      postAliasName,
    };

    const article = await this._articleService.addArticle(params);

    return article;
  }

  /** post 更新文章內容 */
  public async updateArticle() {
    let { articleId, title, postAliasName, topFlag, articleSummary, previewImageUrl, categoryId, contentMd } =
      this.ctx.request.body;

    articleId = tool.toNumber(articleId);

    if (!articleId) {
      throw new ParamsError('文章ID不能为空');
    }

    if (!title) {
      throw new ParamsError('文章标题不能为空');
    }

    if (!postAliasName) {
      throw new ParamsError('文章别名不能为空');
    }

    // 检查文章是否存在
    const article = await this._articleService.getArticleById(articleId);
    if (!article) {
      throw new DataNotFoundError('文章不存在');
    }

    // 检查文章名是否已存在
    const existingTitle = await this._articleService.getArticleByTitle(title);
    if (existingTitle && existingTitle.articleId !== articleId) {
      throw new DataValidationError('文章标题已存在');
    }

    // 格式化别名
    postAliasName = tool.formatUrlPath(postAliasName);

    // 检查别名是否已存在
    const existingAliasName = await this._articleService.getArticleByAliasName(postAliasName);
    if (existingAliasName && existingAliasName.articleId !== articleId) {
      throw new DataValidationError('文章别名已存在');
    }

    // 检查分类是否存在
    if (categoryId) {
      const category = await this._categoryService;
      if (!category) {
        throw new DataNotFoundError('分类不存在');
      }
    }

    // 通过markdown-it将md转为html
    const contentHtml: string = md.render(contentMd);

    const params: updateArticle = {
      articleId,
      title,
      postAliasName,
      topFlag,
      articleSummary,
      previewImageUrl,
      categoryId,
      contentMd,
      contentHtml,
    };

    const res = await this._articleService.updateArticle(params);

    return res;
  }

  /** delete删除文章 */
  public async deleteArticleById() {
    let { articleId } = this.ctx.query;

    articleId = tool.toNumber(articleId);

    // 检查文章是否存在
    const article = await this._articleService.getArticleById(articleId);
    if (!article) {
      throw new DataNotFoundError('文章不存在');
    }

    // 检查文章是否有标签约束
    const atr = await this._articleTagReferencedService.getArticleTagReferencedByArticleId(articleId);
    if (atr) {
      // 删除约束
      atr.map(async (item) => {
        await this._articleTagReferencedService.deleteArticleTagReferencedById(item.atrId);
      });
    }

    // 检查是否有评论
    const discuss = await this._discussService.getDiscussByArticleId(articleId);

    if (discuss) {
      // 删除评论
      discuss.map(async (item) => {
        await this._discussService.deleteDiscussById(item.discussId);
      });
    }

    // 删除文章
    const res = await this._articleService.deleteArticle(articleId);

    return res;
  }

  /** 分页查询文章列表
   * 查询文章列表, 可以指定分类和标签, 并指定分页条件
   * default: page=1, limit=7, 即查询第一页, 每页7条
   * 当查询分类为父级分类时, 会查询该父级分类下的所有子分类
   * 查询的标签tag可以设置多个, 用逗号分隔, 如: tagIds=1,2,3
   */
  public async getArticleListByCategoriesAndTagsAsPage() {
    // 检查参数
    let { page, limit, categoryId, tagIds } = this.ctx.query;

    page = tool.toNumber(page, 1);

    limit = tool.toNumber(limit, 7);

    // 将分类id查询为包括他的子分类id的数组(如有)
    categoryId = tool.toNumber(categoryId);
    let categoryIds = null;
    if (categoryId) {
      // 获取分类, 检查是不是父级分类
      const category = await this._categoryService.getCategoryById(categoryId);
      if (!category) {
        // 如果分类不存在, 查询所有分类
        categoryIds = undefined;
      } else if (category.parentId === null) {
        // 是父级分类
        const categorys = await this._categoryService.getCategoryByParentId(categoryId);
        categoryIds = categorys.children.map((item) => item.categoryId);
        categoryIds.push(categoryId); // 加上父分类本身
      } else {
        // 不是父级分类, 直接使用
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
    const res = await this._articleService.getArticleOrderByTopAndTime(params);

    if (!res) {
      return null;
    }

    // 获取文章标签信息
    for (const article of res.list) {
      if (article.category.categoryId !== null) {
        // 如果该文章没有分类信息，则跳过
        const category = await this._categoryService.getCategoryById(article.category.categoryId);
        article.category = {
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          categoryAliasName: category.categoryAliasName,
        };
      }
    }
    // 获取文章标签信息
    for (const article of res.list) {
      const tags = await this._tagService.getTagByArticleId(article.articleId);
      article.tags = tags.map((tag) => ({
        tagId: tag.tagId,
        tagName: tag.tagName,
        tagAliasName: tag.tagAliasName,
      }));
    }

    return res;
  }

  /** 关键字搜索文章 */
  public async searchArticle() {
    let { page, limit, keywords } = this.ctx.query;

    page = tool.toNumber(page, 1);

    limit = tool.toNumber(limit, 7);

    // keywords = tool.formatUrlPath(keywords);

    keywords = keywords ? keywords.split(',').map(String).filter(Boolean) : undefined;

    this.ctx.info('keywords', keywords);

    if (!keywords) {
      throw new ParamsError('搜索文章缺少参数keywords');
    }

    const params: QueryAsPageByKeyword = {
      page,
      limit,
      keywords,
    };

    const res = await this._articleService.getArticleByKeyword(params);

    if (!res) {
      return null;
    }

    // 获取文章标签信息
    for (const article of res.list) {
      if (article.category.categoryId !== null) {
        // 如果该文章没有分类信息，则跳过
        const category = await this._categoryService.getCategoryById(article.category.categoryId);
        article.category = {
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          categoryAliasName: category.categoryAliasName,
        };
      }
    }
    // 获取文章标签信息
    for (const article of res.list) {
      const tags = await this._tagService.getTagByArticleId(article.articleId);
      article.tags = tags.map((tag) => ({
        tagId: tag.tagId,
        tagName: tag.tagName,
        tagAliasName: tag.tagAliasName,
      }));
    }

    return res;
  }

  /** 查询文章详细内容
   * 如有id, 则通过id查询
   * 没有id有aliasName, 则通过aliasName查询
   * 如果两个都没有, 则返回错误
   */
  public async getArticleForShow() {
    let { articleId, postAliasName } = this.ctx.query;

    articleId = tool.toNumber(articleId);

    // 检查参数
    if (!articleId && !postAliasName) {
      throw new ParamsError('查询文章缺少参数articleId或postAliasName');
    }

    // 获取文章
    let article: ArticleDetailView = null;
    if (articleId) {
      article = await this._articleService.getArticleByIdForDetail(articleId);
    } else {
      article = await this._articleService.getArticleByAliasNameForDetail(postAliasName);
    }

    if (!article) {
      throw new DataNotFoundError('文章不存在');
    }

    // 文章浏览量+1
    article.readCount += 1;
    this._articleService.updateArticleViewCount(article.articleId);

    // 获取文章分类信息
    if (article.category.categoryId !== null) {
      // 如果该文章没有分类信息，则跳过
      const category = await this._categoryService.getCategoryById(article.category.categoryId);
      article.category = {
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        categoryAliasName: category.categoryAliasName,
      };
    }

    // 获取文章标签信息
    const tags = await this._tagService.getTagByArticleId(article.articleId);
    article.tags = tags.map((tag) => ({
      tagId: tag.tagId,
      tagName: tag.tagName,
      tagAliasName: tag.tagAliasName,
    }));

    return article;
  }

  /** 获取文章详细内容, 获取更新文章需要的内容 */
  public async getArticleDetailForEdit() {
    let { articleId } = this.ctx.query;

    articleId = tool.toNumber(articleId);

    // 检查参数
    if (!articleId) {
      throw new ParamsError('查询文章缺少参数');
    }

    // 获取文章
    let article: Article = null;
    article = await this._articleService.getArticleById(articleId);

    if (!article) {
      throw new DataNotFoundError('文章不存在');
    }

    return article;
  }
}
