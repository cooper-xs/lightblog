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
exports.Category = void 0;
var typeorm_1 = require("typeorm");
var tool_1 = require("../utils/tool");
var Article_1 = require("./Article");
var Category = exports.Category = /** @class */ (function () {
    function Category() {
    }
    Category.prototype.toViewCategory = function () {
        return {
            categoryId: this.categoryId,
            categoryName: this.categoryName,
            categoryAliasName: this.categoryAliasName,
            description: this.description,
            parentId: this.parentId,
            createTime: tool_1.tool.formatDate(this.createTime),
        };
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            type: 'int',
            name: 'category_id',
            comment: '分类ID',
        }),
        __metadata("design:type", Number)
    ], Category.prototype, "categoryId", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'category_name',
            unique: true,
            comment: '分类名称',
            length: 64,
        }),
        __metadata("design:type", String)
    ], Category.prototype, "categoryName", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'category_alias_name',
            unique: true,
            comment: '分类别名',
            length: 64,
        }),
        __metadata("design:type", String)
    ], Category.prototype, "categoryAliasName", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'description',
            nullable: true,
            comment: '分类描述',
            length: 128,
        }),
        __metadata("design:type", String)
    ], Category.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)('int', {
            name: 'parent_id',
            nullable: true,
            comment: '父分类ID. 如空则说明是父级分类',
        }),
        __metadata("design:type", Number)
    ], Category.prototype, "parentId", void 0);
    __decorate([
        (0, typeorm_1.Column)('datetime', {
            name: 'create_time',
            nullable: true,
            comment: '创建时间',
        }),
        __metadata("design:type", Date)
    ], Category.prototype, "createTime", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Article_1.Article; }, function (article) { return article.category; }),
        __metadata("design:type", Array)
    ], Category.prototype, "articles", void 0);
    Category = __decorate([
        (0, typeorm_1.Index)('category_name', ['categoryName'], { unique: true }),
        (0, typeorm_1.Index)('category_alias_name', ['categoryAliasName'], { unique: true }),
        (0, typeorm_1.Entity)('category', { schema: 'blog' })
    ], Category);
    return Category;
}());
//# sourceMappingURL=Category.js.map