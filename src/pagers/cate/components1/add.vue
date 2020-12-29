 <template>
  <div>
    <el-dialog
      :title="info.isadd ? '商品管理' : '商品管理 '"
      :visible.sync="info.isshow"
      @closed="quxiao"
    >
      <!-- 绑定数据 -->
      <el-form :model="user">
        <!-- 一级分类 -->
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid">
            <el-option label="---请选择---" value="" disabled></el-option>
            <el-option label="家用电器" value="1"></el-option>
            <el-option label="海尔空调" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option label="---请选择---" value="" disabled></el-option>
            <el-option label="统帅电器" value="1"></el-option>
            <el-option label="卡萨帝" value="2"></el-option>
            <el-option label="热水器" value="3"></el-option>
            <!-- 遍历数组 -->
          </el-select>
        </el-form-item>

        <!-- 名称 -->
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname" autocomplete="off"> </el-input>
        </el-form-item>

        <!-- 商品价格 -->
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price" autocomplete="off"> </el-input>
        </el-form-item>

        <!-- 市场价格 -->
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price" autocomplete="off"> </el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" label-width="100px">
          <!-- 原声js上传问价 -->
          <div class="btn">
            <div class="jia">+</div>
            <img v-if="imgurl" class="img" :src="imgurl" alt="" />
            <input
              v-if="info.isshow"
              type="file"
              class="kuang"
              @change="changeimg"
            />
          </div>
        </el-form-item>
        <!--  -->
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid">
            <el-option label="---请选择---" value="" disabled></el-option>
            <el-option label="颜色" value="1"></el-option>
            <el-option label="尺寸" value="2"></el-option>
            <el-option label="匹数" value="3"></el-option>
          </el-select>
        </el-form-item>

        <!-- 属性 -->
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr">
            <el-option label="---请选择---" value="" disabled></el-option>
            <el-option label="白色" value="1"></el-option>
            <el-option label="红" value="2"></el-option>
            <el-option label="黑" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1"> 是</el-radio>
          <el-radio v-model="user.isnew" :label="2"> 否 </el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1"> 是</el-radio>
          <el-radio v-model="user.ishot" :label="2"> 否 </el-radio>
        </el-form-item>

        <!-- 开关 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="100px">
          <textarea v-model="user.description" cols="30" rows="10"></textarea>
        </el-form-item>
      </el-form>

      <!--  底部 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="tian" v-if="info.isadd"
          >添加2</el-button
        >
        <el-button type="primary" @click="xiugai" v-else>修改2</el-button>
      </div>

      {{ user }}
    </el-dialog>
  </div>
</template>

<script>
import { indexrouters } from "../../../router";
import {
  guigetianjiaapp,
  // guigeliebiaoapp,
  guigexiangqingapp,
  guigexiugaiapp,
  // shanchuguigeapp,
} from "../../../utils/http";
//成功的弹框引入
import { okalert } from "../../../utils/alert";
import path from "path";
export default {
  props: ["info", "list"],
  data() {
    return {
      imgurl: "",
      //--初始化商品数据
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        isnew: 1,
        specsattr: [],
        ishot: 1,
        status: 1,
      },
    };
  },

  mounted() {},

  methods: {
    // 上传文件------------
    changeimg(e) {
      console.log(e);
      let file = e.target.files[0];
      //自动添加赋值给图片
      this.imgurl = URL.createObjectURL(file);
      //复制user给图片
      this.user.img = file;
    },
    //取消
    quxiao() {
      //编辑清空数据
      if (this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空菜单的内容
    empty() {
      this.imgurl = "";
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "[]",
        isnew: "1",
        ishot: "1",
        status: 1,
      };

      this.attrsArr=[{value:""}]
    },
    //添加以后
    tian() {

      
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr)
      };



      guigetianjiaapp(data.user).then((res) => {
        if (res.data.code == 200) {
          okalert(res.data.msg);
          //弹框消失
          this.quxiao();
          this.empty();
          //刷先数据
          this.$emit("init");
        }
      });
      //数组转换成字符传 拷贝处理后发送
      

      //声明变量
      // let data = JSON.parse(JSON.stringify(this.user));
      // data.user.specsattr = JSON.stringify(data.specsattr);
    },
    //获取详情
    // xiangqing(id) {
    //   guigexiangqingapp({ id: id }).then((res) => {
    //     if (res.data.code == 200) {
    //       this.user = res.data.list;
    //       //补id
    //       this.user.id = id;
    //       //图片
    //       this.imgurl = this.$pre + this.user.img;
    //     }
    //   });
    // },

    //--------修改接口
    // xiugai() {
    //   guigexiugaiapp(this.user).then((res) => {
    //     if (res.data.code == 200) {
    //       okalert(res.data.msg);
    //       //消失
    //       this.quxiao();
    //       //清空数据
    //       this.empty();
    //       // 列表刷新
    //       this.$emit("init");
    //     }
    //   });
    // },
  },
};
</script>

<style scoped>
.btn {
  width: 100px;
  height: 100px;
  border: 1px solid rgb(139, 132, 132);
  position: relative;
}

.btn .jia {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: rgb(87, 207, 17);
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