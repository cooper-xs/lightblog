import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/Main.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Main,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/components/PostList.vue'),
        },
        {
          path: 'article/:postAliasName',
          name: 'Article',
          component: () => import('@/components/Post.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/Admin.vue'),
      children: [
        {
          path: '',
          name: 'AdminHome',
          redirect: '/admin/dashboard',
        },
        {
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: () => import('@/components/Admin/Dashboard.vue'),
        },
        {
          path: '/admin/articleList',
          name: 'ArticleList',
          component: () => import('@/components/Admin/ArticleList.vue'),
        },
        {
          path: '/admin/addArticle',
          name: 'AddArticle',
          component: () => import('@/components/Admin/AddArticle.vue'),
        },
        {
          path: '/admin/updateArticle',
          name: 'UpdateArticle',
          component: () => import('@/components/Admin/UpdateArticle.vue'),
        }
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

export default router;
