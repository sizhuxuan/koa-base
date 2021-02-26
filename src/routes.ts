import Router from '@koa/router';

import AuthController from './controllers/auth';
import UserController from './controllers/user';
import CarpoolController from './controllers/carpool';
import ArticleController from './controllers/article';
import MenuController from './controllers/menu';

const unprotectedRouter = new Router();

// auth 相关的路由
unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/logout', AuthController.logout);
unprotectedRouter.post('/auth/register', AuthController.register);

unprotectedRouter.get('/home/carpool', CarpoolController.listCarpool);
unprotectedRouter.post('/home/addcarpool', CarpoolController.addCarpool);

const protectedRouter = new Router();

// users 相关路由
protectedRouter.get('/user/getUsers', UserController.getUsers);
protectedRouter.post('/user/addUser', UserController.addUser);
protectedRouter.delete('/user/deleteUser/:id', UserController.deleteUser);
protectedRouter.put('/user/updateUser', UserController.updateUser);
protectedRouter.get('/user/info', UserController.getUserInfo);

// excel 相关路由
protectedRouter.get('/article/list', ArticleController.getList);
protectedRouter.get('/menu/getMenus', MenuController.getMenus);

export { protectedRouter, unprotectedRouter };
