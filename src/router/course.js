export default [
    {
        path: '/course',
        name: 'course',
        component: () => import('../blocks/course/index.vue'),
    },
    {
        path: '/course/detail',
        name: 'courseDetail',
        component: () => import('../blocks/course/detail.vue'),
    },
];
