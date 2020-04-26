<template>
  <div class="order">
    <nav-bar :left="1" title="生成订单"></nav-bar>
    <orderDetailItem :id="id"></orderDetailItem>
    <div class="btnLay">
      <div class="order-footer">
        <a href="javascript:" @click="handle_submit" class="btn-confirm">确认下单</a>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
import orderDetailItem from "./components/orderDetailItem";
import { $cart } from "@/api";
export default {
  components: {
    navBar,
    orderDetailItem
  },
  data() {
    return {
      id: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
  },
  computed: {
    result: {
      get () {
        return this.$store.state.common.result
      }
    },
    confirmOrder: {
      get () {
        return this.$store.state.common.confirmOrder
      }
    }
  },
  methods: {
    init() {},
    handle_submit() {
      this.$store.commit("set_loading", true);
      $cart.addOrderShop({
        projectId: this.confirmOrder.projectId, //方案序列
        companyName: this.confirmOrder.companyName //公司名称
      },res => {
        this.$store.commit("set_loading", false);
        if (res && res.success == true) {
          this.$toast('下订单成功');
          this.$store.dispatch('set_shop_cart',{params:{}})
          this.$router.replace('/index');
          this.$store.commit('init_shop_cart')
        } else {
          this.$toast(res.message)
        }
      },err => {
        this.$store.commit("set_loading", false);
      });
      // this.$toast.loading({
      //   duration:0,
      //   message: '加载中...',
      //   forbidClick: true
      // });
      // setTimeout(()=>{
      //   this.$router.push({path:'/my/guestOrder'})
      //   this.$toast.clear();
      // },1000)
    }
  }
};
</script>

<style lang="less">
@import "~@/assets/css/modules/order.less";
</style>
