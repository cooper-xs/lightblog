import { Context } from 'koa';
import { TagRepository, ArticleTagReferencedRepository } from '../config/data-source';
import { Article } from '../entities/Article';
import { Tag } from '../entities/Tag';
import { ArticleTagReferenced } from '../entities/ArticleTagReferenced';
import { newTag, updateTag, ViewTag } from '../types/tag';
import { tool } from '../utils/tool';
import { View } from 'typeorm/schema-builder/view/View';

export default class TagService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  /** 添加标签 */
  public async addTag(params: newTag): Promise<Tag> {
    const tag = new Tag();
    tag.tagName = params.tagName;
    tag.tagAliasName = params.tagAliasName;
    tag.description = params.description;
    tag.createTime = new Date();
    const res = await TagRepository.save(tag);
    return res;
  }

  /** 修改标签 */
  public async updateTag(params: updateTag): Promise<Tag> {
    const tag = await TagRepository.findOne({
      where: {
        tagId: params.tagId,
      },
    });
    tag.tagName = params.tagName;
    tag.tagAliasName = params.tagAliasName;
    tag.description = params.description;
    const res = await TagRepository.save(tag);
    return res;
  }

  /** 删除标签 */
  public async deleteTag(tagId: number): Promise<Tag> {
    const tag = await TagRepository.findOne({
      where: {
        tagId,
      },
    });
    return await TagRepository.remove(tag);
  }

  /** 通过文章id查找标签 */
  public async getTagByArticleId(articleId: number): Promise<Tag[]> {
    const res = await TagRepository.createQueryBuilder('tag')
      .innerJoin('tag.articleTagReferenceds', 'atr', 'atr.articleId = :articleId', { articleId })
      .getMany();
    return res;
  }

  /** 查找所有标签, 格式化日期返回 */
  public async getTagListAll(): Promise<ViewTag[]> {
    const res = await TagRepository.find();
    return res.map((item) => item.toViewTag());
  }

  /** 通过标签id查找标签 */
  public async getTagById(tagId: number): Promise<ViewTag> {
    const res = await TagRepository.findOne({
      where: {
        tagId,
      },
    });
    return res.toViewTag();
  }

  /** 通过标签名查找标签 */
  public async getTagByName(tagName: string): Promise<ViewTag> {
    const res = await TagRepository.findOne({
      where: {
        tagName,
      },
    });
    return res.toViewTag();
  }

  /** 通过标签别名查找标签 */
  public async getTagByAliasName(tagAliasName: string): Promise<ViewTag> {
    const res = await TagRepository.findOne({
      where: {
        tagAliasName,
      },
    });
    return res.toViewTag();
  }
}
