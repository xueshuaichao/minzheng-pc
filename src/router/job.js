export default [
    {
        path: '/job/list',
        name: 'jobList',
        component: () => import('../view/job/list.vue'),
    },
    {
        path: '/job/detail/:id',
        name: 'jobDetail',
        component: () => import('../view/job/detail.vue'),
    },
];
