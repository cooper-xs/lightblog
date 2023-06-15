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
var Discuss_1 = require("../entities/Discuss");
var tool_1 = require("../utils/tool");
var DiscussService = /** @class */ (function () {
    function DiscussService(ctx) {
        this.ctx = ctx;
        this.ctx = ctx;
    }
    DiscussService.prototype.addDiscuss = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var discuss, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        discuss = new Discuss_1.Discuss();
                        discuss.articleId = params.articleId;
                        discuss.userId = params.userId;
                        discuss.content = params.content;
                        discuss.createTime = new Date();
                        discuss.parentId = params.parentId;
                        return [4 /*yield*/, data_source_1.DiscussRepository.save(discuss)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    DiscussService.prototype.getDiscussList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, viewDiscussList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.DiscussRepository.find()];
                    case 1:
                        res = _a.sent();
                        viewDiscussList = res.map(function (item) { return ({
                            discussId: item.discussId,
                            createTime: tool_1.tool.formatDate(item.createTime),
                            userId: item.userId,
                            articleId: item.articleId,
                            content: item.content,
                            parentId: item.parentId,
                        }); });
                        return [2 /*return*/, viewDiscussList];
                }
            });
        });
    };
    DiscussService.prototype.getDiscussById = function (discussId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.DiscussRepository.findOne({
                            where: { discussId: discussId },
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res.toViewDiscusses()];
                }
            });
        });
    };
    DiscussService.prototype.getDiscussByArticleId = function (articleId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, viewDiscussList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.DiscussRepository.find({
                            where: { articleId: articleId },
                        })];
                    case 1:
                        res = _a.sent();
                        viewDiscussList = res.map(function (item) { return ({
                            discussId: item.discussId,
                            createTime: tool_1.tool.formatDate(item.createTime),
                            userId: item.userId,
                            articleId: item.articleId,
                            content: item.content,
                            parentId: item.parentId,
                        }); });
                        return [2 /*return*/, viewDiscussList];
                }
            });
        });
    };
    DiscussService.prototype.getDiscussListByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.DiscussRepository.find({
                            where: { userId: userId },
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
    DiscussService.prototype.deleteDiscussById = function (discussId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, discuss;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.DiscussRepository.findOne({
                            where: { discussId: discussId },
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, data_source_1.DiscussRepository.remove(res)];
                    case 2:
                        discuss = _a.sent();
                        return [2 /*return*/, discuss];
                }
            });
        });
    };
    return DiscussService;
}());
exports.default = DiscussService;
//# sourceMappingURL=DiscussService.js.map