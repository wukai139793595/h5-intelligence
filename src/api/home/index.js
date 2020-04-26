import {ajaxSet} from "@/common/js/ajax.js";
import prefixAPI from "@/api/prefixAPI.js";

const api = {
    // 查询方案列表信息
    getProjectList: {
        type: 'get',
        url: prefixAPI.api + '/project/getProjectList'
    },
    // 根据方案Id获取动态定制信息
    getOrdProject: {
        type: 'get',
        url: prefixAPI.api + '/project/getOrdProject'
    },
    // 推荐方案查询
    getRecommendProject : {
        type: "post",
        url: prefixAPI.api + "/project/getRecommendProject",
        config: {
            headers: {
                "Content-Type":"application/json"
            }
        },
        format:"json"
    },
    // 删除方案详情细项目
    delOrderProdXa : {
        type: "post",
        url: prefixAPI.api + "/project/delOrderProdXa",
        config: {
            headers: {
                "Content-Type":"application/json"
            }
        },
        format:"json"
    }

}

export default ajaxSet(api)