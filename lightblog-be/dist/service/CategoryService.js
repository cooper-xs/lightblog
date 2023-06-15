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
var Category_1 = require("../entities/Category");
var CategoryService = /** @class */ (function () {
    function CategoryService(ctx) {
        this.ctx = ctx;
        this.ctx = ctx;
    }
    /** 添加新分类 */
    CategoryService.prototype.addCategory = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category = new Category_1.Category();
                        category.categoryName = params.categoryName;
                        category.categoryAliasName = params.categoryAliasName;
                        category.description = params.description;
                        category.parentId = params.parentId;
                        category.createTime = new Date();
                        return [4 /*yield*/, data_source_1.CategoryRepository.save(category)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** 修改分类 */
    CategoryService.prototype.updateCategory = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.CategoryRepository.findOne({
                            where: {
                                categoryId: params.categoryId,
                            },
                        })];
                    case 1:
                        category = _a.sent();
                        category.categoryName = params.categoryName;
                        category.categoryAliasName = params.categoryAliasName;
                        category.description = params.description;
                        category.parentId = params.parentId;
                        return [4 /*yield*/, data_source_1.CategoryRepository.save(category)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** 删除分类 */
    CategoryService.prototype.deleteCategory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.CategoryRepository.findOne({
                            where: {
                                categoryId: id,
                            },
                        })];
                    case 1:
                        category = _a.sent();
                        return [4 /*yield*/, data_source_1.CategoryRepository.remove(category)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** 查询所有分类 */
    CategoryService.prototype.getAllCategory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.CategoryRepository.find()];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                parent: null,
                                children: res.map(function (item) { return item.toViewCategory(); }),
                            }];
                }
            });
        });
    };
    /** * 根据id查询分类 */
    CategoryService.prototype.getCategoryById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.CategoryRepository.findOne({
                            where: {
                                categoryId: id,
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res.toViewCategory()];
                }
            });
        });
    };
    /** * 根据父标签id查询分类 */
    CategoryService.prototype.getCategoryByParentId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.CategoryRepository.find({
                            where: {
                                parentId: id,
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                parent: null,
                                children: res.map(function (item) { return item.toViewCategory(); }),
                            }];
                }
            });
        });
    };
    /**
     * 根据分类名查询分类
     */
    CategoryService.prototype.getCategoryByName = function (categoryName) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.CategoryRepository.findOne({
                            where: {
                                categoryName: categoryName,
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * 根据分类别名查询分类
     */
    CategoryService.prototype.getCategoryByAliasName = function (categoryAliasName) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.CategoryRepository.findOne({
                            where: {
                                categoryAliasName: categoryAliasName,
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return CategoryService;
}());
exports.default = CategoryService;
//# sourceMappingURL=CategoryService.js.map