import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Article } from '../entity/article';

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
      meta: { message: '获取文章列表成功', code: 20000 },
    };
  }

  public static async uploadImage(ctx: Context) {
    // const { name, path: filePath, size, type } = ctx.request.files.file;
    console.log(111, ctx.request.files);

    ctx.status = 200;
    ctx.body = {
      // data: { name, filePath, size, type },
      meta: { message: '图片上传成功', code: 20000 },
    };
  }

  public static async publishArticle(ctx: Context) {
    console.log('publishArticle:', ctx);

    // const articleRepository = getRepository(Article);

    ctx.status = 200;
    ctx.body = {
      data: {},
      meta: { message: '文章发布成功', code: 20000 },
    };
  }
}
