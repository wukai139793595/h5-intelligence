<template>
  <div class="guestOrder">
    <nav-bar title="订单列表" :left="1" :backurl="'/my/guestInfo'"></nav-bar>
    <div class="guestOrderList">
      <ul>
        <li
          v-for="(item,index) in orderList"
          :key="index"
          @click="$router.push({path:'/my/orderDetail',query:{id:item.id,ordShopCode:item.ordShopCode}})"
        >
          <div class="t">
            订单编号：{{item.ordShopCode}}
            <label
              :class="{'state1':item.state==1,'state2':item.state==2}"
            >{{item.statusCd | setState}}</label>
          </div>
          <div class="info">
            <span class="fr">
              <label for>￥</label>
              {{item.totalFee}}
            </span>
            订单时间：{{item.createDate | dateFormat}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import { $my } from "@/api";
import NavBar from "@/components/navBar/navBar.vue";
export default {
  data() {
    return {
      orderList: [
        {
          createDate: "",
          ordShopCode: "",
          statusCd: "",
          totalFee: ""
        }
        // {id:Math.random(),state:'1',createTime:'2019-12-11 12：33：32',price:'1234.12'},
        // {id:Math.random(),state:'2',createTime:'2019-12-11 12：33：32',price:'1234.12'}
      ]
    };
  },
  created() {
    this.getOrderShopList();
  },
  methods: {
    getOrderShopList() {
      let busniessName = this.$route.query.busniessName;
      $my.getOrderShopList(
        {
          busniessName: busniessName
        },
        res => {
          if (res && res.success == true) {
            console.log("getOrderShopList", res);
            this.orderList = res.data;
          }
        },
        err => {}
      );
    }
  },
  filters: {
    setState(state) {
      switch (state) {
        case 0:
        case 1:
        case "0":
        case "1":
          return "未受理";
        case 2:
        case 3:
        case "2":
        case "3":
          return "已受理";
      }
    },
    dateFormat(time) {
      return time ? format(new Date(time), "yyyy-MM-dd hh:mm:ss") : "";
    }
  },
  components: {
    NavBar
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/modules/guestOrder.less";
</style>
<style lang="less">
.guestOrder {
}
</style>