import { Context } from 'koa';
import ArticleController from '../controller/ArticleController';
import ArticleTagReferencedController from '../controller/ArticleTagReferencedController';
import CategoryController from '../controller/CategoryController';
import DiscussController from '../controller/DiscussController';
import TagController from '../controller/TagController';
import UsersController from '../controller/UsersController';

// 任何可以被实例化的类
export type Newable<T = any> = new (...args: any) => T;

export interface IRoute {
  method: string;
  path: string;
  controller: Newable;
  action: string;
  needLogin?: boolean;
}
