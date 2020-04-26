import { ajaxSet } from "@/common/js/ajax";
import prefixAPI from "@/api/prefixAPI"; // prefixAPI 前缀

const api = {
    // 用户登录
    getToken: {
        type: "get",
        url: prefixAPI.api + "/appLogin/getToken"
    },
    // 我的基本信息
    getUserInfo: {
        type:'get',
        url:  prefixAPI.api + "/order/getUserInfo"
    }
};

export default ajaxSet(api);