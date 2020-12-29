<template>
  <div>
    <el-dialog
      :title="info.isadd ? '角色修改' : '角色编辑 '"
      :visible.sync="info.isshow"
      @closed="quxiao"
    >
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"> </el-input>
        </el-form-item>

        <!-- 树形结构 -->
        <el-form-item label="角色权限" label-width="100px">
          <el-tree
            v-model="user.menus"
            :data="mlist"
            node-key="id"
            ref="tree"
            :props="defaultProps"
            show-checkbox
          ></el-tree>
        </el-form-item>

        <!-- 状态 -->
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
import { jueseall, xiugaiapp, liebiaoall,reqMenulist, } from "../../../utils/http";
//成功的弹框引入
import { okalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      //参数名
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      //树形结构的数据
      menulist: [],
      defaultProps: {
        label: "title",
        children: "children",
      },
    };
  },
  //封装一个方法用于获取元素的数据
  methods: {
    //取消
    quxiao() {
      //编辑清空数据
      if (this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //封装方法用于清空框
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //  树形结构清空数据
      this.$refs.tree.setChenckedkeys([]);
    },
    //15...点了添加
    tian() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      jueseall(this.user).then((res) => {
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
    //获取一条数据详情
    xiangqing(id) {
      // console.log("ajax--------", id);
      xiugaiapp({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //修改接口的话给user补id
          this.user.id = id;
          //树形结构复制
          this.$refs.tree.setChenckedkeys(JSON.parse(this.user.menus));
        }
      });
    },

    //修改接口
    xiugai() {

      //去除数据给menus再发

      this.user.menus=JSON.stringify(this.$refs.tree.setChenckedkeys())
      xiugaiapp(this.user).then((res) => {
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
  mounted() {
    liebiaoall().then((res) => {
      this.mlist = res.data.list;
    });
  },
};
</script>

<style>
</style>