# 本地运行 - 前端

## 安装依赖

```shell
pnpm i
```

## 启动服务

```shell
# 开发环境
pnpm dev

# 生产环境
# 支持热修改
pnpm start
```

## 打包

```shell
pnpm build
```

## 项目结构

```shell
.
├── .vscode
│   └── extensions.json : VSCode 插件推荐
├── dist : 编译后的文件(通过build命令生成)
├── node_modules
├── public : 静态资源
├── src
│   ├── App.vue : 根组件
│   ├── main.ts : 入口文件
│   ├── router.ts : 路由配置
│   ├── store : Pinia 状态管理
│   ├── assets : 静态资源, 字体和图片
│   ├── components : 组件
│   │   ├── Admin : 后台管理组件
│   │   └── 其他组件
│   ├── types : 类型声明
│   ├── utils : 工具类
│   └── views : 页面
├── vite.config.ts : Vite 配置
├── tsconfig.json : TypeScript 配置
├── package.json : 项目依赖, 脚本等信息
├── .prettierrc : prettier配置
├── .eslintrc.js : eslint配置
├── windi.config.ts : WindiCSS 配置
└── README.md : 项目说明
```