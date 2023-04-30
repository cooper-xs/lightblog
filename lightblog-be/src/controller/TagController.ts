import { Context } from 'koa';
import ArticleTagReferencedService from '../service/ArticleTagReferencedService';
import TagService from '../service/TagService';
import * as tool from '../utils/tool';

export default class TagController {
  /** 添加标签 */
  public static async addTag(ctx: Context) {
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
      if (await TagService.getTagByName(tagName)) {
        ctx.fail('标签名称已存在');
        return;
      }

      // 格式化别名
      tagAliasName = tool.formatUrlPath(tagAliasName);
      if (await TagService.getTagByAliasName(tagAliasName)) {
        ctx.fail('标签别名已存在');
        return;
      }

      const params = {
        tagName,
        tagAliasName,
        description,
      };

      const tag = await TagService.addTag(params);

      ctx.success('添加标签成功', tag);
    } catch (err) {
      console.log(err);
      ctx.fail('添加标签失败');
    }
  }

  /** 修改标签 */
  public static async updateTag(ctx: Context) {
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

      const tag = await TagService.getTagById(tagId);
      if (!tag) {
        ctx.fail('标签不存在');
        return;
      }

      // 检查标签名是否已存在
      if (tag.tagName !== tagName && (await TagService.getTagByName(tagName))) {
        ctx.fail('标签名称已存在');
        return;
      }

      // 格式化别名
      tagAliasName = tool.formatUrlPath(tagAliasName);
      if (tag.tagAliasName !== tagAliasName && (await TagService.getTagByAliasName(tagAliasName))) {
        ctx.fail('标签别名已存在');
        return;
      }

      const params = {
        tagId,
        tagName,
        tagAliasName,
        description,
      };

      const newTag = await TagService.updateTag(params);

      ctx.success('修改标签成功', newTag);
    } catch (err) {
      console.log(err);
      ctx.fail('修改标签失败');
    }
  }

  /** 删除标签 */
  public static async deleteTag(ctx: Context) {
    try {
      let { tagId } = ctx.params;

      tagId = tool.toNumber(tagId);

      if (!tagId) {
        ctx.fail('标签id不能为空');
        return;
      }

      const tag = await TagService.getTagById(tagId);
      if (!tag) {
        ctx.success('标签已经删除或不存在');
        return;
      }

      // 检查标签是否被文章引用
      const atr = await ArticleTagReferencedService.getArticleTagReferencedByTagId(tagId);

      // 删除这些文章-标签关联
      atr.forEach(async (item) => {
        await ArticleTagReferencedService.deleteArticleTagReferencedById(item.atrId);
      });

      await TagService.deleteTag(tagId);

      ctx.success('删除标签成功');
    } catch (err) {
      console.log(err);
      ctx.fail('删除标签失败');
    }
  }

  /** 获取标签列表 */
  public static async getTagList(ctx: Context) {
    try {
      const tagList = await TagService.getTagList();

      ctx.success('获取标签列表成功', tagList);
    } catch (err) {
      console.log(err);
      ctx.fail('获取标签列表失败');
    }
  }
}
