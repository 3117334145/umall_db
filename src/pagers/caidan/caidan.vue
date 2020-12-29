<template>
  <div>
    <!-- 组件 -->
    <el-button type="primary" @click="tianjia">添加</el-button>

    <!-- 列表 -->
    <list :list="list" @init="init" @bianji="bianji($event)"></list>

    <!-- 3.弹框 -->
    <add :info="info" @init="init" :list="list" ref="add"></add>
  </div>
</template>

<script>
//引入
import list from "./components/list.vue";
import add from "./components/add.vue";

//-------引入钩子函数时需加引号-------------
import { liebiaoall } from "../../utils/http";

export default {
  components: {
    list,
    add,
  },
  data() {
    return {
      //弹框状态
      info: {
        isshow: false,
        //用来判断
        isadd: true,
      },
      // 20..初始化列表-----------------------------
      list: [],
    };
  },
  methods: {
    //5.点击添加按钮
    tianjia() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    //封装一个方法用与获取列表
    init() {
      liebiaoall().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
        console.log(res);
      });
    },
    //----------编辑--------------------------
    bianji(id) {
      //编辑以后弹框出现-----
      this.info.isshow = true;

      this.info.isadd = false;
      //出发one 变量
      this.$refs.add.one(id);
    },
  },
  mounted() {
    //21
    this.init();
  },
};
</script>

<style>
</style>