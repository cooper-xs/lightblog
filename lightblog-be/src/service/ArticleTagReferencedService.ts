import { Context } from 'koa';
import { ArticleTagReferencedRepository } from '../config/data-source';
import { ArticleTagReferenced } from '../entities/ArticleTagReferenced';

export default class ArticleTagReferencedService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  /** 添加文章-标签关联 */
  public async addArticleTagReferenced(params: { articleId: number; tagId: number }) {
    const articleTagReferenced = new ArticleTagReferenced();
    articleTagReferenced.articleId = params.articleId;
    articleTagReferenced.tagId = params.tagId;
    const res = await ArticleTagReferencedRepository.save(articleTagReferenced);
    return res;
  }

  /** 根据关联id删除所有关联 */
  public async deleteArticleTagReferencedById(atrId: number) {
    const atr = await ArticleTagReferencedRepository.findOne({
      where: {
        atrId,
      },
    });
    return await ArticleTagReferencedRepository.remove(atr);
  }

  /** 查询是否已经存在某文章和某标签的关联 */
  public async getArticleTagReferencedByTagIdAndArticleId(params: {
    articleId: number;
    tagId: number;
  }): Promise<ArticleTagReferenced> {
    const res = await ArticleTagReferencedRepository.findOne({
      where: {
        ...params,
      },
    });
    if (!res) {
      return null;
    }
    return res;
  }

  /** 通过关联id查找所有关联 */
  public async getArticleTagReferencedById(atrId: number): Promise<ArticleTagReferenced> {
    const res = await ArticleTagReferencedRepository.findOne({
      where: {
        atrId,
      },
    });
    if (!res) {
      return null;
    }
    return res;
  }

  /** 通过标签id查找所有关联 */
  public async getArticleTagReferencedByTagId(tagId: number): Promise<ArticleTagReferenced[]> {
    const res = await ArticleTagReferencedRepository.find({
      where: {
        tagId,
      },
    });
    return res;
  }

  /** 通过文章id查找所有关联 */
  public async getArticleTagReferencedByArticleId(articleId: number): Promise<ArticleTagReferenced[]> {
    const res = await ArticleTagReferencedRepository.find({
      where: {
        articleId,
      },
    });
    return res;
  }
}
