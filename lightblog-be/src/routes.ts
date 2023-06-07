import Router from '@koa/router';
import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { TOKEN_CONF } from './config';

import ArticleController from './controller/ArticleController';
import ArticleTagReferencedController from './controller/ArticleTagReferencedController';
import CategoryController from './controller/CategoryController';
import DiscussController from './controller/DiscussController';
import TagController from './controller/TagController';
import UsersController from './controller/UsersController';
import { IRoute } from './types';
import { NoAdminError } from './errors';

const routes: IRoute[] = [
  {
    method: 'get',
    path: '/getArticleListByCategoriesAndTagsAsPage',
    controller: ArticleController,
    action: 'getArticleListByCategoriesAndTagsAsPage',
  },
  {
    method: 'get',
    path: '/getArticleForShow',
    controller: ArticleController,
    action: 'getArticleForShow',
  },
  {
    method: 'get',
    path: '/getArticleDetailForEdit',
    controller: ArticleController,
    action: 'getArticleDetailForEdit',
  },
  {
    method: 'get',
    path: '/searchArticle',
    controller: ArticleController,
    action: 'searchArticle',
  },
  {
    method: 'post',
    path: '/addArticle',
    controller: ArticleController,
    action: 'addArticle',
    needLogin: true,
  },
  {
    method: 'post',
    path: '/updateArticle',
    controller: ArticleController,
    action: 'updateArticle',
    needLogin: true,
  },
  {
    method: 'delete',
    path: '/deleteArticleById',
    controller: ArticleController,
    action: 'deleteArticleById',
    needLogin: true,
  },
  {
    method: 'get',
    path: '/getArticleListByCategoryId',
    controller: ArticleController,
    action: 'getArticleListByCategoryId',
  },
  {
    method: 'get',
    path: '/getArticleListByTagId',
    controller: ArticleController,
    action: 'getArticleListByTagId',
  },
  {
    method: 'post',
    path: '/addCategory',
    controller: CategoryController,
    action: 'addCategory',
    needLogin: true,
  },
  {
    method: 'post',
    path: '/updateCategory',
    controller: CategoryController,
    action: 'updateCategory',
    needLogin: true,
  },
  {
    method: 'delete',
    path: '/deleteCategory',
    controller: CategoryController,
    action: 'deleteCategory',
    needLogin: true,
  },
  {
    method: 'get',
    path: '/getCategoryList',
    controller: CategoryController,
    action: 'getCategoryList',
  },
  {
    method: 'post',
    path: '/addTag',
    controller: TagController,
    action: 'addTag',
    needLogin: true,
  },
  {
    method: 'post',
    path: '/updateTag',
    controller: TagController,
    action: 'updateTag',
    needLogin: true,
  },
  {
    method: 'delete',
    path: '/deleteTag',
    controller: TagController,
    action: 'deleteTag',
    needLogin: true,
  },
  {
    method: 'get',
    path: '/getTagListAll',
    controller: TagController,
    action: 'getTagListAll',
  },
  {
    method: 'post',
    path: '/addArticleTagReferenced',
    controller: ArticleTagReferencedController,
    action: 'addArticleTagReferenced',
    needLogin: true,
  },
  {
    method: 'delete',
    path: '/deleteArticleTagReferenced',
    controller: ArticleTagReferencedController,
    action: 'deleteArticleTagReferenced',
    needLogin: true,
  },
  {
    method: 'post',
    path: '/updateATRByArticleIdAndTagIds',
    controller: ArticleTagReferencedController,
    action: 'updateATRByArticleIdAndTagIds',
    needLogin: true,
  },
  {
    method: 'post',
    path: '/addUser',
    controller: UsersController,
    action: 'addUser',
    needLogin: true,
  },
  {
    method: 'delete',
    path: '/deleteUser',
    controller: UsersController,
    action: 'deleteUser',
    needLogin: true,
  },
  {
    method: 'get',
    path: '/getUserListAll',
    controller: UsersController,
    action: 'getUserListAll',
  },
  {
    method: 'get',
    path: '/getUserByEmail',
    controller: UsersController,
    action: 'getUserByEmail',
  },
  {
    method: 'post',
    path: '/updateUser',
    controller: UsersController,
    action: 'updateUser',
    needLogin: true,
  },
  {
    method: 'post',
    path: '/addDiscuss',
    controller: DiscussController,
    action: 'addDiscuss',
    needLogin: true,
  },
  {
    method: 'get',
    path: '/getDiscussAll',
    controller: DiscussController,
    action: 'getDiscussAll',
  },
  {
    method: 'get',
    path: '/getDiscussListByArticleId',
    controller: DiscussController,
    action: 'getDiscussListByArticleId',
  },
  {
    method: 'delete',
    path: '/deleteDiscussById',
    controller: DiscussController,
    action: 'deleteDiscussById',
    needLogin: true,
  },
  {
    method: 'post',
    path: '/login',
    controller: UsersController,
    action: 'login',
  },
];

const router = new Router();

routes.forEach((route) => {
  const middlewares = [];
  if (route.needLogin) {
    middlewares.push(checkLogin);
  }
  router[route.method](route.path, ...middlewares, async (ctx: Context) => {
    // eslint-disable-next-line new-cap
    const controller = new route.controller(ctx);
    return await controller[route.action]();
  });
});

function checkLogin(ctx: Context, next: Next) {
  const token = ctx.cookies.get('token'); // 从 cookie 中获取 Token
  if (!token) {
    throw new NoAdminError('没有登陆, 缺少token');
  } else {
    try {
      const decoded = jwt.verify(token, TOKEN_CONF.secretToken); // 验证 Token 的合法性
      ctx.info('token验证通过')
      return next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new NoAdminError('token已过期');
      } else {
        throw new NoAdminError('token无效');
      }
    }
  }
}

export default router;
