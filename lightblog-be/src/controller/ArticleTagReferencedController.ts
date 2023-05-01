import { Context } from 'koa';
import ArticleService from '../service/ArticleService';
import ArticleTagReferencedService from '../service/ArticleTagReferencedService';
import TagService from '../service/TagService';
import { tool } from '../utils/tool';

export default class ArticleTagReferencedController {
  // 依赖注入
  private readonly _articleService: ArticleService;
  private readonly _tagService: TagService;
  private readonly _articleTagReferencedService: ArticleTagReferencedService;
  public constructor(private readonly ctx: Context) {
    this._articleService = new ArticleService(ctx);
    this._tagService = new TagService(ctx);
    this._articleTagReferencedService = new ArticleTagReferencedService(ctx);
  }

  /** 添加文章-标签关联 */
  public async addArticleTagReferenced() {
    let { articleId, tagId } = this.ctx.request.body;

    articleId = tool.toNumber(articleId);
    tagId = tool.toNumber(tagId);

    // 检查文章是否存在
    const article = await this._articleService.getArticleById(articleId);
    if (!article) {
      this.ctx.fail('文章不存在');
      return;
    }

    // 检查标签是否存在
    const tag = await this._tagService.getTagById(tagId);
    if (!tag) {
      this.ctx.fail('标签不存在');
      return;
    }

    const params = {
      articleId,
      tagId,
    };

    // 检查文章-标签关联是否已存在
    const atr = await this._articleTagReferencedService.getArticleTagReferenced(params);
    if (atr) {
      this.ctx.fail('文章-标签关联已存在');
      return;
    }

    const articleTagReferenced = await this._articleTagReferencedService.addArticleTagReferenced(params);

    return articleTagReferenced;
  }

  /** 删除文章-标签关联 */
  public async deleteArticleTagReferenced() {
    let { articleId, tagId } = this.ctx.request.body;

    articleId = tool.toNumber(articleId);
    tagId = tool.toNumber(tagId);

    // 检查文章是否存在
    const article = await this._articleService.getArticleById(articleId);
    if (!article) {
      this.ctx.fail('文章不存在');
      return;
    }

    // 检查标签是否存在
    const tag = await this._tagService.getTagById(tagId);
    if (!tag) {
      this.ctx.fail('标签不存在');
      return;
    }

    const params = {
      articleId,
      tagId,
    };

    // 检查文章-标签关联是否已存在
    const atr = await this._articleTagReferencedService.getArticleTagReferenced(params);
    if (!atr) {
      this.ctx.success('文章-标签关联已经删除或不存在');
      return;
    }

    const articleTagReferenced = await this._articleTagReferencedService.deleteArticleTagReferencedById(atr.atrId);

    return articleTagReferenced;
  }
}
