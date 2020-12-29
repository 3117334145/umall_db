<template>
  <div>
    <el-button type="primary" @click="willapp">添加</el-button>
    <!--  表格 渠道数据后传给列表  ---绑定事件---->
    <list :list="list" @init="init" @bianji="bianji($event)"></list>

    <!-- 添加弹框----刷新列表 ------>
    <add :info="info" @init="init" :list="list" ref="add"></add>

  </div>
</template>

<script>
//引入
import list from "./components1/list.vue";
import add from "./components1/add.vue";
import {huiyuanliebiaoapp,} from "../../utils/http";
export default {
  //注册
  components: {
    list,
    add,
  },
  data() {
    return {
      //弹框状态
      info: {
        isshow: false,
        isadd: true, //判断是添加还是编辑打开的框分局
      },
      //初始化列表数据list ------------------
      list: [],
    };
  },

  methods: {
    //会员点了添加以后 封装一个方法
    willapp() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
   
    //21.封装一个方法用于获取列表数据
    init() {
   huiyuanliebiaoapp().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
       });
    },

    //修改
    changepage(e) {
      console.log(e);
      this.page = e;
      //再次获取
      this.getlist();
    },

    //点击编辑后出发子元素--------弹框-------------------------------------------------------------------------
    bianji(uid) {
      this.info.isshow = true;
      //是编辑
      this.info.isadd = false;
      this.$refs.add.xiangqing(uid);
    },
  },

  mounted() {
    //获取list 列表
    this.init();
    //
  },
};
</script>

<style>
</style>