"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
var typeorm_1 = require("typeorm");
var Category_1 = require("./Category");
var ArticleTagReferenced_1 = require("./ArticleTagReferenced");
var Discuss_1 = require("./Discuss");
var Article = exports.Article = /** @class */ (function () {
    function Article() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            type: 'int',
            name: 'article_id',
            comment: '博文ID',
        }),
        __metadata("design:type", Number)
    ], Article.prototype, "articleId", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'title',
            nullable: true,
            unique: true,
            comment: '博文标题',
            length: 190,
        }),
        __metadata("design:type", String)
    ], Article.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'post_alias_name',
            nullable: true,
            unique: true,
            comment: '博文别名/路径名',
            length: 100,
        }),
        __metadata("design:type", String)
    ], Article.prototype, "postAliasName", void 0);
    __decorate([
        (0, typeorm_1.Column)('int', {
            name: 'comment_count',
            nullable: true,
            comment: '评论数',
        }),
        __metadata("design:type", Number)
    ], Article.prototype, "commentCount", void 0);
    __decorate([
        (0, typeorm_1.Column)('int', {
            name: 'read_count',
            nullable: true,
            comment: '浏览量',
        }),
        __metadata("design:type", Number)
    ], Article.prototype, "readCount", void 0);
    __decorate([
        (0, typeorm_1.Column)('int', {
            name: 'top_flag',
            nullable: true,
            comment: '置顶等级, 不为0则置顶',
        }),
        __metadata("design:type", Number)
    ], Article.prototype, "topFlag", void 0);
    __decorate([
        (0, typeorm_1.Column)('datetime', {
            name: 'create_time',
            nullable: true,
            comment: '创建时间',
        }),
        __metadata("design:type", Date)
    ], Article.prototype, "createTime", void 0);
    __decorate([
        (0, typeorm_1.Column)('datetime', {
            name: 'push_date',
            nullable: true,
            comment: '发布日期',
        }),
        __metadata("design:type", Date)
    ], Article.prototype, "pushDate", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', {
            name: 'content_md',
            nullable: true,
            comment: '文章markdown内容',
        }),
        __metadata("design:type", String)
    ], Article.prototype, "contentMd", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', {
            name: 'content_html',
            nullable: true,
            comment: '文章html内容',
        }),
        __metadata("design:type", String)
    ], Article.prototype, "contentHtml", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'article_summary',
            nullable: true,
            comment: '文章摘要',
            length: 190,
        }),
        __metadata("design:type", String)
    ], Article.prototype, "articleSummary", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'preview_image_url',
            nullable: true,
            comment: '预览图片链接',
            length: 255,
        }),
        __metadata("design:type", String)
    ], Article.prototype, "previewImageUrl", void 0);
    __decorate([
        (0, typeorm_1.Column)('int', {
            name: 'category_id',
            nullable: true,
            comment: '分类ID',
        }),
        __metadata("design:type", Number)
    ], Article.prototype, "categoryId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Category_1.Category; }, function (category) { return category.articles; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        (0, typeorm_1.JoinColumn)([
            {
                name: 'category_id',
                referencedColumnName: 'categoryId',
            },
        ]),
        __metadata("design:type", Category_1.Category)
    ], Article.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ArticleTagReferenced_1.ArticleTagReferenced; }, function (articleTagReferenced) { return articleTagReferenced.article; }),
        __metadata("design:type", Array)
    ], Article.prototype, "articleTagReferenceds", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Discuss_1.Discuss; }, function (discuss) { return discuss.article; }),
        __metadata("design:type", Array)
    ], Article.prototype, "discusses", void 0);
    Article = __decorate([
        (0, typeorm_1.Index)('title', ['title'], { unique: true }),
        (0, typeorm_1.Index)('post_alias_name', ['postAliasName'], { unique: true }),
        (0, typeorm_1.Index)('fk_article_category_id', ['categoryId'], {}),
        (0, typeorm_1.Entity)('article', { schema: 'blog' })
    ], Article);
    return Article;
}());
//# sourceMappingURL=Article.js.map