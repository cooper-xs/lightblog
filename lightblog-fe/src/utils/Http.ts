import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { ApiResponse, MyAxiosConfig } from "@/types";
import axios from "axios";

class Http {
  private readonly client = axios.create({
    baseURL: "/api",
    timeout: 2000,
  });

  public get<T>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, url, method: "get" });
  }

  public post<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, url, data, method: "post" });
  }

  public put<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, url, data, method: "put" });
  }

  public delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, url, method: "delete" });
  }

  private async request<T>(config: MyAxiosConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.client.request(config);

    const apiResponse: ApiResponse<T> = {
      code: response.status,
      msg: response.statusText,
      data: response.data,
    };

    return apiResponse;
  }
}

export default new Http();
