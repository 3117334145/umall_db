
<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column
        prop="id"
        label="菜单编号"
        sortable
        width="180"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="菜单名称"
        sortable
        width="180"
      ></el-table-column>

      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="bianji(scope.row.id)"
            >编剧</el-button
          >
          <el-button type="danger" @click="shanchu(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>




<script>
import { okalert } from "../../../utils/alert";
import { shanchuall } from "../../../utils/http";
export default {
  props: ["list"],
  methods: {
    shanchu(id) {
      //删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点了删除以后--------
          shanchuall({ id: id }).then((res) => {
            if (res.data.code === 200) {
              okalert(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },
    //编辑
    bianji(id) {
      this.$emit("bianji", id);
    },
  },
};
</script>

<style>
</style>