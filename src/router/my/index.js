const components = {

}
const router = [
    {
        path: '/my',
        redirect: '/my/index'
    },
    {
        path: '/my/index',
        name: 'my',
        component: () => import("@/views/my/index.vue"),
        meta: {
            title:'我的',
            tabbar: true
        }
    },
    {
        path: '/my/potentialClient',
        name: 'potentialClient',
        component: () => import("@/views/my/potentialClient.vue"),
        meta: {
            title:'意见客户列表',
            tabbar: false
        }
    },
    {
        path: '/my/guestInfo',
        name: 'guestInfo',
        component: () => import("@/views/my/guestInfo.vue"),
        meta: {
            title:'订单客户信息',
            tabbar: false
        }
    },
    {
        path: '/my/guestOrder',
        name: 'guestOrder',
        component: () => import("@/views/my/guestOrder.vue"),
        meta: {
            title:'订单列表',
            tabbar: false
        }
    },
    {
        path: '/my/orderDetail',
        name: 'orderDetail',
        component: () => import("@/views/my/orderDetail.vue"),
        meta: {
            title:'订单详情',
            tabbar: false
        }
    }
]
export default router
