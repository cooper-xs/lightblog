export const TOKEN_CONF = {
  secretToken: '4dffab4b7302739598ad0207f9fb76e7ab69ce3f54fd5adddf7d208825f12a2f',
  secretKey: 'access-token',
  expiresIn: '2h',
};

// 数据库配置
export const DATASOURCE = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'blog',
  synchronize: true,
};

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
global.secretKey = TOKEN_CONF.secretKey;
global.expiresIn = TOKEN_CONF.expiresIn;
global.host = DATASOURCE.host;
global.port = DATASOURCE.port;
global.username = DATASOURCE.username;
global.password = DATASOURCE.password;
global.database = DATASOURCE.database;
global.synchronize = DATASOURCE.synchronize;
