import { ParamName } from '@koa/router';
import { Context } from 'koa';
import { DataNotFoundError, DataValidationError, ParamsError } from '../errors';
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
      throw new DataNotFoundError('文章不存在');
    }

    // 检查标签是否存在
    const tag = await this._tagService.getTagById(tagId);
    if (!tag) {
      throw new DataNotFoundError('标签不存在');
    }

    const params = {
      articleId,
      tagId,
    };

    // 检查文章-标签关联是否已存在
    const atr = await this._articleTagReferencedService.getArticleTagReferencedByTagIdAndArticleId(params);
    if (atr) {
      throw new DataValidationError('文章-标签关联已存在');
    }

    const articleTagReferenced = await this._articleTagReferencedService.addArticleTagReferenced(params);

    return articleTagReferenced;
  }

  /** 删除文章-标签关联
   * 如果有关联id, 则根据关联id删除
   * 如果没有关联id, 则根据文章id和标签id删除
   */
  public async deleteArticleTagReferenced() {
    let { atrId, articleId, tagId } = this.ctx.request.query;

    atrId = tool.toNumber(atrId);
    articleId = tool.toNumber(articleId);
    tagId = tool.toNumber(tagId);

    this.ctx.info(`删除文章-标签关联: atrId: ${atrId}, articleId: ${articleId}, tagId: ${tagId}`);

    // 检查文章-标签关联是否已存在
    let atr = await this._articleTagReferencedService.getArticleTagReferencedById(atrId);
    if (atr) {
      return await this._articleTagReferencedService.deleteArticleTagReferencedById(atrId);
    }

    if (!articleId || !tagId) {
      throw new ParamsError('文章id或标签id不能为空');
    }

    // 检查文章是否存在
    const article = await this._articleService.getArticleById(articleId);
    if (!article) {
      throw new DataNotFoundError('文章不存在');
    }

    // 检查标签是否存在
    const tag = await this._tagService.getTagById(tagId);
    if (!tag) {
      throw new DataNotFoundError('标签不存在');
    }

    const params = {
      articleId,
      tagId,
    };

    // 检查文章-标签关联是否已存在
    atr = await this._articleTagReferencedService.getArticleTagReferencedByTagIdAndArticleId(params);
    if (!atr) {
      throw new DataValidationError('文章-标签关联不存在');
    }

    const articleTagReferenced = await this._articleTagReferencedService.deleteArticleTagReferencedById(atr.atrId);

    return articleTagReferenced;
  }

  /** 更新文章的标签关联 */
  public async updateATRByArticleIdAndTagIds() {
    let { articleId, tagIds } = this.ctx.request.body;

    articleId = tool.toNumber(articleId);
    tagIds = tagIds.split(',').map((tagId: string) => tool.toNumber(tagId));
    console.log('articleId', articleId);
    console.log('tagIds', tagIds)

    // 检查文章是否存在
    const article = await this._articleService.getArticleById(articleId);
    if (!article) {
      throw new DataNotFoundError('文章不存在');
    }

    // 获取文章当前的标签关联
    const articleTagReferencedList = await this._articleTagReferencedService.getArticleTagReferencedByArticleId(
      articleId,
    );

    // 获取文章当前的标签id
    const currentTagIds = articleTagReferencedList.map((atr) => atr.tagId);

    // 获取需要删除的标签id
    const deleteTagIds = currentTagIds.filter((tagId) => !tagIds.includes(tagId));
    for (const tagId of deleteTagIds) {
      // 获取需要删除的关联id
      const atr = articleTagReferencedList.find((atr) => atr.tagId === tagId);
      if (atr) {
        await this._articleTagReferencedService.deleteArticleTagReferencedById(atr.atrId);
      }
    }

    // 获取需要添加的标签id
    const addTagIds = tagIds.filter((tagId: number) => !currentTagIds.includes(tagId));
    for (const tagId of addTagIds) {
      // 获取需要添加的关联id
      await this._articleTagReferencedService.addArticleTagReferenced({articleId, tagId});
    }

    return null;
  }
}
