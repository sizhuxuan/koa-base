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

// users
protectedRouter.get('/user/getUsers', UserController.getUsers);
protectedRouter.post('/user/addUser', UserController.addUser);
protectedRouter.delete('/user/deleteUser/:id', UserController.deleteUser);
protectedRouter.put('/user/updateUser', UserController.updateUser);
protectedRouter.get('/user/info', UserController.getUserInfo);

// menus
protectedRouter.get('/getMenus', MenuController.getMenus);

// community
protectedRouter.get('/article/list', ArticleController.getList);
unprotectedRouter.post('/article/uploadImage', ArticleController.uploadImage);
protectedRouter.post('/article/publishArticle', ArticleController.publishArticle);

export { protectedRouter, unprotectedRouter };
