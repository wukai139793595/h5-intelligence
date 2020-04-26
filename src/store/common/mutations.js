
import { SET_FOOTERBAR, SET_LOADING, SET_SHOP_CART, SET_RESULT, SET_CONFIRM_ORDER, SET_ORDER_PROD_LIST, SET_ORDER_ACCOUNT_DO, SET_ORDER_INFO,SET_USER_INFO } from "./mutation-types"
const mutations = {
    [SET_FOOTERBAR](state, flag) {
        state.footerBar = flag
    },
    [SET_LOADING](state, payload) {
        state.loading = payload
    },
    [SET_SHOP_CART](state, payload) {
        state.shopCartList = payload
    },
    [SET_RESULT](state, payload) {
        state.result = payload
    },
    [SET_CONFIRM_ORDER](state, payload) {
        state.confirmOrder = payload;
    },
    [SET_ORDER_PROD_LIST](state, payload) {
        state.orderProdList = payload;
    },
    [SET_ORDER_ACCOUNT_DO](state, payload) {
        state.orderAccountDo = payload
    },
    [SET_ORDER_INFO](state, payload) {
        state.orderInfo = payload
    },
    init_shop_cart(state) {
        state.result = {
            orderProdList: []
        };
        state.confirmOrder = {};
        state.orderProdList = [];
        state.orderAccountDo = {
            busniessName: "",
            busniessAddress: "",
            contactName: "",
            contactTel: ""
        };
        state.orderInfo = {};
    },
    [SET_USER_INFO] (state,payload) {
        state.userInfo = payload
    }
}

export default mutations