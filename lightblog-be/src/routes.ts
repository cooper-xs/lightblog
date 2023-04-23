import Router from '@koa/router'
const router = new Router();

import ArticleController from './controller/ArticleController';

router.get('/article/list', ArticleController.getList);
router.get('/article/view/:id', ArticleController.getById);

export default router;
