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
    action: 'prototype.getArticleListByCategoriesAndTagsAsPage',
  },
  {
    method: 'get',
    path: '/getArticleForShow',
    controller: controllerFactories.article,
    action: 'prototype.getArticleForShow',
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

// 匹配对应的路由配置项，并获取该配置项中指定的控制器类和方法名
function getRouteHandler(route: IRoute, ctx: Context) {
  const { controller, action } = route;
  const pureAction = action.replace('prototype.', ''); // 去除控制器方法名中的 `prototype.` 前缀
  console.info(`[Route] 控制器: ${controller.name} 方法: ${pureAction}`);
  // 根据控制器类名称获取对应的控制器对象实例
  const ctrl = controllerFactories[controller.name.toLowerCase()](ctx);
  // 获取控制器对象中指定的方法名对应的方法并返回
  const handler = ctrl[pureAction];
  if (!handler || typeof handler !== 'function') {
    throw new Error(`控制器方法不存在: ${pureAction}`);
  }
  return handler.bind(ctrl);
}

// 自定义路由处理函数：对每个请求进行路由匹配，并调用对应的控制器方法来处理请求
function customRouter() {
  return async (ctx: Context, next) => {
    const { path, method } = ctx.request;

    // 在路由配置数组 `routes` 中查找是否存在匹配当前请求路径和请求方法的路由配置项
    const route = routes.find((route) => route.method === method && route.path === path);
    if (route) {
      const handler = getRouteHandler(route, ctx);
      await handler(ctx);
      return;
    }

    // 如果没有找到匹配的路由配置项，则抛出异常
    throw new Error(`没有找到匹配的路由配置项: ${method} ${path}`);
  };
}

// 设置路由函数：根据路由配置数组 `routes` 创建对应的路由，并在每个路由上绑定路由处理函数以处理请求
export default function setupRouter(router: Router) {
  // 注册自定义路由处理函数，确保它在所有路由之前执行
  router.use(customRouter());

  for (let route of routes) {
    console.info(`[Route] 注册路由: ${route.method} ${route.path}`);
    const { method, path } = route;
    // 在当前路由对象上注册对应的路由，并绑定路由处理函数来处理请求
    router[method](path, async (ctx: Context, next) => {
      const handler = getRouteHandler(route, ctx);
      await handler(ctx);
      await next();
    });
  }
}