import Router from '@koa/router';
const router = new Router();

import ArticleController from './controller/ArticleController';
import ArticleTagReferencedController from './controller/ArticleTagReferencedController';
import CategoryController from './controller/CategoryController';
import DiscussController from './controller/DiscussController';
import TagController from './controller/TagController';
import UsersController from './controller/UsersController';

router.get('/article/show/list', ArticleController.getArticleList);
router.get('/article/show/:articleId', ArticleController.getArticleByIdForShow);
router.get('/search', ArticleController.searchArticle);
router.post('/article/add', ArticleController.addArticle);
router.post('/article/update', ArticleController.updateArticle);
router.delete('/article/delete/:articleId', ArticleController.deleteArticle);

router.post('/category/add', CategoryController.addCategory);
router.post('/category/update', CategoryController.updateCategory);
router.delete('/category/delete/:categoryId', CategoryController.deleteCategory);
router.get('/category/list/:parentId', CategoryController.getCategoryListFromParent);

router.post('/tag/add', TagController.addTag);
router.post('/tag/update', TagController.updateTag);
router.delete('/tag/delete/:tagId', TagController.deleteTag);
router.get('/tag/list', TagController.getTagList);

router.post('/article-tag-referenced/add', ArticleTagReferencedController.addArticleTagReferenced);
router.post('/article-tag-referenced/delete', ArticleTagReferencedController.deleteArticleTagReferenced);

router.post('/users/add', UsersController.addUser);
router.delete('/users/delete/:userId', UsersController.deleteUser);
router.get('/users/list', UsersController.getUserList);

router.post('/discuss/add', DiscussController.addDiscuss);
router.get('/discuss/listByArticle/:articleId', DiscussController.getDiscussListByArticleId);

export default router;
