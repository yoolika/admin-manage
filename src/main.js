// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store/'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { get, post } from '@/config/http'
//解决低版本兼容问题
import "babel-polyfill";
import '@/permission'//动态权限
import '@/utils/global'//全局
import '@/utils/btnPermission'//页面按钮权限

// 引入mockjs
require('./mock/index.js')

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$get = get;
Vue.prototype.$post = post;

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
