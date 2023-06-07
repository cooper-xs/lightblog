import type { AdminState } from "@/types";
import { defineStore } from "pinia";


export const useAdminStore = defineStore({
  id: 'admin',
  // state 的作用是定义数据，它的类型是一个函数，返回一个对象
  state: (): AdminState => ({
    isAuthenticated: false,
  }),
  // getters 的作用是定义派生数据，它的类型是一个函数，返回一个值
  getters: {
    // 判断用户是否已登录
    isLoggedIn: (state) => state.isAuthenticated,
  },
  // actions 的作用是定义异步方法，它的类型是一个函数，返回一个 Promise
  actions: {
    // 登录
    login(): void {
      // todo 调用登录接口进行身份验证
      this.$patch({ isAuthenticated: true });
    },
    // 注销
    logout(): void {
      this.$patch({ isAuthenticated: false });
    },
  },
});