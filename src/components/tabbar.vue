<template>
  <ul class="nav-bar fool">
    <li :class="['home',$route.name==='index'?'active':'']" @click="$router.push('/index')">
      <i class="iconfont icon-Moneymanagement"></i>
      <p>首页</p>
    </li>
    <li :class="['category',$route.name==='product'?'active':'']" @click="$router.push('/product')">
      <i class="iconfont icon-Similarproducts"></i>
      <p>智慧企业产品</p>
    </li>
    <li :class="['cart',$route.name==='shoppingCart'?'active':'']" @click="$router.push('/shoppingCart')">
      <i class="iconfont icon-cart-full"></i><label size="small" v-if="cartTotal&&cartTotal>0" type="error">{{cartTotal}}</label>
      <p>购物车</p>
    </li>
    <li :class="['myHome',$route.name==='my'?'active':'']" @click="$router.push('/my')">
      <i class="iconfont icon-bussiness-man"></i>
      <p>我的</p>
    </li>
  </ul>
</template>
<script>
  import {mapState,mapGetters,mapActions} from 'vuex';
  export default {
    name: 'tabbar',
    data() {
      return {
        // cartTotal:2
      }
    },

    computed: {
      ...mapGetters(['cartTotal'])
    },
    methods: {
      init(){
        if(!getLocalStorage('token')) {
          return false;
        }
        // 获取购物车数量
        // this.$store.dispatch('getCartNumber');
        // this.cartTotal = this.$store.state.shop.cartTotal;
      }
    }
  }
</script>
<style lang="less" scoped>
  .nav-bar {
    position: fixed;
    width:100%;
    transform: translate(-50%,0);
    max-width: 750px;
    margin: 0 auto;
    bottom: 0;
    left: 50%;
    height: 100px;
    padding: 12px 0 0;
    background: #fff;
    // border-top: 1px solid #d0d0d0;
    overflow: hidden;
    clear: both;
    display: flex;
    flex: 1;
    z-index: 1000;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    box-shadow: 0px -3px 3px 0px rgba(224, 224, 225, 0.4);
    li {
      width: 25%;
      height: 100%;
      cursor: pointer;
      text-align:center;
      color:#929292;
      .iconfont {
        color:#929292;
        font-size:40px;
      }
      p {
        margin: 0;
        line-height: normal;
        font-size: 20px;
      }
      &.cart {
        position: relative;
        label {
          position: absolute;
          left:50%;
          margin-left:7px;
          top:-10px;
          background:red;
          color:#fff;
          display: block;
          width:33px;
          height:33px;
          border-radius: 50%;
          line-height:33px;
          text-align:center;
          font-size: 20px;
        }
      }
      &.active {
        color:#237df8;
        .iconfont {
          color:#237df8;
        }
        .icon-Moneymanagement {
          &:before {
            content: "\e783";
          }
        }
        .icon-Similarproducts {
          &:before {
            content: "\e78c";
          }
        }
        .icon-cart-full {
          &:before {
            content: "\e77a";
          }
        }
        .icon-bussiness-man {
          &:before {
            content: "\e719";
          }
        }
      }
    }
  }
</style>
