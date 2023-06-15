"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAdminError = exports.DataNotFoundError = exports.DataValidationError = exports.ParamsError = void 0;
// 参数错误: 参数错误
var ParamsError = /** @class */ (function (_super) {
    __extends(ParamsError, _super);
    function ParamsError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = 'ArticleError';
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return ParamsError;
}(Error));
exports.ParamsError = ParamsError;
// 数据校验错误: 格式不正确或数据非法 / 需要先修改关联项
var DataValidationError = /** @class */ (function (_super) {
    __extends(DataValidationError, _super);
    function DataValidationError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = 'DataValidationError';
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return DataValidationError;
}(Error));
exports.DataValidationError = DataValidationError;
// 数据不存在错误: (关联)数据xx不存在..
var DataNotFoundError = /** @class */ (function (_super) {
    __extends(DataNotFoundError, _super);
    function DataNotFoundError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = 'DataNotFoundError';
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return DataNotFoundError;
}(Error));
exports.DataNotFoundError = DataNotFoundError;
// 没有admin权限
var NoAdminError = /** @class */ (function (_super) {
    __extends(NoAdminError, _super);
    function NoAdminError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = 'NoAdminError';
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return NoAdminError;
}(Error));
exports.NoAdminError = NoAdminError;
//# sourceMappingURL=index.js.map