export default [
    {
        path: '/service',
        name: 'serviceList',
        component: () => import('../view/service/index'),
    },
    {
        path: '/service/detail',
        name: 'serviceDetail',
        component: () => import('../view/service/detail.vue'),
    },
];
