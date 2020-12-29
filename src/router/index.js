import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 导出声明变量
export let indexrouters = [
  {
    path: "caidan",
    component: () => import("../pagers/caidan/caidan.vue"),
    name: "菜单管理"
  },
  {
    path: "juese",
    component: () => import("../pagers/juese/juese.vue"),
    name: "角色管理"
  },
  {
    path: "guanliyuan",
    component: () => import("../pagers/guanliyuan/guanliyuan.vue"),
    name: "管理员管理"
  },
  {
    path: "cate",
    component: () => import("../pagers/cate/cate.vue"),
    name: "商品管理"
  },
  {
    path: "guige",
    component: () => import("../pagers/guige/guige.vue"),
    name: "商品规格"
  },
  {
    path: "shangpin",
    component: () => import("../pagers/shangpin/shangpin.vue"),
    name: "商品分类"
  },
  {
    path: "vip",
    component: () => import("../pagers/vip/vip.vue"),
    name: "会员管理"
  },
  {
    path: "lunbo",
    component: () => import("../pagers/lunbo/lunbo.vue"),
    name: "轮播图管理"
  },
  {
    path: "miaosha",
    component: () => import("../pagers/miaosha/miaosha.vue"),
    name: "秒杀管理"
  },
]





export default new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../pagers/login/login.vue"),
    },
    {
      path: "/",
      component: () => import("../pagers/index/index.vue"),
      //二级分类
      children: [
        {
          path: "",
          component: () => import("../pagers/home/home.vue")
        },
        //数组拼接 导出二级路由 
      ].concat(indexrouters)
    },
  ],
})
