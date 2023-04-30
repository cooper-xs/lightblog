import type { AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  code: number;
  msg: string;
  data?: T;
}

export interface MyAxiosConfig extends AxiosRequestConfig {
  method: 'get' | 'post' | 'put' | 'delete';
}
