/**
 * @file
 * @author tanghao
 * @date 2019-06-19
 */

import Vue from 'vue';
import Vuex from 'vuex';
import app from './module/app';
import user from './module/user';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //
        pageConfigs: [],
    },
    mutations: {
        //
        setPageConfigs(state, payload) {
            state.pageConfigs = payload;
        },
    },
    actions: {
        //
    },
    getters: {
        getConfigByPage(state) {
            return (module, pageName) => state.pageConfigs.find(
                page => page.moduleId === module && page.name === pageName,
            );
        },
    },
    modules: {
        app,
        user,
    },
});
