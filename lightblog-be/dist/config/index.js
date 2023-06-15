"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATASOURCE = exports.TOKEN_CONF = void 0;
exports.TOKEN_CONF = {
    secretToken: '4dffab4b7302739598ad0207f9fb76e7ab69ce3f54fd5adddf7d208825f12a2f',
    secretKey: 'access-token',
    expiresIn: '2h',
};
// 数据库配置
exports.DATASOURCE = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'blog',
    synchronize: true,
};
global.secretToken = exports.TOKEN_CONF.secretToken;
global.secretKey = exports.TOKEN_CONF.secretKey;
global.expiresIn = exports.TOKEN_CONF.expiresIn;
global.host = exports.DATASOURCE.host;
global.port = exports.DATASOURCE.port;
global.username = exports.DATASOURCE.username;
global.password = exports.DATASOURCE.password;
global.database = exports.DATASOURCE.database;
global.synchronize = exports.DATASOURCE.synchronize;
//# sourceMappingURL=index.js.map