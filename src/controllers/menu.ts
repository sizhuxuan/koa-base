import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Menu } from '../entity/menu';
import { UnauthorizedException } from '../exceptions';

export default class MenuController {
  public static async getMenus(ctx: Context) {
    const menuRepository = getRepository(Menu);
    const menus: Array<object> = await menuRepository.find();

    const firstLevel: any = [];
    const secondLevel: any = [];

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

    console.log('firstLevel:', firstLevel);

    // const filterAsyncRoutes = (menus: []) {
    //   const res:[] = [];

    //   menus.forEach((menu) => {
    //     const tmp = { ...route };
    //     if (hasPermission(roles, tmp)) {
    //       if (tmp.children) {
    //         tmp.children = filterAsyncRoutes(tmp.children, roles);
    //       }
    //       res.push(tmp);
    //     }
    //   });
    //   return res;
    // }

    ctx.status = 200;
    ctx.body = {
      data: firstLevel,
      meta: { message: '获取列表成功', code: 20000 },
    };
  }
}
