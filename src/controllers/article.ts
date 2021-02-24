import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import { Context } from 'koa';
import * as argon2 from 'argon2';
import { getRepository } from 'typeorm';
import { Article } from '../entity/article';
import { UnauthorizedException } from '../exceptions';

export default class ArticleController {
  public static async getList(ctx: Context) {
    const { query, pagenum, pagesize } = ctx.query;
    const articleRepository = getRepository(Article);
    let [items, total] = await articleRepository.findAndCount({
      order: {
        display_time: 'DESC',
      },
      take: pagesize,
      skip: (pagenum - 1) * pagesize,
      // where: { name: query },
    });

    ctx.status = 200;
    ctx.body = {
      data: { items, total },
      meta: { message: '获取用户列表成功', code: 20000 },
    };
  }

  public static async logout(ctx: Context) {}

  public static async register(ctx: Context) {}
}
