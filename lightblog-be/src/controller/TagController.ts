import { Context } from 'koa';
import { DataNotFoundError, DataValidationError, ParamsError } from '../errors';
import ArticleTagReferencedService from '../service/ArticleTagReferencedService';
import TagService from '../service/TagService';
import { tool } from '../utils/tool';

export default class TagController {
  // 依赖注入
  private readonly _tagService: TagService;
  private readonly _articleTagReferencedService: ArticleTagReferencedService;
  public constructor(private readonly ctx: Context) {
    this._tagService = new TagService(ctx);
    this._articleTagReferencedService = new ArticleTagReferencedService(ctx);
  }

  /** 添加标签 */
  public async addTag() {
    
    let { tagName, tagAliasName, description } = this.ctx.request.body;
    
    if (!tagName) {
      throw new ParamsError('标签名称不能为空');
    }

    if (!tagAliasName) {
      throw new ParamsError('标签别名不能为空');
    }

    // 检查标签名是否已存在
    if (await this._tagService.getTagByName(tagName)) {
      throw new DataValidationError('标签名称已存在');
    }

    // 格式化别名
    tagAliasName = tool.formatUrlPath(tagAliasName);
    if (await this._tagService.getTagByAliasName(tagAliasName)) {
      throw new DataValidationError('标签别名已存在');
    }

    const params = {
      tagName,
      tagAliasName,
      description,
    };

    const tag = await this._tagService.addTag(params);

    return tag;
  }

  /** 修改标签 */
  public async updateTag() {
    let { tagId, tagName, tagAliasName, description } = this.ctx.request.body;

    tagId = tool.toNumber(tagId);

    if (!tagId) {
      throw new ParamsError('标签id不能为空');
    }

    if (!tagName) {
      throw new ParamsError('标签名称不能为空');
    }

    if (!tagAliasName) {
      throw new ParamsError('标签别名不能为空');
    }

    tagId = tool.toNumber(tagId);

    const tag = await this._tagService.getTagById(tagId);
    if (!tag) {
      throw new DataNotFoundError('标签不存在');
    }

    // 检查标签名是否已存在
    if (tag.tagName !== tagName && (await this._tagService.getTagByName(tagName))) {
      throw new DataValidationError('标签名称已存在');
    }

    // 格式化别名
    tagAliasName = tool.formatUrlPath(tagAliasName);
    if (tag.tagAliasName !== tagAliasName && (await this._tagService.getTagByAliasName(tagAliasName))) {
      throw new DataValidationError('标签别名已存在');
    }

    const params = {
      tagId,
      tagName,
      tagAliasName,
      description,
    };

    const newTag = await this._tagService.updateTag(params);

    return newTag;
  }

  /** 删除标签 */
  public async deleteTag() {
    let { tagId } = this.ctx.query;

    tagId = tool.toNumber(tagId);

    if (!tagId) {
      throw new ParamsError('标签id不能为空');
    }

    const tag = await this._tagService.getTagById(tagId);
    if (!tag) {
      throw new DataNotFoundError('标签不存在');
    }

    // 检查标签是否被文章引用
    const atr = await this._articleTagReferencedService.getArticleTagReferencedByTagId(tagId);

    // 删除这些文章-标签关联
    atr.forEach(async (item) => {
      await this._articleTagReferencedService.deleteArticleTagReferencedById(item.atrId);
    });

    const res = await this._tagService.deleteTag(tagId);

    return res;
  }

  /** 获取所有标签列表 */
  public async getTagListAll() {
    const tagList = await this._tagService.getTagListAll();

    return tagList;
  }
}
