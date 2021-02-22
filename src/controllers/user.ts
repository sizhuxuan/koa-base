import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import { Context } from 'koa';
import * as argon2 from 'argon2';
import { getManager } from 'typeorm';
import { User } from '../entity/user';
import { NotFoundException, ForbiddentException, UnauthorizedException } from '../exceptions';

export default class UserController {
  public static async getUsers(ctx: Context) {
    const { query, pagenum, pagesize } = ctx.query;
    const userRepository = getManager().getRepository(User);

    let [users, total] = await userRepository.findAndCount({
      order: {
        create_time: 'DESC',
      },
      take: pagesize,
      // skip: 5,
    });

    ctx.status = 200;
    ctx.body = {
      data: { users, total },
      meta: { message: '获取用户列表成功', code: 20000 },
    };
  }

  public static async addUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.password = await argon2.hash(ctx.request.body.password);
    newUser.email = ctx.request.body.email;
    newUser.mobile = ctx.request.body.mobile;
    newUser.is_valid = 1;
    newUser.create_time = new Date();
    newUser.update_time = new Date();

    // 保存到数据库
    const user = await userRepository.save(newUser);

    const { name, email, mobile } = user;

    ctx.status = 200;
    ctx.body = {
      meta: { message: '添加用户成功', code: 20000 },
      data: { name, email, mobile },
    };
  }

  public static async getUserInfo(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const Token = ctx.request.header['authorization'].split(' ')[1];
    let verify_id: any = jwt.verify(Token, JWT_SECRET);

    const user = await userRepository.findOne(verify_id.id);
    if (user) {
      ctx.status = 200;
      ctx.body = {
        data: {
          ...user,
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          introduction: 'I am a super administrator',
          roles: ['admin'],
        },
        meta: { message: '获取用户成功', code: 20000 },
      };
    } else {
      throw new NotFoundException();
    }
  }

  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(+ctx.params.id);

    if (user) {
      ctx.status = 200;
      ctx.body = {
        data: user,
        meta: { msg: '获取用户成功', code: 200 },
      };
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUser(ctx: Context) {
    const { id, email, mobile } = ctx.request.body;
    console.log('ctx:', id, email, mobile);

    // if (userId !== +ctx.state.user.id) {
    //   throw new ForbiddentException();
    // }

    const userRepository = getManager().getRepository(User);

    await userRepository.update(id, { email, mobile, update_time: new Date() });
    const updatedUser = await userRepository.findOne(+ctx.request.body.id);

    if (updatedUser) {
      ctx.status = 200;
      ctx.body = { data: updatedUser, meta: { message: '更新成功', code: 20000 } };
    } else {
      ctx.status = 404;
    }
  }

  public static async deleteUser(ctx: Context) {
    console.log('ctx:', ctx.params);

    const userId = +ctx.params.id;
    console.log(userId, +ctx.state.user.id);
    // if (userId !== +ctx.state.user.id) {
    //   throw new ForbiddentException();
    // }

    const userRepository = getManager().getRepository(User);
    await userRepository.delete(+ctx.params.id);

    ctx.status = 200;
    ctx.body = { meta: { message: '删除成功', code: 20000 } };
  }
}
