<template>
  <div>
    <div>
      <el-container class="index">
        <el-aside width="200px">
          <!-- 测 -->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <!-- ------------------------------------------------- -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/caidan">菜单管理</el-menu-item>
                <el-menu-item index="/juese">角色管理</el-menu-item>
                <el-menu-item index="/guanliyuan">管理员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商城管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/cate">商品管理</el-menu-item>
                <el-menu-item index="/guige">商品规格</el-menu-item>
                <el-menu-item index="/shangpin">商品分类</el-menu-item>
                <el-menu-item index="/vip">会员管理</el-menu-item>
                <el-menu-item index="/lunbo">轮播图管理</el-menu-item>
                <el-menu-item index="/miaosha">秒杀活动</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="">开发后台</el-header>
          <el-main>
            <!-- 面包 -->
            <el-breadcrumb separator="/" v-if="$route.name">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
            </el-breadcrumb>

            <!-- 二级路由出口 -->
            <router-view class="fn"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.index {
  height: 100vh;
}

.el-aside {
  background: #537a5d;
}
.el-header {
  background: rgb(27, 175, 168);
}

.fn {
  padding-top: 20px;
}
</style>