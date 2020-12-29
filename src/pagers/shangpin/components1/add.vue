 <template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加分类' : '编辑分类 '"
      :visible.sync="info.isshow"
      @closed="quxiao"
    >
      <!-- 绑定数据 -->
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option label="---请选择----" value="" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 遍历数组 -->
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"> </el-input>
        </el-form-item>
       
        <el-form-item label="图片" label-width="100px">
           <!-- 原声js上传问价 -->
          <div class="btn">
            <div class="jia">+</div>
            <img v-if="imgurl"
              class="img"
              :src="imgurl"
              alt=""
            />
            <input v-if="info.isshow" type="file" class="kuang" @change="changeimg" />
          </div>
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
  xiugaiapp,
  liebiaoall,
  reqMenulist,
  jueseapp,
  guanliyuanapp,
  liebiaofpp,
  shaanchukaishiapp,
  yitiaoapp,
  gaiadd,
  
  shangpintianjiaapp,
shangpinxiangqingapp,
shangpinxiugaiapp

} from "../../../utils/http";
//成功的弹框引入
import { okalert } from "../../../utils/alert";
import path from "path"
export default {
  props: ["info", "list"],
  data() {
    return {

      //初始化角色列表
     imgurl:"",
      //--初始化商品数据----user
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
    };
  },

  mounted() {},

  //-------------------封装一个方法用于获取元素的数据------------------
  methods: {

    // 上传文件开始------------
    changeimg(e) {
      console.log(e)
      let file = e.target.files[0];
      //文件生成器
       this.imgurl=URL.createObjectURL(file)
      //复制user给图片
      this.user.img = file;
    },
    //---------点了取消--------------------------------------------------
    quxiao() {
      //编辑清空数据
      if (this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //封装方法用于清空框-------------------------------------------------------
    empty() {
        this.imgurl=""
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },

    //15...----点了添加
    tian() {
      // this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
     shangpintianjiaapp(this.user).then((res) => {
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
    xiangqing(id) {
      // console.log("ajax--------", id);
     shangpinxiangqingapp({ id: id }).then((res) => {
        if (res.data.code == 200) {
           this.user = res.data.list;
          //补id
          this.user.id = id;
          //图片
          this. imgurl=this.$pre+this.user.img
        }
        // //重置密码
        // this.user.password = "";
      });
    },

    //--------修改接口
    xiugai() {
      shangpinxiugaiapp(this.user).then((res) => {
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

<style scoped>
.btn {
  width: 100px;
  height: 100px;
  border: 1px solid rgb(8, 8, 8);
  position: relative;
}

.btn .jia {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #000;
}

.btn .kuang {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.btn .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>