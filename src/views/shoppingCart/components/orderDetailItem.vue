<template>
  <div class="order">
    <div class="order-wrap">
      <div class="order-section">
        <h3 class="order-title">
          <i class="iconfont icon-kehu"></i>
          <span class="title">客户信息</span>
        </h3>
        <ul class="user-info">
          <li class="txt">
            <label for>企业名称</label>
            <div>{{orderAccountDo.busniessName}}</div>
          </li>
          <li class="txt">
            <label for>企业地址</label>
            <div>{{orderAccountDo.busniessAddress}}</div>
          </li>
          <li class="txt">
            <label for>联系人</label>
            <div>{{orderAccountDo.contactName}}</div>
          </li>
          <li class="txt">
            <label for>联系方式</label>
            <div>{{orderAccountDo.contactTel}}</div>
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
        <div class="order-info">
          <div class="d-1">
            产品数量：{{allCount}}
            <span>
              费用合计：
              <b>
                <em>￥</em>
                {{allMoney}}
              </b>
            </span>
          </div>
          <div class="d-2">
            <p>订单编号：{{orderInfo.ordShopCode}}</p>
            <p>订单生成：{{orderInfo.createDate|timeFormat}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {format} from "date-fns"
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // form: {
      //   name: "杭州某某某酒店",
      //   address: "杭州市西湖区某某路123号西湖区某某路123号西湖区某某路123号",
      //   contactName: "王XX",
      //   contactTel: "18912341234"
      // },
      // order_code: "529427899999",
      // order_createTime: "2019-12-12 14:10:29",
      list: [
        {
          name: "基础类通信产品",
          total: "1234",
          detail: [
            {
              name: "天翼畅享169套餐",
              number: "7",
              price: "2250"
            },
            {
              name: "天翼畅享169套餐",
              number: "7",
              price: "2250"
            }
          ]
        },
        {
          name: "基础类通信产品",
          total: "1234",
          detail: [
            {
              name: "天翼畅享169套餐",
              number: "7",
              price: "2250"
            }
          ]
        }
      ]
    };
  },
  computed: {
    // 客户信息
    orderAccountDo() {
      return this.$store.state.common.orderAccountDo;
    },
    // 产品清单
    orderProdList() {
      return this.$store.state.common.orderProdList;
    },
    // 提交订单生成的信息
    orderInfo () {
      return this.$store.state.common.orderInfo
    },
    //
    allCount() {
      let orderProdList = this.$store.state.common.orderProdList;
      return  orderProdList.reduce((pre, item, index) => {
        return (
          pre +
          (item.orderProdXaList && item.orderProdXaList.reduce((p, ele, ind) => {
            return p + ele.objectNumber;
          }, 0))
        );
      }, 0);
    },
    allMoney() {
      let orderProdList = this.$store.state.common.orderProdList;
      let money =  orderProdList.reduce((pre, item, index) => {
        return (
          pre +
          (item.orderProdXaList&&item.orderProdXaList.reduce((p, ele, ind) => {
            return p + ele.objectNumber * ele.objectPrice;
          }, 0))
        );
      }, 0);
      return money.toFixed(2);
    }
  },

  mounted() {

  },
  methods: {

  },
  filters: {
    totalMoney (orderProdXaList) {
      let money = (orderProdXaList && orderProdXaList.reduce((pre, item, index) => {
        return pre + item.objectNumber * item.objectPrice;
      }, 0));
      return money ? money.toFixed(2):'';
    },
    timeFormat (time) {
      return time?format(new Date(time),"yyyy-MM-dd HH:mm:ss"):''
    }
  }
};
</script>

<style lang="less">
@import "~@/assets/css/modules/order.less";
</style>