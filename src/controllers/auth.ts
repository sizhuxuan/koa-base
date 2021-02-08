import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import { Context } from 'koa';
import * as argon2 from 'argon2';
import { getManager } from 'typeorm';
import { User } from '../entity/user';
import { UnauthorizedException } from '../exceptions';

export default class AuthController {
  public static async login(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const user = await userRepository
      .createQueryBuilder()
      .where({ name: ctx.request.body.username })
      .addSelect('User.password')
      .getOne();

    console.log('user:', user);

    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      const { id, name, email } = user;
      ctx.status = 200;
      ctx.body = {
        data: { id, name, email, token: 'Bearer ' + jwt.sign({ id: user.id }, JWT_SECRET) },
        meta: { msg: '登录成功', status: 200 },
      };
    } else {
      throw new UnauthorizedException('密码错误');
    }
  }

  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.email = ctx.request.body.email;
    newUser.password = await argon2.hash(ctx.request.body.password);

    // 保存到数据库
    const user = await userRepository.save(newUser);

    const { id, name, email } = user;

    ctx.status = 201;
    ctx.body = {
      meta: { msg: '注册成功', status: 201 },
      data: { name, email, id },
    };
  }
}
