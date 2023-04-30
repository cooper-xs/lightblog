export interface newTag {
  tagName: string;
  tagAliasName: string;
  description?: string;
}

export interface updateTag {
  tagId: number;
  tagName: string;
  tagAliasName: string;
  description?: string;
}

export interface ViewTag {
  tagId: number;
  tagName: string;
  tagAliasName: string;
  description: string;
  createTime: string;
}
