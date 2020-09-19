export default [
    {
        name: 'home',
        path: '/',
        component: () => import('../view/home/index.vue'),
    },
    {
        path: '/home/course',
        name: 'courseFramework',
        component: () => import('../view/home/course-framework.vue'),
    },
    {
        path: '/notice/list',
        name: 'noticeList',
        component: () => import('../view/notice/list.vue'),
    },
    {
        path: '/notice/detail/:id',
        name: 'noticeDetail',
        component: () => import('../view/notice/detail.vue'),
    },
    {
        path: '/policy/list',
        name: 'policyList',
        component: () => import('../view/policy/list.vue'),
    },
    {
        path: '/policy/detail/:id',
        name: 'policyDetail',
        component: () => import('../view/policy/detail.vue'),
    },
    {
        path: '/policy/explain',
        name: 'policyExplain',
        component: () => import('../view/policy/explain.vue'),
    },
    {
        path: '/course/list',
        name: 'courseList',
        component: () => import('../view/course/index.vue'),
    },
    {
        path: '/course/detail',
        name: 'courseDetail',
        component: () => import('../view/course/detail.vue'),
    },
    {
        path: '/course/player',
        name: 'coursePlayer',
        component: () => import('../view/course/coursePlayer'),
    },
    {
        path: '/learning',
        name: 'learning',
        component: () => import('../view/learning/index.vue'),
    },
];
