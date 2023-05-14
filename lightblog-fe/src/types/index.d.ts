import type { AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  code: number;
  data?: T;
  message?: string;
}

export interface MyAxiosConfig extends AxiosRequestConfig {
  method: 'get' | 'post' | 'put' | 'delete';
}

export interface AdminState {
  isAuthenticated: boolean;
}

export interface DiscussForm {
  nickname: string;
  email: string;
  content: string;
}

export interface CategoryForm {
  categoryId?: number;
  categoryName: string;
  categoryAliasName: string;
  description: string;
  parentId?: number;
}

export interface TagForm {
  tagId: number,
  tagName: string,
  tagAliasName: string,
  description: string,
}