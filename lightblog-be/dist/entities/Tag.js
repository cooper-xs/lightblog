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
exports.Tag = void 0;
var typeorm_1 = require("typeorm");
var tool_1 = require("../utils/tool");
var ArticleTagReferenced_1 = require("./ArticleTagReferenced");
var Tag = exports.Tag = /** @class */ (function () {
    function Tag() {
    }
    Tag.prototype.toViewTag = function () {
        return {
            tagId: this.tagId,
            tagName: this.tagName,
            tagAliasName: this.tagAliasName,
            description: this.description,
            createTime: tool_1.tool.formatDate(this.createTime),
        };
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'tag_id', comment: '标签ID' }),
        __metadata("design:type", Number)
    ], Tag.prototype, "tagId", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'tag_name',
            unique: true,
            comment: '标签名称',
            length: 64,
        }),
        __metadata("design:type", String)
    ], Tag.prototype, "tagName", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'tag_alias_name',
            unique: true,
            comment: '标签别名',
            length: 64,
        }),
        __metadata("design:type", String)
    ], Tag.prototype, "tagAliasName", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'description',
            nullable: true,
            comment: '标签描述',
            length: 128,
        }),
        __metadata("design:type", String)
    ], Tag.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)('datetime', {
            name: 'create_time',
            nullable: true,
            comment: '创建时间',
        }),
        __metadata("design:type", Date)
    ], Tag.prototype, "createTime", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ArticleTagReferenced_1.ArticleTagReferenced; }, function (articleTagReferenced) { return articleTagReferenced.tag; }),
        __metadata("design:type", Array)
    ], Tag.prototype, "articleTagReferenceds", void 0);
    Tag = __decorate([
        (0, typeorm_1.Index)('tag_name', ['tagName'], { unique: true }),
        (0, typeorm_1.Index)('tag_alias_name', ['tagAliasName'], { unique: true }),
        (0, typeorm_1.Entity)('tag', { schema: 'blog' })
    ], Tag);
    return Tag;
}());
//# sourceMappingURL=Tag.js.map