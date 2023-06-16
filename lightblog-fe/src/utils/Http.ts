import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse, MyAxiosConfig } from '@/types';
import axios from 'axios';
import { DataNotFoundError, DataValidationError, ParamsError } from '@/errors';

class Http {
  private readonly client = axios.create({
    baseURL: '/api',
    timeout: 10 * 1000,
    withCredentials: true,
  });

  public get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>({ ...config, url, method: 'get' })
      .then(data => data);
  }

  public post<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>({ ...config, url, data, method: 'post' })
      .then(data => data);
  }

  public put<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>({ ...config, url, data, method: 'put' })
      .then(data => data);
  }

  public delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>({ ...config, url, method: 'delete' })
      .then(data => data);
  }

  private async request<T>(config: MyAxiosConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.request(config);
    const token = localStorage.getItem('token');
    if (token) {
      document.cookie = `token=${token};path=/`;
    }

    // 所有2xx的响应都会进入这里
    if(response.status >= 200 && response.status < 300) {
      const apiResponse = response.data;
      if (apiResponse.code === 20000 && apiResponse.data) {
        // console.log('success:', apiResponse.data);
        return apiResponse.data;
      } else if(!apiResponse) {
        console.log('success: apiResponse = null');
        return null as unknown as T;
      } else {
        throw new Error('API错误: ' + apiResponse.message);
      }
    } else if(response.status === 400) {
      throw new ParamsError('参数错误: ' + response.data.message);
    } else if(response.status === 404) {
      throw new DataNotFoundError('数据不存在错误: ' + response.data.message);
    } else if(response.status === 409) {
      throw new DataValidationError('数据不合法错误: ' + response.data.message);
    } else if(response.status === 401) {
      throw new DataValidationError('没有管理员权限: ' + response.data.message);
    } else {
      throw new Error('HTTP错误: ' + response.status);
    }
  }
}

export default new Http();
