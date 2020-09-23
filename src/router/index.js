import Vue from 'vue';
import iView from 'view-design';
import Router from 'vue-router';

import routes from './routers';

Vue.use(Router);

iView.LoadingBar.config({
    color: '#d14242',
    failedColor: '#d14242',
});

const router = new Router({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;
