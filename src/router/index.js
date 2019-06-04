import Vue from 'vue'
import Router from 'vue-router'
import Manage from '@/page/manage'

Vue.use(Router)

const Login = r => require.ensure([], () => r(require('@/page/login/index')), 'login');
const Home = r => require.ensure([], () => r(require('@/page/home/index')), 'home');
const error404 = r => require.ensure([], () => r(require('@/page/errorPage/404')), 'permissionList');

const vueRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      component: error404
    },
    {
      path: '/manage',
      name: '首页',
      component: Manage,
      meta: {
        title: '首页',
        type: '0'
      },
      children: [
        {
          path: 'home',
          component: Home,
          meta: { title: '首页' }
        }
        // , {
        //   path: '/userList',
        //   component: UserList,
        //   name: '用户列表',
        //   meta: { title: '用户列表' }
        // }, {
        //   path: '/productList',
        //   component: ProductList,
        //   name: '商品列表',
        //   meta: { title: '商品列表' }
        // }
      ]
    },
    {
      path: '/404',
      name: '出错了',
      component: error404
    }
  ]
  //路由样式
  // linkActiveClass: "active-router",
  // linkExactActiveClass: "exact-router"
})


// vueRouter.beforeEach(function (to, from, next) {
//   const nextRoute = [ 'account', 'order', 'course'];
//   const auth = store.state.auth;
//   //跳转至上述3个页面
//   if (nextRoute.indexOf(to.name) >= 0) {
//       //未登录
//       if (!store.state.auth.IsLogin) {
//           vueRouter.push({name: 'login'})
//       }
//   }
//   //已登录的情况再去登录页，跳转至首页
//   if (to.name === 'login') {
//       if (auth.IsLogin) {
//           vueRouter.push({name: 'home'});
//       }
//   }
//   next();
// });

export default vueRouter;