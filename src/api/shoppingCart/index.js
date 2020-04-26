import { ajaxSet } from "@/common/js/ajax";
import prefixAPI from "@/api/prefixAPI";

let api = {

    // 添加到购物车
    addShoppingCart: {
        type: 'post',
        url: prefixAPI.api + "/order/addShoppingCart",
        config: {
            headers: {
                "Content-Type": "application/json"
            }
        },
        format: 'json'
    },
    // 确认订单
    confirmOrder: {
        type: 'get',
        url: prefixAPI.api + "/order/confirmOrder"
    },
    // 提交订单
    sumbitOrder: {
        type: 'post',
        url: prefixAPI.api + "/order/sumbitOrder",
        config: {
            headers: {
                "Content-Type": "application/json"
            }
        },
        format: 'json'
    },
    // 下订单
    addOrderShop: {
        type: 'get',
        url: prefixAPI.api + "/order/addOrderShop"
    },
    // 获取购物车列表
    getOrderShoppingList: {
        type: 'get',
        url: prefixAPI.api + "/order/getOrderShoppingList"
    },

    // 删除购物车产品
    delOrdShopProdXa: {
        type: 'post',
        url: prefixAPI.api + "/order/delOrdShopProdXa",
        config: {
            headers: {
                "Content-Type": "application/json"
            }
        },
        format: "json"
    }
};

export default ajaxSet(api)