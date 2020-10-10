import Vue from 'vue';
import './libs/iview';
import './libs/format';

import App from './app.vue';
import router from './router';
import store from './store';
import i18n from './locale';
import config from './config';

import './app.less';
// import api from './api/home';
import URL from './config/url';
import { Passport } from './libs/passport/passport';

Vue.config.productionTip = process.env.NODE_ENV === 'development';

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
Vue.prototype.$passport = new Passport(URL.API, {
    // eslint-disable-next-line
    header: { webhost: location.origin }
});

const getPageConfigs = Promise.resolve([
    {
        uri: '/',
        layout: [
            {
                aid: 'aid_1',
                block_id: [11, 12, 20, 17, 19, 18],
                block_instance_id: [111, 121, 201, 171, 191, 181],
            },
        ],
        name: '首页',
        templateId: 4, // templateId 对应layouts下的layout
        type: 2,
        moduleId: 1, // 系统模块 1 课程中心2 试题中心3
        setting: [
            {
                bid: 111,
                block_id: 11,
                setting: null,
            },
            {
                bid: 121,
                block_id: 12,
                setting: null,
            },
        ],
    },
    {
        uri: '/course',
        name: '课程中心',
        layout: [
            {
                aid: 'aid_1',
                block_id: [23],
                block_instance_id: [231],
            },
        ],
        templateId: 4,
        type: 2,
        moduleId: 2,
        setting: [
            {
                bid: 231,
                block_id: 23,
                setting: null,
            },
        ],
    },
    {
        uri: '/training',
        name: '培训列表',
        layout: [
            {
                aid: 'aid_1',
                block_id: [13],
                block_instance_id: [131],
            },
        ],
        templateId: 4,
        type: 2,
        moduleId: 2,
        setting: [
            {
                bid: 141,
                block_id: 13,
                setting: null,
            },
        ],
    },
    {
        uri: '/trainingDetail',
        name: '培训详情',
        layout: [
            {
                aid: 'aid_1',
                block_id: [14],
                block_instance_id: [141],
            },
        ],
        templateId: 4,
        type: 2,
        moduleId: 2,
        setting: [
            {
                bid: 141,
                block_id: 14,
                setting: null,
            },
        ],
    },
    {
        uri: '/learnings1',
        layout: [
            {
                aid: 'aid_1',
                block_id: [15],
                block_instance_id: [151],
            },
        ],
        name: '学习中心',
        templateId: 4, // templateId 对应layouts下的layout
        type: 2,
        moduleId: 1, // 系统模块 1 课程中心2 试题中心3
        setting: [
            {
                bid: 111,
                block_id: 11,
                setting: null,
            },
            {
                bid: 121,
                block_id: 12,
                setting: null,
            },
        ],
    },
]);
function buildApp(userInfo) {
    if (userInfo) {
        store.commit('setUserInfo', userInfo);
    }

    getPageConfigs.then((data) => {
        // todo
        data.forEach((v) => {
            // eslint-disable-next-line no-param-reassign
            v.layout = JSON.stringify(v.layout);
        });

        store.commit('setPageConfigs', data);
        // 根据后端pages定义路由
        const routes = data
            .filter(page => !!page.uri && page.uri[0] === '/')
            .map((page) => {
                const route = {
                    path: page.uri,
                    name: page.name,
                    component: () => import('./view/common_page.vue'),
                    meta: {
                        moduleId: page.moduleId,
                        name: page.name,
                    },
                };
                return route;
            });
        router.addRoutes(routes);

        new Vue({
            router,
            store,
            i18n,
            render: h => h(App),
        }).$mount('#wdc-app');
    });
}
buildApp();

// Vue.prototype.$passport.checkCookie().then(
//     (res) => {
//         if (res) {
//             buildApp(res.data);
//         }
//     },
//     () => {
//         // if ()
//         const Token = Vue.prototype.$passport.getToken();
//         if (Token) {
//             Vue.prototype.$passport.setToken(Token).then(
//                 (res) => {
//                     if (res.code === 0 && res.data) {
//                         Vue.prototype.$passport.checkCookie().then((res) => {
//                             if (res) {
//                                 buildApp(res.data);
//                             } else {
//                                 buildApp();
//                             }
//                         });
//                     } else {
//                         buildApp();
//                     }
//                 },
//                 () => {
//                     buildApp();
//                 },
//             );
//         } else {
//             buildApp();
//         }
//     },
// );

// getPageConfigs.then((data) => {
//     // todo
//     data.forEach((v) => {
//         // eslint-disable-next-line no-param-reassign
//         v.layout = JSON.stringify(v.layout);
//     });

//     store.commit('setPageConfigs', data);
//     // 根据后端pages定义路由
//     const routes = data
//         .filter(page => !!page.uri && page.uri[0] === '/')
//         .map((page) => {
//             const route = {
//                 path: page.uri,
//                 name: page.name,
//                 component: () => import('./view/common_page.vue'),
//                 meta: {
//                     moduleId: page.moduleId,
//                     name: page.name,
//                 },
//             };
//             return route;
//         });
//     router.addRoutes(routes);
//     console.log(router);
//     new Vue({
//         router,
//         store,
//         i18n,
//         render: h => h(App),
//     }).$mount('#wdc-app');
// });
