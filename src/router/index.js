import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {$login} from "@/api"
import { getRequestParams } from '@/common/js/fastInquiryFn2'
import vm from "@/main"
import {
  getCookie,setCookie
} from '@/common/js/cookie';

let userInfo = getRequestParams();
for (var prop in userInfo) {
  if (userInfo[prop] && userInfo[prop].indexOf("#") != -1) {
    userInfo[prop] = userInfo[prop].split('#')[0]
  }
}
window.sessionStorage.setItem('userInfo',JSON.stringify(userInfo));

Vue.use(Router);

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

const routers = [];

function pushRouter(thisArray) {
  for (var j in thisArray) {
    routers.push(thisArray[j]);
  }
}

import MyRouter from './my'
import ProductRouter from './product'
import ShoppingCartRouter from './shoppingCart'
import HomeRouter from './home'
import Programme from './programme'
pushRouter(MyRouter);
pushRouter(ProductRouter);
pushRouter(ShoppingCartRouter);
pushRouter(Programme);
pushRouter(HomeRouter);
// console.log(routers)

const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes: routers
});

// 是否请求购物车数据
let hasReceiveShop = false;
// 路由跳转之前
router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  // 显示loading过渡效果
  // store.dispatch("ChangeLoading", true);
  if (sessionStorage.getItem('token')) {
    if (!hasReceiveShop) {
      store.dispatch("set_shop_cart", { params: {} });
      hasReceiveShop = true;
    }
    next()
  } else {
    let userInfo = window.sessionStorage.getItem('userInfo');
    if (userInfo === '{}') {
      userInfo={
        loginName:13323668171,
        userName:'屈洋',
        companyId:1,
        userMobile:13323668171,
        // timestamp:1578136185953,
        timestamp:1579137897348,
        // sign:'7FA9A2107DE0CB1B7A227D76E6BC3EAE',
        sign:'C61C3F1F4BC10A82C9C55730847E8F1E',

        source:'isee'
      }
    } else {
      let temp = JSON.parse(userInfo)
      userInfo = {
        loginName: Number(temp.loginName),
        userName:  decodeURIComponent(temp.userName),
        companyId: Number(temp.companyId),
        userMobile: Number(temp.userMobile),
        timestamp: Number(temp.timestamp),
        sign: temp.sign,
        source: temp.source,
        
      }

    }
    $login.getToken(userInfo,res => {
      if (res && res.success == true) {

        sessionStorage.setItem('token',res.data.token)
        store.dispatch("set_shop_cart", { params: {} });
        store.dispatch('set_user_info')
        next()
      } else {
        vm.$toast("登录失败")
        // next()
      }
    },err => {
    })
    // next()
  }
  // 更新页面title
  window.document.title = to.meta.title ? `${to.meta.title}` : ''
});


export default router;
