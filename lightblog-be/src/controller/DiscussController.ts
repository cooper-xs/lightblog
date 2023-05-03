import { Context } from 'koa';
import { Discuss } from '../entities/Discuss';
import { DiscussRepository } from '../config/data-source';
import { tool } from '../utils/tool';
import ArticleService from '../service/ArticleService';
import UsersService from '../service/UsersService';
import DiscussService from '../service/DiscussService';
import { DataValidationError, ParamsError, DataNotFoundError } from '../errors';
import { viewDiscuss } from '../types/Discuss';

export default class DiscussController {
  // 依赖注入
  private readonly _articleService: ArticleService;
  private readonly _usersService: UsersService;
  private readonly _discussService: DiscussService;
  public constructor(private readonly ctx: Context) {
    this._articleService = new ArticleService(ctx);
    this._usersService = new UsersService(ctx);
    this._discussService = new DiscussService(ctx);
  }

  public async addDiscuss() {
    let { articleId, userId, content, parentId } = this.ctx.request.body;

    articleId = tool.toNumber(articleId);
    userId = tool.toNumber(userId);
    parentId = tool.toNumber(parentId);

    console.log(articleId, userId, content, parentId);

    if (!articleId) {
      throw new ParamsError('文章ID不能为空');
    }
    if (!userId) {
      throw new ParamsError('用户ID不能为空');
    }
    if (!content) {
      throw new ParamsError('评论内容不能为空');
    }
    const article = await this._articleService.getArticleById(articleId);
    if (!article) {
      throw new DataNotFoundError('文章不存在');
    }
    const user = await this._usersService.getUserById(userId);
    if (!user) {
      throw new DataNotFoundError('用户不存在');
    }
    const parentDiscuss = await this._discussService.getDiscussById(parentId);
    if (!parentDiscuss) {
      throw new DataNotFoundError('父评论不存在');
    }

    const params = {
      articleId,
      userId,
      content,
      parentId,
    };

    const res = await this._discussService.addDiscuss(params);

    return res;
  }

  public async getDiscussListByArticleId() {
    let { articleId } = this.ctx.query;

    articleId = tool.toNumber(articleId);

    if (!articleId) {
      throw new ParamsError('文章ID不能为空');
    }

    const article = await this._articleService.getArticleById(articleId);
    if (!article) {
      throw new DataValidationError('文章不存在');
    }

    const res = await this._discussService.getDiscussByArticleId(articleId);

    // 遍历评论列表，通过用户ID获取用户昵称
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < res.length; i++) {
      const user = await this._usersService.getUserById(res[i].userId);
      res[i].userNickname = user.userNickname;
    }

    return res;
  }
}
