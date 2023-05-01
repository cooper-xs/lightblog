import { Context } from 'koa';
import ArticleController from '../controller/ArticleController';
import ArticleTagReferencedController from '../controller/ArticleTagReferencedController';
import CategoryController from '../controller/CategoryController';
import DiscussController from '../controller/DiscussController';
import TagController from '../controller/TagController';
import UsersController from '../controller/UsersController';

export interface IRoute {
  method: string;
  path: string;
  controller: (ctx: Context) =>
    | ArticleController
    | CategoryController
    | TagController
    | ArticleTagReferencedController
    | UsersController
    | DiscussController; // 修改为可调用类型
  action: string;
}