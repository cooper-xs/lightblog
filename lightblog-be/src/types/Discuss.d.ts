export interface newDiscuss {
    articleId: number;
    userId: number;
    content: string;
    parentId?: number;
}

export interface viewDiscuss {
    discussId: number;
    createTime: string;
    userId: number;
    articleId: number;
    content: string;
    parentId?: number;
}