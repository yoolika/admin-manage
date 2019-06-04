import Mock from 'mockjs';
import routerAPI from './router';
import loginAPI from './login';
import UserAPI from './user';

Mock.mock(/\/getRouter/, 'get', routerAPI.getRouter);
Mock.mock(/\/login/, 'post', loginAPI.login);
Mock.mock(/\/getUserList/, 'get', UserAPI.getUserList);
Mock.mock(/\/addUser/, 'post', UserAPI.addUser);
Mock.mock(/\/getRoleList/, 'get', UserAPI.getRoleList);
Mock.mock(/\/getMenu/, 'get', routerAPI.getMenu);




