import { Context } from 'vm';
import { ArticleRepository } from '../config/data-source';
import { Article } from '../entities/Article';
import {
  ArticleDetailView,
  ArticleListView,
  newArticle,
  QueryAsPageByCategoryAndTags,
  QueryAsPageByKeyword,
updateArticle,
} from '../types/article';
import { tool } from '../utils/tool';

export default class ArticleService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  /** 添加新文章 */
  public async addArticle(params: newArticle): Promise<Article> {
    const { title, postAliasName } = params;
    const article = new Article();
    article.title = title;
    article.postAliasName = postAliasName;
    article.createTime = new Date;
    article.pushDate = new Date('2030-01-01 00:00:00')
    return ArticleRepository.save(article);
  }

  /** 删除文章 */
  public async deleteArticle(articleId: number): Promise<Article> {
    const article = await ArticleRepository.findOne({
      where: {
        articleId: articleId,
      },
    });
    if(!article) {
      return null;
    }
    return ArticleRepository.remove(article);
  }

  /** 通过分类id查找文章
   * 返回所有分类id为categoryId的文章id
   */
  public async getArticleByCategoryId(categoryId: number): Promise<Article[]> {
    const articles = await ArticleRepository.createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .where('category.categoryId = :categoryId', { categoryId })
      .getMany();
      if(!articles) {
        return null;
      }
    return articles;
  }

  /** 通过别名查找文章 */
  public async getArticleByAliasName(postAliasName: string): Promise<Article> {
    const article = await ArticleRepository.findOne({
      where: {
        postAliasName: postAliasName,
      },
    });
    if(!article) {
      return null;
    }
    return article;
  }

  /** 通过文章名称查找文章 */
  public async getArticleByTitle(title: string): Promise<Article> {
    const article = await ArticleRepository.findOne({
      where: {
        title: title,
      },
    });
    if(!article) {
      return null;
    }
    return article;
  }

  /** 通过文章id查找文章, 返回以展示博文内容 */
  public async getArticleByIdForDetail(articleId: number): Promise<ArticleDetailView> {
    const article = await ArticleRepository.findOne({
      where: {
        articleId: articleId,
      },
    });

    if(!article) {
      return null;
    }

    return {
      articleId: article.articleId,
      title: article.title,
      postAliasName: article.postAliasName,
      summary: article.articleSummary,
      updateTime: tool.formatDate(article.pushDate),
      topFlag: article.topFlag,
      commentCount: article.commentCount,
      readCount: article.readCount,
      contentHtml: article.contentHtml,
      previewImageUrl: article.previewImageUrl,
      category: {
        categoryId: article.categoryId,
        categoryName: null,
        categoryAliasName: null,
      },
      tags: [
        {
          tagId: null,
          tagName: null,
          tagAliasName: null,
        },
      ],
    };
  }

  /** 通过文章别名查找文章, 返回以展示博文内容 */
  public async getArticleByAliasNameForDetail(postAliasName: string): Promise<ArticleDetailView> {
    const article = await ArticleRepository.findOne({
      where: {
        postAliasName: postAliasName,
      },
    });

    if(!article) {
      return null;
    }

    return {
      articleId: article.articleId,
      title: article.title,
      postAliasName: article.postAliasName,
      summary: article.articleSummary,
      updateTime: tool.formatDate(article.pushDate),
      topFlag: article.topFlag,
      commentCount: article.commentCount,
      readCount: article.readCount,
      contentHtml: article.contentHtml,
      previewImageUrl: article.previewImageUrl,
      category: {
        categoryId: article.categoryId,
        categoryName: null,
        categoryAliasName: null,
      },
      tags: [
        {
          tagId: null,
          tagName: null,
          tagAliasName: null,
        },
      ],
    };
  }

  /** 通过文章id查找文章 */
  public async getArticleById(articleId: number): Promise<Article> {
    const article = await ArticleRepository.findOne({
      where: {
        articleId: articleId,
      },
    });

    if(!article) {
      return null;
    }

    return article;
  }

  /** 查找文章列表, 按照置顶等级和时间排序
   * 支持按照分类和标签查询
   * 返回分页数据
   */
  public async getArticleOrderByTopAndTime(params: QueryAsPageByCategoryAndTags): Promise<ArticleListView> {
    const { page, limit, categoryIds, tagIds } = params;

    const queryBuilder = ArticleRepository.createQueryBuilder('article');

    if (categoryIds?.length) {
      queryBuilder.where('article.categoryId IN (:...categoryIds)', {
        categoryIds,
      });
    }

    if (tagIds?.length) {
      queryBuilder.innerJoin('article.articleTagReferenceds', 'atr', 'atr.tagId IN (:...tagIds)', {
        tagIds,
      });
    }

    const [articles, count] = await queryBuilder
      .distinct(true)
      .orderBy({
        'article.topFlag': 'DESC',
        'article.createTime': 'DESC',
      })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    if (!articles.length) {
      return null;
    }

    return {
      info: {
        currentPage: page,
        totalPage: Math.ceil(count / limit),
        totalItem: count,
        pageSize: limit,
      },
      list: articles.map((article) => {
        return {
          articleId: article.articleId,
          title: article.title,
          postAliasName: article.postAliasName,
          summary: article.articleSummary,
          updateTime: tool.formatDate(article.pushDate),
          topFlag: article.topFlag,
          previewImageUrl: article.previewImageUrl,
          category: {
            categoryId: article.categoryId,
            categoryName: null,
            categoryAliasName: null,
          },
          tags: [
            {
              tagId: null,
              tagName: null,
              tagAliasName: null,
            },
          ],
        };
      }),
    };
  }

  /** 通过关键词搜索文章 */
  public async getArticleByKeyword(params: QueryAsPageByKeyword): Promise<ArticleListView> {
    const { page, limit, keywords } = params;

    const queryBuilder = ArticleRepository.createQueryBuilder('article')
      .orderBy({
        'article.topFlag': 'DESC',
        'article.createTime': 'DESC',
      })
      .skip((page - 1) * limit)
      .take(limit);

    if (keywords.length >= 1) {
      const [firstKeyword, ...restKeywords] = keywords;
      queryBuilder.where('article.title LIKE :firstKeyword', { firstKeyword: `%${firstKeyword}%` });
      restKeywords.forEach((keyword) => {
        queryBuilder.orWhere('article.title LIKE :keyword', { keyword: `%${keyword}%` });
      });
    }
    const [articles, count] = await queryBuilder.getManyAndCount();

    if (!articles.length) {
      return null;
    }

    return {
      info: {
        currentPage: page,
        totalPage: Math.ceil(count / limit),
        totalItem: count,
        pageSize: limit,
      },
      list: articles.map((article) => {
        return {
          articleId: article.articleId,
          title: article.title,
          postAliasName: article.postAliasName,
          summary: article.articleSummary,
          updateTime: tool.formatDate(article.pushDate),
          topFlag: article.topFlag,
          previewImageUrl: article.previewImageUrl,
          category: {
            categoryId: article.categoryId,
            categoryName: null,
            categoryAliasName: null,
          },
          tags: [
            {
              tagId: null,
              tagName: null,
              tagAliasName: null,
            },
          ],
        };
      }),
    };
  }

  /** 浏览量+1 */
  public async updateArticleViewCount(articleId: number): Promise<void> {
    // await ArticleRepository.increment({ articleId }, 'readCount', 1);
    const article = await ArticleRepository.findOne({
      where: {
        articleId: articleId,
      },
    });

    if (!article) {
      return null;
    }

    article.readCount += 1;

    await ArticleRepository.save(article);
  }

  /** 更新文章内容 */
  public async updateArticle(params: updateArticle) {
    const {
      articleId,
      title,
      postAliasName,
      topFlag,
      articleSummary,
      previewImageUrl,
      categoryId,
      contentMd,
      contentHtml,
    } = params;

    const article = await ArticleRepository.findOne({
      where: {
        articleId: articleId,
      },
    });

    if (!article) {
      return null;
    }

    article.title = title;
    article.postAliasName = postAliasName;
    article.topFlag = topFlag;
    article.articleSummary = articleSummary;
    article.previewImageUrl = previewImageUrl;
    article.categoryId = categoryId;
    article.contentMd = contentMd;
    article.contentHtml = contentHtml;
    article.pushDate = new Date();
    
    const res = await ArticleRepository.save(article);

    if (!res) {
      return null;
    }

    return res;
  }
}
