<template>
  <div id="productDetail">
    <nav-bar :title="title" :left="1"></nav-bar>
    <div class="productTitle">
      <span class="fr">
        <!-- <i class="iconfont icon-fenxiang" @click="sharePopup=true"></i> -->
        <i class="iconfont icon-xiazai"></i>
      </span>
      <label for>{{configXaName}}</label>
    </div>
    <div class="productInfo">
      <div class="line">
        <label for>使用区域：</label>
        <div>全省</div>
      </div>
      <div class="line">
        <label for>产品资费：</label>
        <div>{{configXaContent}}</div>
      </div>
      <div class="line">
        <label for>产品简介：</label>
        <div>{{prodIntro}}</div>
      </div>
      <div class="line">
        <label for>其&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;他：</label>
        <div>{{prodOther}}</div>
      </div>
    </div>
    <div class="productInfo">
      <div class="line">
        <label for>产品展示：</label>
        <div class="pic">
          <img :src="baseUrl+'/zhsys/config/getProjectImgDetail?projectConfigXaId='+id" class="productBg" alt />
        </div>
      </div>
    </div>

    <div class="footerCart">
      <div class="num">
        <label for>数量</label>
        <van-stepper v-model="cartNumber" />
      </div>
      <div class="btn">
        <van-button
          type="info"
          @click="dialogTip=true"
          color="linear-gradient(to right, #257df8, #3196fe)"
          class="btnCart"
        >加入购物车</van-button>
        <van-button type="info" class="btnDone" @click="btnDone">确认订单</van-button>
      </div>
    </div>

    <!-- 分享 -->
    <!-- <van-action-sheet v-model="sharePopup" title="分享">
      <div class="shareList">
        <ul>
          <li v-for="item in share" :key="item.title">
            <i class="iconfont" :class="item.icon"></i>
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div>
      <div class="shareBtnLay">
        <van-button plain round @click="sharePopup=false" type="info">取 消</van-button>
      </div>
    </van-action-sheet>-->

    <!-- dialog -->
    <van-dialog
      v-model="dialogTip"
      width="80%"
      :showConfirmButton="false"
      :showCancelButton="false"
    >
      <div class="dialogTip">
        <div class="close" @click="dialogTip=false">
          <van-icon name="cross" />
        </div>
        <div class="gray">本次方案总金额</div>
        <div class="totalPrice">{{totalMoney}}</div>
        <div class="tip">是否加入购物车</div>
        <div class="btnLay">
          <van-button plain @click="dialogTip=false" type="info">取消</van-button>
          <van-button type="info" @click="submitHandle">确定</van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Button, Stepper, Dialog, Icon, ActionSheet } from "vant";
import NavBar from "@/components/navBar/navBar.vue";
import { $product, $cart } from "@/api";
import prefixAPI from "@/api/prefixAPI";
export default {
  components: {
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Stepper.name]: Stepper,
    [Dialog.Component.name]: Dialog.Component,
    [Icon.name]: Icon,
    NavBar
  },
  data() {
    return {
      title: "产品详情",
      configXaName: "",
      configXaContent: "",
      configXaPrice: "",
      c3Code: "",
      attachName: "",
      attachAddress: "",
      prodIntro: "",
      prodOther: "",
      dialogTip: false,
      id: "",
      sharePopup: false,
      cartNumber: 1,
      baseUrl: "",
      productDetail: {}
      // share: [
      //   { icon: "icon-weixin", title: "微信" },
      //   { icon: "icon-pengyouquan", title: "朋友圈" },
      //   { icon: "icon-QQ", title: "QQ好友" },
      //   { icon: "icon-QQkongjian", title: "QQ空间" },
      //   { icon: "icon-youxiang", title: "转发邮箱" },
      //   { icon: "icon-fuzhilianjie", title: "复制链接" }
      // ]
    };
  },
  computed: {
    totalMoney() {
      let temp = this.configXaExtraPrice ? Number(this.configXaExtraPrice) : 0;
      let money = (Number(this.configXaPrice) + temp) * this.cartNumber;
      return money.toFixed(2);
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.configXaPrice = this.$route.query.configXaPrice;
    this.configXaExtraPrice = this.$route.query.configXaExtraPrice;
    this.projectId = this.$route.query.projectId;
    this.company = this.$route.query.company;
    if (process.env.NODE_ENV == "development") {
      this.baseUrl = prefixAPI.loc;
    } else if (process.env.NODE_ENV == "production") {
      this.baseUrl = prefixAPI.server;
    }
  },
  mounted() {
    // this.projectConfigXaId = this.$route.query.id;`?projectConfigXaId=${this.projectConfigXaId}`
    this.queryProjectConfigXaIntro();
    // this.getProjectImgDetail();
    // if (!this.id) {
    //   this.$notify({ type: "warning", message: "参数错误，请重点选择" });
    //   this.$router.go(-1);
    // }
  },
  methods: {
    // 获取产品详细信息
    queryProjectConfigXaIntro() {
      this.projectConfigXaId = this.$route.query.id;
      this.configXaContent = this.$route.query.configXaContent;
      this.configXaName = this.$route.query.configXaName;
      $product.queryProjectConfigXaIntro(
        { projectConfigXaId: this.projectConfigXaId },
        res => {
          if (res && res.success == true) {
            console.log("queryProjectConfigXaIntro", res);
            this.c3Code = res.data.c3Code;
            this.attachAddress = res.data.attachAddress;
            this.prodIntro = res.data.prodIntro;
            this.prodOther = res.data.prodOther;
          }
        },
        err => {}
      );
    },
    // 确认下单
    confirmOrder() {
      let projectId = this.projectId;
      let companyName = this.company;
      this.$store.commit("set_loading", true);
      $cart.confirmOrder(
        {
          projectId: projectId,
          companyName: companyName
        },
        res => {
          this.$store.commit("set_loading", false);
          if (res && res.success == true) {
            console.log("confirmOrder", res);
            this.$store.commit("set_confirm_order", res.data);
            this.$store.commit("set_order_prod_list", res.data.orderProdList);
            this.$router.replace({
              path: "/confirmOrder",
              query: { companyName }
            });
          }
        },
        err => {
          this.$store.commit("set_loading", false);
        }
      );
    },
    // 确认添加到购物车
    submitHandle(nextStep) {
      let {
        company,
        projectId,
        configCode,
        configName,
        configXaCode,
        configXaName,
        configXaPrice,
        feeTyeconfigXaName,
        configXaExtraPrice,
        feeTye
      } = this.$route.query;
      this.$store.commit("set_loading", true);
      $product.addConfigShoppingCart(
        {
          companyName: company,
          projectConfig: {
            projectId, //关联解决方案表id
            configCode, //方案配置表编码
            configName, //方案配置表名称
            projectConfigXaList: [
              {
                configXaCode, //方案配置子项目编码
                configXaName, //方案配置子项目名称
                configXaPrice, //配置项目的价格
                configXaExtraPrice, //项目配置额外价格
                feeTye, //费用类型
                configXaNum: this.cartNumber //费用类型 产品配置细项中默认0,产品详情中根据实际参数来
              }
            ]
          }
        },
        res => {
          this.$store.commit("set_loading", false);
          if (res && res.success == true) {
            this.$store.dispatch("set_shop_cart", { params: {} });
            if (nextStep == "confirmOrder") {
              this.confirmOrder();
            } else {
              this.$router.push("/product/index");
            }
            console.log("addConfigShoppingCart", res);
          }
        },
        err => {
          this.$store.commit("set_loading", false);
        }
      );
    },
    btnDone() {
      this.submitHandle("confirmOrder");
      this.$router.push("/confirmOrder");
    }
  }
};
</script>

<style lang="less" >
</style>
<style lang="less" scoped>
#productDetail {
  .productTitle {
    background: #fff;
    padding: 35px 35px;
    overflow: hidden;
    line-height: 36px;
    margin-bottom: 15px;
    position: relative;
    label {
      font-size: 32px;
      display: inline-block;
      color: #2d7aff;
      vertical-align: middle;
    }
    .fr {
      position: absolute;
      right: 10px;
      top: 35px;
      line-height: 36px;
      .iconfont {
        font-size: 36px;
        padding: 0 13px;
        margin-left: 10px;
        color: #97979a;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .productInfo {
    background: #fff;
    padding: 25px 30px;
    overflow: hidden;
    margin-bottom: 15px;
    .line {
      min-height: 55px;
      line-height: 35px;
      padding: 10px 0 10px 155px;
      padding-left: 155px;
      position: relative;
      margin-bottom: 15px;
      color: #171717;
      font-size: 26px;
      &:last-child {
        margin: 0;
      }
      label {
        position: absolute;
        left: 0;
        top: 10px;
        width: 150px;
        font-size: 26px;
        color: #949799;
        &::before {
          content: "";
          float: left;
          margin: 9px 8px 0 0;
          background: #2675ef;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .pic {
        width: 350px;
        height: 350px;
        img {
          width: 100%;
          height: 100%;
          background: #e9ecec;
        }
      }
    }
  }
  .footerCart {
    position: fixed;
    left: 50%;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 750px;
    transform: translate(-50%, 0);
    background: #fff;
    height: 115px;
    padding: 20px 30px;
    box-shadow: 0px -3px 3px 0px rgba(224, 224, 225, 0.4);
    .num {
      float: left;
      margin-top: -10px;
      color: #949799;
      font-size: 18px;
    }
    .btn {
      float: right;
      font-size: 0;
      .van-button {
        border-radius: 100px 0 0 100px;
        padding: 0;
        width: 220px;
        padding: 0;
        height: 80px;
        line-height: 78px;
      }
      .btnCart {
        // border-color:#2885f9;
        // background:#2885f9;
      }
      .btnDone {
        border-color: #ffab44;
        background: #ffab44;
        border-radius: 0 100px 100px 0;
      }
    }
  }
  .shareList {
    padding: 45px 0 0 15px;
    overflow: hidden;
    width: 100%;
    li {
      display: inline-block;
      width: 22%;
      margin: 0 15px 30px 0;
      text-align: center;
      font-size: 26px;
      color: #757575;
      .iconfont {
        font-size: 50px;
        display: inline-block;
        width: 100px;
        height: 100px;
        line-height: 100px;
        border-radius: 50%;
        border: 1px solid #ddd;
        &.icon-weixin {
          color: #65c016;
        }
        &.icon-pengyouquan {
          color: #5087ee;
        }
        &.icon-QQ {
          color: #030100;
        }
        &.icon-QQkongjian {
          color: #ffbf2e;
        }
        &.icon-youxiang {
          color: #2986f8;
        }
        &.icon-fuzhilianjie {
          color: #ffa741;
        }
      }
      p {
        line-height: normal;
        margin: 5px 0 0;
      }
    }
  }
  .shareBtnLay {
    text-align: center;
    padding: 10px 0 25px;
    .van-button {
      width: 60%;
      padding: 0;
      height: 80px;
      line-height: 78px;
    }
  }
  .van-action-sheet__header {
    background-color: #f5f5f5;
  }
  .dialogTip {
    text-align: center;
    padding: 45px 30px 50px;
    font-size: 28px;
    position: relative;
    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      color: #d6d9d9;
      .van-icon {
        font-size: 38px;
      }
    }
    .gray {
      color: #737373;
      line-height: 48px;
    }
    .totalPrice {
      font-size: 50px;
      line-height: 70px;
      color: #fe5450;
    }
    .tip {
      line-height: 75px;
    }
    .btnLay {
      margin-top: 20px;
      .van-button {
        padding: 0;
        height: 76px;
        line-height: 76px;
        width: 228px;
        margin: 0 12px;
        border-radius: 100px;
        border-width: 1px;
        &.van-button--info {
          border: 1px solid #1989fa;
        }
      }
    }
  }
}
</style>