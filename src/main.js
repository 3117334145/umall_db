// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//1.---引入css---
import "./assets/css/reset.css"

//2.引入vue--挂载
import store from "./store"

//3.数据交互 配置代理

//4过
import "./filters"

//5公共组件
import "./components"

//6页面pasers

//7elemt -ul 安装 引入-
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
