export const TOKEN_CONF = {
    secretToken: 'light',
}

// 数据库配置
export const DATASOURCE = {
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "blog",
    synchronize: true,
}

// 全局变量声明
declare global {
    namespace NodeJS {
        interface Global {
            secretToken: string;
            host: string;
            port: number;
            username: string;
            password: string;
            database: string;
            synchronize: boolean;
        }
    }
}

global.secretToken = TOKEN_CONF.secretToken;
global.host = DATASOURCE.host;
global.port = DATASOURCE.port;
global.username = DATASOURCE.username;
global.password = DATASOURCE.password;
global.database = DATASOURCE.database;
global.synchronize = DATASOURCE.synchronize;
