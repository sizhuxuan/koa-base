import Router from '@koa/router';

import AuthController from './controllers/auth';
import UserController from './controllers/user';
import CarpoolController from './controllers/carpool';

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
protectedRouter.delete('/user/deleteUser:id', UserController.deleteUser);

protectedRouter.get('/user/users/:id', UserController.showUserDetail);
protectedRouter.get('/user/info', UserController.getUserInfo);
protectedRouter.put('/user/users/:id', UserController.updateUser);

export { protectedRouter, unprotectedRouter };
