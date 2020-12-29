 <template>
  <div>
    <el-button type="primary" @click="willapp">添加</el-button>
    <list :list="list" @init="init" @bianji="bianji($event)"></list>

    <!-- 添加弹框----刷新列表 ------>
    <add :info="info" @init="init" :list="list" ref="add"></add>
  </div>
</template>

<script>
//引入
import list from "./components1/list.vue";
import add from "./components1/add.vue";
import { guigeliebiaoapp } from "../../utils/http";
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
        isshow: false, //默认隐藏
        isadd: true, //判断是添加还是编辑打开的框分局
      },
      //初始化列表数据
      list: [],
    };
  },

  methods: {
    willapp() {
      this.info.isshow = true;
      this.info.isadd = true;
    },

    //封装一个方法用于获取元素的样式 列表为空
    init() {
      guigeliebiaoapp({ istree: true }).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },

    //编辑以后弹框出先
    bianji(id) {
      this.info.isshow = true;

      //是编辑以后的环保
      this.info.isadd = false;
      this.$refs.add.xiangqing(id);
    },
  },

  mounted() {
    //获取list
    this.init();
  },
};
</script>

<style>
</style>