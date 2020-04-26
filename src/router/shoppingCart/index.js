const components = {

}
const router = [
    {
        name: 'shoppingCart',
        path: '/shoppingCart',
        component: () => import("@/views/shoppingCart/shoppingCart"),
        meta: {
            tabbar: true
        }
    },,
    {
        name: 'confirmOrder',
        path: '/confirmOrder',
        component: () => import("@/views/shoppingCart/confirmOrder"),
        meta: {
            tabbar: false 
        }
    },
    {
        name: 'generateOrder',
        path: '/generateOrder',
        component: () => import("@/views/shoppingCart/generateOrder"),
        meta: {
            tabbar: false
        }
    }
]
export default router
