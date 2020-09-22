import Vue from 'vue';
import './libs/iview';

import App from './app.vue';
import router from './router';
import store from './store';
import i18n from './locale';
import config from './config';

import './app.less';
// import api from './api/home';

Vue.config.productionTip = process.env.NODE_ENV === 'development';

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;

const getPageConfigs = Promise.resolve([
    {
        uri: '/',
        layout: [
            {
                aid: 'aid_1',
                block_id: [11, 12],
                block_instance_id: [111, 121],
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
]);

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
    console.log(router);
    new Vue({
        router,
        store,
        i18n,
        render: h => h(App),
    }).$mount('#wdc-app');
});