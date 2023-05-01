import Router from '@koa/router';
import { Context } from 'vm';

import ArticleController from './controller/ArticleController';
import ArticleTagReferencedController from './controller/ArticleTagReferencedController';
import CategoryController from './controller/CategoryController';
import DiscussController from './controller/DiscussController';
import TagController from './controller/TagController';
import UsersController from './controller/UsersController';
import { IRoute } from './types';

// 缓存控制器工厂函数, 根据路由中的控制器名字生成对应的控制器实例, 避免每次请求都生成新的实例
const controllerFactories = {
  article: (ctx: Context) => new ArticleController(ctx),
  articleTagReferenced: (ctx: Context) => new ArticleTagReferencedController(ctx),
  category: (ctx: Context) => new CategoryController(ctx),
  discuss: (ctx: Context) => new DiscussController(ctx),
  tag: (ctx: Context) => new TagController(ctx),
  users: (ctx: Context) => new UsersController(ctx),
};

const routes: IRoute[] = [
  {
    method: 'get',
    path: '/getArticleListByCategoriesAndTagsAsPage',
    controller: controllerFactories.article,
    action: 'getArticleListByCategoriesAndTagsAsPage',
  },
  {
    method: 'get',
    path: '/getArticleForShow',
    controller: controllerFactories.article,
    action: 'getArticleForShow',
  },
  {
    method: 'get',
    path: '/searchArticle',
    controller: controllerFactories.article,
    action: 'prototype.searchArticle',
  },
  {
    method: 'post',
    path: '/addArticle',
    controller: controllerFactories.article,
    action: 'prototype.addArticle',
  },
  {
    method: 'post',
    path: '/updateArticle',
    controller: controllerFactories.article,
    action: 'prototype.updateArticle',
  },
  {
    method: 'delete',
    path: '/deleteArticle',
    controller: controllerFactories.article,
    action: 'prototype.deleteArticle',
  },
  {
    method: 'post',
    path: '/addCategory',
    controller: controllerFactories.category,
    action: 'prototype.addCategory',
  },
  {
    method: 'post',
    path: '/updateCategory',
    controller: controllerFactories.category,
    action: 'prototype.updateCategory',
  },
  {
    method: 'delete',
    path: '/deleteCategory',
    controller: controllerFactories.category,
    action: 'prototype.deleteCategory',
  },
  {
    method: 'post',
    path: '/addTag',
    controller: controllerFactories.tag,
    action: 'prototype.addTag',
  },
  {
    method: 'post',
    path: '/updateTag',
    controller: controllerFactories.tag,
    action: 'prototype.updateTag',
  },
  {
    method: 'delete',
    path: '/deleteTag',
    controller: controllerFactories.tag,
    action: 'prototype.deleteTag',
  },
  {
    method: 'get',
    path: '/getTagList',
    controller: controllerFactories.tag,
    action: 'prototype.getTagList',
  },
  {
    method: 'post',
    path: '/addArticleTagReferenced',
    controller: controllerFactories.articleTagReferenced,
    action: 'prototype.addArticleTagReferenced',
  },
  {
    method: 'post',
    path: '/deleteArticleTagReferenced',
    controller: controllerFactories.articleTagReferenced,
    action: 'prototype.deleteArticleTagReferenced',
  },
  {
    method: 'post',
    path: '/addUser',
    controller: controllerFactories.users,
    action: 'prototype.addUser',
  },
  {
    method: 'delete',
    path: '/deleteUser',
    controller: controllerFactories.users,
    action: 'prototype.deleteUser',
  },
  {
    method: 'get',
    path: '/getUserListAll',
    controller: controllerFactories.users,
    action: 'prototype.getUserListAll',
  },
  {
    method: 'post',
    path: '/addDiscuss',
    controller: controllerFactories.discuss,
    action: 'prototype.addDiscuss',
  },
  {
    method: 'get',
    path: '/getDiscussListByArticleId',
    controller: controllerFactories.discuss,
    action: 'prototype.getDiscussListByArticleId',
  },
];

const router = new Router();

routes.forEach((route) => {
  console.info(`[Route] method = ${route.method.toUpperCase()} path = ${route.path}`);
  router[route.method](route.path, async (ctx: Context) => {
    const controller = route.controller(ctx);
    await controller[route.action]();
  });
});

export default router;