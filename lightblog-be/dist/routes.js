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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("@koa/router"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("./config");
var ArticleController_1 = __importDefault(require("./controller/ArticleController"));
var ArticleTagReferencedController_1 = __importDefault(require("./controller/ArticleTagReferencedController"));
var CategoryController_1 = __importDefault(require("./controller/CategoryController"));
var DiscussController_1 = __importDefault(require("./controller/DiscussController"));
var TagController_1 = __importDefault(require("./controller/TagController"));
var UsersController_1 = __importDefault(require("./controller/UsersController"));
var errors_1 = require("./errors");
var routes = [
    {
        method: 'get',
        path: '/getArticleListByCategoriesAndTagsAsPage',
        controller: ArticleController_1.default,
        action: 'getArticleListByCategoriesAndTagsAsPage',
    },
    {
        method: 'get',
        path: '/getArticleForShow',
        controller: ArticleController_1.default,
        action: 'getArticleForShow',
    },
    {
        method: 'get',
        path: '/getArticleDetailForEdit',
        controller: ArticleController_1.default,
        action: 'getArticleDetailForEdit',
    },
    {
        method: 'get',
        path: '/searchArticle',
        controller: ArticleController_1.default,
        action: 'searchArticle',
    },
    {
        method: 'post',
        path: '/addArticle',
        controller: ArticleController_1.default,
        action: 'addArticle',
        needLogin: true,
    },
    {
        method: 'post',
        path: '/updateArticle',
        controller: ArticleController_1.default,
        action: 'updateArticle',
        needLogin: true,
    },
    {
        method: 'delete',
        path: '/deleteArticleById',
        controller: ArticleController_1.default,
        action: 'deleteArticleById',
        needLogin: true,
    },
    {
        method: 'get',
        path: '/getArticleListByCategoryId',
        controller: ArticleController_1.default,
        action: 'getArticleListByCategoryId',
    },
    {
        method: 'get',
        path: '/getArticleListByTagId',
        controller: ArticleController_1.default,
        action: 'getArticleListByTagId',
    },
    {
        method: 'post',
        path: '/addCategory',
        controller: CategoryController_1.default,
        action: 'addCategory',
        needLogin: true,
    },
    {
        method: 'post',
        path: '/updateCategory',
        controller: CategoryController_1.default,
        action: 'updateCategory',
        needLogin: true,
    },
    {
        method: 'delete',
        path: '/deleteCategory',
        controller: CategoryController_1.default,
        action: 'deleteCategory',
        needLogin: true,
    },
    {
        method: 'get',
        path: '/getCategoryList',
        controller: CategoryController_1.default,
        action: 'getCategoryList',
    },
    {
        method: 'post',
        path: '/addTag',
        controller: TagController_1.default,
        action: 'addTag',
        needLogin: true,
    },
    {
        method: 'post',
        path: '/updateTag',
        controller: TagController_1.default,
        action: 'updateTag',
        needLogin: true,
    },
    {
        method: 'delete',
        path: '/deleteTag',
        controller: TagController_1.default,
        action: 'deleteTag',
        needLogin: true,
    },
    {
        method: 'get',
        path: '/getTagListAll',
        controller: TagController_1.default,
        action: 'getTagListAll',
    },
    {
        method: 'post',
        path: '/addArticleTagReferenced',
        controller: ArticleTagReferencedController_1.default,
        action: 'addArticleTagReferenced',
        needLogin: true,
    },
    {
        method: 'delete',
        path: '/deleteArticleTagReferenced',
        controller: ArticleTagReferencedController_1.default,
        action: 'deleteArticleTagReferenced',
        needLogin: true,
    },
    {
        method: 'post',
        path: '/updateATRByArticleIdAndTagIds',
        controller: ArticleTagReferencedController_1.default,
        action: 'updateATRByArticleIdAndTagIds',
        needLogin: true,
    },
    {
        method: 'post',
        path: '/addUser',
        controller: UsersController_1.default,
        action: 'addUser',
    },
    {
        method: 'delete',
        path: '/deleteUser',
        controller: UsersController_1.default,
        action: 'deleteUser',
        needLogin: true,
    },
    {
        method: 'get',
        path: '/getUserListAll',
        controller: UsersController_1.default,
        action: 'getUserListAll',
    },
    {
        method: 'get',
        path: '/getUserByEmail',
        controller: UsersController_1.default,
        action: 'getUserByEmail',
    },
    {
        method: 'post',
        path: '/updateUser',
        controller: UsersController_1.default,
        action: 'updateUser',
        needLogin: true,
    },
    {
        method: 'post',
        path: '/addDiscuss',
        controller: DiscussController_1.default,
        action: 'addDiscuss',
    },
    {
        method: 'get',
        path: '/getDiscussAll',
        controller: DiscussController_1.default,
        action: 'getDiscussAll',
    },
    {
        method: 'get',
        path: '/getDiscussListByArticleId',
        controller: DiscussController_1.default,
        action: 'getDiscussListByArticleId',
    },
    {
        method: 'delete',
        path: '/deleteDiscussById',
        controller: DiscussController_1.default,
        action: 'deleteDiscussById',
        needLogin: true,
    },
    {
        method: 'post',
        path: '/login',
        controller: UsersController_1.default,
        action: 'login',
    },
];
var router = new router_1.default();
routes.forEach(function (route) {
    var middlewares = [];
    if (route.needLogin) {
        middlewares.push(checkLogin);
    }
    router[route.method].apply(router, __spreadArray(__spreadArray([route.path], middlewares, false), [function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var controller;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = new route.controller(ctx);
                        return [4 /*yield*/, controller[route.action]()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); }], false));
});
function checkLogin(ctx, next) {
    var token = ctx.cookies.get('token'); // 从 cookie 中获取 Token
    if (!token) {
        throw new errors_1.NoAdminError('没有登陆, 缺少token');
    }
    else {
        try {
            var decoded = jsonwebtoken_1.default.verify(token, config_1.TOKEN_CONF.secretToken); // 验证 Token 的合法性
            ctx.info('token验证通过');
            return next();
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new errors_1.NoAdminError('token已过期');
            }
            else {
                throw new errors_1.NoAdminError('token无效');
            }
        }
    }
}
exports.default = router;
//# sourceMappingURL=routes.js.map