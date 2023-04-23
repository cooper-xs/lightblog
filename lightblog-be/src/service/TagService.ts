import { TagRepository, ArticleTagReferencedRepository } from '../config/data-source';
import { Article } from '../entities/Article';
import { Tag } from '../entities/Tag';
import { ArticleTagReferenced } from '../entities/ArticleTagReferenced';

export default class TagService {
    public static async getTagByArticleId(articleId: number): Promise<Tag[]> {
        const res = await TagRepository.createQueryBuilder('tag')
            .innerJoin('tag.articleTagReferenceds', 'atr', 'atr.articleId = :articleId', { articleId })
            .getMany();
        return res;
    }
}