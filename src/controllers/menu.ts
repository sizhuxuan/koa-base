import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Menu } from '../entity/menu';
import { UnauthorizedException } from '../exceptions';

export default class MenuController {
  public static async getMenus(ctx: Context) {
    const menuRepository = getRepository(Menu);
    const menus: Array<object> = await menuRepository.find();

    const firstLevel: Array<{ children: Array<object>; id: number }> = [];
    const secondLevel: Array<{ parent_id: number }> = [];

    menus.forEach((item: any) => {
      if (item.level == 1) {
        firstLevel.push(item);
      } else if (item.level == 2) {
        secondLevel.push(item);
      }
    });

    for (var i = 0; i < firstLevel.length; i++) {
      var ff = [];
      for (var j = 0; j < secondLevel.length; j++) {
        if (secondLevel[j].parent_id == firstLevel[i].id) {
          ff.push(secondLevel[j]);
        }
      }
      firstLevel[i].children = ff;
    }

    ctx.status = 200;
    ctx.body = {
      data: firstLevel,
      meta: { message: '获取列表成功', code: 20000 },
    };
  }
}
