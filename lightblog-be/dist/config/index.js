"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATASOURCE = exports.TOKEN_CONF = void 0;
exports.TOKEN_CONF = {
    secretToken: '4dffab4b7302739598ad0207f9fb76e7ab69ce3f54fd5adddf7d208825f12a2f',
    secretKey: 'access-token',
    expiresIn: '2h',
};
// 从环境变量中获取配置值
var host = process.env.DB_HOST || 'localhost';
// const port = process.env.DB_PORT || 3306;
var port = Number(process.env.DB_PORT) || 3306;
var username = process.env.DB_USERNAME || 'root';
var password = process.env.DB_PASSWORD || 'root';
var database = process.env.DB_DATABASE || 'blog';
// const synchronize = process.env.DB_SYNCHRONIZE || false;
var synchronize = Boolean(process.env.DB_SYNCHRONIZE) || false;
// 导出数据库配置对象
exports.DATASOURCE = {
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    synchronize: synchronize,
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