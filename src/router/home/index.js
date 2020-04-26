const components = {
  index: r => require.ensure([], () => r(require('@/views/home/index')), 'index'),
}
const router = [
  {
    path: '/',
    component: components.index,
    meta: {
      tabbar: true,
      keepAlive: true
    }
  },
  {
    path: '/index',
    name: 'index',
    component: components.index,
    meta: {
      tabbar: true,
      keepAlive: true
    }
  },
  //  {
  //   path: '/index',
  //   name: 'index',
  //   component: components.index,
  //   meta: {
  //     tabbar:true,
  //     keepAlive: true
  //   }
  // },
  {
    path: '/*',
    redirect: '/index'
  }
]
export default router
