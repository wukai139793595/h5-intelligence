<template>
  <div id="programmeRecommend" class="programme">
    <nav-bar title="推荐方案" :left="1"></nav-bar>
    <div class="part part-jjfa-1">
      <ul>
        <li>
          <label class="detail-word">
            <i class="iconfont icon-xinxi"></i>方案详情
          </label>
        </li>
      </ul>
    </div>
    <div class="type-wrap" v-for="(ele,ind) in types" :key="ind">
      <div class="subtotal-wrap">
        <span class="prod-name">{{ele.prodName}}</span>
        <span class="subtotal">
          小计：
          <span class="iconPrice red">￥</span>
          <span class="count price red">{{ele.orderProdXaList|subtotal}}</span>
        </span>
      </div>
      <van-checkbox-group v-model="checkeboxArr">
        <div
          class="meal-wrap"
          v-for="(e,i) in ele.orderProdXaList"
          v-if="e.operType==='NORMAL'"
          :key="i"
        >
          <van-row class="meal-row">
            <van-col class="meal-name" span="10">
              <van-checkbox :name="e" @click.stop="checkboxHandle(e)">
                <span @click.stop="showMealHandle(e)">{{e.objectName}}</span>
              </van-checkbox>
            </van-col>
            <van-col span="14">
              <div class='show-meal-wrap' @click.stop="showMealHandle(e)" v-if="e.objectContent">
                <span >{{e.objectName}}</span>
                <van-icon name="arrow-down" color="#257ff8" />
              </div>
              <div class="stepper-wrap" style="">
                <van-stepper v-model="e.objectNumber" :min="0" />
                <span class="meal-money">
                  <span class="iconPrice red">￥</span>
                  <span class="red price">{{e.objectNumber|mealMoney(e.objectPrice)}}</span>
                  <van-icon class="cross" name="cross" @click="clearMealHandle(e)" size="0.4rem" />
                </span>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-checkbox-group>
    </div>

    <div class="btnLay2">
      <div class="total">
        合计
        <span class="red">￥</span>
        <label for class="red price">{{totalMoney}}</label>
      </div>
      <div class="tip">
        <p>
          ￥{{totalExtraFee}}（一次性金额）
          <br />
          ￥{{recommend["monthFee"]}}月付金额/月
        </p>
      </div>
      <van-button round type="info" @click="join">加入购物车</van-button>
    </div>
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
        <div class="btnLay3">
          <van-button plain @click="dialogTip=false" type="info">取消</van-button>
          <van-button type="info" @click="addShoppingCart">确定</van-button>
        </div>
      </div>
    </van-dialog>
    <van-action-sheet title="套餐内容" v-model="showSheet">
      <p class="show-meal-con" v-for="item in showMealCon">
        <span class="show-meal-title">{{item[0]}}</span>
        <span class="show-meal-num">
          <span>{{item[1]}}</span>
        </span>
      </p>
      <div class="meal-btn-wrap" @click="btnHandle">确定</div>
    </van-action-sheet>
  </div>
</template>
<script>
import {
  Field,
  Stepper,
  Button,
  Icon,
  Row,
  Col,
  Checkbox,
  CheckboxGroup,
  Dialog,
  ActionSheet
} from "vant";
import NavBar from "@/components/navBar/navBar.vue";
import Vue from "vue";
import { $home, $cart } from "@/api";
export default {
  components: {
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Dialog.Component.name]: Dialog.Component,
    [ActionSheet.name]: ActionSheet,
    NavBar
  },
  data() {
    return {
      showSheet: false, //显示套餐内容
      showMealCon: [],
      dialogTip: false,
      checked: true,
      recommend: {},
      title: "",
      fromPath: "",
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
      },

      types: [
        // {
        //   name: "基础类通信产品",
        //   meals: [
        //     {
        //       name: "天翼畅享169套餐",
        //       price: "1234",
        //       count: 1
        //     },
        //     {
        //       name: "天翼畅享169套餐",
        //       price: "1234",
        //       count: 1
        //     }
        //   ]
        // },
        // {
        //   name: "基础类通信产品",
        //   meals: [
        //     {
        //       name: "天翼畅享169套餐",
        //       price: "1234",
        //       count: 1
        //     },
        //     {
        //       name: "天翼畅享169套餐",
        //       price: "1234",
        //       count: 1
        //     }
        //   ]
        // }
      ],
      checkeboxArr: []
    };
  },
  watch: {},
  created() {
    this.projectId = this.$route.query.projectId;
    this.companyName = this.$route.query.companyName;
    this.recommend = JSON.parse(sessionStorage.getItem("recommend"));
    this.types = this.recommend.orderProjectDto.orderProdList;
    this.initCheckboxArr();
  },
  mounted() {},
  computed: {
    shopCartList() {
      return this.$store.state.common.shopCartList;
    },
    totalMoney() {
      let types = this.types;
      // let money = checkeboxArr.reduce((pre,item,index) => {
      //   return pre + (item.objectNumber * item.objectPrice)
      // },0)

      let money = types.reduce((previous, item, index) => {
        return (
          previous +
          item.orderProdXaList.reduce((pre, ele, ind) => {
            return pre + (ele.selype && ele.objectNumber * ele.objectPrice);
          }, 0)
        );
      }, 0);
      return money.toFixed(2);
    },
    // 一次性费用
    totalExtraFee () {
      let types = this.types;
      // let money = checkeboxArr.reduce((pre,item,index) => {
      //   return pre + (item.objectNumber * item.objectPrice)
      // },0)

      let money = types.reduce((previous, item, index) => {
        return (
          previous +
          item.orderProdXaList.reduce((pre, ele, ind) => {
            return pre + (ele.selype && ele.objectNumber * ele.objectExtraFee);
          }, 0)
        );
      }, 0);
      return money.toFixed(2);      
    },
    // 公司产品数量
    totalCount() {
      let types = this.types;

      return types.reduce((previous, item, index) => {
        return (
          previous +
          item.orderProdXaList.reduce((pre, ele, ind) => {
            return pre + Number(ele.objectNumber);
          }, 0)
        );
      }, 0);
    }
  },
  methods: {
    btnHandle() {
      this.showSheet = false;
    },
    // 显示套餐内容
    showMealHandle(e) {
      if (e.objectContent) {
        let fen = e.objectContent.indexOf(";") > -1 ? ";" : "；";
        let mao = e.objectContent.indexOf(":") > -1 ? ":" : "：";
        this.showMealCon = e.objectContent.split(fen).map(item => {
          return item.split(mao);
        });
        this.showSheet = true;
      }
    },
    // 加入购物车
    addShoppingCart() {
      var that = this;
      let projectId = this.projectId;
      let companyName = this.companyName;
      let basicInfoMap = this.recommend.orderProjectDto.basicInfoMap;
      let orderProdList = this.recommend.orderProjectDto.orderProdList;
      let totalCost = this.totalMoney;
      let prodCount = this.totalCount;

      $cart.addShoppingCart(
        {
          projectId,
          companyName,
          basicInfoMap,
          orderProdList,
          totalCost,
          prodCount,
          oneTimeFee: this.recommend["oneTimeFee"],
          monthFee: this.recommend["monthFee"]
        },
        res => {
          if (res && res.success == true) {
            that.$store.dispatch("set_shop_cart", {
              params: {},
              callback: that.callback.bind(that)
            });
            that.$router.replace({ path: "/shoppingCart" });
          } else {
            that.$toast(res.message);
          }
        },
        err => {}
      );
    },
    callback(shopCartList) {
      let projectId = this.projectId;
      let companyName = this.companyName;
      let tempResult =
        shopCartList &&
        shopCartList.length &&
        shopCartList.find(item => {
          return item.projectId == projectId && item.companyName == companyName;
        });
      tempResult && this.$store.commit("set_result", tempResult);
      tempResult.choosed = true;
    },
    // 初始化checkboxArr
    initCheckboxArr() {
      this.types.forEach((item, index) => {
        item.orderProdXaList.forEach((ele, ind) => {
          ele.selype && this.checkeboxArr.push(ele);
        });
      });
    },
    // 删除操作
    clearMealHandle(e) {
      var that = this;
      Dialog.confirm({
        title: "删除",
        message: "确认删除"
      })
        .then(() => {
          that.$set(e, "operType", "DEL");
        })
        .catch(() => {});
    },
    // 复选框选择
    checkboxHandle(e) {
      if (e.selype == 0) {
        e.selype = 1;
      } else {
        e.selype = 0;
      }
    },
    join() {
      let projectId = this.projectId;
      let companyName = this.companyName;
      let basicInfoMap = this.recommend.orderProjectDto.basicInfoMap;
      let orderProdList = this.recommend.orderProjectDto.orderProdList;
      let totalCost = this.totalMoney;
      let prodCount = this.totalCount;
      $home.delOrderProdXa(
        {
          projectId,
          companyName,
          basicInfoMap,
          orderProdList,
          totalCost,
          prodCount
        },
        res => {
          if (res && res.success == true) {
            this.dialogTip = true;
          }
        },
        err => {}
      );
    }
  },

  filters: {
    // 单个套餐金额
    mealMoney(count, price) {
      let money = count * price;
      return money.toFixed(2);
    },
    // 单个产品小计
    subtotal(meals) {
      return meals.reduce((previous, item, index) => {
        return previous + item.objectNumber * item.objectPrice;
      }, 0);
    }

    // 公司费用合计
    // totalMoney(types) {

    // }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/modules/programme.less";
#programmeRecommend {
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
      font-size: 40px;
      line-height: 70px;
      color: #fe5450;
    }
    .tip {
      line-height: 75px;
    }
    .btnLay3 {
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
