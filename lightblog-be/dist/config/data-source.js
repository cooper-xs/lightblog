"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = exports.TagRepository = exports.DiscussRepository = exports.CategoryRepository = exports.ArticleTagReferencedRepository = exports.ArticleRepository = exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Article_1 = require("../entities/Article");
var ArticleTagReferenced_1 = require("../entities/ArticleTagReferenced");
var Category_1 = require("../entities/Category");
var Discuss_1 = require("../entities/Discuss");
var Tag_1 = require("../entities/Tag");
var Users_1 = require("../entities/Users");
var config_1 = require("../config");
var isProd = process.env.NODE_ENV === 'production';
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: config_1.DATASOURCE.host,
    port: config_1.DATASOURCE.port,
    username: config_1.DATASOURCE.username,
    password: config_1.DATASOURCE.password,
    database: config_1.DATASOURCE.database,
    synchronize: config_1.DATASOURCE.synchronize,
    entities: [isProd ? 'dist/entities/*.js' : 'src/entities/*.ts'],
    migrations: [
    // "src/migrations/*.ts"
    ],
    subscribers: [
    // "src/subscribers/*.ts"
    ],
});
exports.ArticleRepository = exports.AppDataSource.getRepository(Article_1.Article);
exports.ArticleTagReferencedRepository = exports.AppDataSource.getRepository(ArticleTagReferenced_1.ArticleTagReferenced);
exports.CategoryRepository = exports.AppDataSource.getRepository(Category_1.Category);
exports.DiscussRepository = exports.AppDataSource.getRepository(Discuss_1.Discuss);
exports.TagRepository = exports.AppDataSource.getRepository(Tag_1.Tag);
exports.UsersRepository = exports.AppDataSource.getRepository(Users_1.Users);
//# sourceMappingURL=data-source.js.map