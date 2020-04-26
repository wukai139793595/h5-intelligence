<template>
  <div class="programme">
    <nav-bar title="办公区场景解决方案" :left="1"></nav-bar>
    <div class="part part-jjfa-1">
      <ul>
        <li>
          <label>
            <i class="iconfont icon-qiye"></i>企业名称
          </label>
          <van-field
            v-model="form.name"
            :class="{'err_empty': err_empty}"
            @focus="err_empty=false"
          />
        </li>
        <li>
          <label>
            <i class="iconfont icon-xinxi1"></i>基础信息
          </label>
        </li>
      </ul>
    </div>
    <div class="part part-jjfa-2">
      <ul>
        <li>
          <label>{{basicInfoMap[0][0]}}</label>
          <span >
            <van-field :class="{'unit-num-err':unit_num_err}" v-model="basicInfoMap[0][1]" @focus="unit_num_err=false" placeholder="0" />
            {{unit}}
          </span>
        </li>
        <li v-for="(item,index) in basicInfoMap" :key="index" v-if="index!==0">
          <label for>{{item[0]}}</label>
          <van-stepper v-model="item[1]" :min="0" />
        </li>
        <!-- <li>
          <label>企业人数</label>
          <van-stepper v-model="content.people" />
        </li>
        <li>
          <label>电脑台数</label>
          <van-stepper v-model="content.computer" />
        </li>
        <li>
          <label>摄像头数量</label>
          <van-stepper v-model="content.camera" />
        </li>
        <li>
          <label>公司入口数量</label>
          <van-stepper v-model="content.joinNum" />
        </li>
        <li>
          <label>打印机数目</label>
          <van-stepper v-model="content.printer" />
        </li>-->
      </ul>
    </div>

    <div class="btnLay">
      <van-button round plain type="info" @click="reset">重新开始</van-button>
      <van-button round type="info" @click="start">开始定制</van-button>
    </div>
  </div>
</template>
<script>
import { Field, Stepper, Button, Icon } from "vant";
import NavBar from "@/components/navBar/navBar.vue";
import { $home } from "@/api";
export default {
  components: {
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [Field.name]: Field,
    NavBar
  },
  data() {
    return {
      err_empty: false,
      unit_num_err:false,
      basicInfoMap: [["", ""]],
      unit: "",
      title: "",
      content: {
        area: "",
        people: "",
        computer: "",
        camera: "",
        joinNum: "",
        printer: ""
      },
      form: {
        name: ""
      }
    };
  },
  watch: {},
  created() {
    this.getOrdProject();
  },
  mounted() {},
  computed: {},
  methods: {
    getOrdProject() {
      this.id = this.$route.query.id; //方案序列
      $home.getOrdProject(
        `?projectId=${this.id}`,
        res => {
          if (res && res.success == true) {
            console.log(res);
            this.$set(this,'basicInfoMap',Object.entries(res.data.basicInfoMap))
            this.basicInfoMap[0][1] = "";
            this.unit = this.setUnit(this.basicInfoMap[0][0]);
          }
        },
        err => {}
      );
    },
    setUnit(type) {
      if (!type) {
        return "";
      }
      if (type.indexOf("面积") > -1) {
        return "平方米";
      }
      if (type.indexOf("人数") > -1) {
        return "人";
      }
      if (type.indexOf("房间数量") > -1) {
        return "间";
      }
      if (type.indexOf("楼层") > -1) {
        return "层";
      }
      if (type.indexOf("长度") > -1) {
        return "米";
      }
      return "";
    },
    getRecommendProject(params) {
      $home.getRecommendProject(
        params,
        res => {
          if (res && res.success == true) {
            this.$route.meta.recommend = res.data.orderProjectDto;
            sessionStorage.setItem("recommend", JSON.stringify(res.data));
            this.$router.push({
              path: "/programme/recommend",
              query: {
                projectId: params.projectId,
                companyName: params.companyName
              }
            });
          }
        },
        err => {}
      );
    },
    start() {
      if (!this.form.name) {
        this.err_empty = true;
        this.$notify({
          message: "请填写企业名称",
          type: "warning"
        });
        return;
      }
      if (!this.basicInfoMap[0][1]) {
        this.unit_num_err = true;
        this.$notify({
          message: `请填写${this.basicInfoMap[0][0]}`,
          type: "warning"
        });
        return;
      }
      let basicInfoMap = {};
      this.basicInfoMap.forEach(item => {
        basicInfoMap[item[0]] = item[1];
      });
      let params = {
        projectId: this.id, //方案序列
        companyName: this.form.name, //公司名称
        basicInfoMap: basicInfoMap,
        orderProdList: null, //推荐的相关产品配置信息
        totalCost: null, //费用合计
        prodCount: null //产品数量
      };
      this.getRecommendProject(params);
    },
    reset() {
      this.form.name = "";
      // this.basicInfoMap[0][1] = '';
      this.basicInfoMap.forEach((item, index) => {
        if (index === 0) {
          item[1] = "";
        } else {
          this.$set(item,1,1);
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/programme/recommend") {
      to.meta.fromOffice = true;
    }
    to.meta.recommend = from.meta.recommend;
    next();
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/modules/programme.less";
</style>
