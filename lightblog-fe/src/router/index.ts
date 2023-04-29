import { createRouter, createWebHistory } from 'vue-router';
import ContentVue from '@/views/Content.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ContentVue
    },
    {
      path: '/post/:articleId',
      name: 'Post',
      component: () => import('@/views/Post.vue'),
      alias: '/post/:postAliasName',
      // redirect: to => ({ name: 'Post', params: { articleId: to.params.articleId } }),
      // children: [
      // ]
    },
    // {
    //   path: '/post/:postAliasName',
    //   name: 'Post',
    //   component: () => import('@/views/Post.vue'),
    // },
    // {
    //   path: '/post/:articleId',
    //   redirect: to => `/post/${to.params.postAliasName}`
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

export default router
