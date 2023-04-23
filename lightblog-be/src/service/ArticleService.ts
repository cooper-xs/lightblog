import { ArticleRepository } from '../config/data-source';
import { Article } from '../entities/Article';
import { ArticleItemView, QueryAsPageByCategoryAndTags } from '../types';
import { tool } from '../utils/tool';

export default class ArticleService {
    public static async getArticleById(id: number): Promise<Article> {
        const res = await ArticleRepository.findOne({
            where: {
                articleId: id,
            },
        });
        return res;
    }

    public static async getArticleOrderByTopAndTime(params: QueryAsPageByCategoryAndTags): Promise<ArticleItemView> {

        const { page, limit, categoryId, tagIds } = params;

        // console.log('service 层 参数检查:');
        // console.log('page = ', page, ' type = ', typeof page);
        // console.log('limit = ', limit, ' type = ', typeof limit);
        // console.log('categoryId = ', categoryId, ' type = ', typeof categoryId);
        // console.log('tagIds = ', tagIds, ' type = ', typeof tagIds);

        const queryBuilder = ArticleRepository.createQueryBuilder('article');
        
        if (categoryId) {
            queryBuilder.andWhere('article.categoryId = :categoryId', { categoryId });
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