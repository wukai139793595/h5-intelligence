import {$cart,$login} from "@/api"
import { SET_FOOTERBAR, SET_SHOP_CART ,SET_USER_INFO} from "./mutation-types"
import vm from "@/main.js"

const actions = {
  [SET_FOOTERBAR]({ commit }, flag) {
    commit('SET_FOOTERBAR', flag)
  },
  [SET_SHOP_CART]({commit},{params,callback}) {
    $cart.getOrderShoppingList(
      params,
      res => {
        if (res && res.success == true) {
          commit(SET_SHOP_CART,res.data.reverse());
          callback && callback(res.data);
        } else {
          vm.$toast(res.message)
        }
      },
      err => {

      }
    )
  },
  [SET_USER_INFO] ({commit}) {
    $login.getUserInfo({},res => {
      if (res && res.success == true) {
        commit(SET_USER_INFO,res.data)
      } else {
        vm.$toast(res.message)
      }
    }, err => {

    })
  }
}

export default actions