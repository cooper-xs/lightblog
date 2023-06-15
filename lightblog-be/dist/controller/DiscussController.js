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
var tool_1 = require("../utils/tool");
var ArticleService_1 = __importDefault(require("../service/ArticleService"));
var UsersService_1 = __importDefault(require("../service/UsersService"));
var DiscussService_1 = __importDefault(require("../service/DiscussService"));
var errors_1 = require("../errors");
var DiscussController = /** @class */ (function () {
    function DiscussController(ctx) {
        this.ctx = ctx;
        this._articleService = new ArticleService_1.default(ctx);
        this._usersService = new UsersService_1.default(ctx);
        this._discussService = new DiscussService_1.default(ctx);
    }
    DiscussController.prototype.addDiscuss = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, articleId, userId, content, parentId, article, user, parentDiscuss, params, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.request.body, articleId = _a.articleId, userId = _a.userId, content = _a.content, parentId = _a.parentId;
                        articleId = tool_1.tool.toNumber(articleId);
                        userId = tool_1.tool.toNumber(userId);
                        parentId = tool_1.tool.toNumber(parentId);
                        console.log(articleId, userId, content, parentId);
                        if (!articleId) {
                            throw new errors_1.ParamsError('文章ID不能为空');
                        }
                        if (!userId) {
                            throw new errors_1.ParamsError('用户ID不能为空');
                        }
                        if (!content) {
                            throw new errors_1.ParamsError('评论内容不能为空');
                        }
                        return [4 /*yield*/, this._articleService.getArticleById(articleId)];
                    case 1:
                        article = _b.sent();
                        if (!article) {
                            throw new errors_1.DataNotFoundError('文章不存在');
                        }
                        return [4 /*yield*/, this._usersService.getUserById(userId)];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            throw new errors_1.DataNotFoundError('用户不存在');
                        }
                        if (!parentId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._discussService.getDiscussById(parentId)];
                    case 3:
                        parentDiscuss = _b.sent();
                        if (!parentDiscuss) {
                            throw new errors_1.DataNotFoundError('父评论不存在');
                        }
                        _b.label = 4;
                    case 4:
                        params = {
                            articleId: articleId,
                            userId: userId,
                            content: content,
                            parentId: parentId,
                        };
                        return [4 /*yield*/, this._discussService.addDiscuss(params)];
                    case 5:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    DiscussController.prototype.getDiscussListByArticleId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var articleId, article, res, i, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        articleId = this.ctx.query.articleId;
                        articleId = tool_1.tool.toNumber(articleId);
                        if (!articleId) {
                            throw new errors_1.ParamsError('文章ID不能为空');
                        }
                        return [4 /*yield*/, this._articleService.getArticleById(articleId)];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            throw new errors_1.DataValidationError('文章不存在');
                        }
                        return [4 /*yield*/, this._discussService.getDiscussByArticleId(articleId)];
                    case 2:
                        res = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < res.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._usersService.getUserById(res[i].userId)];
                    case 4:
                        user = _a.sent();
                        res[i].userNickname = user.userNickname;
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, res];
                }
            });
        });
    };
    DiscussController.prototype.getDiscussAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._discussService.getDiscussList()];
                    case 1:
                        res = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < res.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._usersService.getUserById(res[i].userId)];
                    case 3:
                        user = _a.sent();
                        res[i].userNickname = user.userNickname;
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, res];
                }
            });
        });
    };
    DiscussController.prototype.deleteDiscussById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, discuss, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = this.ctx.query.id;
                        id = tool_1.tool.toNumber(id);
                        if (!id) {
                            throw new errors_1.ParamsError('评论ID不能为空');
                        }
                        return [4 /*yield*/, this._discussService.getDiscussById(id)];
                    case 1:
                        discuss = _a.sent();
                        if (!discuss) {
                            throw new errors_1.DataValidationError('评论不存在');
                        }
                        return [4 /*yield*/, this._discussService.deleteDiscussById(id)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return DiscussController;
}());
exports.default = DiscussController;
//# sourceMappingURL=DiscussController.js.map