import type { AdminState } from "@/types";
import { defineStore } from "pinia";


export const useAdminStore = defineStore({
  id: 'admin',
  state: (): AdminState => ({
    isAuthenticated: false,
  }),
  getters: {
    // 判断用户是否已登录
    isLoggedIn: (state) => state.isAuthenticated,
  },
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