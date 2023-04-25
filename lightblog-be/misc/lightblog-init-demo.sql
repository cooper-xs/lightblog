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

 Date: 25/04/2023 10:43:26
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
INSERT INTO `article` VALUES (1, '1.Koa实现Promise参数', 'first_post', 0, 100, 0, '2022-01-01 10:30:00', '2022-01-01 12:00:00', '# 我的第一篇文章 - Markdown 格式的内容', '<h1>我的第一篇文章 - HTML 格式的内容</h1>', '这是一篇很好的文章, 很不错, 值得一看', '/api/images/001.jpg', 5);
INSERT INTO `article` VALUES (2, '2.Vue概况', 'second_post', 0, 50, 0, '2022-01-03 13:30:00', '2022-01-03 14:00:00', '# 我的第二篇文章 - Markdown 格式的内容', '<h1>我的第二篇文章 - HTML 格式的内容</h1>', '这是一篇很好的文章, 很值得一读', '/api/images/002.jpg', 4);
INSERT INTO `article` VALUES (3, '3.typeorm技术', 'third_post', 0, 70, 1, '2022-01-05 15:30:00', '2022-01-05 16:00:00', '# 我的第三篇文章 - Markdown 格式的内容', '<h1>我的第三篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个主题的深度探讨', '/api/images/003.jpg', 5);
INSERT INTO `article` VALUES (4, '4.koa搭配typeorm', 'fourth_post', 0, 30, 0, '2022-01-07 17:30:00', '2022-01-28 18:00:00', '# 我的第四篇文章 - Markdown 格式的内容', '<h1>我的第四篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个技术的介绍', '/api/images/004.jpg', 5);
INSERT INTO `article` VALUES (5, '5.Vue中使用Element', 'fifth_post', 0, 80, 0, '2022-01-09 19:30:00', '2022-01-09 20:00:00', '# 我的第五篇文章 - Markdown 格式的内容', '<h1>我的第五篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个事件的报道', '/api/images/005.jpg', 3);
INSERT INTO `article` VALUES (6, '6.Element plus和WindiCSS兼容和覆盖', 'sixth_post', 0, 20, 0, '2022-01-11 21:30:00', '2022-01-11 22:00:00', '# 我的第六篇文章 - Markdown 格式的内容', '<h1>我的第六篇文章 - HTML 格式的内容</h1>', '这是一篇有趣的故事', '/api/images/006.jpg', 3);
INSERT INTO `article` VALUES (7, '7.nodejs+koa+typeorm的后端架构', 'seventh_post', 0, 120, 0, '2022-01-13 09:30:00', '2022-01-10 10:00:00', '# 我的第七篇文章 - Markdown 格式的内容', '<h1>我的第七篇文章 - HTML 格式的内容</h1>', '这是一篇关于旅行的日记', '/api/images/007.jpg', 5);
INSERT INTO `article` VALUES (8, '8.C#与Winform', 'eighth_post', 0, 60, 2, '2022-01-15 11:30:00', '2022-01-15 12:00:00', '# 我的第八篇文章 - Markdown 格式的内容', '<h1>我的第八篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个产品的评测', '/api/images/008.jpg', 6);
INSERT INTO `article` VALUES (9, '9.数据结构-链表', 'ninth_post', 0, 40, 0, '2022-01-17 11:40:00', '2022-01-17 14:00:00', '# 我的第就篇文章 - Markdown 格式的内容', '<h1>我的第九篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个飞行器的评测', '/api/images/009.jpg', 7);
INSERT INTO `article` VALUES (10, '10.数据结构-优先队列', 'tenth_post', 0, 90, 0, '2022-01-19 15:30:00', '2022-01-19 16:00:00', '# 我的第十篇文章 - Markdown 格式的内容', '<h1>我的第十篇文章 - HTML 格式的内容</h1>', '这是一篇感性的文字', '/api/images/010.jpg', 7);

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
INSERT INTO `article_tag_referenced` VALUES (1, 1, 1);
INSERT INTO `article_tag_referenced` VALUES (2, 1, 2);
INSERT INTO `article_tag_referenced` VALUES (3, 1, 3);
INSERT INTO `article_tag_referenced` VALUES (4, 2, 2);
INSERT INTO `article_tag_referenced` VALUES (5, 2, 3);
INSERT INTO `article_tag_referenced` VALUES (6, 3, 3);
INSERT INTO `article_tag_referenced` VALUES (7, 1, 4);

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '评论' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of discuss
-- ----------------------------
INSERT INTO `discuss` VALUES (1, '2022-02-01 12:00:00', 1, 1, '很好的文章，谢谢分享！', NULL);
INSERT INTO `discuss` VALUES (2, '2022-02-02 13:00:00', 2, 1, '支持楼上，顶一下！', 1);
INSERT INTO `discuss` VALUES (3, '2022-02-03 14:00:00', 3, 2, '还有哪些关于这个话题的文章可以推荐吗？', NULL);
INSERT INTO `discuss` VALUES (4, '2022-02-04 15:00:00', 4, 3, '感觉作者对这个问题的见解非常深刻，学习了！', NULL);
INSERT INTO `discuss` VALUES (5, '2022-02-05 16:00:00', 5, 3, '同感，受益匪浅！', 4);

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '标签' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, 'Java', 'Java', '关于Java的标签', '2022-04-01 12:00:00');
INSERT INTO `tag` VALUES (2, 'Python', 'Python', '关于Python的标签', '2022-04-02 13:00:00');
INSERT INTO `tag` VALUES (3, 'Go', 'Go', '关于Go的标签', '2022-04-03 14:00:00');
INSERT INTO `tag` VALUES (4, '机器学习', 'Machine_learning', '关于机器学习的标签', '2022-04-04 15:00:00');
INSERT INTO `tag` VALUES (5, '数据分析', 'Data_analysis', '关于数据分析的标签', '2022-04-05 16:00:00');

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
