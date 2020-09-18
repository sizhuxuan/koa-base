"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddentException = exports.UnauthorizedException = exports.NotFoundException = exports.BaseException = void 0;
class BaseException extends Error {
}
exports.BaseException = BaseException;
class NotFoundException extends BaseException {
    constructor(msg) {
        super();
        this.status = 404;
        this.message = msg || '无此内容';
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends BaseException {
    constructor(msg) {
        super();
        this.status = 401;
        this.message = msg || '尚未登录';
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddentException extends BaseException {
    constructor(msg) {
        super();
        this.status = 403;
        this.message = msg || '权限不足';
    }
}
exports.ForbiddentException = ForbiddentException;
