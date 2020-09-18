import { Context } from 'koa';
import { getManager } from 'typeorm';

import { Carpool } from '../entity/carpool';
import { NotFoundException, ForbiddentException } from '../exceptions';

export default class CarpoolController {
  public static async listCarpool(ctx: Context) {
    console.log('carpools:');
    const carpoolRepository = getManager().getRepository(Carpool);

    const carpools = await carpoolRepository.find();

    carpools.map((item) => {
      console.log(item);
    });

    ctx.status = 200;
    ctx.body = {
      data: carpools,
      meta: { msg: '获取拼车列表成功', status: 200 },
    };
  }

  public static async addCarpool(ctx: Context) {
    const carpoolRepository = getManager().getRepository(Carpool);

    const newCarpool = new Carpool();

    newCarpool.type = ctx.request.body.type;
    newCarpool.go_off = ctx.request.body.go_off;
    newCarpool.departure = ctx.request.body.departure;
    newCarpool.destination = ctx.request.body.destination;
    newCarpool.phone = ctx.request.body.phone;
    newCarpool.publishTime = Date().toString();

    // 保存到数据库
    const carpool = await carpoolRepository.save(newCarpool);

    ctx.status = 201;
    ctx.body = {
      meta: { msg: '发布成功', status: 201 },
    };
  }
}
