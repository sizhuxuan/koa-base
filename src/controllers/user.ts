import { Context } from 'koa';
import { getManager } from 'typeorm';

import { User } from '../entity/user';
import { NotFoundException, ForbiddentException } from '../exceptions';

export default class UserController {
  public static async listUsers(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const users = await userRepository.find();

    ctx.status = 200;
    ctx.body = {
      data: users,
      meta: { msg: '获取用户列表成功', status: 200 },
    };
  }

  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(+ctx.params.id);

    if (user) {
      ctx.status = 200;
      ctx.body = {
        data: user,
        meta: { msg: '获取用户成功', status: 200 },
      };
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUser(ctx: Context) {
    const userId = +ctx.params.id;

    if (userId !== +ctx.state.user.id) {
      throw new ForbiddentException();
    }

    const userRepository = getManager().getRepository(User);
    await userRepository.update(+ctx.params.id, ctx.request.body);
    const updatedUser = await userRepository.findOne(+ctx.params.id);

    console.log('updatedUser:', updatedUser);

    if (updatedUser) {
      ctx.status = 200;
      ctx.body = { data: updatedUser, meta: { msg: '更新成功', status: 200 } };
    } else {
      ctx.status = 404;
    }
  }

  public static async deleteUser(ctx: Context) {
    const userId = +ctx.params.id;

    if (userId !== +ctx.state.user.id) {
      throw new ForbiddentException();
    }

    const userRepository = getManager().getRepository(User);
    await userRepository.delete(+ctx.params.id);

    // ctx.status = 204;
    ctx.body = { meta: { msg: '删除成功', status: 204 } };
  }
}
