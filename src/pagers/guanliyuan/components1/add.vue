<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加管理员' : '编辑管理员 '"
      :visible.sync="info.isshow"
      @closed="quxiao"
    >
      <!-- 绑定数据 -->
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="user.roleid">
            <el-option label="---请选择----" value="" disabled></el-option>
            <el-option
              v-for="item in rlist"
              :value="item.id"
              :key="item.id"
              :label="item.rolename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" label-width="100px">
          <el-input v-model="user.username" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"> </el-input>
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
  jueseall,
  xiugaiapp,
  liebiaoall,
  reqMenulist,
  jueseapp,
  guanliyuanapp,
  liebiaofpp,
  shaanchukaishiapp,
  yitiaoapp,
  gaiadd,
} from "../../../utils/http";
//成功的弹框引入
import { okalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      //初始化角色列表
      rlist: [],
      //管理员初始化user
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },

  mounted() {
    //进来以后获取角色列表数据
    jueseapp(this.user).then((res) => {
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
        roleid: "",
        username: "",
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
    //15...----点了添加
    tian() {
      // this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      guanliyuanapp(this.user).then((res) => {
        if (res.data.code == 200) {
          //成功的话弹
          okalert(res.data.msg);
          //弹框消失
          this.quxiao();
          //清空框内数据
          this.empty();
          //--------------列表数据------------------
          this.$emit("init");
        }
      });
    },
    //---------获取一条数据详情
    xiangqing(uid) {
      // console.log("ajax--------", id);
    yitiaoapp({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //修改接口的话给user补id
          this.user.id = id;
        }
        this.user=res.data.list
        
        //重置密码
        this.user.password=""
      });
    },

    //--------修改接口
    xiugai() {
      //去除数据给menus再发
      // this.user.menus = JSON.stringify(this.$refs.tree.setChenckedkeys());
      gaiadd(this.user).then((res) => {
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