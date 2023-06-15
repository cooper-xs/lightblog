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
var ArticleTagReferencedService_1 = __importDefault(require("../service/ArticleTagReferencedService"));
var TagService_1 = __importDefault(require("../service/TagService"));
var tool_1 = require("../utils/tool");
var TagController = /** @class */ (function () {
    function TagController(ctx) {
        this.ctx = ctx;
        this._tagService = new TagService_1.default(ctx);
        this._articleTagReferencedService = new ArticleTagReferencedService_1.default(ctx);
    }
    /** 添加标签 */
    TagController.prototype.addTag = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tagName, tagAliasName, description, params, tag;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.request.body, tagName = _a.tagName, tagAliasName = _a.tagAliasName, description = _a.description;
                        if (!tagName) {
                            throw new errors_1.ParamsError('标签名称不能为空');
                        }
                        if (!tagAliasName) {
                            throw new errors_1.ParamsError('标签别名不能为空');
                        }
                        return [4 /*yield*/, this._tagService.getTagByName(tagName)];
                    case 1:
                        // 检查标签名是否已存在
                        if (_b.sent()) {
                            throw new errors_1.DataValidationError('标签名称已存在');
                        }
                        // 格式化别名
                        tagAliasName = tool_1.tool.formatUrlPath(tagAliasName);
                        return [4 /*yield*/, this._tagService.getTagByAliasName(tagAliasName)];
                    case 2:
                        if (_b.sent()) {
                            throw new errors_1.DataValidationError('标签别名已存在');
                        }
                        params = {
                            tagName: tagName,
                            tagAliasName: tagAliasName,
                            description: description,
                        };
                        return [4 /*yield*/, this._tagService.addTag(params)];
                    case 3:
                        tag = _b.sent();
                        return [2 /*return*/, tag];
                }
            });
        });
    };
    /** 修改标签 */
    TagController.prototype.updateTag = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tagId, tagName, tagAliasName, description, tag, _b, _c, params, newTag;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.ctx.request.body, tagId = _a.tagId, tagName = _a.tagName, tagAliasName = _a.tagAliasName, description = _a.description;
                        tagId = tool_1.tool.toNumber(tagId);
                        if (!tagId) {
                            throw new errors_1.ParamsError('标签id不能为空');
                        }
                        if (!tagName) {
                            throw new errors_1.ParamsError('标签名称不能为空');
                        }
                        if (!tagAliasName) {
                            throw new errors_1.ParamsError('标签别名不能为空');
                        }
                        tagId = tool_1.tool.toNumber(tagId);
                        return [4 /*yield*/, this._tagService.getTagById(tagId)];
                    case 1:
                        tag = _d.sent();
                        if (!tag) {
                            throw new errors_1.DataNotFoundError('标签不存在');
                        }
                        _b = tag.tagName !== tagName;
                        if (!_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._tagService.getTagByName(tagName)];
                    case 2:
                        _b = (_d.sent());
                        _d.label = 3;
                    case 3:
                        // 检查标签名是否已存在
                        if (_b) {
                            throw new errors_1.DataValidationError('标签名称已存在');
                        }
                        // 格式化别名
                        tagAliasName = tool_1.tool.formatUrlPath(tagAliasName);
                        _c = tag.tagAliasName !== tagAliasName;
                        if (!_c) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._tagService.getTagByAliasName(tagAliasName)];
                    case 4:
                        _c = (_d.sent());
                        _d.label = 5;
                    case 5:
                        if (_c) {
                            throw new errors_1.DataValidationError('标签别名已存在');
                        }
                        params = {
                            tagId: tagId,
                            tagName: tagName,
                            tagAliasName: tagAliasName,
                            description: description,
                        };
                        return [4 /*yield*/, this._tagService.updateTag(params)];
                    case 6:
                        newTag = _d.sent();
                        return [2 /*return*/, newTag];
                }
            });
        });
    };
    /** 删除标签 */
    TagController.prototype.deleteTag = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tagId, tag, atr, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagId = this.ctx.query.tagId;
                        tagId = tool_1.tool.toNumber(tagId);
                        if (!tagId) {
                            throw new errors_1.ParamsError('标签id不能为空');
                        }
                        return [4 /*yield*/, this._tagService.getTagById(tagId)];
                    case 1:
                        tag = _a.sent();
                        if (!tag) {
                            throw new errors_1.DataNotFoundError('标签不存在');
                        }
                        return [4 /*yield*/, this._articleTagReferencedService.getArticleTagReferencedByTagId(tagId)];
                    case 2:
                        atr = _a.sent();
                        // 删除这些文章-标签关联
                        atr.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._articleTagReferencedService.deleteArticleTagReferencedById(item.atrId)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, this._tagService.deleteTag(tagId)];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /** 获取所有标签列表 */
    TagController.prototype.getTagListAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tagList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._tagService.getTagListAll()];
                    case 1:
                        tagList = _a.sent();
                        return [2 /*return*/, tagList];
                }
            });
        });
    };
    return TagController;
}());
exports.default = TagController;
//# sourceMappingURL=TagController.js.map