"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tool = void 0;
var tool = /** @class */ (function () {
    function tool() {
    }
    /** 将数据库存储的时间格式化为年月日 */
    tool.formatDate = function (date) {
        var d = new Date(date);
        var year = d.getFullYear();
        var month = ('0' + (d.getMonth() + 1)).slice(-2);
        var day = ('0' + d.getDate()).slice(-2);
        return "".concat(year, "\u5E74").concat(month, "\u6708").concat(day, "\u65E5");
    };
    /** 将时间格式化为年月日时分秒 */
    tool.formatDateTime = function (date) {
        var d = new Date(date);
        var year = d.getFullYear();
        var month = ('0' + (d.getMonth() + 1)).slice(-2);
        var day = ('0' + d.getDate()).slice(-2);
        var hour = ('0' + d.getHours()).slice(-2);
        var minute = ('0' + d.getMinutes()).slice(-2);
        var second = ('0' + d.getSeconds()).slice(-2);
        return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hour, ":").concat(minute, ":").concat(second);
    };
    /** 将别名转化为安全的url路径 */
    tool.formatUrlPath = function (str) {
        var encodedStr = encodeURIComponent(str);
        return encodedStr.replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    };
    /** 将其他类型转换为数字类型 */
    tool.toNumber = function (value, setValue) {
        if (value === 0)
            return 0;
        return value ? Number(value) : setValue;
    };
    /** 检查邮箱格式是否正确 */
    tool.checkEmail = function (email) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return reg.test(email);
    };
    return tool;
}());
exports.tool = tool;
//# sourceMappingURL=tool.js.map