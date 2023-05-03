export interface newDiscuss {
  articleId: number;
  userId: number;
  content: string;
  parentId?: number;
}

export interface viewDiscuss {
  userNickname?: string;
  discussId: number;
  createTime: string;
  userId: number;
  articleId: number;
  content: string;
  parentId?: number;
}
