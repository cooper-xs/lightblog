import { Context } from 'koa';
import ArticleService from '../service/ArticleService';
import ArticleTagReferencedService from '../service/ArticleTagReferencedService';
import TagService from '../service/TagService';
import * as tool from '../utils/tool';

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
  public async addArticleTagReferenced(ctx: Context) {
    try {
      let { articleId, tagId } = ctx.request.body;

      articleId = tool.toNumber(articleId);
      tagId = tool.toNumber(tagId);

      // 检查文章是否存在
      const article = await this._articleService.getArticleById(articleId);
      if (!article) {
        ctx.fail('文章不存在');
        return;
      }

      // 检查标签是否存在
      const tag = await this._tagService.getTagById(tagId);
      if (!tag) {
        ctx.fail('标签不存在');
        return;
      }

      const params = {
        articleId,
        tagId,
      };

      // 检查文章-标签关联是否已存在
      const atr = await this._articleTagReferencedService.getArticleTagReferenced(params);
      if (atr) {
        ctx.fail('文章-标签关联已存在');
        return;
      }

      const articleTagReferenced = await this._articleTagReferencedService.addArticleTagReferenced(params);

      ctx.success('添加文章-标签关联成功', articleTagReferenced);
    } catch (err) {
      console.log(err);
      ctx.fail('添加文章-标签关联失败');
    }
  }

  /** 删除文章-标签关联 */
  public async deleteArticleTagReferenced(ctx: Context) {
    try {
      let { articleId, tagId } = ctx.request.body;

      articleId = tool.toNumber(articleId);
      tagId = tool.toNumber(tagId);

      // 检查文章是否存在
      const article = await this._articleService.getArticleById(articleId);
      if (!article) {
        ctx.fail('文章不存在');
        return;
      }

      // 检查标签是否存在
      const tag = await this._tagService.getTagById(tagId);
      if (!tag) {
        ctx.fail('标签不存在');
        return;
      }

      const params = {
        articleId,
        tagId,
      };

      // 检查文章-标签关联是否已存在
      const atr = await this._articleTagReferencedService.getArticleTagReferenced(params);
      if (!atr) {
        ctx.success('文章-标签关联已经删除或不存在');
        return;
      }

      const articleTagReferenced = await this._articleTagReferencedService.deleteArticleTagReferencedById(atr.atrId);

      ctx.success('删除文章-标签关联成功', articleTagReferenced);
    } catch (err) {
      console.log(err);
      ctx.fail('删除文章-标签关联失败');
    }
  }
}
