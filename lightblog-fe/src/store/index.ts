import { defineStore } from 'pinia';
import type { AdminState } from '@/types';

export const adminStore = defineStore({
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
      // todo 如果验证通过，将 isAuthenticated 设置为 true
      this.$patch({ isAuthenticated: true });
    },
    // 注销
    logout(): void {
      // todo 将 isAuthenticated 设置为 false
      this.$patch({ isAuthenticated: false });
    },
  },
});

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    isAuthenticated: false,
    nickname: '',
    email: '',
  }),
  getters: {
    // 判断用户是否已登录
    isLoggedIn: (state) => state.isAuthenticated,
  },
  actions: {
    // 登录
    login(): void {
      // todo 调用登录接口进行身份验证
      // todo 如果验证通过，将 isAuthenticated 设置为 true
      this.$patch({ isAuthenticated: true });
    },
    // 注销
    logout(): void {
      // todo 将 isAuthenticated 设置为 false
      this.$patch({ isAuthenticated: false });
    }
  },
});