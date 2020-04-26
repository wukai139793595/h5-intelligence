const components = {
    programmeOffice: r => require.ensure([], () => r(require('@/views/programme/programmeOffice')), 'programmeOffice'),
    programmeFactory: r => require.ensure([], () => r(require('@/views/programme/programmeFactory')), 'programmeFactory'),
    programmeHotel: r => require.ensure([], () => r(require('@/views/programme/programmeHotel')), 'programmeHotel'),
    programmeRetail: r => require.ensure([], () => r(require('@/views/programme/programmeRetail')), 'programmeRetail'),
    programmeCustom: r => require.ensure([], () => r(require('@/views/programme/programmeCustom')), 'programmeCustom'),
    programmeRecommend: r => require.ensure([], () => r(require('@/views/programme/programmeRecommend')), 'programmeRecommend'),
}
const router = [
    {
        path: '/programme/office',
        name: 'programmeOffice',
        component: components.programmeOffice,
        meta: {
            keepAlive: false,
            title:'办公区场景解决方案'
        }
    },
    {
        path: '/programme/factory',
        name: 'programmeFactory',
        component: components.programmeFactory,
        meta: {
            keepAlive: false,
            title:'智慧厂区场景解决方案'
        }
    },
    {
        path: '/programme/hotel',
        name: 'programmeHotel',
        component: components.programmeHotel,
        meta: {
            keepAlive: false,
            title:'智慧酒店场景解决方案'
        }
    },
    {
        path: '/programme/retail',
        name: 'programmeRetail',
        component: components.programmeRetail,
        meta: {
            keepAlive: false,
            title:'新零售场景解决方案'
        }
    },
    {
        path: '/programme/custom',
        name: 'programmeCustom',
        component: components.programmeCustom,
        meta: {
            keepAlive: false,
            title:'自定义场景解决方案'
        }
    },
    {
        path: '/programme/recommend',
        name: 'programmeRecommend',
        component: components.programmeRecommend,
        meta: {
            keepAlive: false,
            title:'推荐方案'
        }
    },
    
]
export default router
