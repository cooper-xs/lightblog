import Router from '@koa/router'
const router = new Router();

import MainController from './controller/MainController';

router.get('/article/show/list', MainController.getArticleList);
router.get('/article/show/:articleId', MainController.getArticleByIdForShow);
router.post('/article/add', MainController.addArticle);
router.post('/article/update', MainController.updateArticle);

router.get('/category/list/:parentId', MainController.getCategoryListFromParent);

export default router;
