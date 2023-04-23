CREATE DATABASE `blog` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';

USE `blog`;

-- 根据外键引用 顺序删除
DROP TABLE IF EXISTS `article_tag_referenced`;
DROP TABLE IF EXISTS `discuss`;
DROP TABLE IF EXISTS `article`;
DROP TABLE IF EXISTS `tag`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `users`;

-- 分类表格
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
    `category_id` INT NOT NULL AUTO_INCREMENT COMMENT '分类ID',
    `category_name` VARCHAR(64) UNIQUE NOT NULL COMMENT '分类名称',
    `category_alias_name` VARCHAR(64) UNIQUE NOT NULL COMMENT '分类别名',
    `description` VARCHAR(128) COMMENT '分类描述',
    `parent_id` INT COMMENT '父分类ID',
    `create_time` DATETIME COMMENT '创建时间',
    PRIMARY KEY (`category_id`)
) COMMENT='分类';

-- 用户表格
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `user_Id` INT NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `user_nickname` VARCHAR(128) COMMENT '用户昵称',
    `email` VARCHAR(64) UNIQUE COMMENT '用户邮箱',
    `create_time` DATETIME COMMENT '注册时间',
    PRIMARY KEY (`user_Id`)
) COMMENT='用户';

-- 文章表格
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
    `article_id` INT NOT NULL AUTO_INCREMENT COMMENT '博文ID',
    `title` VARCHAR(190) UNIQUE COMMENT '博文标题',
		`post_alias_name` VARCHAR(100) UNIQUE COMMENT '博文别名/路径名',
    `comment_count` INT COMMENT '评论数',
    `read_count` INT COMMENT '浏览量',
    `top_flag` INT COMMENT '置顶等级, 不为0则置顶',
    `create_time` DATETIME COMMENT '创建时间',
		`push_date` DATETIME COMMENT '发布日期',
    `content_md` TEXT COMMENT '文章markdown内容',
    `content_html` TEXT COMMENT '文章html内容',
    `article_summary` VARCHAR(190) COMMENT '文章摘要',
    `preview_image_url` VARCHAR(255) COMMENT '预览图片链接',
    `category_id` INT COMMENT '分类ID',
    PRIMARY KEY (`article_id`),
    CONSTRAINT `fk_article_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) COMMENT='文章';

-- 评论表格
DROP TABLE IF EXISTS `discuss`;
CREATE TABLE `discuss` (
    `discuss_id` INT NOT NULL AUTO_INCREMENT COMMENT '评论ID',
    `create_time` DATETIME COMMENT '评论日期',
    `discuss_user` INT COMMENT '发表用户',
    `article_id` INT COMMENT '评论文章ID',
    `content` VARCHAR(1024) COMMENT '评论内容' ,
    `parent_id` INT COMMENT '父评论ID' ,
    PRIMARY KEY (discuss_id),
    CONSTRAINT `fk_discuss_user_id` FOREIGN KEY (`discuss_user`) REFERENCES `users` (`user_Id`),
    CONSTRAINT `fk_discuss_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`),
    CONSTRAINT `fk_discuss_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `discuss` (`discuss_id`)
) COMMENT = '评论';

-- 标签表格
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
    `tag_id` INT NOT NULL AUTO_INCREMENT COMMENT '标签ID',
    `tag_name` VARCHAR(64) UNIQUE NOT NULL COMMENT '标签名称',
    `tag_alias_name` VARCHAR(64) UNIQUE NOT NULL COMMENT '标签别名',
    `description` VARCHAR(128) COMMENT '标签描述',
    `create_time` DATETIME COMMENT '创建时间',
    PRIMARY KEY (`tag_id`)
) COMMENT='标签';

-- 文章标签关联表格
DROP TABLE IF EXISTS `article_tag_referenced`;
CREATE TABLE `article_tag_referenced` (
    `atr_Id` INT NOT NULL AUTO_INCREMENT COMMENT '引用id',
    `article_id` INT COMMENT '文章id',
    `tag_id` INT COMMENT '标签id',
    PRIMARY KEY (`atr_Id`),
    CONSTRAINT `fk_atr_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`),
    CONSTRAINT `fk_atr_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`)
) COMMENT='文章标签';


-- 分类表格数据插入

INSERT INTO category (category_id, category_name, category_alias_name, description, parent_id, create_time)
VALUES
(1, '技术', 'Technology', '关于各种技术的分类', NULL, '2022-03-01 12:00:00'),
(2, '生活', 'Life', '分享日常生活经验', NULL, '2022-03-02 13:00:00'),
(3, '阅读', 'Reading', '推荐好书', NULL, '2022-03-03 14:00:00'),
(4, '旅游', 'Travel', '分享旅游经验', NULL, '2022-03-04 15:00:00'),
(5, '美食', 'Food', '分享美食佳肴', NULL, '2022-03-05 16:00:00');

-- 用户表格数据插入

INSERT INTO users (user_Id, user_nickname, email, create_time)
VALUES (1, 'Alice', 'alice@example.com', '2022-01-01 12:00:00'),
(2, 'Bob', 'bob@example.com', '2022-01-02 13:00:00'),
(3, 'Charlie', 'charlie@example.com', '2022-01-03 14:00:00'),
(4, 'David', 'david@example.com', '2022-01-04 15:00:00'),
(5, 'Emma', 'emma@example.com', '2022-01-05 16:00:00');

-- 标签表格数据插入

INSERT INTO tag (tag_id, tag_name, tag_alias_name, description, create_time)
VALUES (1, 'Java', 'Java', '关于Java的标签', '2022-04-01 12:00:00'),
(2, 'Python', 'Python', '关于Python的标签', '2022-04-02 13:00:00'),
(3, 'Go', 'Go', '关于Go的标签', '2022-04-03 14:00:00'),
(4, '机器学习', 'Machine learning', '关于机器学习的标签', '2022-04-04 15:00:00'),
(5, '数据分析', 'Data analysis', '关于数据分析的标签', '2022-04-05 16:00:00');

-- 文章表格数据插入

INSERT INTO `article` (`push_date`, `title`, `post_alias_name`, `comment_count`, `read_count`, `top_flag`, `create_time`, `content_md`, `content_html`, `article_summary`, `preview_image_url`, `category_id`)
VALUES
('2022-01-01 12:00:00', '我的第一篇文章', 'first_post', 10, 100, 0, '2022-01-01 10:30:00', '# 我的第一篇文章 - Markdown 格式的内容', '<h1>我的第一篇文章 - HTML 格式的内容</h1>', '这是一篇很好的文章, 很不错, 值得一看', '/api/images/001.jpg', 1),
('2022-01-03 14:00:00', '我的第二篇文章', 'second_post', 5, 50, 0, '2022-01-03 13:30:00', '# 我的第二篇文章 - Markdown 格式的内容', '<h1>我的第二篇文章 - HTML 格式的内容</h1>', '这是一篇很好的文章, 很值得一读', '/api/images/002.jpg', 1),
('2022-01-05 16:00:00', '我的第三篇文章', 'third_post', 7, 70, 1, '2022-01-05 15:30:00', '# 我的第三篇文章 - Markdown 格式的内容', '<h1>我的第三篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个主题的深度探讨', '/api/images/003.jpg', 2),
('2022-01-07 18:00:00', '我的第四篇文章', 'fourth_post', 3, 30, 0, '2022-01-07 17:30:00', '# 我的第四篇文章 - Markdown 格式的内容', '<h1>我的第四篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个技术的介绍', '/api/images/004.jpg', 1),
('2022-01-09 20:00:00', '我的第五篇文章', 'fifth_post', 8, 80, 0, '2022-01-09 19:30:00', '# 我的第五篇文章 - Markdown 格式的内容', '<h1>我的第五篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个事件的报道', '/api/images/005.jpg', 5),
('2022-01-11 22:00:00', '我的第六篇文章', 'sixth_post', 2, 20, 0, '2022-01-11 21:30:00', '# 我的第六篇文章 - Markdown 格式的内容', '<h1>我的第六篇文章 - HTML 格式的内容</h1>', '这是一篇有趣的故事', '/api/images/006.jpg', 4),
('2022-01-13 10:00:00', '我的第七篇文章', 'seventh_post', 12, 120, 0, '2022-01-13 09:30:00', '# 我的第七篇文章 - Markdown 格式的内容', '<h1>我的第七篇文章 - HTML 格式的内容</h1>', '这是一篇关于旅行的日记', '/api/images/007.jpg', 1),
('2022-01-15 12:00:00', '我的第八篇文章', 'eighth_post', 6, 60, 2, '2022-01-15 11:30:00', '# 我的第八篇文章 - Markdown 格式的内容', '<h1>我的第八篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个产品的评测', '/api/images/008.jpg', 5),
('2022-01-17 14:00:00', '我的第九篇文章', 'ninth_post', 4, 40, 0, '2022-01-17 11:40:00', '# 我的第就篇文章 - Markdown 格式的内容', '<h1>我的第九篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个飞行器的评测', '/api/images/005.jpg', 1),
('2022-01-19 16:00:00', '我的第十篇文章', 'tenth_post', 9, 90, 0, '2022-01-19 15:30:00', '# 我的第十篇文章 - Markdown 格式的内容', '<h1>我的第十篇文章 - HTML 格式的内容</h1>', '这是一篇感性的文字', '/api/images/009.jpg', 5),
('2022-01-21 18:00:00', '我的第十一篇文章', 'eleventh_post', 1, 10, 0, '2022-01-21 17:30:00', '# 我的第十一篇文章 - Markdown 格式的内容', '<h1>我的第十一篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个人的采访', '/api/images/002.jpg', 4),
('2022-01-23 20:00:00', '我的第十二篇文章', 'twelfth_post', 11, 110, 0, '2022-01-23 19:30:00', '# 我的第十二篇文章 - Markdown 格式的内容', '<h1>我的第十二篇文章 - HTML 格式的内容</h1>', '这是一篇有趣的游戏攻略', '/api/images/003.jpg', 1),
('2022-01-25 22:00:00', '我的第十三篇文章', 'thirteenth_post', 5, 50, 0, '2022-01-25 21:30:00', '# 我的第十三篇文章 - Markdown 格式的内容', '<h1>我的第十三篇文章 - HTML 格式的内容</h1>', '这是一篇关于留学生活的分享', '/api/images/004.jpg', 2),
('2022-01-27 10:00:00', '我的第十四篇文章', 'fourteenth_post', 3, 30, 0, '2022-01-27 09:30:00', '# 我的第十四篇文章 - Markdown 格式的内容', '<h1>我的第十四篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个新闻事件的报道', '/api/images/005.jpg', 2),
('2022-01-29 12:00:00', '我的第十五篇文章', 'fifteenth_post', 6, 60, 0, '2022-01-29 11:30:00', '# 我的第十五篇文章 - Markdown 格式的内容', '<h1>我的第十五篇文章 - HTML 格式的内容</h1>', '这是一篇有关人际关系的探讨', '/api/images/006.jpg', 1),
('2022-01-31 14:00:00', '我的第十六篇文章', 'sixteenth_post', 4, 40, 0, '2022-01-31 13:30:00', '# 我的第十六篇文章 - Markdown 格式的内容', '<h1>我的第十六篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个城市的文化介绍', '/api/images/007.jpg', 3),
('2022-02-02 16:00:00', '我的第十七篇文章', 'seventeenth_post', 7, 70, 0, '2022-02-02 15:30:00', '# 我的第十七篇文章 - Markdown 格式的内容', '<h1>我的第十七篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个体育赛事的报道', '/api/images/008.jpg', 3),
('2022-02-04 18:00:00', '我的第十八篇文章', 'eighteenth_post', 2, 20, 0, '2022-02-04 17:30:00', '# 我的第十八篇文章 - Markdown 格式的内容', '<h1>我的第十八篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个行业的分析报告', '/api/images/009.jpg', 5),
('2022-02-06 20:00:00', '我的第十九篇文章', 'nineteenth_post', 8, 80, 0, '2022-02-06 19:30:00', '# 我的第十九篇文章 - Markdown 格式的内容', '<h1>我的第十九篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个健康问题的科普', '/api/images/002.jpg', 3),
('2022-02-08 22:00:00', '我的第二十篇文章', 'twentieth_post', 6, 60, 1, '2022-02-08 21:30:00', '# 我的第二十篇文章 - Markdown 格式的内容', '<h1>我的第二十篇文章 - HTML 格式的内容</h1>', '这是一篇关于某个历史事件的回顾', '/api/images/003.jpg', 2);


-- 文章标签关联表格数据插入

INSERT INTO article_tag_referenced (article_id, tag_id)
VALUES (1, 1),
(9, 1),
(1, 2),
(2, 2),
(6, 2),
(10, 2),
(14, 2),
(17, 2),
(3, 3),
(2, 3),
(1, 3),
(7, 3),
(11, 3),
(15, 3),
(3, 4),
(4, 4),
(8, 4),
(12, 4),
(16, 4),
(4, 5),
(13, 5);

-- 评论表格数据插入

INSERT INTO discuss (discuss_id, create_time, discuss_user, article_id, content, parent_id)
VALUES (1, '2022-02-01 12:00:00', 1, 1, '很好的文章，谢谢分享！', NULL),
(2, '2022-02-02 13:00:00', 2, 1, '支持楼上，顶一下！', 1),
(3, '2022-02-03 14:00:00', 3, 2, '还有哪些关于这个话题的文章可以推荐吗？', NULL),
(4, '2022-02-04 15:00:00', 4, 3, '感觉作者对这个问题的见解非常深刻，学习了！', NULL),
(5, '2022-02-05 16:00:00', 5, 3, '同感，受益匪浅！', 4);
