import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/Main.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
          // props: route => ({ postAliasName: route.params.postAliasName }),
        },
        {
          path: 'category/:categoryId',
          name: 'Category',
          component: () => import('@/components/PostList.vue'),
        },
        {
          path: 'tag/:tagId',
          name: 'Tag',
          component: () => import('@/components/PostList.vue'),
        },
        {
          path: 'search',
          name: 'Search',
          component: () => import('@/components/PostList.vue'),
        }
      ],
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/Admin.vue'),
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
