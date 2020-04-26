<template>
  <div class="shopping-cart">
    <nav-bar title="购物车" :left="0"></nav-bar>
    <div class="cart-wrap">
      <ul class="cart-box">
        <van-radio-group v-model="result">
          <li class="cart-item" v-for="(item,index) in shopCartList" :key="index">
            <div class="checkbox-wrap">
              <van-radio
                @click.stop="radioClickHandle(item,index)"
                :name="item"
                ref="checkboxes"
                slot="right-icon"
              >{{item.companyName}}</van-radio>
            </div>
            <div
              class="type-wrap"
              v-for="(ele,ind) in item.orderProdList"
              :key="ind"
              v-if="ele.orderProdXaList.length"
            >
              <div class="subtotal-wrap">
                <span class="prod-name">{{ele.prodName}}</span>
                <span class="subtotal">
                  小计：
                  <span class="iconPrice red">￥</span>
                  <span class="count price red">{{ele.orderProdXaList|subtotal}}</span>
                </span>
              </div>
              <div class="meal-wrap" v-for="(e,i) in ele.orderProdXaList" :key="i">
                <van-col class="meal-name" @click.stop="showMealHandle(e)">{{e.objectName}}</van-col>
                <van-col class="dropdown-wrap">
                  <div
                    class="show-meal-wrap"
                    @click.stop="showMealHandle(e)"
                    v-if="e.objectContent"
                  >
                    <span>{{e.objectName}}</span>
                    <van-icon name="arrow-down" color="#257ff8" />
                  </div>
                  <div class="stepper-wrap">
                    <van-stepper
                      v-model="e.objectNumber"
                      :min="0"
                      @minus.stop="minusHandle($event,e)"
                    />
                    <van-col class="meal-money">
                      <span class="iconPrice red">￥</span>
                      <span class="red price">{{e.objectNumber|mealMoney(e.objectPrice)}}</span>
                      <van-icon
                        class="cross"
                        name="cross"
                        @click.stop="clearMealHandle(e,item)"
                        size="0.4rem"
                      />
                    </van-col>
                  </div>
                </van-col>
              </div>
            </div>
            <div class="total-wrap">
              <span class="total-count">产品数量：{{item.orderProdList|totalCount}}</span>
              <span>
                费用合计：
                <span class="iconPrice red">￥</span>
                <span class="total-money">{{item.orderProdList|totalMoney}}</span>
              </span>
            </div>
          </li>
        </van-radio-group>
      </ul>
    </div>
    <div class="confirm-wrap">
      <span class="confirm-total">
        合计：
        <span class="iconPrice red">￥</span>
        <span class="red price">{{selectTotalMoney}}</span>
      </span>
      <div class="tip">
        <p>
          <!-- ￥{{result["oneTimeFee"]}}（一次性金额） -->
          ￥{{totalExtraFee}}（一次性金额）
          <br />
          ￥{{result["monthFee"]}}月付金额/月
        </p>
      </div>
      <span class="confirm-button" @click.stop="submitHandle">确认订单</span>
    </div>
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
  RadioGroup,
  Radio,
  Row,
  Col,
  Icon,
  Stepper,
  Dialog,
  ActionSheet,
  Button
} from "vant";
import { mapState, mapGetters } from "vuex";
import NavBar from "@/components/navBar/navBar.vue";
import { $cart } from "@/api";
export default {
  components: {
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Stepper.name]: Stepper,
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    NavBar
  },
  data() {
    return {
      showSheet: false, //显示套餐内容
      companyName: "",
      address: "杭州",
      showMealCon: [
        {
          title: "国内流量",
          num: "1234",
          unit: "GB"
        }
      ]
    };
  },
  created() {
    // this.$store.dispatch("set_shop_cart", { params: {} });
  },
  methods: {
    // 初始化数据
    init() {},
    // 点击单选框
    radioClickHandle(item, index) {
      if (item.choosed) {
        this.$store.commit("set_result", { orderProdList: [] });
        item.choosed = false;
      } else {
        this.shopCartList.forEach(ele => {
          ele.choosed = false;
        });
        item.choosed = true;
      }
    },
    // 显示套餐内容
    showMealHandle(e) {
      console.log("showMealHandle", e);
      if (e.objectContent) {
        let fen = e.objectContent.indexOf(";") > -1 ? ";" : "；";
        let mao = e.objectContent.indexOf(":") > -1 ? ":" : "：";
        this.showMealCon = e.objectContent.split(fen).map(item => {
          return item.split(mao);
        });
        this.showSheet = true;
      }
    },
    btnHandle() {
      this.showSheet = false;
    },
    // 步进器减少函数
    minusHandle() {},
    submitHandle() {
      // if (!this.result.projectId) {
      //   this.$toast("请选择一家公司");
      //   return;
      // }
      this.$store.commit("set_loading", true);
      $cart.confirmOrder(
        {
          projectId: this.result.projectId,
          companyName: this.result.companyName
        },
        res => {
          this.$store.commit("set_loading", false);

          if (res && res.success == true) {
            console.log("confirmOrder", res);
            this.$store.commit("set_confirm_order", res.data);
            this.$store.commit("set_order_prod_list", res.data.orderProdList);
            this.$router.replace({
              path: "/confirmOrder",
              query: { companyName: this.result.companyName }
            });
          }
        },
        err => {
          this.$store.commit("set_loading", false);
        }
      );
    },
    // 计数器添加
    stepperChange(types, meal) {
      types.reduce((previous, item, index) => {
        item.subtotal =
          previous +
          item.meals.reduce((pre, ele, ind) => {
            return pre + ele.count * ele.price;
          }, 0);
      }, 0);
    },
    //清空套餐数量
    clearMealHandle(e, item) {
      var that = this;
      Dialog.confirm({
        title: "删除",
        message: "确认删除"
      })
        .then(() => {
          console.log(e, "item", item);
          that.$set(e, "operType", "DEL");
          let projectId = item.projectId;
          let companyName = item.companyName;
          let basicInfoMap = item.basicInfoMap;
          let orderProdList = item.orderProdList;
          let totalCost = item.totalCost;
          let prodCount = item.prodCount;
          $cart.delOrdShopProdXa(
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
                this.$store.dispatch("set_shop_cart", { params: {} });
              } else {
                this.$toast(res.message);
              }
            }
          );
        })
        .catch(() => {});
    }
  },
  computed: {
    // ...mapState(['shopCartList','result']),
    ...mapGetters(["selectTotalCount", "selectTotalMoney","totalExtraFee"]),
    shopCartList() {
      return this.$store.state.common.shopCartList;
    },
    //
    result: {
      get() {
        return this.$store.state.common.result;
      },
      set(val) {
        this.$store.commit("set_result", val);
      }
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
      let money = meals.reduce((previous, item, index) => {
        return previous + item.objectNumber * item.objectPrice;
      }, 0);
      return money.toFixed(2);
    },
    // 公司产品数量
    totalCount(types) {
      return types.reduce((previous, item, index) => {
        return (
          previous +
          item.orderProdXaList.reduce((pre, ele, ind) => {
            return pre + Number(ele.objectNumber);
          }, 0)
        );
      }, 0);
    },
    // 公司费用合计
    totalMoney(types) {
      let money = types.reduce((previous, item, index) => {
        return (
          previous +
          item.orderProdXaList.reduce((pre, ele, ind) => {
            return pre + ele.objectNumber * ele.objectPrice;
          }, 0)
        );
      }, 0);
      return money.toFixed(2);
    }
  }
};
</script>

<style  lang="less">
@import "~@/assets/css/modules/shoppingCart.less";
</style>