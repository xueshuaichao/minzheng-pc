export default [
    {
        path: '/exam',
        name: 'examList',
        component: () => import('../view/exam/list.vue'),
    },
    {
        path: '/exam/detail/:id',
        name: 'examDetail',
        component: () => import('../view/exam/detail.vue'),
    },
    {
        path: '/exam/result/:id',
        name: 'examResult',
        component: () => import('../view/exam/result.vue'),
    },
];
