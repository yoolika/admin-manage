import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import axios from 'axios'
const _import = require('@/router/_import_' + process.env.NODE_ENV)//获取组件的方法
import Layout from '@/page/manage' //Layout 是架构组件，不在后台返回，在文件里单独引入
import { getToken } from '@/utils/auth' // getToken from cookie


router.beforeEach((to, from, next) => {
  console.log("====beforeEach====")
  if (getToken()) { //如果用户已经登录
    if (to.path === '/login') {
      next()
      // NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.getMenu.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          var getRouter = res.data.router//后台拿到路由
          routerGo(to, next, getRouter)//执行路由跳转方法
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            // Message.error(err || 'Verification failed, please login again')
            console.log(err)
            next({ path: '/login' })
          })
        })
      } else {
        // if (to.path == '/404') {//如果是登录页面路径，就直接next()
        //   next();
        // } else {
        //   // next('/404');
        //   next();
        // }
        next();
      }
    }
  } else {
    if (to.path == '/login') {//如果是登录页面路径，就直接next()
      next();
    } else {//不然就跳转到登录；
      next('/login');
    }
  }
})


function routerGo(to, next, getRouter) {
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  getRouter.map(v => { router.options.routes.push(v) })//将接口获取到的路由push到现有路由中
  router.addRoutes(getRouter)//动态添加路由
  global.antRouter = router.options.routes //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace:
}

function filterAsyncRouter(asyncRouterMap = []) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {//Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
