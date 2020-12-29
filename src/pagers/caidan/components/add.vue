


<template>
  <div>
    <!-- 数据帮定 -->
    <el-dialog :title="info.isadd ? '添加菜单': ' 编辑菜单 ' " :visible.sync="info.isshow" @closed="quxiao"
    >
      <el-form :model="user">
        <!-- 1 -->
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 2 -->
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" @a="apid">
            <el-option :value="0" label="顶级菜单"></el-option>
            <!-- -------------大数据-------------- -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.title"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 3 -->
        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <!-- 图标 -->
        <el-form-item label="菜单图标" label-width="100px">
          <el-select v-model="user.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <p :class="item"></p>
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 地址 -->
        <el-form-item label="菜单地址" label-width="100px">
          <el-select v-model="user.url">
            <el-option
              v-for="item in indexrouters"
              :key="item.path"
              :value="'/' + item.path"
              :lable="item.name + '-/' + item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>

        {{ user }}

        <!-- 状态 -->
        <el-form-item label="菜单状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <!-- 2 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd" >添加</el-button  >
        <el-button type="primary" @click="gaia" v-else>修改</el-button>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
import { indexrouters } from "../../../router";
import { addALL, reqMenuInfo, xiugaiall } from "../../../utils/http";

import { okalert } from "../../../utils/alert";

export default {
  // 4.接收info
  props: ["info", "list"],
  data() {
    return {
      //初始化变量 默认开启
      user: {
        // name: "",
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      //图标
      icons: ["el-icon-setting", "el-icon-user-solid", "el-icon-star-on"],
      //13.......路由综合
      indexrouters,
    };
  },
  //6封装一个在方法里用于获取所有数据
  methods: {
    //取消按钮
    quxiao() {
      //编辑清空
      if (!this.info.isadd) {
        this.$emit();
      }
      this.info.isshow = false;
    },
    //清空框内数据
    fn() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        type: 2,
        url: "",
        status: 1,
      };
    },
    // 15添加
    add() {
      addALL(this.user).then((res) => {
        if (res.data.code == 200) {
          //成功 弹框

          okalert(res.data.msg);
          //弹框消失
          this.quxiao();

          //清空框内数据
          this.fn();
          //列表刷新
          this.$emit("init");
        }
        console.log(res);
      });
    },
    ///------修改顶级菜单--------------
    apid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    //发送ajax--获取详情
    one(id) {
      reqMenuInfo({ id: id }).then((res) => {
        console.log(res);
        this.user = res.data.list;
        //修改接口的话补一个 id
        this.user.id = id;
      });
    },
    //----修改-----
    gaia() {
      xiugaiall(this.user).then((res) => {
        if (res.data.code == 200) {
          okalert(res.data.msg);
          //消失
          this.quxiao();
          //清空数据
          this.fn();
          // 列表刷新
          this.$emit("init");
        }
        console.log(res);
      });
    },
  },
};
</script>

<style>
</style>