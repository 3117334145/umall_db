<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- 1 -->
      <el-table-column prop="id" label=" 商品编号" sortable width="180">
      </el-table-column>
      <!-- 2 -->
      <el-table-column prop="goodsname " label="商品名称" sortable width="180">
      </el-table-column>

      <!-- 3 -->
      <el-table-column prop=" price " label="商品价格" sortable width="180">
      </el-table-column>

      <!-- 4 -->
      <el-table-column prop="market_price " label="市场价格" sortable width="180">
      </el-table-column>

      <el-table-column label="图片" sortable width="180">
        <template slot-scope="scope">
          <img
            v-if="scope.row.img !== 'null'"
            :src="$pre + scope.row.img"
            alt=""
          />
        </template>
      </el-table-column>

      <!-- 5-->
      <el-table-column prop="isnew" label="是否新品" sortable width="180">
      </el-table-column>

      <!-- 6 -->
      <el-table-column prop="ishot " label="是否热卖" sortable width="180">
      </el-table-column>

      <!-- 7 -->
      <el-table-column prop="status" label="状态">
        <!-- 点击单行时获取数据 -->
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!-- 8 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button type="primary" @click="bianji(scope.row.id)"
            >编辑</el-button
          >
          <!-- 删除数据id的下表 -->
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {  shanchuguigeapp ,guigeliebiaoapp  } from "../../../utils/http";
import { okalert } from "../../../utils/alert";
export default {
  //接受
  props: ["list"],
  methods: {
    //删除 类名引入
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
         shanchuguigeapp ({ id: id }).then((res) => {
            if (res.data.code === 200) {
              okalert(res.data.msg);
              //刷新列表
              this.$emit("init");
            }
            console.log(res);
          });
        })
        .catch(() => {});
    },
    //34.......点了编辑以后
    bianji(id) {
      this.$emit("bianji", id);
    },
  },
};
</script>

<style scoped>
img {
  width: 90px;
  height: 90px;
}
</style>