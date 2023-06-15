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
var Tag_1 = require("../entities/Tag");
var TagService = /** @class */ (function () {
    function TagService(ctx) {
        this.ctx = ctx;
        this.ctx = ctx;
    }
    /** 添加标签 */
    TagService.prototype.addTag = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var tag, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = new Tag_1.Tag();
                        tag.tagName = params.tagName;
                        tag.tagAliasName = params.tagAliasName;
                        tag.description = params.description;
                        tag.createTime = new Date();
                        return [4 /*yield*/, data_source_1.TagRepository.save(tag)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /** 修改标签 */
    TagService.prototype.updateTag = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var tag, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.TagRepository.findOne({
                            where: {
                                tagId: params.tagId,
                            },
                        })];
                    case 1:
                        tag = _a.sent();
                        tag.tagName = params.tagName;
                        tag.tagAliasName = params.tagAliasName;
                        tag.description = params.description;
                        return [4 /*yield*/, data_source_1.TagRepository.save(tag)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /** 删除标签 */
    TagService.prototype.deleteTag = function (tagId) {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.TagRepository.findOne({
                            where: {
                                tagId: tagId,
                            },
                        })];
                    case 1:
                        tag = _a.sent();
                        return [4 /*yield*/, data_source_1.TagRepository.remove(tag)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** 通过文章id查找标签 */
    TagService.prototype.getTagByArticleId = function (articleId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.TagRepository.createQueryBuilder('tag')
                            .innerJoin('tag.articleTagReferenceds', 'atr', 'atr.articleId = :articleId', { articleId: articleId })
                            .getMany()];
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
    /** 查找所有标签, 格式化日期返回 */
    TagService.prototype.getTagListAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.TagRepository.find()];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res.map(function (item) { return item.toViewTag(); })];
                }
            });
        });
    };
    /** 通过标签id查找标签 */
    TagService.prototype.getTagById = function (tagId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.TagRepository.findOne({
                            where: {
                                tagId: tagId,
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res.toViewTag()];
                }
            });
        });
    };
    /** 通过标签名查找标签 */
    TagService.prototype.getTagByName = function (tagName) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.TagRepository.findOne({
                            where: {
                                tagName: tagName,
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res.toViewTag()];
                }
            });
        });
    };
    /** 通过标签别名查找标签 */
    TagService.prototype.getTagByAliasName = function (tagAliasName) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.TagRepository.findOne({
                            where: {
                                tagAliasName: tagAliasName,
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res.toViewTag()];
                }
            });
        });
    };
    return TagService;
}());
exports.default = TagService;
//# sourceMappingURL=TagService.js.map