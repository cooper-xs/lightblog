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
exports.ArticleTagReferenced = void 0;
var typeorm_1 = require("typeorm");
var Article_1 = require("./Article");
var Tag_1 = require("./Tag");
var ArticleTagReferenced = exports.ArticleTagReferenced = /** @class */ (function () {
    function ArticleTagReferenced() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            type: 'int',
            name: 'atr_Id',
            comment: '引用id',
        }),
        __metadata("design:type", Number)
    ], ArticleTagReferenced.prototype, "atrId", void 0);
    __decorate([
        (0, typeorm_1.Column)('int', {
            name: 'article_id',
            nullable: true,
            comment: '文章id',
        }),
        __metadata("design:type", Number)
    ], ArticleTagReferenced.prototype, "articleId", void 0);
    __decorate([
        (0, typeorm_1.Column)('int', {
            name: 'tag_id',
            nullable: true,
            comment: '标签id',
        }),
        __metadata("design:type", Number)
    ], ArticleTagReferenced.prototype, "tagId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Article_1.Article; }, function (article) { return article.articleTagReferenceds; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        (0, typeorm_1.JoinColumn)([
            {
                name: 'article_id',
                referencedColumnName: 'articleId',
            },
        ]),
        __metadata("design:type", Article_1.Article)
    ], ArticleTagReferenced.prototype, "article", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tag_1.Tag; }, function (tag) { return tag.articleTagReferenceds; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        (0, typeorm_1.JoinColumn)([
            {
                name: 'tag_id',
                referencedColumnName: 'tagId',
            },
        ]),
        __metadata("design:type", Tag_1.Tag)
    ], ArticleTagReferenced.prototype, "tag", void 0);
    ArticleTagReferenced = __decorate([
        (0, typeorm_1.Index)('fk_atr_article_id', ['articleId'], {}),
        (0, typeorm_1.Index)('fk_atr_tag_id', ['tagId'], {}),
        (0, typeorm_1.Entity)('article_tag_referenced', { schema: 'blog' })
    ], ArticleTagReferenced);
    return ArticleTagReferenced;
}());
//# sourceMappingURL=ArticleTagReferenced.js.map