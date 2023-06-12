import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/Main.vue';
import { useAdminStore } from './store/admin';

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
      meta: {
        title: '后台管理',
      },
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
          meta: {
            title: '后台管理',
          },
        },
        {
          path: '/admin/articleList',
          name: 'ArticleList',
          component: () => import('@/components/Admin/ArticleList.vue'),
          meta: {
            title: '文章管理',
          },
        },
        {
          path: '/admin/addArticle',
          name: 'AddArticle',
          component: () => import('@/components/Admin/AddArticle.vue'),
          meta: {
            title: '添加文章',
          },
        },
        {
          path: '/admin/updateArticle',
          name: 'UpdateArticle',
          component: () => import('@/components/Admin/UpdateArticle.vue'),
          meta: {
            title: '修改文章',
          },
        },
        {
          path: '/admin/categoryManager',
          name: 'CategoryManager',
          component: () => import('@/components/Admin/CategoryManager.vue'),
          meta: {
            title: '分类管理',
          },
        },
        {
          path: '/admin/tagManager',
          name: 'TagManager',
          component: () => import('@/components/Admin/TagManager.vue'),
          meta: {
            title: '标签管理',
          },
        },
        {
          path: '/admin/discusses',
          name: 'Discusses',
          component: () => import('@/components/Admin/DiscussManager.vue'),
          meta: {
            title: '评论管理',
          },
        },
        {
          path: '/admin/users',
          name: 'Users',
          component: () => import('@/components/Admin/UserManager.vue'),
          meta: {
            title: '用户管理',
          },
        }
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: '开启神秘大门',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: '这页面不对吧??',
      },  
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? to.meta.title + ' | Light Blog' : 'Light Blog';

  // 检查是否需要登录
  const isLoggedIn = useAdminStore().isLoggedIn;
  if (to.path.startsWith('/admin') && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
