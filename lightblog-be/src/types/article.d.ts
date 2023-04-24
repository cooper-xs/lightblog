// 查询文章列表时, 传入的参数
export interface QueryAsPageByCategoryAndTags {
    page?: number;
    limit?: number;
    categoryIds?: number[];
    tagIds?: number[];
}

// 查询文章列表时，返回的数据结构
export interface ArticleListView {
    info: {
        currentPage: number;
        totalPage: number;
        totalItem: number;
        pageSize: number;
    }
    list: {
        articleId: number;
        title: string;
        postAliasName: string;
        summary: string;
        updateTime: string;
        topFlag: number;
        previewImageUrl: string;
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

// 查询文章内容进行展示时，返回的数据结构
export interface ArticleDetailView {
    articleId: number;
    title: string;
    postAliasName: string;
    summary: string;
    updateTime: string;
    topFlag: number;
    commentCount: number;
    readCount: number;
    contentHtml: string;
    previewImageUrl: string;
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
}