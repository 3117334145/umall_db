<template>
  <div>
    <el-dialog
      :title="info.isadd ? '会员修改' : '编辑管理员 '"
      :visible.sync="info.isshow"
      @closed="quxiao"
    >
      <!-- 绑定数据 -->
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"> </el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"> </el-input>
          <p>留空咋不修改</p>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <!--  底部 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="tian" v-if="info.isadd"
          >添加</el-button
        >
        <el-button type="primary" @click="xiugai" v-else>修改</el-button>
      </div>

      {{ user }}
    </el-dialog>
  </div>
</template>

<script>
import { indexrouters } from "../../../router";
import {
  /*-----会员开始---------*/
  huiyuanxiangqingapp,
  huiyuanxiugaiapp,
  huiyuantianjiaapp,
} from "../../../utils/http";
//成功的弹框引入
import { okalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      //初始化角色列表
      rlist: [],
      //会员初始化初始化user
      user: {
        // uid : "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },

  mounted() {
    //进来以后获取会员列表数据
    huiyuanliebiaoapp(this.user).then((res) => {
      if (res.data.code == 200) {
       this.rlist = res.data.list;
      }
    });
  },

  //-------------------封装一个方法用于获取元素的数据------------------
  methods: {
    //封装方法用于清空框
    empty() {
      this.user = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    //---------点了取消------------
    quxiao() {
      //编辑清空数据
      if (this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },



    //---------获取一条数据详情----------
    xiangqing(uid) {
     huiyuanxiangqingapp({ uid: uid }).then((res) => {
       //成功弹框
        if (res.data.code == 200) {
          this.user = res.data.list;
        this.user.password = "";
          //修改发布usus返回
          // this.user.id = id;
        }
        // this.user = res.data.list;
        //重置密码设置报错404 -------
      });
    },

    //--------修改接口-----------
    xiugai() {
      huiyuanxiugaiapp(this.user).then((res) => {
        if (res.data.code == 200) {
          okalert(res.data.msg);
          //消失
          this.quxiao();
          //清空数据
          this.empty();
          // 列表刷新
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>