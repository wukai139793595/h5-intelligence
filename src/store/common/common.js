
import mutations from './mutations.js'
import actions from './actions'
import getters from './getters'
const common = {
    state: {
        userInfo: {
            userName:'',
            deptName:'',
            sysCompanyName:''
        },
        loading: false,   //请求接口时loading效果
        footerBar: true,
        shopCartList: [],   //购物车列表
        result: {
            orderProdList:[]
        },      //购物车选中的公司
        confirmOrder: {},
        orderProdList: [],   //产品清单
        orderAccountDo: {
            busniessName: "",
            busniessAddress: "",
            contactName: "",
            contactTel: ""
        },   //客户信息
        orderInfo: {
            createDate:'',
            ordShopCode: ''
        }   //提交订单生成的信息
    },
    mutations: mutations,
    actions: actions,
    getters: getters
}

export default common