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
var errors_1 = require("../errors");
var ArticleService_1 = __importDefault(require("../service/ArticleService"));
var ArticleTagReferencedService_1 = __importDefault(require("../service/ArticleTagReferencedService"));
var TagService_1 = __importDefault(require("../service/TagService"));
var tool_1 = require("../utils/tool");
var ArticleTagReferencedController = /** @class */ (function () {
    function ArticleTagReferencedController(ctx) {
        this.ctx = ctx;
        this._articleService = new ArticleService_1.default(ctx);
        this._tagService = new TagService_1.default(ctx);
        this._articleTagReferencedService = new ArticleTagReferencedService_1.default(ctx);
    }
    /** 添加文章-标签关联 */
    ArticleTagReferencedController.prototype.addArticleTagReferenced = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, articleId, tagId, article, tag, params, atr, articleTagReferenced;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.request.body, articleId = _a.articleId, tagId = _a.tagId;
                        articleId = tool_1.tool.toNumber(articleId);
                        tagId = tool_1.tool.toNumber(tagId);
                        return [4 /*yield*/, this._articleService.getArticleById(articleId)];
                    case 1:
                        article = _b.sent();
                        if (!article) {
                            throw new errors_1.DataNotFoundError('文章不存在');
                        }
                        return [4 /*yield*/, this._tagService.getTagById(tagId)];
                    case 2:
                        tag = _b.sent();
                        if (!tag) {
                            throw new errors_1.DataNotFoundError('标签不存在');
                        }
                        params = {
                            articleId: articleId,
                            tagId: tagId,
                        };
                        return [4 /*yield*/, this._articleTagReferencedService.getArticleTagReferencedByTagIdAndArticleId(params)];
                    case 3:
                        atr = _b.sent();
                        if (atr) {
                            throw new errors_1.DataValidationError('文章-标签关联已存在');
                        }
                        return [4 /*yield*/, this._articleTagReferencedService.addArticleTagReferenced(params)];
                    case 4:
                        articleTagReferenced = _b.sent();
                        return [2 /*return*/, articleTagReferenced];
                }
            });
        });
    };
    /** 删除文章-标签关联
     * 如果有关联id, 则根据关联id删除
     * 如果没有关联id, 则根据文章id和标签id删除
     */
    ArticleTagReferencedController.prototype.deleteArticleTagReferenced = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, atrId, articleId, tagId, atr, article, tag, params, articleTagReferenced;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.request.query, atrId = _a.atrId, articleId = _a.articleId, tagId = _a.tagId;
                        atrId = tool_1.tool.toNumber(atrId);
                        articleId = tool_1.tool.toNumber(articleId);
                        tagId = tool_1.tool.toNumber(tagId);
                        this.ctx.info("\u5220\u9664\u6587\u7AE0-\u6807\u7B7E\u5173\u8054: atrId: ".concat(atrId, ", articleId: ").concat(articleId, ", tagId: ").concat(tagId));
                        return [4 /*yield*/, this._articleTagReferencedService.getArticleTagReferencedById(atrId)];
                    case 1:
                        atr = _b.sent();
                        if (!atr) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._articleTagReferencedService.deleteArticleTagReferencedById(atrId)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        if (!articleId || !tagId) {
                            throw new errors_1.ParamsError('文章id或标签id不能为空');
                        }
                        return [4 /*yield*/, this._articleService.getArticleById(articleId)];
                    case 4:
                        article = _b.sent();
                        if (!article) {
                            throw new errors_1.DataNotFoundError('文章不存在');
                        }
                        return [4 /*yield*/, this._tagService.getTagById(tagId)];
                    case 5:
                        tag = _b.sent();
                        if (!tag) {
                            throw new errors_1.DataNotFoundError('标签不存在');
                        }
                        params = {
                            articleId: articleId,
                            tagId: tagId,
                        };
                        return [4 /*yield*/, this._articleTagReferencedService.getArticleTagReferencedByTagIdAndArticleId(params)];
                    case 6:
                        // 检查文章-标签关联是否已存在
                        atr = _b.sent();
                        if (!atr) {
                            throw new errors_1.DataValidationError('文章-标签关联不存在');
                        }
                        return [4 /*yield*/, this._articleTagReferencedService.deleteArticleTagReferencedById(atr.atrId)];
                    case 7:
                        articleTagReferenced = _b.sent();
                        return [2 /*return*/, articleTagReferenced];
                }
            });
        });
    };
    /** 更新文章的标签关联 */
    ArticleTagReferencedController.prototype.updateATRByArticleIdAndTagIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, articleId, tagIds, article, articleTagReferencedList, currentTagIds, deleteTagIds, _loop_1, this_1, _i, deleteTagIds_1, tagId, addTagIds, _b, addTagIds_1, tagId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.ctx.request.body, articleId = _a.articleId, tagIds = _a.tagIds;
                        articleId = tool_1.tool.toNumber(articleId);
                        tagIds = tagIds.split(',').map(function (tagId) { return tool_1.tool.toNumber(tagId); });
                        console.log('articleId', articleId);
                        console.log('tagIds', tagIds);
                        return [4 /*yield*/, this._articleService.getArticleById(articleId)];
                    case 1:
                        article = _c.sent();
                        if (!article) {
                            throw new errors_1.DataNotFoundError('文章不存在');
                        }
                        return [4 /*yield*/, this._articleTagReferencedService.getArticleTagReferencedByArticleId(articleId)];
                    case 2:
                        articleTagReferencedList = _c.sent();
                        currentTagIds = articleTagReferencedList.map(function (atr) { return atr.tagId; });
                        deleteTagIds = currentTagIds.filter(function (tagId) { return !tagIds.includes(tagId); });
                        _loop_1 = function (tagId) {
                            var atr;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        atr = articleTagReferencedList.find(function (atr) { return atr.tagId === tagId; });
                                        if (!atr) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_1._articleTagReferencedService.deleteArticleTagReferencedById(atr.atrId)];
                                    case 1:
                                        _d.sent();
                                        _d.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, deleteTagIds_1 = deleteTagIds;
                        _c.label = 3;
                    case 3:
                        if (!(_i < deleteTagIds_1.length)) return [3 /*break*/, 6];
                        tagId = deleteTagIds_1[_i];
                        return [5 /*yield**/, _loop_1(tagId)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        addTagIds = tagIds.filter(function (tagId) { return !currentTagIds.includes(tagId); });
                        _b = 0, addTagIds_1 = addTagIds;
                        _c.label = 7;
                    case 7:
                        if (!(_b < addTagIds_1.length)) return [3 /*break*/, 10];
                        tagId = addTagIds_1[_b];
                        // 获取需要添加的关联id
                        return [4 /*yield*/, this._articleTagReferencedService.addArticleTagReferenced({ articleId: articleId, tagId: tagId })];
                    case 8:
                        // 获取需要添加的关联id
                        _c.sent();
                        _c.label = 9;
                    case 9:
                        _b++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, null];
                }
            });
        });
    };
    return ArticleTagReferencedController;
}());
exports.default = ArticleTagReferencedController;
//# sourceMappingURL=ArticleTagReferencedController.js.map