"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const logger_1 = require("./logger");
const constants_1 = require("./constants");
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const routes_1 = require("./routes");
typeorm_1.createConnection({
    type: 'mysql',
    host: '47.101.40.88',
    port: 3306,
    username: 'root',
    password: 'Honor6plus-911',
    database: 'koa',
    synchronize: true,
    entities: ['src/entity/*.ts'],
    cli: {
        entitiesDir: 'src/entity',
    },
})
    .then(() => {
    // 初始化 Koa 应用实例
    const app = new koa_1.default();
    // 注册中间件
    app.use(logger_1.logger());
    app.use(cors_1.default());
    app.use(koa_bodyparser_1.default());
    // 添加错误处理中间件来捕获在 Controller 中抛出的错误
    app.use(async (ctx, next) => {
        try {
            await next();
        }
        catch (error) {
            // z只返回 JSON 格式的响应
            ctx.status = error.status || 500;
            ctx.body = { message: error.message };
        }
    });
    // 配置静态web服务的中间件
    app.use(require('koa-static')('./public/dist'));
    // 无需 JWT Token 即可访问
    app.use(routes_1.unprotectedRouter.routes()).use(routes_1.unprotectedRouter.allowedMethods());
    // 注册 JWT 中间件
    app.use(koa_jwt_1.default({ secret: constants_1.JWT_SECRET }).unless({ method: 'GET' }));
    // 需要 JWT Token 才可访问
    app.use(routes_1.protectedRouter.routes()).use(routes_1.protectedRouter.allowedMethods());
    // 运行服务器
    app.listen(3000);
})
    .catch((err) => console.log('TypeORM conncetion error:', err));
