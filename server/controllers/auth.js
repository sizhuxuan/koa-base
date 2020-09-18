"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const argon2 = __importStar(require("argon2"));
const typeorm_1 = require("typeorm");
const user_1 = require("../entity/user");
const exceptions_1 = require("../exceptions");
class AuthController {
    static async login(ctx) {
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        const user = await userRepository
            .createQueryBuilder()
            .where({ name: ctx.request.body.name })
            .addSelect('User.password')
            .getOne();
        console.log('user:', user);
        if (!user) {
            throw new exceptions_1.UnauthorizedException('用户名不存在');
        }
        else if (await argon2.verify(user.password, ctx.request.body.password)) {
            ctx.status = 200;
            ctx.body = { token: jsonwebtoken_1.default.sign({ id: user.id }, constants_1.JWT_SECRET) };
        }
        else {
            throw new exceptions_1.UnauthorizedException('密码错误');
        }
    }
    static async register(ctx) {
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        const newUser = new user_1.User();
        newUser.name = ctx.request.body.name;
        newUser.email = ctx.request.body.email;
        newUser.password = await argon2.hash(ctx.request.body.password);
        // 保存到数据库
        const user = await userRepository.save(newUser);
        ctx.status = 201;
        ctx.body = user;
    }
}
exports.default = AuthController;
