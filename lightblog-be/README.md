# 本地运行 - 后端

## 安装依赖

```shell
pnpm i
```

## 配置环境变量

修改`/src/config/index.ts`中的数据库配置

```ts
// 修改为自己的数据库配置
export const DATASOURCE = {
  host: 'localhost',
  port: 3306,
  username: 'username',
  password: 'password',
  database: 'blog',
  synchronize: false, // 是否自动修改表结构
};
```

请注意: synchronize 项 在生产环境中设为 false; 开发环境中设可以为 true. 否则会导致数据丢失.

## 创建数据库

1. 手动创建 database

- 创建一个名为`blog`的数据库.
- 编码为`utf8mb4`

2. 创建数据库表结构

- 手动执行

  - 在数据库中执行`/src/config/blog-init.sql`中的 SQL 语句.
  - 这样的好处是里面的`insert`数据也会一起放进去.

- 自动执行
  - 设置 TypeORM 的 `synchronize=true` 自动创建数据库表结构.

## 启动服务

```shell
pnpm start
```

# 项目结构:

```shell
lightblog-be
├── src
│   ├── app.ts : 入口文件
│   ├── routes.ts : 路由配置, 转发请求到Controller
│   ├── controller
│   │   └── ...Controller.ts : ...Controller 层: 处理请求, 检查参数, 调用Service
│   ├── Service
│   │   └── ...Service.ts : ...Servic 层: 处理业务逻辑, 调用实体类仓库对象
│   ├── entities
│   │   └── ...ts : ...实体
│   ├── types : 类型声明
│   │   ├── index.d.ts : 通用类型声明
│   │   └── ...d.ts : ...类型声明
│   ├── config
│   │   ├── index.ts : 声明全局变量等配置
│   │   ├── data-source.ts : 数据库配置
│   │   └── blog-init.sql : 初始化数据库SQL语句
│   ├── utils
│   │   ├── logger.ts : 控制台打印日志: 方法 / 请求位置 / 状态 / 用时
│   │   ├── routerResponse.ts : 统一响应格式
│   │   └── tool.ts : 常用工具类
│   └── app.ts : 入口文件
├── misc : 项目相关的一些文件, 杂项
├── node_modules : 依赖包
├── public : API文档、管理员后台界面、日志文件等。(暂时都没有)
└── README.md : 项目说明
```
