import Router from '@koa/router'
const router = new Router();

import MainController from './controller/MainController';

router.get('/article/list', MainController.getArticleList);
router.get('/article/show/:articleId', MainController.getArticleByIdForShow);
router.get('/category/list/:parentId', MainController.getCategoryListFromParent);

export default router;
