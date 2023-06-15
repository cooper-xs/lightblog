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
exports.Discuss = void 0;
var typeorm_1 = require("typeorm");
var tool_1 = require("../utils/tool");
var Article_1 = require("./Article");
var Users_1 = require("./Users");
var Discuss = exports.Discuss = /** @class */ (function () {
    function Discuss() {
    }
    Discuss_1 = Discuss;
    Discuss.prototype.toViewDiscusses = function () {
        return {
            discussId: this.discussId,
            createTime: tool_1.tool.formatDate(this.createTime),
            userId: this.userId,
            articleId: this.articleId,
            content: this.content,
            parentId: this.parentId,
            article: this.article,
            parent: this.parent,
            discusses: this.discusses,
            userId2: this.userId2,
        };
    };
    var Discuss_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            type: 'int',
            name: 'discuss_id',
            comment: '评论ID',
        }),
        __metadata("design:type", Number)
    ], Discuss.prototype, "discussId", void 0);
    __decorate([
        (0, typeorm_1.Column)('datetime', {
            name: 'create_time',
            nullable: true,
            comment: '评论日期',
        }),
        __metadata("design:type", Date)
    ], Discuss.prototype, "createTime", void 0);
    __decorate([
        (0, typeorm_1.Column)('int', {
            name: 'user_id',
            nullable: true,
            comment: '发表用户',
        }),
        __metadata("design:type", Number)
    ], Discuss.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)('int', {
            name: 'article_id',
            nullable: true,
            comment: '评论文章ID',
        }),
        __metadata("design:type", Number)
    ], Discuss.prototype, "articleId", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'content',
            nullable: true,
            comment: '评论内容',
            length: 1024,
        }),
        __metadata("design:type", String)
    ], Discuss.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.Column)('int', {
            name: 'parent_id',
            nullable: true,
            comment: '父评论ID',
        }),
        __metadata("design:type", Number)
    ], Discuss.prototype, "parentId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Article_1.Article; }, function (article) { return article.discusses; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'article_id', referencedColumnName: 'articleId' }]),
        __metadata("design:type", Article_1.Article)
    ], Discuss.prototype, "article", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Discuss_1; }, function (discuss) { return discuss.discusses; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'parent_id', referencedColumnName: 'discussId' }]),
        __metadata("design:type", Discuss)
    ], Discuss.prototype, "parent", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Discuss_1; }, function (discuss) { return discuss.parent; }),
        __metadata("design:type", Array)
    ], Discuss.prototype, "discusses", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.discusses; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'user_id', referencedColumnName: 'userId' }]),
        __metadata("design:type", Users_1.Users)
    ], Discuss.prototype, "userId2", void 0);
    Discuss = Discuss_1 = __decorate([
        (0, typeorm_1.Index)('fk_discuss_user_id', ['userId'], {}),
        (0, typeorm_1.Index)('fk_discuss_article_id', ['articleId'], {}),
        (0, typeorm_1.Index)('fk_discuss_parent_id', ['parentId'], {}),
        (0, typeorm_1.Entity)('discuss', { schema: 'blog' })
    ], Discuss);
    return Discuss;
}());
//# sourceMappingURL=Discuss.js.map