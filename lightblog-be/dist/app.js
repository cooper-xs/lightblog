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
require("reflect-metadata");
var koa_1 = __importDefault(require("koa"));
var cors_1 = __importDefault(require("@koa/cors"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var routes_1 = __importDefault(require("./routes"));
var routerResponse_1 = __importDefault(require("./utils/routerResponse"));
var koa_static_1 = __importDefault(require("koa-static"));
var data_source_1 = require("./config/data-source");
var winstonLogger_1 = require("./utils/winstonLogger");
var errorHandler_1 = __importDefault(require("./utils/errorHandler"));
var koa_session_1 = __importDefault(require("koa-session"));
var os_1 = __importDefault(require("os"));
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var app, host, hostname, port;
        return __generator(this, function (_a) {
            app = new koa_1.default();
            host = 'localhost';
            hostname = os_1.default.hostname();
            port = 3000;
            app.use((0, cors_1.default)({ origin: 'http://localhost:8080' }));
            app.use((0, koa_static_1.default)(__dirname + '/assets'));
            app.use((0, koa_bodyparser_1.default)());
            app.use((0, winstonLogger_1.loggerMount)());
            app.use(errorHandler_1.default);
            app.use(routerResponse_1.default);
            app.use(routes_1.default.routes()).use(routes_1.default.allowedMethods());
            app.keys = ['lightblogkey', 'adminkey', 'mykey'];
            app.use((0, koa_session_1.default)({
                key: 'koa:sess',
                maxAge: 7 * 24 * 60 * 1000, // 有效期为7天
            }, app));
            app.listen(port, function () {
                console.log("lightblog back-end running on http://".concat(host, ":").concat(port, "   hostname: ").concat(hostname));
            });
            return [2 /*return*/];
        });
    });
}
// 引导程序bootstrap
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, data_source_1.AppDataSource.initialize()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, start()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Run Error: ', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
bootstrap();
//# sourceMappingURL=app.js.map