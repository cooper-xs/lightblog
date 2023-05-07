import Router from '@koa/router';
import { Context } from 'koa';

import ArticleController from './controller/ArticleController';
import ArticleTagReferencedController from './controller/ArticleTagReferencedController';
import CategoryController from './controller/CategoryController';
import DiscussController from './controller/DiscussController';
import TagController from './controller/TagController';
import UsersController from './controller/UsersController';
import { IRoute } from './types';

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
    path: '/searchArticle',
    controller: ArticleController,
    action: 'searchArticle',
  },
  {
    method: 'post',
    path: '/addArticle',
    controller: ArticleController,
    action: 'addArticle',
  },
  // todo 设计获取文章的分类和标签的实现
  {
    method: 'post',
    path: '/updateArticle',
    controller: ArticleController,
    action: 'updateArticle',
  },
  {
    method: 'delete',
    path: '/deleteArticleById',
    controller: ArticleController,
    action: 'deleteArticleById',
  },
  {
    method: 'post',
    path: '/addCategory',
    controller: CategoryController,
    action: 'addCategory',
  },
  {
    method: 'post',
    path: '/updateCategory',
    controller: CategoryController,
    action: 'updateCategory',
  },
  {
    method: 'delete',
    path: '/deleteCategory',
    controller: CategoryController,
    action: 'deleteCategory',
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
  },
  {
    method: 'delete',
    path: '/deleteTag',
    controller: TagController,
    action: 'deleteTag',
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
  },
  {
    method: 'delete',
    path: '/deleteArticleTagReferenced',
    controller: ArticleTagReferencedController,
    action: 'deleteArticleTagReferenced',
  },
  {
    method: 'post',
    path: '/addUser',
    controller: UsersController,
    action: 'addUser',
  },
  {
    method: 'delete',
    path: '/deleteUser',
    controller: UsersController,
    action: 'deleteUser',
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
    path: '/addDiscuss',
    controller: DiscussController,
    action: 'addDiscuss',
  },
  {
    method: 'get',
    path: '/getDiscussListByArticleId',
    controller: DiscussController,
    action: 'getDiscussListByArticleId',
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
  // todo 用于鉴权处理
  const middlewares = [];
  if (route.needLogin) {
    middlewares.push();
  }
  router[route.method](route.path, ...middlewares, async (ctx: Context) => {
    // eslint-disable-next-line new-cap
    const controller = new route.controller(ctx);
    return await controller[route.action]();
  });
});

export default router;
