// 查询文章列表时, 传入的参数
export interface QueryAsPageByCategoryAndTags {
    page?: number;
    limit?: number;
    categoryId?: number;
    tagIds?: number[];
}

// 查询文章列表时，返回的数据结构
export interface ArticleItemView {
    info: {
        currentPage: number;
        totalPage: number;
        totalItem: number;
        pageSize: number;
    }
    list: {
        articleId: number;
        title: string;
        summary: string;
        updateTime: string;
        topFlag: number;
        category: {
            categoryId: number;
            categoryName: string;
            categoryAliasName: string;
        };
        tags: {
            tagId: number;
            tagName: string;
            tagAliasName: string;
        }[];
    }[];
}
