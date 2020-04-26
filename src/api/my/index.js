import {ajaxSet} from "@/common/js/ajax.js";
import prefixAPI  from  "@/api/prefixAPI";

let api = {
    // 新增意向用户
    addPurposeCustomer: {
        type: 'post',
        url: prefixAPI.api + '/customer/addPurposeCustomer',
        config: {
            headers : {
                "Content-Type": "application/json"
            }
        }
    },
    // 删除意向用户
    delPurposeCustomer: {
        type: "delete",
        url: prefixAPI.api + '/customer/delPurposeCustomer'
    },
    // 查询意向用户
    getPurposeCustomer: {
        type: "get",
        url: prefixAPI.api + '/customer/getPurposeCustomer'
    },
    // 修改意向用户
    modPurposeCustomer: {
        type: "patch",
        url: prefixAPI.api + '/customer/modPurposeCustomer'
    },

    // 月订单数据查询
    getOrderMonthCount : {
        type: "get",
        url: prefixAPI.api + "/order/getOrderMonthCount"
    },
    // 全部订单数据查询
    getOrderCount: {
        type: 'get',
        url: prefixAPI.api + "/order/getOrderCount"
    },
    // 订单列表
    getOrderShopList: {
        type: 'get',
        url: prefixAPI.api + "/order/getOrderShopList"
    },
    // 订单客户信息查询
    orderAccountList: {
        type: 'get',
        url: prefixAPI.api + "/order/orderAccountList"
    },
    // 订单详情
    loadOrderShop: {
        type: 'get',
        url: prefixAPI.api + "/order/loadOrderShop"
    }
    
}

export default ajaxSet(api)

