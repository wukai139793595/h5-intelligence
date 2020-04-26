const components = {
    product: r => require.ensure([], () => r(require('@/views/product/index')), 'product'),
    productDetail: r => require.ensure([], () => r(require('@/views/product/detail')), 'productDetail'),
}
const router = [
    {
        path: '/product',
        redirect: '/product/index'
    },
    {
        path: '/product/index',
        name: 'product',
        component: components.product,
        meta: {
            keepAlive: true,
            tabbar: true
        }
    },
    {
        path: '/product/detail',
        name: 'productDetail',
        component: components.productDetail,
        meta: {
            keepAlive: false,
            tabbar: false
        }
    }
]
export default router
