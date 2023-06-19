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
Object.defineProperty(exports, "__esModule", { value: true });
var data_source_1 = require("../config/data-source");
var Article_1 = require("../entities/Article");
var tool_1 = require("../utils/tool");
var ArticleService = /** @class */ (function () {
    function ArticleService(ctx) {
        this.ctx = ctx;
        this.ctx = ctx;
    }
    /** 添加新文章 */
    ArticleService.prototype.addArticle = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var title, postAliasName, article;
            return __generator(this, function (_a) {
                title = params.title, postAliasName = params.postAliasName;
                article = new Article_1.Article();
                article.title = title;
                article.postAliasName = postAliasName;
                article.createTime = new Date;
                article.pushDate = new Date('2030-01-01 00:00:00');
                return [2 /*return*/, data_source_1.ArticleRepository.save(article)];
            });
        });
    };
    /** 删除文章 */
    ArticleService.prototype.deleteArticle = function (articleId) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.ArticleRepository.findOne({
                            where: {
                                articleId: articleId,
                            },
                        })];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, data_source_1.ArticleRepository.remove(article)];
                }
            });
        });
    };
    /** 通过分类id查找文章
     * 返回所有分类id为categoryId的文章id
     */
    ArticleService.prototype.getArticleByCategoryId = function (categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var articles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.ArticleRepository.createQueryBuilder('article')
                            .leftJoinAndSelect('article.category', 'category')
                            .where('category.categoryId = :categoryId', { categoryId: categoryId })
                            .getMany()];
                    case 1:
                        articles = _a.sent();
                        if (!articles) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, articles];
                }
            });
        });
    };
    /** 通过别名查找文章 */
    ArticleService.prototype.getArticleByAliasName = function (postAliasName) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.ArticleRepository.findOne({
                            where: {
                                postAliasName: postAliasName,
                            },
                        })];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, article];
                }
            });
        });
    };
    /** 通过文章名称查找文章 */
    ArticleService.prototype.getArticleByTitle = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.ArticleRepository.findOne({
                            where: {
                                title: title,
                            },
                        })];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, article];
                }
            });
        });
    };
    /** 通过文章id查找文章, 返回以展示博文内容 */
    ArticleService.prototype.getArticleByIdForDetail = function (articleId) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.ArticleRepository.findOne({
                            where: {
                                articleId: articleId,
                            },
                        })];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                articleId: article.articleId,
                                title: article.title,
                                postAliasName: article.postAliasName,
                                summary: article.articleSummary,
                                updateTime: tool_1.tool.formatDate(article.pushDate),
                                topFlag: article.topFlag,
                                commentCount: article.commentCount,
                                readCount: article.readCount,
                                contentHtml: article.contentHtml,
                                previewImageUrl: article.previewImageUrl,
                                category: {
                                    categoryId: article.categoryId,
                                    categoryName: null,
                                    categoryAliasName: null,
                                },
                                tags: [
                                    {
                                        tagId: null,
                                        tagName: null,
                                        tagAliasName: null,
                                    },
                                ],
                            }];
                }
            });
        });
    };
    /** 通过文章别名查找文章, 返回以展示博文内容 */
    ArticleService.prototype.getArticleByAliasNameForDetail = function (postAliasName) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.ArticleRepository.findOne({
                            where: {
                                postAliasName: postAliasName,
                            },
                        })];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                articleId: article.articleId,
                                title: article.title,
                                postAliasName: article.postAliasName,
                                summary: article.articleSummary,
                                updateTime: tool_1.tool.formatDate(article.pushDate),
                                topFlag: article.topFlag,
                                commentCount: article.commentCount,
                                readCount: article.readCount,
                                contentHtml: article.contentHtml,
                                previewImageUrl: article.previewImageUrl,
                                category: {
                                    categoryId: article.categoryId,
                                    categoryName: null,
                                    categoryAliasName: null,
                                },
                                tags: [
                                    {
                                        tagId: null,
                                        tagName: null,
                                        tagAliasName: null,
                                    },
                                ],
                            }];
                }
            });
        });
    };
    /** 通过文章id查找文章 */
    ArticleService.prototype.getArticleById = function (articleId) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.ArticleRepository.findOne({
                            where: {
                                articleId: articleId,
                            },
                        })];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, article];
                }
            });
        });
    };
    /** 查找文章列表, 按照置顶等级和时间排序
     * 支持按照分类和标签查询
     * 返回分页数据
     */
    ArticleService.prototype.getArticleOrderByTopAndTime = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, categoryIds, tagIds, queryBuilder, _a, articles, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        page = params.page, limit = params.limit, categoryIds = params.categoryIds, tagIds = params.tagIds;
                        queryBuilder = data_source_1.ArticleRepository.createQueryBuilder('article');
                        if (categoryIds === null || categoryIds === void 0 ? void 0 : categoryIds.length) {
                            queryBuilder.where('article.categoryId IN (:...categoryIds)', {
                                categoryIds: categoryIds,
                            });
                        }
                        if (tagIds === null || tagIds === void 0 ? void 0 : tagIds.length) {
                            queryBuilder.innerJoin('article.articleTagReferenceds', 'atr', 'atr.tagId IN (:...tagIds)', {
                                tagIds: tagIds,
                            });
                        }
                        return [4 /*yield*/, queryBuilder
                                .distinct(true)
                                .orderBy({
                                'article.topFlag': 'DESC',
                                'article.createTime': 'DESC',
                            })
                                .skip((page - 1) * limit)
                                .take(limit)
                                .getManyAndCount()];
                    case 1:
                        _a = _b.sent(), articles = _a[0], count = _a[1];
                        if (!articles.length) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                info: {
                                    currentPage: page,
                                    totalPage: Math.ceil(count / limit),
                                    totalItem: count,
                                    pageSize: limit,
                                },
                                list: articles.map(function (article) {
                                    return {
                                        articleId: article.articleId,
                                        title: article.title,
                                        postAliasName: article.postAliasName,
                                        summary: article.articleSummary,
                                        updateTime: tool_1.tool.formatDate(article.pushDate),
                                        topFlag: article.topFlag,
                                        previewImageUrl: article.previewImageUrl,
                                        category: {
                                            categoryId: article.categoryId,
                                            categoryName: null,
                                            categoryAliasName: null,
                                        },
                                        tags: [
                                            {
                                                tagId: null,
                                                tagName: null,
                                                tagAliasName: null,
                                            },
                                        ],
                                    };
                                }),
                            }];
                }
            });
        });
    };
    /** 通过关键词搜索文章 */
    ArticleService.prototype.getArticleByKeyword = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, keywords, queryBuilder, firstKeyword, restKeywords, _a, articles, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        page = params.page, limit = params.limit, keywords = params.keywords;
                        queryBuilder = data_source_1.ArticleRepository.createQueryBuilder('article')
                            .orderBy({
                            'article.topFlag': 'DESC',
                            'article.createTime': 'DESC',
                        })
                            .skip((page - 1) * limit)
                            .take(limit);
                        if (keywords.length >= 1) {
                            firstKeyword = keywords[0], restKeywords = keywords.slice(1);
                            queryBuilder.where('article.title LIKE :firstKeyword', { firstKeyword: "%".concat(firstKeyword, "%") });
                            restKeywords.forEach(function (keyword) {
                                queryBuilder.orWhere('article.title LIKE :keyword', { keyword: "%".concat(keyword, "%") });
                            });
                        }
                        return [4 /*yield*/, queryBuilder.getManyAndCount()];
                    case 1:
                        _a = _b.sent(), articles = _a[0], count = _a[1];
                        if (!articles.length) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                info: {
                                    currentPage: page,
                                    totalPage: Math.ceil(count / limit),
                                    totalItem: count,
                                    pageSize: limit,
                                },
                                list: articles.map(function (article) {
                                    return {
                                        articleId: article.articleId,
                                        title: article.title,
                                        postAliasName: article.postAliasName,
                                        summary: article.articleSummary,
                                        updateTime: tool_1.tool.formatDate(article.pushDate),
                                        topFlag: article.topFlag,
                                        previewImageUrl: article.previewImageUrl,
                                        category: {
                                            categoryId: article.categoryId,
                                            categoryName: null,
                                            categoryAliasName: null,
                                        },
                                        tags: [
                                            {
                                                tagId: null,
                                                tagName: null,
                                                tagAliasName: null,
                                            },
                                        ],
                                    };
                                }),
                            }];
                }
            });
        });
    };
    /** 浏览量+1 */
    ArticleService.prototype.updateArticleViewCount = function (articleId) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.ArticleRepository.findOne({
                            where: {
                                articleId: articleId,
                            },
                        })];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            return [2 /*return*/, null];
                        }
                        article.readCount += 1;
                        return [4 /*yield*/, data_source_1.ArticleRepository.save(article)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 更新文章内容 */
    ArticleService.prototype.updateArticle = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var articleId, title, postAliasName, topFlag, articleSummary, previewImageUrl, categoryId, contentMd, contentHtml, article, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        articleId = params.articleId, title = params.title, postAliasName = params.postAliasName, topFlag = params.topFlag, articleSummary = params.articleSummary, previewImageUrl = params.previewImageUrl, categoryId = params.categoryId, contentMd = params.contentMd, contentHtml = params.contentHtml;
                        return [4 /*yield*/, data_source_1.ArticleRepository.findOne({
                                where: {
                                    articleId: articleId,
                                },
                            })];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            return [2 /*return*/, null];
                        }
                        article.title = title;
                        article.postAliasName = postAliasName;
                        article.topFlag = topFlag;
                        article.articleSummary = articleSummary;
                        article.previewImageUrl = previewImageUrl;
                        article.categoryId = categoryId;
                        article.contentMd = contentMd;
                        article.contentHtml = contentHtml;
                        article.pushDate = new Date();
                        return [4 /*yield*/, data_source_1.ArticleRepository.save(article)];
                    case 2:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return ArticleService;
}());
exports.default = ArticleService;
//# sourceMappingURL=ArticleService.js.map