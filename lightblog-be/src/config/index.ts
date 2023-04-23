export const TOKEN_CONF = {
    secretKey: 'access-token', 
    expiresIn: '2h',
    // 密令
    secretToken: 'light'
}

// 全局变量声明
declare global {
    namespace NodeJS {
        interface Global {
            secretToken: string;
        }
    }
}

global.secretToken = TOKEN_CONF.secretToken;