import Vue from 'vue';
import iView from 'view-design';
import Router from 'vue-router';

import routes from './routers';

Vue.use(Router);

iView.LoadingBar.config({
    color: '#e7ebf3',
    failedColor: '#e7ebf3',
});

const router = new Router({
    mode: 'hash',
    routes,
});

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    console.log(to, 'to---');
    console.log(from, 'from-----');

    if (from.name === 'examDetail') {
        // const that = this;
        if (window.history && window.history.pushState) {
            window.onpopstate = function () {
                console.log('返回');
                next({ name: 'examList' });
            };
        }
    }
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;
