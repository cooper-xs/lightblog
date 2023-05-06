// 查询文章列表时, 传入的参数
export interface QueryAsPageByCategoryAndTags {
  page?: number;
  limit?: number;
  categoryId?: number;
  tagIds?: string;
}

// 查询文章列表时，返回的数据结构
export interface ArticleListView {
  info: {
    currentPage: number;
    totalPage: number;
    totalItem: number;
    pageSize: number;
  };
  list: ArticleCardView[];
}

export interface ArticleCardView {
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

// 创建新文章时需要的数据格式
export interface newArticle {
  title: string;
  postAliasName: string;
}

// 更新文章内容时的数据消息
export interface updateArticle {
  articleId: number;
  title: string;
  postAliasName: string;
  pushDate: string;
  topFlag: number;
  articleSummary: string;
  previewImageUrl: string;
  categoryId: number;
  contentMd: string;
  tagIds: number[];
}

// 关键词查询文章列表时，传入的参数
export interface QueryAsPageByKeyword {
  page?: number;
  limit?: number;
  keywords?: string;
}
