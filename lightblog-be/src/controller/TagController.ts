import { Context } from 'koa';
import ArticleTagReferencedService from '../service/ArticleTagReferencedService';
import TagService from '../service/TagService';
import * as tool from '../utils/tool';

export default class TagController {
  // 依赖注入
  private readonly _tagService: TagService;
  private readonly _articleTagReferencedService: ArticleTagReferencedService;
  public constructor(private readonly ctx: Context) {
    this._tagService = new TagService(ctx);
    this._articleTagReferencedService = new ArticleTagReferencedService(ctx);
  }

  /** 添加标签 */
  public async addTag(ctx: Context) {
    try {
      let { tagName, tagAliasName, description } = ctx.request.body;

      if (!tagName) {
        ctx.fail('标签名称不能为空');
        return;
      }

      if (!tagAliasName) {
        ctx.fail('标签别名不能为空');
        return;
      }

      // 检查标签名是否已存在
      if (await this._tagService.getTagByName(tagName)) {
        ctx.fail('标签名称已存在');
        return;
      }

      // 格式化别名
      tagAliasName = tool.formatUrlPath(tagAliasName);
      if (await this._tagService.getTagByAliasName(tagAliasName)) {
        ctx.fail('标签别名已存在');
        return;
      }

      const params = {
        tagName,
        tagAliasName,
        description,
      };

      const tag = await this._tagService.addTag(params);

      ctx.success('添加标签成功', tag);
    } catch (err) {
      console.log(err);
      ctx.fail('添加标签失败');
    }
  }

  /** 修改标签 */
  public async updateTag(ctx: Context) {
    try {
      let { tagId, tagName, tagAliasName, description } = ctx.request.body;

      tagId = tool.toNumber(tagId);

      if (!tagId) {
        ctx.fail('标签id不能为空');
        return;
      }

      if (!tagName) {
        ctx.fail('标签名称不能为空');
        return;
      }

      if (!tagAliasName) {
        ctx.fail('标签别名不能为空');
        return;
      }

      tagId = tool.toNumber(tagId);

      const tag = await this._tagService.getTagById(tagId);
      if (!tag) {
        ctx.fail('标签不存在');
        return;
      }

      // 检查标签名是否已存在
      if (tag.tagName !== tagName && (await this._tagService.getTagByName(tagName))) {
        ctx.fail('标签名称已存在');
        return;
      }

      // 格式化别名
      tagAliasName = tool.formatUrlPath(tagAliasName);
      if (tag.tagAliasName !== tagAliasName && (await this._tagService.getTagByAliasName(tagAliasName))) {
        ctx.fail('标签别名已存在');
        return;
      }

      const params = {
        tagId,
        tagName,
        tagAliasName,
        description,
      };

      const newTag = await this._tagService.updateTag(params);

      ctx.success('修改标签成功', newTag);
    } catch (err) {
      console.log(err);
      ctx.fail('修改标签失败');
    }
  }

  /** 删除标签 */
  public async deleteTag(ctx: Context) {
    try {
      let { tagId } = ctx.params;

      tagId = tool.toNumber(tagId);

      if (!tagId) {
        ctx.fail('标签id不能为空');
        return;
      }

      const tag = await this._tagService.getTagById(tagId);
      if (!tag) {
        ctx.success('标签已经删除或不存在');
        return;
      }

      // 检查标签是否被文章引用
      const atr = await this._articleTagReferencedService.getArticleTagReferencedByTagId(tagId);

      // 删除这些文章-标签关联
      atr.forEach(async (item) => {
        await this._articleTagReferencedService.deleteArticleTagReferencedById(item.atrId);
      });

      await this._tagService.deleteTag(tagId);

      ctx.success('删除标签成功');
    } catch (err) {
      console.log(err);
      ctx.fail('删除标签失败');
    }
  }

  /** 获取标签列表 */
  public async getTagListAll(ctx: Context) {
    try {
      const tagList = await this._tagService.getTagListAll();

      ctx.success('获取标签列表成功', tagList);
    } catch (err) {
      console.log(err);
      ctx.fail('获取标签列表失败');
    }
  }
}
