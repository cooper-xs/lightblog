import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse, MyAxiosConfig } from '@/types';
import axios from 'axios';

class Http {
  private readonly client = axios.create({
    baseURL: '/api',
    timeout: 2000,
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

    // const apiResponse: AxiosResponse<ApiResponse<T>> = {
    //   code: response.status,
    //   data: response.data,
    // };
    // 所有2xx的响应都会进入这里
    if(response.status >= 200 && response.status < 300) {
      const apiResponse = response.data;
      if (apiResponse.code === 20000 && apiResponse.data) {
        console.log('success:', apiResponse.data);
        return apiResponse.data;
      } else {
        throw new Error("请求错误: " + apiResponse);
      }
    } else {
      throw new Error('HTTP错误: ' + response.status);
    }
  }
}

export default new Http();
