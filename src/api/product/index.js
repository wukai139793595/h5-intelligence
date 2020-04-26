import { ajaxSet } from "@/common/js/ajax";
import prefixAPI from "@/api/prefixAPI"; // prefixAPI 前缀

const api = {
    // 产品详情查询
    queryProjectConfigXaIntro: {
        type: "post",
        url: prefixAPI.api + "/config/queryProjectConfigXaIntro",
        config: {
            headers: {
                "Content-Type": "application/json"
            }
        },
        format: 'json'
    },
    // 产品详情(图片)
    getProjectImgDetail: {
        type: "post",
        url: prefixAPI.api + "/config/getProjectImgDetail",
        config: {
            headers: {
                "Content-Type": "application/json"
            }
        },
        format: 'json'
    },
    // 产品类型列表查询
    getConfigType: {
        type: 'get',
        url: prefixAPI.api + "/config/getConfigType"
    },
    // 产品列表按类型查询
    getXaPageListByType: {
        type: 'get',
        url: prefixAPI.api + "/config/getXaPageListByType"
    },
    // 单个产品/产品详情添加到购物车
    addConfigShoppingCart: {
        type: 'post',
        url: prefixAPI.api + "/config/addConfigShoppingCart",
        format: "json",
        config: {
            headers: {
                "Content-Type":"application/json"
            }
        }
    }
};

export default ajaxSet(api);
