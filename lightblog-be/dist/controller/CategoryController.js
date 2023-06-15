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
var CategoryService_1 = __importDefault(require("../service/CategoryService"));
var tool_1 = require("../utils/tool");
var CategoryController = /** @class */ (function () {
    function CategoryController(ctx) {
        this.ctx = ctx;
        this._articleService = new ArticleService_1.default(ctx);
        this._categoryService = new CategoryService_1.default(ctx);
    }
    /** 添加新分类 */
    CategoryController.prototype.addCategory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, categoryName, categoryAliasName, description, parentId, parentCategory, params, category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.request.body, categoryName = _a.categoryName, categoryAliasName = _a.categoryAliasName, description = _a.description, parentId = _a.parentId;
                        parentId = tool_1.tool.toNumber(parentId);
                        if (!categoryName) {
                            throw new errors_1.ParamsError('分类名称不能为空');
                        }
                        if (!categoryAliasName) {
                            throw new errors_1.ParamsError('分类别名不能为空');
                        }
                        return [4 /*yield*/, this._categoryService.getCategoryByName(categoryName)];
                    case 1:
                        // 检查分类名是否已存在
                        if (_b.sent()) {
                            throw new errors_1.DataValidationError('分类名称已存在');
                        }
                        // 格式化别名
                        categoryAliasName = tool_1.tool.formatUrlPath(categoryAliasName);
                        return [4 /*yield*/, this._categoryService.getCategoryByAliasName(categoryAliasName)];
                    case 2:
                        // 检查分类别名是否已存在
                        if (_b.sent()) {
                            throw new errors_1.DataValidationError('分类别名已存在');
                        }
                        if (!parentId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._categoryService.getCategoryById(parentId)];
                    case 3:
                        parentCategory = _b.sent();
                        if (!parentCategory) {
                            throw new errors_1.DataValidationError('父分类不存在');
                        }
                        _b.label = 4;
                    case 4:
                        params = {
                            categoryName: categoryName,
                            categoryAliasName: categoryAliasName,
                            description: description,
                            parentId: parentId,
                        };
                        return [4 /*yield*/, this._categoryService.addCategory(params)];
                    case 5:
                        category = _b.sent();
                        return [2 /*return*/, category];
                }
            });
        });
    };
    /** 修改分类 */
    CategoryController.prototype.updateCategory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, categoryId, categoryName, categoryAliasName, description, parentId, category, category1, category2, parentCategory, params, newCategory;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.request.body, categoryId = _a.categoryId, categoryName = _a.categoryName, categoryAliasName = _a.categoryAliasName, description = _a.description, parentId = _a.parentId;
                        categoryId = tool_1.tool.toNumber(categoryId);
                        parentId = tool_1.tool.toNumber(parentId);
                        if (!categoryName) {
                            throw new errors_1.ParamsError('分类名称不能为空');
                        }
                        if (!categoryAliasName) {
                            throw new errors_1.ParamsError('分类别名不能为空');
                        }
                        return [4 /*yield*/, this._categoryService.getCategoryById(categoryId)];
                    case 1:
                        category = _b.sent();
                        if (!category) {
                            throw new errors_1.DataValidationError('分类不存在');
                        }
                        return [4 /*yield*/, this._categoryService.getCategoryByName(categoryName)];
                    case 2:
                        category1 = _b.sent();
                        if (category1 && category1.categoryId !== categoryId) {
                            throw new errors_1.DataValidationError('分类名称已存在');
                        }
                        // 格式化别名
                        categoryAliasName = tool_1.tool.formatUrlPath(categoryAliasName);
                        return [4 /*yield*/, this._categoryService.getCategoryByAliasName(categoryAliasName)];
                    case 3:
                        category2 = _b.sent();
                        if (category2 && category2.categoryId !== categoryId) {
                            throw new errors_1.DataValidationError('分类别名已存在');
                        }
                        if (!parentId) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._categoryService.getCategoryById(parentId)];
                    case 4:
                        parentCategory = _b.sent();
                        if (!parentCategory) {
                            throw new errors_1.DataValidationError('父分类不存在');
                        }
                        _b.label = 5;
                    case 5:
                        // 检查父分类不能是自己
                        if (categoryId === parentId) {
                            throw new errors_1.DataValidationError('父分类不能是自己');
                        }
                        params = {
                            categoryId: categoryId,
                            categoryName: categoryName,
                            categoryAliasName: categoryAliasName,
                            description: description,
                            parentId: parentId,
                        };
                        return [4 /*yield*/, this._categoryService.updateCategory(params)];
                    case 6:
                        newCategory = _b.sent();
                        return [2 /*return*/, newCategory];
                }
            });
        });
    };
    /** 删除分类 */
    CategoryController.prototype.deleteCategory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categoryId, category, childCategoryList, articleList, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryId = this.ctx.query.categoryId;
                        categoryId = tool_1.tool.toNumber(categoryId);
                        return [4 /*yield*/, this._categoryService.getCategoryById(categoryId)];
                    case 1:
                        category = _a.sent();
                        if (!category) {
                            throw new errors_1.DataValidationError('分类不存在');
                        }
                        return [4 /*yield*/, this._categoryService.getCategoryByParentId(categoryId)];
                    case 2:
                        childCategoryList = _a.sent();
                        if (childCategoryList.children.length > 0) {
                            throw new errors_1.DataValidationError('请先删除该分类下的子分类或者取消父分类绑定');
                        }
                        return [4 /*yield*/, this._articleService.getArticleByCategoryId(categoryId)];
                    case 3:
                        articleList = _a.sent();
                        // 修改对应文章, 抹除categoryId
                        articleList.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var params;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        params = {
                                            articleId: item.articleId,
                                            categoryId: null,
                                        };
                                        return [4 /*yield*/, this._articleService.updateArticle(params)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, this._categoryService.deleteCategory(categoryId)];
                    case 4:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /** 查询分类的列表, 如果有父标签则返回其子标签 */
    CategoryController.prototype.getCategoryList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, parentId, categoryAliasName, category, categoryList, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.ctx.query, parentId = _a.parentId, categoryAliasName = _a.categoryAliasName;
                        parentId = tool_1.tool.toNumber(parentId);
                        if (!(!parentId && categoryAliasName)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._categoryService.getCategoryByAliasName(categoryAliasName)];
                    case 1:
                        category = _c.sent();
                        if (category) {
                            parentId = category.categoryId;
                        }
                        _c.label = 2;
                    case 2:
                        categoryList = null;
                        if (!!parentId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._categoryService.getAllCategory()];
                    case 3:
                        // 查询所有分类
                        categoryList = _c.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this._categoryService.getCategoryByParentId(parentId)];
                    case 5:
                        // 查询指定分类, 以及它的子分类
                        categoryList = _c.sent();
                        _b = categoryList;
                        return [4 /*yield*/, this._categoryService.getCategoryById(parentId)];
                    case 6:
                        _b.parent = _c.sent();
                        _c.label = 7;
                    case 7: return [2 /*return*/, categoryList];
                }
            });
        });
    };
    return CategoryController;
}());
exports.default = CategoryController;
//# sourceMappingURL=CategoryController.js.map