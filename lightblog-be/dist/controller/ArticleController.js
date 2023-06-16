"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArticleService_1 = __importDefault(require("../service/ArticleService"));
var ArticleTagReferencedService_1 = __importDefault(require("../service/ArticleTagReferencedService"));
var CategoryService_1 = __importDefault(require("../service/CategoryService"));
var TagService_1 = __importDefault(require("../service/TagService"));
var tool_1 = require("../utils/tool");
var markdown_it_1 = __importDefault(require("markdown-it"));
var errors_1 = require("../errors");
var DiscussService_1 = __importDefault(require("../service/DiscussService"));
// import console from 'console';
var md = new markdown_it_1.default();
var ArticleController = /** @class */ (function () {
    function ArticleController(ctx) {
        this.ctx = ctx;
        this._articleService = new ArticleService_1.default(ctx);
        this._categoryService = new CategoryService_1.default(ctx);
        this._tagService = new TagService_1.default(ctx);
        this._articleTagReferencedService = new ArticleTagReferencedService_1.default(ctx);
        this._discussService = new DiscussService_1.default(ctx);
    }
    /** 添加新文章
     * 添加新文章, 需要指定文章标题和别名
     * 文章别名不能重复
     * 文章别名会作为文章的访问路径
     * 文章别名只能包含字母, 数字, 下划线, 中划线
     */
    ArticleController.prototype.addArticle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, postAliasName, existingTitle, existingAliasName, params, article;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.request.body, title = _a.title, postAliasName = _a.postAliasName;
                        if (!title) {
                            throw new errors_1.ParamsError('文章标题不能为空');
                        }
                        if (!postAliasName) {
                            throw new errors_1.ParamsError('文章别名不能为空');
                        }
                        return [4 /*yield*/, this._articleService.getArticleByTitle(title)];
                    case 1:
                        existingTitle = _b.sent();
                        if (existingTitle) {
                            throw new errors_1.DataValidationError('文章标题已存在');
                        }
                        // 格式化别名
                        postAliasName = tool_1.tool.formatUrlPath(postAliasName);
                        return [4 /*yield*/, this._articleService.getArticleByAliasName(postAliasName)];
                    case 2:
                        existingAliasName = _b.sent();
                        if (existingAliasName) {
                            throw new errors_1.DataValidationError('文章别名已存在');
                        }
                        params = {
                            title: title,
                            postAliasName: postAliasName,
                        };
                        return [4 /*yield*/, this._articleService.addArticle(params)];
                    case 3:
                        article = _b.sent();
                        return [2 /*return*/, article];
                }
            });
        });
    };
    /** post 更新文章內容 */
    ArticleController.prototype.updateArticle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, articleId, title, postAliasName, topFlag, articleSummary, previewImageUrl, categoryId, contentMd, article, existingTitle, existingAliasName, category, contentHtml, params, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.request.body, articleId = _a.articleId, title = _a.title, postAliasName = _a.postAliasName, topFlag = _a.topFlag, articleSummary = _a.articleSummary, previewImageUrl = _a.previewImageUrl, categoryId = _a.categoryId, contentMd = _a.contentMd;
                        articleId = tool_1.tool.toNumber(articleId);
                        if (!articleId) {
                            throw new errors_1.ParamsError('文章ID不能为空');
                        }
                        if (!title) {
                            throw new errors_1.ParamsError('文章标题不能为空');
                        }
                        if (!postAliasName) {
                            throw new errors_1.ParamsError('文章别名不能为空');
                        }
                        return [4 /*yield*/, this._articleService.getArticleById(articleId)];
                    case 1:
                        article = _b.sent();
                        if (!article) {
                            throw new errors_1.DataNotFoundError('文章不存在');
                        }
                        return [4 /*yield*/, this._articleService.getArticleByTitle(title)];
                    case 2:
                        existingTitle = _b.sent();
                        if (existingTitle && existingTitle.articleId !== articleId) {
                            throw new errors_1.DataValidationError('文章标题已存在');
                        }
                        // 格式化别名
                        postAliasName = tool_1.tool.formatUrlPath(postAliasName);
                        return [4 /*yield*/, this._articleService.getArticleByAliasName(postAliasName)];
                    case 3:
                        existingAliasName = _b.sent();
                        if (existingAliasName && existingAliasName.articleId !== articleId) {
                            throw new errors_1.DataValidationError('文章别名已存在');
                        }
                        if (!categoryId) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._categoryService];
                    case 4:
                        category = _b.sent();
                        if (!category) {
                            throw new errors_1.DataNotFoundError('分类不存在');
                        }
                        _b.label = 5;
                    case 5:
                        contentHtml = md.render(contentMd);
                        params = {
                            articleId: articleId,
                            title: title,
                            postAliasName: postAliasName,
                            topFlag: topFlag,
                            articleSummary: articleSummary,
                            previewImageUrl: previewImageUrl,
                            categoryId: categoryId,
                            contentMd: contentMd,
                            contentHtml: contentHtml,
                        };
                        return [4 /*yield*/, this._articleService.updateArticle(params)];
                    case 6:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /** delete删除文章 */
    ArticleController.prototype.deleteArticleById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var articleId, article, atr, discuss, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        articleId = this.ctx.query.articleId;
                        articleId = tool_1.tool.toNumber(articleId);
                        return [4 /*yield*/, this._articleService.getArticleById(articleId)];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            throw new errors_1.DataNotFoundError('文章不存在');
                        }
                        return [4 /*yield*/, this._articleTagReferencedService.getArticleTagReferencedByArticleId(articleId)];
                    case 2:
                        atr = _a.sent();
                        if (atr) {
                            // 删除约束
                            atr.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._articleTagReferencedService.deleteArticleTagReferencedById(item.atrId)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [4 /*yield*/, this._discussService.getDiscussByArticleId(articleId)];
                    case 3:
                        discuss = _a.sent();
                        if (discuss) {
                            // 删除评论
                            discuss.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._discussService.deleteDiscussById(item.discussId)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [4 /*yield*/, this._articleService.deleteArticle(articleId)];
                    case 4:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /** 分页查询文章列表
     * 查询文章列表, 可以指定分类和标签, 并指定分页条件
     * default: page=1, limit=7, 即查询第一页, 每页7条
     * 当查询分类为父级分类时, 会查询该父级分类下的所有子分类
     * 查询的标签tag可以设置多个, 用逗号分隔, 如: tagIds=1,2,3
     */
    ArticleController.prototype.getArticleListByCategoriesAndTagsAsPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, limit, categoryId, tagIds, categoryIds, category, categorys, params, res, _i, _b, article, category, _c, _d, article, tags;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this.ctx.query, page = _a.page, limit = _a.limit, categoryId = _a.categoryId, tagIds = _a.tagIds;
                        page = tool_1.tool.toNumber(page, 1);
                        limit = tool_1.tool.toNumber(limit, 7);
                        // 将分类id查询为包括他的子分类id的数组(如有)
                        categoryId = tool_1.tool.toNumber(categoryId);
                        categoryIds = null;
                        if (!categoryId) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._categoryService.getCategoryById(categoryId)];
                    case 1:
                        category = _e.sent();
                        if (!!category) return [3 /*break*/, 2];
                        // 如果分类不存在, 查询所有分类
                        categoryIds = undefined;
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(category.parentId === null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._categoryService.getCategoryByParentId(categoryId)];
                    case 3:
                        categorys = _e.sent();
                        categoryIds = categorys.children.map(function (item) { return item.categoryId; });
                        categoryIds.push(categoryId); // 加上父分类本身
                        return [3 /*break*/, 5];
                    case 4:
                        // 不是父级分类, 直接使用
                        categoryIds = [categoryId];
                        _e.label = 5;
                    case 5:
                        tagIds = tagIds ? tagIds.split(',').map(Number).filter(Boolean) : undefined;
                        params = {
                            page: page,
                            limit: limit,
                            categoryIds: categoryIds,
                            tagIds: tagIds,
                        };
                        return [4 /*yield*/, this._articleService.getArticleOrderByTopAndTime(params)];
                    case 6:
                        res = _e.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        _i = 0, _b = res.list;
                        _e.label = 7;
                    case 7:
                        if (!(_i < _b.length)) return [3 /*break*/, 10];
                        article = _b[_i];
                        if (!(article.category.categoryId !== null)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this._categoryService.getCategoryById(article.category.categoryId)];
                    case 8:
                        category = _e.sent();
                        article.category = {
                            categoryId: category.categoryId,
                            categoryName: category.categoryName,
                            categoryAliasName: category.categoryAliasName,
                        };
                        _e.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10:
                        _c = 0, _d = res.list;
                        _e.label = 11;
                    case 11:
                        if (!(_c < _d.length)) return [3 /*break*/, 14];
                        article = _d[_c];
                        return [4 /*yield*/, this._tagService.getTagByArticleId(article.articleId)];
                    case 12:
                        tags = _e.sent();
                        article.tags = tags.map(function (tag) { return ({
                            tagId: tag.tagId,
                            tagName: tag.tagName,
                            tagAliasName: tag.tagAliasName,
                        }); });
                        _e.label = 13;
                    case 13:
                        _c++;
                        return [3 /*break*/, 11];
                    case 14: return [2 /*return*/, res];
                }
            });
        });
    };
    /** 关键字搜索文章 */
    ArticleController.prototype.searchArticle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, limit, keywords, params, res, _i, _b, article, category, _c, _d, article, tags;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this.ctx.query, page = _a.page, limit = _a.limit, keywords = _a.keywords;
                        page = tool_1.tool.toNumber(page, 1);
                        limit = tool_1.tool.toNumber(limit, 7);
                        // keywords = tool.formatUrlPath(keywords);
                        keywords = keywords ? keywords.split(',').map(String).filter(Boolean) : undefined;
                        this.ctx.info('keywords', keywords);
                        if (!keywords) {
                            throw new errors_1.ParamsError('搜索文章缺少参数keywords');
                        }
                        params = {
                            page: page,
                            limit: limit,
                            keywords: keywords,
                        };
                        return [4 /*yield*/, this._articleService.getArticleByKeyword(params)];
                    case 1:
                        res = _e.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        _i = 0, _b = res.list;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        article = _b[_i];
                        if (!(article.category.categoryId !== null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._categoryService.getCategoryById(article.category.categoryId)];
                    case 3:
                        category = _e.sent();
                        article.category = {
                            categoryId: category.categoryId,
                            categoryName: category.categoryName,
                            categoryAliasName: category.categoryAliasName,
                        };
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        _c = 0, _d = res.list;
                        _e.label = 6;
                    case 6:
                        if (!(_c < _d.length)) return [3 /*break*/, 9];
                        article = _d[_c];
                        return [4 /*yield*/, this._tagService.getTagByArticleId(article.articleId)];
                    case 7:
                        tags = _e.sent();
                        article.tags = tags.map(function (tag) { return ({
                            tagId: tag.tagId,
                            tagName: tag.tagName,
                            tagAliasName: tag.tagAliasName,
                        }); });
                        _e.label = 8;
                    case 8:
                        _c++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/, res];
                }
            });
        });
    };
    /** 查询文章详细内容
     * 如有id, 则通过id查询
     * 没有id有aliasName, 则通过aliasName查询
     * 如果两个都没有, 则返回错误
     */
    ArticleController.prototype.getArticleForShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, articleId, postAliasName, article, category, tags;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.query, articleId = _a.articleId, postAliasName = _a.postAliasName;
                        articleId = tool_1.tool.toNumber(articleId);
                        // 检查参数
                        if (!articleId && !postAliasName) {
                            throw new errors_1.ParamsError('查询文章缺少参数articleId或postAliasName');
                        }
                        article = null;
                        if (!articleId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._articleService.getArticleByIdForDetail(articleId)];
                    case 1:
                        article = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this._articleService.getArticleByAliasNameForDetail(postAliasName)];
                    case 3:
                        article = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!article) {
                            throw new errors_1.DataNotFoundError('文章不存在');
                        }
                        // 文章浏览量+1
                        article.readCount += 1;
                        this._articleService.updateArticleViewCount(article.articleId);
                        if (!(article.category.categoryId !== null)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._categoryService.getCategoryById(article.category.categoryId)];
                    case 5:
                        category = _b.sent();
                        article.category = {
                            categoryId: category.categoryId,
                            categoryName: category.categoryName,
                            categoryAliasName: category.categoryAliasName,
                        };
                        _b.label = 6;
                    case 6: return [4 /*yield*/, this._tagService.getTagByArticleId(article.articleId)];
                    case 7:
                        tags = _b.sent();
                        article.tags = tags.map(function (tag) { return ({
                            tagId: tag.tagId,
                            tagName: tag.tagName,
                            tagAliasName: tag.tagAliasName,
                        }); });
                        return [2 /*return*/, article];
                }
            });
        });
    };
    /** 获取文章详细内容, 获取更新文章需要的内容 */
    ArticleController.prototype.getArticleDetailForEdit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var articleId, article, tags, tagIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        articleId = this.ctx.query.articleId;
                        articleId = tool_1.tool.toNumber(articleId);
                        // 检查参数
                        if (!articleId) {
                            throw new errors_1.ParamsError('查询文章缺少参数');
                        }
                        article = null;
                        return [4 /*yield*/, this._articleService.getArticleById(articleId)];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            throw new errors_1.DataNotFoundError('文章不存在');
                        }
                        return [4 /*yield*/, this._tagService.getTagByArticleId(article.articleId)];
                    case 2:
                        tags = _a.sent();
                        tagIds = tags.map(function (tag) { return tag.tagId; });
                        return [2 /*return*/, {
                                article: article,
                                tagIds: tagIds,
                            }];
                }
            });
        });
    };
    /** 根据分类id查找文章 */
    ArticleController.prototype.getArticleListByCategoryId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categoryId, articles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryId = this.ctx.query.categoryId;
                        categoryId = tool_1.tool.toNumber(categoryId);
                        // 检查参数
                        if (!categoryId) {
                            throw new errors_1.ParamsError('查询文章缺少参数');
                        }
                        console.log(categoryId);
                        return [4 /*yield*/, this._articleService.getArticleByCategoryId(categoryId)];
                    case 1:
                        articles = _a.sent();
                        console.log(articles);
                        return [2 /*return*/, articles];
                }
            });
        });
    };
    /** 根据标签id查找文章 */
    ArticleController.prototype.getArticleListByTagId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tagId, arts, articles;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagId = this.ctx.query.tagId;
                        tagId = tool_1.tool.toNumber(tagId);
                        // 检查参数
                        if (!tagId) {
                            throw new errors_1.ParamsError('查询文章缺少参数');
                        }
                        return [4 /*yield*/, this._articleTagReferencedService.getArticleTagReferencedByTagId(tagId)];
                    case 1:
                        arts = _a.sent();
                        articles = Promise.all(arts.map(function (art) { return __awaiter(_this, void 0, void 0, function () {
                            var article;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._articleService.getArticleById(art.articleId)];
                                    case 1:
                                        article = _a.sent();
                                        return [2 /*return*/, article];
                                }
                            });
                        }); }));
                        return [2 /*return*/, articles];
                }
            });
        });
    };
    return ArticleController;
}());
exports.default = ArticleController;
//# sourceMappingURL=ArticleController.js.map