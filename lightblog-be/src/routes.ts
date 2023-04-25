import Router from '@koa/router'
const router = new Router();

import ArticleController from './controller/ArticleController';
import CategoryController from './controller/CategoryController';

router.get('/article/show/list', ArticleController.getArticleList);
router.get('/article/show/:articleId', ArticleController.getArticleByIdForShow);
router.post('/article/add', ArticleController.addArticle);
router.post('/article/update', ArticleController.updateArticle);

router.get('/category/list/:parentId', CategoryController.getCategoryListFromParent);
router.post('/category/add', CategoryController.addCategory);
router.post('/category/update', CategoryController.updateCategory);
router.delete('/category/delete/:categoryId', CategoryController.deleteCategory);

export default router;
