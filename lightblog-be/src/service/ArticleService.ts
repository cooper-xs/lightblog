import { ArticleRepository } from '../config/data-source';
import { Article } from '../entities/Article';
import { ArticleDetailView, ArticleListView, newArticle, QueryAsPageByCategoryAndTags } from '../types/article';
import { tool } from '../utils/tool';

export default class ArticleService {
    static addArticle(params: newArticle): Promise<Article> {
        const { title, postAliasName } = params;
        const article = new Article();
        article.title = title;
        article.postAliasName = postAliasName;
        console.log('Service层添加的新文章:', article);
        return ArticleRepository.save(article);
    }

    public static async getArticleByAliasName(params: { postAliasName: string; }): Promise<Article> {
        const { postAliasName } = params;
        const article = await ArticleRepository.findOne({
            where: {
                postAliasName: postAliasName,
            },
        });
        return article;
    }

    public static async getArticleByTitle(params: { title: string; }): Promise<Article> {
        const { title } = params;
        const article = await ArticleRepository.findOne({
            where: {
                title: title,
            },
        });
        return article;
    }

    public static async getArticleById(params: { articleId: number; }): Promise<ArticleDetailView> {
        const { articleId } = params;

        const article = await ArticleRepository.findOne({
            where: {
                articleId: articleId,
            },
        });

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
            tags: [{
                tagId: null,
                tagName: null,
                tagAliasName: null,
            }]
        };
    }

    public static async getArticleOrderByTopAndTime(params: QueryAsPageByCategoryAndTags): Promise<ArticleListView> {

        const { page, limit, categoryIds, tagIds } = params;

        const queryBuilder = ArticleRepository.createQueryBuilder('article');

        if (categoryIds && categoryIds.length) {
            queryBuilder
                .where('article.categoryId IN (:...categoryIds)', {
                    categoryIds,
                });
        }

        if (tagIds && tagIds.length) {
            queryBuilder.innerJoin('article.articleTagReferenceds', 'atr', 'atr.tagId IN (:...tagIds)', {
                tagIds,
            });
        }
        
        const [articles, count]  = await queryBuilder
            .distinct(true)
            .orderBy({
                'article.topFlag': 'DESC',
                'article.createTime': 'DESC' 
            })
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

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
                    tags: [{
                        tagId: null,
                        tagName: null,
                        tagAliasName: null,
                    }] 
                };
            }
        )};
    }
}