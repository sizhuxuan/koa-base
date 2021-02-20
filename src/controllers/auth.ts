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

    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      const { id, name, email } = user;
      ctx.status = 200;
      ctx.body = {
        meta: { message: '登录成功', code: 20000 },
        data: { id, name, email, token: 'Bearer ' + jwt.sign({ id: user.id }, JWT_SECRET) },
      };
    } else {
      throw new UnauthorizedException('密码错误');
    }
  }

  public static async logout(ctx: Context) {
    console.log('ctx:', ctx);
    const userRepository = getManager().getRepository(User);

    const Token = ctx.request.header['authorization'].split(' ')[1];
    let verify_id: any = jwt.verify(Token, JWT_SECRET);

    const user = await userRepository.findOne(verify_id.id);

    console.log('user:', user);
    if (user) {
      ctx.status = 200;
      ctx.body = {
        meta: { message: '退出成功', code: 20000 },
        data: 'success',
      };
    } else {
      throw new UnauthorizedException('退出失败');
    }
  }

  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.email = ctx.request.body.email;
    newUser.password = await argon2.hash(ctx.request.body.password);
    newUser.create_time = new Date();
    newUser.is_valid = 1;

    // 保存到数据库
    const user = await userRepository.save(newUser);

    const { name, email } = user;

    ctx.status = 201;
    ctx.body = {
      meta: { msg: '注册成功', status: 201 },
      data: { name, email },
    };
  }
}
