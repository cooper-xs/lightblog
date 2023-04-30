/*
 Navicat Premium Data Transfer

 Source Server         : nav_con
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 29/04/2023 20:02:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `article_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '博文ID',
  `title` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '博文标题',
  `post_alias_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '博文别名/路径名',
  `comment_count` int(0) NULL DEFAULT NULL COMMENT '评论数',
  `read_count` int(0) NULL DEFAULT NULL COMMENT '浏览量',
  `top_flag` int(0) NULL DEFAULT NULL COMMENT '置顶等级, 不为0则置顶',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `push_date` datetime(0) NULL DEFAULT NULL COMMENT '发布日期',
  `content_md` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '文章markdown内容',
  `content_html` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '文章html内容',
  `article_summary` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章摘要',
  `preview_image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '预览图片链接',
  `category_id` int(0) NULL DEFAULT NULL COMMENT '分类ID',
  PRIMARY KEY (`article_id`) USING BTREE,
  UNIQUE INDEX `title`(`title`) USING BTREE,
  UNIQUE INDEX `post_alias_name`(`post_alias_name`) USING BTREE,
  INDEX `fk_article_category_id`(`category_id`) USING BTREE,
  CONSTRAINT `fk_article_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '1.Koa实现Promise', 'first_post', 0, 100, 0, '2022-01-01 10:30:00', '2022-01-01 12:00:00', '# Koa 实现 Promise\r\n\r\nKoa 是一个非常流行的 Node.js web 框架，它基于异步中间件机制实现了非阻塞的请求处理。在 Koa 应用中，中间件可以通过 Promise 来实现异步操作，这样可以极大地简化异步代码的编写。\r\n\r\n以下是一个简单的示例，展示了如何在 Koa 中使用 Promise：\r\n\r\n```js\r\nconst Koa = require(\'koa\');\r\nconst app = new Koa();\r\n\r\napp.use(async (ctx, next) => {\r\n  try {\r\n    await next();\r\n  } catch (err) {\r\n    ctx.status = err.status || 500;\r\n    ctx.body = err.message;\r\n  }\r\n});\r\n\r\napp.use(async (ctx, next) => {\r\n  const start = Date.now();\r\n  await next();\r\n  const ms = Date.now() - start;\r\n  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);\r\n});\r\n\r\napp.use(async (ctx, next) => {\r\n  const result = await someAsyncFunction();\r\n  ctx.body = result;\r\n});\r\n\r\napp.listen(3000);\r\n', '<h1>Koa 实现 Promise</h1>\r\n<p>Koa 是一个非常流行的 Node.js web 框架，它基于异步中间件机制实现了非阻塞的请求处理。在 Koa 应用中，中间件可以通过 Promise 来实现异步操作，这样可以极大地简化异步代码的编写。</p>\r\n<pre><code class=\"language-js\">const Koa = require(\'koa\');\r\nconst app = new Koa();\r\n\r\napp.use(async (ctx, next) => {\r\ntry {\r\nawait next();\r\n} catch (err) {\r\nctx.status = err.status || 500;\r\nctx.body = err.message;\r\n}\r\n});\r\n\r\napp.use(async (ctx, next) => {\r\nconst start = Date.now();\r\nawait next();\r\nconst ms = Date.now() - start;\r\nconsole.log(${ctx.method} ${ctx.url} - ${ms}ms);\r\n});\r\n\r\napp.use(async (ctx, next) => {\r\nconst result = await someAsyncFunction();\r\nctx.body = result;\r\n});\r\n\r\napp.listen(3000);\r\n</code></pre>\r\n<p>在上面的示例中，我们创建了一个 Koa 应用，并定义了三个中间件。第一个中间件用于捕获异常，第二个中间件用于记录请求处理时间，而第三个中间件则是一个异步函数，它使用 Promise 来实现异步操作并返回结果。</p>', '这是一篇Koa实现Promise的文章', '/api/images/img-001.jpg', 5);
INSERT INTO `article` VALUES (2, '2.Vue概况', 'second_post', 0, 50, 0, '2022-01-03 13:30:00', '2022-01-03 14:00:00', '# Vue\r\n\r\nVue 是一种流行的前端 JavaScript 框架，它主要用于构建交互式的单页面应用程序（SPA）。Vue 的核心是一个响应式数据系统和组件化架构，使得开发人员可以更加方便地管理和维护复杂的前端应用程序。\r\n\r\n以下是一个简单的示例，展示了如何使用 Vue：\r\n\r\n```html\r\n<div id=\"app\">\r\n  {{ message }}\r\n</div>\r\n\r\n<script src=\"https://cdn.jsdelivr.net/npm/vue\"></script>\r\n<script>\r\n  var app = new Vue({\r\n    el: \'#app\',\r\n    data: {\r\n      message: \'Hello, Vue!\'\r\n    }\r\n  })\r\n</script>\r\n', '<h1>Vue</h1>\r\n<p>Vue 是一种流行的前端 JavaScript 框架，它主要用于构建交互式的单页面应用程序（SPA）。Vue 的核心是一个响应式数据系统和组件化架构，使得开发人员可以更加方便地管理和维护复杂的前端应用程序。</p>\r\n<div id=\"app\">{{ message }}</div>\r\n<script src=\"https://cdn.jsdelivr.net/npm/vue\"></script>\r\n<script>\r\nvar app = new Vue({\r\nel: \'#app\',\r\ndata: {\r\nmessage: \'Hello, Vue!\'\r\n}\r\n})\r\n</script>\r\n<p>在上面的示例中，我们定义了一个 Vue 实例，并将其挂载到 #app 元素上。通过 data 属性，我们定义了一个名为 message 的响应式数据，并将其显示在模板中。</p>\r\n\r\n\r\n\r\n\r\n\r\n', '这是一篇写Vue概况的文章', '/api/images/img-002.jpg', 4);
INSERT INTO `article` VALUES (3, '3.typeorm技术', 'third_post', 0, 70, 1, '2022-01-05 15:30:00', '2022-01-05 16:00:00', '# TypeORM\r\n\r\nTypeORM 是一个基于 TypeScript 的 ORM（对象关系映射）框架，它支持多种数据库（如 MySQL、PostgreSQL、SQLite 等），并且提供了许多有用的功能，例如关系管理、事务处理和迁移等。\r\n\r\n以下是一个简单的示例，展示了如何在 TypeORM 中定义和使用实体：\r\n\r\n```typescript\r\nimport { Entity, Column, PrimaryGeneratedColumn } from \'typeorm\';\r\n\r\n@Entity()\r\nexport class User {\r\n  @PrimaryGeneratedColumn()\r\n  id: number;\r\n\r\n  @Column()\r\n  name: string;\r\n\r\n  @Column()\r\n  email: string;\r\n}\r\n\r\n// 使用实体\r\nimport { getRepository } from \'typeorm\';\r\n\r\nconst userRepository = getRepository(User);\r\n\r\nconst user = new User();\r\nuser.name = \'John Doe\';\r\nuser.email = \'john.doe@example.com\';\r\n\r\nawait userRepository.save(user);\r\n', '<h1>TypeORM</h1>\r\n<p>TypeORM 是一个基于 TypeScript 的 ORM（对象关系映射）框架，它支持多种数据库（如 MySQL、PostgreSQL、SQLite 等），并且提供了许多有用的功能，例如关系管理、事务处理和迁移等。</p>\r\n<pre><code class=\"language-typescript\">import { Entity, Column, PrimaryGeneratedColumn } from \'typeorm\';\r\n\r\n@Entity()\r\nexport class User {\r\n@PrimaryGeneratedColumn()\r\nid: number;\r\n\r\n@Column()\r\nname: string;\r\n\r\n@Column()\r\nemail: string;\r\n}\r\n\r\n// 使用实体\r\nimport { getRepository } from \'typeorm\';\r\n\r\nconst userRepository = getRepository(User);\r\n\r\nconst user = new User();\r\nuser.name = \'John Doe\';\r\nuser.email = \'john.doe@example.com\';\r\n\r\nawait userRepository.save(user);\r\n</code></pre>\r\n<p>在上面的示例中，我们定义了一个名为 User 的实体，并使用 @PrimaryGeneratedColumn() 和 @Column() 装饰器定义了实体中的属性。然后，我们通过 getRepository() 函数获取 User 实体的存储库，并使用 save() 方法将新用户保存到数据库中。</p>', '这是一篇关于typeorm技术的探讨', '/api/images/img-003.jpg', 5);
INSERT INTO `article` VALUES (4, '4.koa搭配typeorm', 'fourth_post', 0, 30, 0, '2022-01-07 17:30:00', '2022-01-28 18:00:00', '# Koa 和 TypeORM\r\n\r\nKoa 是一个非常流行的 Node.js web 框架，而 TypeORM 则是一个基于 TypeScript 的 ORM（对象关系映射）框架。这两个框架可以很好地结合使用，为 Node.js web 应用程序提供方便的数据库操作和请求处理。\r\n\r\n以下是一个简单的示例，展示了如何在 Koa 中使用 TypeORM：\r\n\r\n```typescript\r\nimport Koa from \'koa\';\r\nimport { createConnection } from \'typeorm\';\r\n\r\nconst app = new Koa();\r\n\r\ncreateConnection().then(() => {\r\n  console.log(\'Connected to database\');\r\n}).catch((error) => {\r\n  console.log(\'Database connection error\', error);\r\n});\r\n\r\napp.use(async (ctx) => {\r\n  const userRepository = getConnection().getRepository(User);\r\n  const users = await userRepository.find();\r\n  ctx.body = users;\r\n});\r\n\r\napp.listen(3000);\r\n', '<h1>Koa 和 TypeORM</h1>\r\n<p>Koa 是一个非常流行的 Node.js web 框架，而 TypeORM 则是一个基于 TypeScript 的 ORM（对象关系映射）框架。这两个框架可以很好地结合使用，为 Node.js web 应用程序提供方便的数据库操作和请求处理。</p>\r\n<pre><code class=\"language-typescript\">import Koa from \'koa\';\r\nimport { createConnection } from \'typeorm\';\r\n\r\nconst app = new Koa();\r\n\r\ncreateConnection().then(() => {\r\nconsole.log(\'Connected to database\');\r\n}).catch((error) => {\r\nconsole.log(\'Database connection error\', error);\r\n});\r\n\r\napp.use(async (ctx) => {\r\nconst userRepository = getConnection().getRepository(User);\r\nconst users = await userRepository.find();\r\nctx.body = users;\r\n});\r\n\r\napp.listen(3000);\r\n</code></pre>\r\n<p>在上面的示例中，我们首先创建了一个 Koa 应用，并在 createConnection() 函数中创建了与数据库的连接。然后，在 Koa 的请求处理函数中，我们获取了 User 实体的存储库，并使用 find() 方法从数据库中查询用户数据，并将其设置为响应主体。</p>', '这是一篇关于koa搭配typeorm技术的介绍', '/api/images/img-004.jpg', 5);
INSERT INTO `article` VALUES (5, '5.Vue中使用Element', 'fifth_post', 0, 80, 0, '2022-01-09 19:30:00', '2022-01-09 20:00:00', '# Vue 中使用 Element Plus\r\n\r\nElement Plus 是一个基于 Vue.js 2.0 的组件库，它提供了许多易于使用和高效的 UI 组件，可以帮助开发人员更快地构建现代化的 Web 应用程序。\r\n\r\n以下是一个简单的示例，展示了如何在 Vue 中使用 Element Plus：\r\n\r\n```vue\r\n<template>\r\n  <div>\r\n    <el-button type=\"primary\" @click=\"showMessage\">显示消息框</el-button>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { ElButton, ElMessageBox } from \'element-plus\';\r\n\r\nexport default {\r\n  components: {\r\n    ElButton,\r\n  },\r\n  methods: {\r\n    showMessage() {\r\n      ElMessageBox.alert(\'你好，Element Plus！\', \'提示\');\r\n    },\r\n  },\r\n};\r\n</script>\r\n', '<h1>Vue 中使用 Element Plus</h1>\r\n<p>Element Plus 是一个基于 Vue.js 2.0 的组件库，它提供了许多易于使用和高效的 UI 组件，可以帮助开发人员更快地构建现代化的 Web 应用程序。</p>\r\n<pre><code class=\"language-vue\"><template>\r\n<div>\r\n<el-button type=\"primary\" @click=\"showMessage\">显示消息框</el-button>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport { ElButton, ElMessageBox } from \'element-plus\';\r\n\r\nexport default {\r\ncomponents: {\r\nElButton,\r\n},\r\nmethods: {\r\nshowMessage() {\r\nElMessageBox.alert(\'你好，Element Plus！\', \'提示\');\r\n},\r\n},\r\n};\r\n</script>\r\n</code></pre>', '这是一篇关于Vue中使用Element的文章', '/api/images/img-005.jpg', 3);
INSERT INTO `article` VALUES (6, '6.Element plus和WindiCSS兼容和覆盖', 'sixth_post', 0, 20, 0, '2022-01-11 21:30:00', '2022-01-11 22:00:00', '# Element Plus 和 WindiCSS\r\n\r\nElement Plus 是一个基于 Vue.js 的组件库，而 WindiCSS 则是一个快速、高效的 CSS 工具包。虽然这两个项目可以同时使用，但是当它们之间存在一些样式冲突时，我们可能需要进行一些兼容和覆盖操作。\r\n\r\n以下是一个简单的示例，展示了如何在 WindiCSS 中进行 Element Plus 样式的覆盖：\r\n\r\n```css\r\n/* 定义一个类名为 el-button 的样式 */\r\n@apply bg-blue-500 text-white;\r\n\r\n/* 覆盖 Element Plus 的 el-button 样式 */\r\n.el-button {\r\n  @ apply rounded-md;\r\n  border: none;\r\n}\r\n', '<h1>Element Plus 和 WindiCSS</h1>\r\n<p>Element Plus 是一个基于 Vue.js 的组件库，而 WindiCSS 则是一个快速、高效的 CSS 工具包。虽然这两个项目可以同时使用，但是当它们之间存在一些样式冲突时，我们可能需要进行一些兼容和覆盖操作。</p>\r\n<pre><code class=\"language-css\">\r\n/* 定义一个类名为 el-button 的样式 */\r\n@apply bg-blue-500 text-white;\r\n\r\n/* 覆盖 Element Plus 的 el-button 样式 */\r\n.el-button {\r\n@apply rounded-md;\r\nborder: none;\r\n}\r\n</code></pre>', '这是一篇关于Element和WindiCSS样式的文章', '/api/images/img-006.jpg', 3);
INSERT INTO `article` VALUES (7, '7.nodejs+koa+typeorm的后端架构', 'seventh_post', 0, 120, 0, '2022-01-13 09:30:00', '2022-01-10 10:00:00', '# 基于 Node.js、Koa 和 TypeORM 的后端架构\r\n\r\nNode.js 是一个非常流行的 JavaScript 运行环境，而 Koa 则是一个基于 Node.js 的轻量级 web 框架，TypeORM 是一个基于 TypeScript 的 ORM（对象关系映射）框架。这三个技术可以结合使用，为我们构建高效、可维护的、面向对象的后端应用程序提供帮助。\r\n\r\n以下是一个简单的示例，展示了如何在 Node.js 中使用 Koa 和 TypeORM 构建后端架构：\r\n\r\n```typescript\r\nimport Koa from \'koa\';\r\nimport Router from \'koa-router\';\r\nimport { createConnection } from \'typeorm\';\r\n\r\nconst app = new Koa();\r\nconst router = new Router();\r\n\r\ncreateConnection().then(() => {\r\n  console.log(\'Connected to database\');\r\n}).catch((error) => {\r\n  console.log(\'Database connection error\', error);\r\n});\r\n\r\nrouter.get(\'/users\', async (ctx) => {\r\n  const userRepository = getConnection().getRepository(User);\r\n  const users = await userRepository.find();\r\n  ctx.body = users;\r\n});\r\n\r\napp.use(router.routes()).use(router.allowedMethods());\r\n\r\napp.listen(3000, () => {\r\n  console.log(\'Server started on port 3000\');\r\n});', '<h1>基于 Node.js、Koa 和 TypeORM 的后端架构</h1>\r\n<p>Node.js 是一个非常流行的 JavaScript 运行环境，而 Koa 则是一个基于 Node.js 的轻量级 web 框架，TypeORM 是一个基于 TypeScript 的 ORM（对象关系映射）框架。这三个技术可以结合使用，为我们构建高效、可维护的、面向对象的后端应用程序提供帮助。</p>\r\n<pre><code class=\"language-typescript\">import Koa from \'koa\';\r\nimport Router from \'koa-router\';\r\nimport { createConnection } from \'typeorm\';\r\n\r\nconst app = new Koa();\r\nconst router = new Router();\r\n\r\ncreateConnection().then(() => {\r\nconsole.log(\'Connected to database\');\r\n}).catch((error) => {\r\nconsole.log(\'Database connection error\', error);\r\n});\r\n\r\nrouter.get(\'/users\', async (ctx) => {\r\nconst userRepository = getConnection().getRepository(User);\r\nconst users = await userRepository.find();\r\nctx.body = users;\r\n});\r\n\r\napp.use(router.routes()).use(router.allowedMethods());\r\n\r\napp.listen(3000, () => {\r\nconsole.log(\'Server started on port 3000\');\r\n});\r\n</code></pre>', '这是一篇关于nodejs+koa+typeorm的后端架构的文章', '/api/images/img-007.jpg', 5);
INSERT INTO `article` VALUES (8, '8.C#与Winform', 'eighth_post', 0, 60, 2, '2022-01-15 11:30:00', '2022-01-15 12:00:00', '# C# 和 WinForms\r\n\r\nC# 是一门现代化的面向对象编程语言，而 WinForms 则是一个经典的桌面应用程序框架。这两个技术可以结合使用，为我们构建高效、可维护的、功能强大的应用程序提供帮助。\r\n\r\n以下是一个简单的示例，展示了如何在 C# 中使用 WinForms 构建一个基本的窗体应用程序：\r\n\r\n```csharp\r\nusing System;\r\nusing System.Windows.Forms;\r\n\r\nnamespace MyApplication {\r\n    public class MainForm : Form {\r\n        private Button myButton;\r\n\r\n        public MainForm() {\r\n            myButton = new Button();\r\n            myButton.Text = \"Click me!\";\r\n            myButton.Click += OnButtonClick;\r\n\r\n            Controls.Add(myButton);\r\n        }\r\n\r\n        private void OnButtonClick(object sender, EventArgs e) {\r\n            MessageBox.Show(\"Hello, world!\");\r\n        }\r\n    }\r\n\r\n    public class Program {\r\n        [STAThread]\r\n        static void Main() {\r\n            Application.EnableVisualStyles();\r\n            Application.Run(new MainForm());\r\n        }\r\n    }\r\n}\r\n在上面的示例中，我们首先导入 System 和 System.Windows.Forms 命名空间，并定义了一个名为 MainForm 的类，该类继承了 Form 类。然后，在 MainForm 类的构造函数中，我们创建了一个按钮控件，并将其添加到窗体中。接着，我们定义了一个事件处理函数 OnButtonClick，当用户单击按钮时，弹出一个消息框显示“Hello, world!”。最后，在 Program 类的 Main 方法中，我们启用了视觉样式，并运行了主窗体应用程序。', '<h1>C# 和 WinForms</h1>\r\n<p>C# 是一门现代化的面向对象编程语言，而 WinForms 则是一个经典的桌面应用程序框架。这两个技术可以结合使用，为我们构建高效、可维护的、功能强大的应用程序提供帮助。</p>\r\n<pre><code class=\"language-csharp\">using System;\r\nusing System.Windows.Forms;\r\n\r\nnamespace MyApplication {\r\npublic class MainForm : Form {\r\nprivate Button myButton;\r\n\r\n    public MainForm() {\r\n        myButton = new Button();\r\n        myButton.Text = \"Click me!\";\r\n        myButton.Click += OnButtonClick;\r\n\r\n        Controls.Add(myButton);\r\n    }\r\n\r\n    private void OnButtonClick(object sender, EventArgs e) {\r\n        MessageBox.Show(\"Hello, world!\");\r\n    }\r\n}\r\n\r\npublic class Program {\r\n    [STAThread]\r\n    static void Main() {\r\n        Application.EnableVisualStyles();\r\n        Application.Run(new MainForm());\r\n    }\r\n}\r\n}\r\n</code></pre>\r\n<p>在上面的示例中，我们首先导入 System 和 System.Windows.Forms 命名空间，并定义了一个名为 MainForm 的类，该类继承了 Form 类。然后，在 MainForm 类的构造函数中，我们创建了一个按钮控件，并将其添加到窗体中。接着，我们定义了一个事件处理函数 OnButtonClick，当用户单击按钮时，弹出一个消息框显示“Hello, world!”。最后，在 Program 类的 Main 方法中，我们启用了视觉样式，并运行了主窗体应用程序。</p>', '这是一篇关于C#与Winform的文章', '/api/images/img-008.jpg', 6);
INSERT INTO `article` VALUES (9, '9.数据结构-链表', 'ninth_post', 0, 40, 0, '2022-01-17 11:40:00', '2022-01-17 14:00:00', '# 数据结构：链表\r\n\r\n链表是一种常见的数据结构，它由若干个节点组成，每个节点包含两部分数据：一个是值，另一个是指向下一个节点的指针（或称为链接）。\r\n\r\n以下是一个简单的示例，展示了如何在 Python 中实现一个链表：\r\n\r\n```python\r\nclass Node:\r\n    def __init__(self, value=None):\r\n        self.value = value\r\n        self.next = None\r\n\r\nclass LinkedList:\r\n    def __init__(self):\r\n        self.head = None\r\n\r\n    def append(self, value):\r\n        new_node = Node(value)\r\n        if not self.head:\r\n            self.head = new_node\r\n            return\r\n        last_node = self.head\r\n        while last_node.next:\r\n            last_node = last_node.next\r\n        last_node.next = new_node\r\n\r\nmy_list = LinkedList()\r\nmy_list.append(\"A\")\r\nmy_list.append(\"B\")\r\nmy_list.append(\"C\")\r\n\r\nprint(my_list.head.value)   # 输出 \"A\"\r\nprint(my_list.head.next.value)  # 输出 \"B\"\r\nprint(my_list.head.next.next.value) # 输出 \"C\"\r\n在上面的示例中，我们首先定义了一个 Node 类和一个 LinkedList 类。然后，在 LinkedList 类中，我们定义了一个 append 方法，用于向列表尾部添加新的元素。最后，我们创建了一个链表对象，并向其中添加了三个节点，然后遍历这些节点并逐个输出其值。', '<h1>数据结构：链表</h1>\r\n<p>链表是一种常见的数据结构，它由若干个节点组成，每个节点包含两部分数据：一个是值，另一个是指向下一个节点的指针（或称为链接）。</p>\r\n<pre><code class=\"language-python\">class Node:\r\ndef init(self, value=None):\r\nself.value = value\r\nself.next = None\r\n\r\nclass LinkedList:\r\ndef init(self):\r\nself.head = None\r\n\r\ndef append(self, value):\r\n    new_node = Node(value)\r\n    if not self.head:\r\n        self.head = new_node\r\n        return\r\n    last_node = self.head\r\n    while last_node.next:\r\n        last_node = last_node.next\r\n    last_node.next = new_node\r\nmy_list = LinkedList()\r\nmy_list.append(\"A\")\r\nmy_list.append(\"B\")\r\nmy_list.append(\"C\")\r\n\r\nprint(my_list.head.value)   # 输出 \"A\"\r\nprint(my_list.head.next.value)  # 输出 \"B\"\r\nprint(my_list.head.next.next.value) # 输出 \"C\"\r\n</code></pre>\r\n<p>在上面的示例中，我们首先定义了一个 Node 类和一个 LinkedList 类。然后，在 LinkedList 类中，我们定义了一个 append 方法，用于向列表尾部添加新的元素。最后，我们创建了一个链表对象，并向其中添加了三个节点，然后遍历这些节点并逐个输出其值。</p>', '这是一篇关于数据结构-链表的文章', '/api/images/img-009.jpg', 7);
INSERT INTO `article` VALUES (10, '10.数据结构-优先队列', 'tenth_post', 0, 90, 0, '2022-01-19 15:30:00', '2022-01-19 16:00:00', '# 数据结构：优先队列\r\n\r\n优先队列是一种特殊的队列，它的每个元素都有一个关联的优先级（或权重），优先级高的元素会被优先处理。\r\n\r\n以下是一个简单的示例，展示了如何在 Python 中使用内置模块 `heapq` 实现一个简单的优先队列：\r\n\r\n```python\r\nimport heapq\r\n\r\nclass PriorityQueue:\r\n    def __init__(self):\r\n        self._queue = []\r\n        self._index = 0\r\n\r\n    def push(self, item, priority):\r\n        heapq.heappush(self._queue, (-priority, self._index, item))\r\n        self._index += 1\r\n\r\n    def pop(self):\r\n        return heapq.heappop(self._queue)[-1]\r\n\r\nmy_queue = PriorityQueue()\r\nmy_queue.push(\"A\", 5)\r\nmy_queue.push(\"B\", 3)\r\nmy_queue.push(\"C\", 7)\r\n\r\nprint(my_queue.pop())   # 输出 \"C\"\r\nprint(my_queue.pop())   # 输出 \"A\"\r\nprint(my_queue.pop())   # 输出 \"B\"\r\n在上面的示例中，我们首先导入了内置模块 heapq 并定义了一个 PriorityQueue 类。然后，在 PriorityQueue 类中，我们定义了 push 和 pop 方法，用于向队列中添加或弹出元素。在 push 方法中，我们使用 heappush 函数将元素添加到队列中，并通过 _index 变量来保持元素在队列中的顺序。在 pop 方法中，我们使用 heappop 函数弹出队列中的第一个元素，并返回其值。', '<h1>数据结构：优先队列</h1>\r\n<p>优先队列是一种特殊的队列，它的每个元素都有一个关联的优先级（或权重），优先级高的元素会被优先处理。</p>\r\n<pre><code class=\"language-python\">import heapq\r\n\r\nclass PriorityQueue:\r\ndef init(self):\r\nself._queue = []\r\nself._index = 0\r\n\r\ndef push(self, item, priority):\r\n    heapq.heappush(self._queue, (-priority, self._index, item))\r\n    self._index += 1\r\n\r\ndef pop(self):\r\n    return heapq.heappop(self._queue)[-1]\r\nmy_queue = PriorityQueue()\r\nmy_queue.push(\"A\", 5)\r\nmy_queue.push(\"B\", 3)\r\nmy_queue.push(\"C\", 7)\r\n\r\nprint(my_queue.pop())   # 输出 \"C\"\r\nprint(my_queue.pop())   # 输出 \"A\"\r\nprint(my_queue.pop())   # 输出 \"B\"\r\n</code></pre>\r\n<p>在上面的示例中，我们首先导入了内置模块 heapq 并定义了一个 PriorityQueue 类。然后，在 PriorityQueue 类中，我们定义了 push 和 pop 方法，用于向队列中添加或弹出元素。在 push 方法中，我们使用 heappush 函数将元素添加到队列中，并通过 _index 变量来保持元素在队列中的顺序。在 pop 方法中，我们使用 heappop 函数弹出队列中的第一个元素，并返回其值。</p>', '这是一篇关于数据结构-优先队列的文章', '/api/images/img-010.jpg', 7);

-- ----------------------------
-- Table structure for article_tag_referenced
-- ----------------------------
DROP TABLE IF EXISTS `article_tag_referenced`;
CREATE TABLE `article_tag_referenced`  (
  `atr_Id` int(0) NOT NULL AUTO_INCREMENT COMMENT '引用id',
  `article_id` int(0) NULL DEFAULT NULL COMMENT '文章id',
  `tag_id` int(0) NULL DEFAULT NULL COMMENT '标签id',
  PRIMARY KEY (`atr_Id`) USING BTREE,
  INDEX `fk_atr_article_id`(`article_id`) USING BTREE,
  INDEX `fk_atr_tag_id`(`tag_id`) USING BTREE,
  CONSTRAINT `fk_atr_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_atr_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章标签' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_tag_referenced
-- ----------------------------
INSERT INTO `article_tag_referenced` VALUES (1, 1, 2);
INSERT INTO `article_tag_referenced` VALUES (2, 1, 4);
INSERT INTO `article_tag_referenced` VALUES (3, 2, 1);
INSERT INTO `article_tag_referenced` VALUES (4, 3, 3);
INSERT INTO `article_tag_referenced` VALUES (5, 4, 2);
INSERT INTO `article_tag_referenced` VALUES (6, 4, 3);
INSERT INTO `article_tag_referenced` VALUES (7, 5, 1);
INSERT INTO `article_tag_referenced` VALUES (8, 5, 5);
INSERT INTO `article_tag_referenced` VALUES (9, 6, 5);
INSERT INTO `article_tag_referenced` VALUES (10, 6, 6);
INSERT INTO `article_tag_referenced` VALUES (11, 7, 2);
INSERT INTO `article_tag_referenced` VALUES (12, 7, 3);
INSERT INTO `article_tag_referenced` VALUES (13, 8, 7);
INSERT INTO `article_tag_referenced` VALUES (14, 9, 8);
INSERT INTO `article_tag_referenced` VALUES (15, 10, 8);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `category_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `category_alias_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类别名',
  `description` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类描述',
  `parent_id` int(0) NULL DEFAULT NULL COMMENT '父分类ID. 如空则说明是父级分类, 不允许有文章关联',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`category_id`) USING BTREE,
  UNIQUE INDEX `category_name`(`category_name`) USING BTREE,
  UNIQUE INDEX `category_alias_name`(`category_alias_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '分类' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '前端', 'fe', '后端技术', NULL, '2022-03-01 12:00:00');
INSERT INTO `category` VALUES (2, '后端', 'be', '前端技术', NULL, '2022-03-02 13:00:00');
INSERT INTO `category` VALUES (3, 'UI设计', 'UI', '前端UI学习, 比如Element Plus和WindiCSS', 1, '2022-03-03 14:00:00');
INSERT INTO `category` VALUES (4, '前端框架设计', 'fe-kuangjia', '分享旅游经验', 1, '2022-03-04 15:00:00');
INSERT INTO `category` VALUES (5, '后端框架设计', 'be-kuangjia', '后端框架设计, 比如koa, typeorm等', 2, '2022-03-05 16:00:00');
INSERT INTO `category` VALUES (6, 'C#学习', 'Csharp', 'C#学习, 比如Winform', NULL, '2022-03-19 16:00:00');
INSERT INTO `category` VALUES (7, '数据结构', 'shujujiegou', '数据结构学习', NULL, '2022-03-18 16:00:00');

-- ----------------------------
-- Table structure for discuss
-- ----------------------------
DROP TABLE IF EXISTS `discuss`;
CREATE TABLE `discuss`  (
  `discuss_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '评论日期',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '发表用户',
  `article_id` int(0) NULL DEFAULT NULL COMMENT '评论文章ID',
  `content` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '评论内容',
  `parent_id` int(0) NULL DEFAULT NULL COMMENT '父评论ID',
  PRIMARY KEY (`discuss_id`) USING BTREE,
  INDEX `fk_discuss_user_id`(`user_id`) USING BTREE,
  INDEX `fk_discuss_article_id`(`article_id`) USING BTREE,
  INDEX `fk_discuss_parent_id`(`parent_id`) USING BTREE,
  CONSTRAINT `fk_discuss_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_discuss_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `discuss` (`discuss_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_discuss_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '评论' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of discuss
-- ----------------------------
INSERT INTO `discuss` VALUES (1, '2022-02-01 12:00:00', 1, 1, '很好的文章，谢谢分享！', NULL);
INSERT INTO `discuss` VALUES (2, '2022-02-02 13:00:00', 2, 1, '支持楼上，顶一下！', 1);
INSERT INTO `discuss` VALUES (3, '2022-02-03 14:00:00', 3, 2, '还有哪些关于这个话题的文章可以推荐吗？', NULL);
INSERT INTO `discuss` VALUES (4, '2022-02-04 15:00:00', 4, 3, '感觉作者对这个问题的见解非常深刻，学习了！', NULL);
INSERT INTO `discuss` VALUES (5, '2022-02-05 16:00:00', 5, 3, '同感，受益匪浅！', 4);
INSERT INTO `discuss` VALUES (6, '2023-03-10 11:14:03', 2, 3, '所以爱会消失吗?', NULL);

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `tag_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '标签ID',
  `tag_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签名称',
  `tag_alias_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签别名',
  `description` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签描述',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`tag_id`) USING BTREE,
  UNIQUE INDEX `tag_name`(`tag_name`) USING BTREE,
  UNIQUE INDEX `tag_alias_name`(`tag_alias_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '标签' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, 'vue', 'vue', '关于vue的标签', '2022-04-01 12:00:00');
INSERT INTO `tag` VALUES (2, 'koa', 'koa', '关于koa的标签', '2022-04-02 13:00:00');
INSERT INTO `tag` VALUES (3, 'typeorm', 'typeorm', '关于typeorm的标签', '2022-04-03 14:00:00');
INSERT INTO `tag` VALUES (4, 'promise', 'promise', '关于promise的标签', '2022-04-04 15:00:00');
INSERT INTO `tag` VALUES (5, 'element plus', 'element_plus', '关于element plus的标签', '2022-04-05 16:00:00');
INSERT INTO `tag` VALUES (6, 'WindiCSS', 'WindiCSS', 'WindiCSS样式标签', '2023-04-13 11:04:01');
INSERT INTO `tag` VALUES (7, 'C#', 'Csharp', '关于C#的标签', '2023-04-23 14:04:48');
INSERT INTO `tag` VALUES (8, '数据结构', 'data_structure', '关于数据结构的标签', '2023-04-24 13:05:30');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user_Id` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_nickname` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`user_Id`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Alice', 'alice@example.com', '2022-01-01 12:00:00');
INSERT INTO `users` VALUES (2, 'Bob', 'bob@example.com', '2022-01-02 13:00:00');
INSERT INTO `users` VALUES (3, 'Charlie', 'charlie@example.com', '2022-01-03 14:00:00');
INSERT INTO `users` VALUES (4, 'David', 'david@example.com', '2022-01-04 15:00:00');
INSERT INTO `users` VALUES (5, 'Emma', 'emma@example.com', '2022-01-05 16:00:00');

SET FOREIGN_KEY_CHECKS = 1;
