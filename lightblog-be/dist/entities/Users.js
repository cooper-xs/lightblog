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
exports.Users = void 0;
var typeorm_1 = require("typeorm");
var Discuss_1 = require("./Discuss");
var Users = exports.Users = /** @class */ (function () {
    function Users() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            type: 'int',
            name: 'user_Id',
            comment: '用户ID',
        }),
        __metadata("design:type", Number)
    ], Users.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'user_nickname',
            nullable: true,
            comment: '用户昵称',
            length: 128,
        }),
        __metadata("design:type", String)
    ], Users.prototype, "userNickname", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'email',
            nullable: true,
            unique: true,
            comment: '用户邮箱',
            length: 64,
        }),
        __metadata("design:type", String)
    ], Users.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)('datetime', {
            name: 'create_time',
            nullable: true,
            comment: '注册时间',
        }),
        __metadata("design:type", Date)
    ], Users.prototype, "createTime", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Discuss_1.Discuss; }, function (discuss) { return discuss.userId2; }),
        __metadata("design:type", Array)
    ], Users.prototype, "discusses", void 0);
    Users = __decorate([
        (0, typeorm_1.Index)('email', ['email'], { unique: true }),
        (0, typeorm_1.Entity)('users', { schema: 'blog' })
    ], Users);
    return Users;
}());
//# sourceMappingURL=Users.js.map