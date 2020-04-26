<template>
  <div class="order">
    <nav-bar :left="0" title="确认订单"></nav-bar>
    <div class="order-wrap">
      <div class="order-section">
        <h3 class="order-title">
          <i class="iconfont icon-kehu"></i>
          <span class="title">客户信息</span>
        </h3>
        <ul class="user-info">
          <li :class="{'error':err_name}">
            <i class="iconfont icon--tishi"></i>
            <van-field
              label="企业名称"
              label-align="right"
              v-model="form.busniessName"
              placeholder="请输入企业名称"
              @focus="err_name=false"
            />
            <i class="iconfont icon-tongxunlu"></i>
          </li>
          <li :class="{'error':err_address}">
            <i class="iconfont icon--tishi"></i>
            <van-field
              label="企业地址"
              label-align="right"
              v-model="form.busniessAddress"
              placeholder="请输入企业地址"
              @focus="err_address=false"
            />
          </li>
          <li :class="{'error':err_contactName}">
            <i class="iconfont icon--tishi"></i>
            <van-field
              label="联系人"
              label-align="right"
              v-model="form.contactName"
              placeholder="请输入联系人"
              @focus="err_contactName=false"
            />
          </li>
          <li :class="{'error':err_contactTel}">
            <i class="iconfont icon--tishi"></i>
            <van-field
              label="联系方式"
              label-align="right"
              v-model="form.contactTel"
              placeholder="请输入联系方式"
              @focus="err_contactTel=false"
              maxlength="11"
            />
          </li>
        </ul>
      </div>
      <div class="order-section">
        <h3 class="order-title">
          <i class="iconfont icon-qingdan"></i>
          <span class="title">产品清单</span>
        </h3>
        <dl class="order-detail" v-for="(item1,i) in orderProdList" :key="i">
          <dt>
            {{item1.prodName}}
            <span>
              小计：
              <b>
                <em>￥</em>
                {{item1.orderProdXaList|totalMoney}}
              </b>
            </span>
          </dt>
          <dd v-for="(item2,j) in item1.orderProdXaList" :key="j">
            {{item2.objectName}}
            <span>
              x{{item2.objectNumber}}&nbsp;
              <b>
                <em>￥</em>
                {{item2.objectPrice*item2.objectNumber}}
              </b>
            </span>
          </dd>
        </dl>
      </div>
      <div class="order-footer">
        <a href="javascript:" @click="handle_adjustment" class="btn-cancel">方案调整</a>
        <a href="javascript:" @click="handle_submit" class="btn-confirm">提交订单</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Field } from "vant";
import navBar from "@/components/navBar/navBar";
import { $cart, $my } from "@/api";
export default {
  components: {
    [Field.name]: Field,
    navBar
  },
  data() {
    return {
      form: {
        busniessName: "",
        busniessAddress: "",
        contactName: "",
        contactTel: ""
      },
      err_name: false,
      err_address: false,
      err_contactName: false,
      err_contactTel: false
      // list:[
      //   {
      //     name:'基础类通信产品',
      //     total:'1234',
      //     detail:[
      //       {
      //         name:'天翼畅享169套餐',
      //         number:'7',
      //         price:'2250'
      //       },
      //       {
      //         name:'天翼畅享169套餐',
      //         number:'7',
      //         price:'2250'
      //       }
      //     ]
      //   },
      //   {
      //     name:'基础类通信产品',
      //     total:'1234',
      //     detail:[
      //       {
      //         name:'天翼畅享169套餐',
      //         number:'7',
      //         price:'2250'
      //       }
      //     ]
      //   }
      // ]
    };
  },
  computed: {
    confirmOrder: {
      get() {
        return this.$store.state.common.confirmOrder;
      }
    },
    orderProdList: {
      get() {
        return this.$store.state.common.orderProdList;
      }
    }
  },
  created() {
    var that = this;
    let companyName = this.$route.query.companyName;
    $my.getPurposeCustomer(
      {
        businessName: companyName
      },
      res => {
        if (res && res.success == true) {
          let tempCompanyObj = res.data.find(item => {
            return item.businessName == companyName;
          });
          if (tempCompanyObj) {
            
            that.$set(this,'form',{
             busniessName: tempCompanyObj.businessName,
             busniessAddress: tempCompanyObj.businessAddress,
             contactName: tempCompanyObj.phoneName,
             contactTel: tempCompanyObj.phoneNumber
           })
          } else {
            this.form.busniessName = companyName
          }
        } 
      }
    );
  },
  methods: {
    handle_adjustment() {
      this.$store.commit("set_result", {
        orderProdList: []
      });
      this.$router.replace({ path: "/shoppingCart" });
    },
    handle_submit() {
      var that = this;
      if (!this.form.busniessName) {
        this.err_name = true;
        return;
      }
      if (!this.form.busniessAddress) {
        this.err_address = true;
        return;
      }
      if (!this.form.contactName) {
        this.err_contactName = true;
        return;
      }
      if (!this.form.contactTel) {
        this.err_contactTel = true;
        return;
      }
      let totalCost = this.orderProdList.reduce((previous, item, index) => {
        return (
          previous +
          item.orderProdXaList.reduce((pre, ele, ind) => {
            return pre + ele.objectNumber * ele.objectPrice;
          }, 0)
        );
      }, 0);
      let prodCount = this.orderProdList.reduce((previous, item, index) => {
        return (
          previous +
          item.orderProdXaList.reduce((pre, ele, ind) => {
            return pre + Number(ele.objectNumber);
          }, 0)
        );
      }, 0);
      this.$store.commit("set_loading", true);
      $cart.sumbitOrder(
        {
          orderAccountDo: this.form,
          orderProjedctDto: {
            projectId: that.confirmOrder.projectId,
            companyName: that.confirmOrder.companyName, //公司名称
            basicInfoMap: that.confirmOrder.basicInfoMap, //动态基本信息
            orderProdList: that.orderProdList, //推荐的相关产品配置信息
            totalCost: totalCost, //费用合计
            prodCount: prodCount //产品数量
          }
        },
        res => {
          that.$store.commit("set_loading", false);
          if (res && res.success == true) {
            that.$store.commit("set_order_account_do", that.form);
            that.$store.commit("set_order_info", res.data);
            that.$router.push({ path: "/generateOrder" });
          } else {
            that.$toast(res.message)
          }
        },
        err => {
          that.$store.commit("set_loading", false);
        }
      );
    }
  },
  filters: {
    totalMoney(orderProdXaList) {
      let money = orderProdXaList.reduce((pre, item, index) => {
        return pre + item.objectNumber * item.objectPrice;
      }, 0);
      return money.toFixed(2);
    }
  }
};
</script>

<style lang="less">
@import "~@/assets/css/modules/order.less";
</style>
