import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import { logger } from './logger';
import { JWT_SECRET } from './constants';
import jwt from 'koa-jwt';
import { protectedRouter, unprotectedRouter } from './routes';

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'koa',
  synchronize: true,
  entities: ['src/entity/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
  },
})
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa();

    // 注册中间件
    app.use(logger());
    app.use(cors());
    app.use(bodyParser());

    // 添加错误处理中间件来捕获在 Controller 中抛出的错误
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        // z只返回 JSON 格式的响应
        ctx.status = error.status || 500;
        ctx.body = { message: error.message };
      }
    });

    // 配置静态web服务的中间件
    app.use(require('koa-static')('./public/dist'));

    // 无需 JWT Token 即可访问
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    // 注册 JWT 中间件
    app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));

    // 需要 JWT Token 才可访问
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    // 运行服务器
    app.listen(9000);
  })
  .catch((err: string) => console.log('TypeORM conncetion error:', err));
