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
var DiscussService_1 = __importDefault(require("../service/DiscussService"));
var UsersService_1 = __importDefault(require("../service/UsersService"));
var tool_1 = require("../utils/tool");
var config_1 = require("../config");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 引入jwt
// import jwt from 'jsonwebtoken';
var UsersController = /** @class */ (function () {
    function UsersController(ctx) {
        this.ctx = ctx;
        this._usersService = new UsersService_1.default(ctx);
        this._discussService = new DiscussService_1.default(ctx);
    }
    /** 通过邮箱查询用户 */
    UsersController.prototype.getUserByEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var email, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = this.ctx.query.email;
                        if (!email) {
                            throw new errors_1.ParamsError('用户邮箱不能为空');
                        }
                        if (!tool_1.tool.checkEmail(email)) {
                            throw new errors_1.DataValidationError('用户邮箱格式不正确');
                        }
                        return [4 /*yield*/, this._usersService.getUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /** 注册新用户 */
    UsersController.prototype.addUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userNickname, email, params, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.request.body, userNickname = _a.userNickname, email = _a.email;
                        if (!userNickname) {
                            throw new errors_1.ParamsError('用户昵称不能为空');
                        }
                        if (!email) return [3 /*break*/, 2];
                        if (!tool_1.tool.checkEmail(email)) {
                            throw new errors_1.DataValidationError('用户邮箱格式不正确');
                        }
                        return [4 /*yield*/, this._usersService.getUserByEmail(email)];
                    case 1:
                        if (_b.sent()) {
                            throw new errors_1.DataValidationError('用户邮箱已存在');
                        }
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this._usersService.getUserByNickname(userNickname)];
                    case 3:
                        if (_b.sent()) {
                            throw new errors_1.DataValidationError('用户昵称已存在');
                        }
                        params = {
                            userNickname: userNickname,
                            email: email,
                        };
                        return [4 /*yield*/, this._usersService.addUser(params)];
                    case 4:
                        user = _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /** 获取用户列表 */
    UsersController.prototype.getUserListAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._usersService.getUserListAll()];
                    case 1:
                        userList = _a.sent();
                        return [2 /*return*/, userList];
                }
            });
        });
    };
    /** 根据id删除用户 */
    UsersController.prototype.deleteUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId, discussList, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this.ctx.query.userId;
                        userId = tool_1.tool.toNumber(userId);
                        if (!userId) {
                            throw new errors_1.ParamsError('用户ID不能为空');
                        }
                        return [4 /*yield*/, this._usersService.getUserById(userId)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new errors_1.DataValidationError('用户不存在');
                        }
                        return [4 /*yield*/, this._discussService.getDiscussListByUserId(userId)];
                    case 2:
                        discussList = _a.sent();
                        if (discussList.length) {
                            discussList.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._discussService.deleteDiscussById(item.discussId)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            this.ctx.warn('删除用户相关评论成功, 用户id = ', userId);
                        }
                        return [4 /*yield*/, this._usersService.deleteUser(userId)];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /** 根据id更新用户名 */
    UsersController.prototype.updateUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, userNickname, email, userT, emailT, params, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.request.body, userId = _a.userId, userNickname = _a.userNickname, email = _a.email;
                        userId = tool_1.tool.toNumber(userId);
                        if (!userId) {
                            throw new errors_1.ParamsError('用户ID不能为空');
                        }
                        if (!userNickname) {
                            throw new errors_1.ParamsError('用户昵称不能为空');
                        }
                        return [4 /*yield*/, this._usersService.getUserById(userId)];
                    case 1:
                        if (!(_b.sent())) {
                            throw new errors_1.DataValidationError('用户不存在');
                        }
                        return [4 /*yield*/, this._usersService.getUserByNickname(userNickname)];
                    case 2:
                        userT = _b.sent();
                        if (userT && userT.userId !== userId) {
                            throw new errors_1.DataValidationError('用户昵称已存在');
                        }
                        if (!email) return [3 /*break*/, 4];
                        if (!tool_1.tool.checkEmail(email)) {
                            throw new errors_1.DataValidationError('用户邮箱格式不正确');
                        }
                        return [4 /*yield*/, this._usersService.getUserByEmail(email)];
                    case 3:
                        emailT = _b.sent();
                        if (emailT && emailT.userId !== userId) {
                            throw new errors_1.DataValidationError('用户邮箱已存在');
                        }
                        _b.label = 4;
                    case 4:
                        params = {
                            userId: userId,
                            userNickname: userNickname,
                            email: email,
                        };
                        return [4 /*yield*/, this._usersService.updateUser(params)];
                    case 5:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /** 管理员登录 */
    UsersController.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pwd, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pwd = this.ctx.request.body.pwd;
                        this.ctx.info('管理员登录, pwd = ', pwd);
                        if (!(pwd === config_1.TOKEN_CONF.secretToken)) return [3 /*break*/, 2];
                        this.ctx.info('密码验证正确');
                        return [4 /*yield*/, jsonwebtoken_1.default.sign({ pwd: pwd }, config_1.TOKEN_CONF.secretToken, { expiresIn: config_1.TOKEN_CONF.expiresIn })];
                    case 1:
                        token = _a.sent();
                        this.ctx.session.token = token;
                        return [2 /*return*/, {
                                token: token,
                            }];
                    case 2:
                        this.ctx.warn('密码验证失败', pwd);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map