import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/assets/css/iconfont/iconfont.css';
import '@/assets/css/main.css';


import { Toast, Loading } from 'vant'
import 'vant/lib/index.css'
Vue.prototype.$toast = Toast
Vue.prototype.$loading = Loading



// 一段时间内不允许重复调用的函数
Function.prototype.delay = function(timeout) {
  const t = this;
  return function() {
    if (!t.execed) {
      t.apply(this, Array.prototype.slice.call(arguments))
      t.execed = true
      setTimeout(function() {
        t.execed = false
      }, timeout || 3000)
    } else {
      return
    }
  }
}

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default vm
