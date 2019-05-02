var _this = this;
import * as tslib_1 from "tslib";
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index.vue';
import AuthView from '@/components/auth/AuthView.vue';
Vue.use(Router);
var router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            meta: { requiresAuth: true }
        },
        {
            path: '/auth',
            name: 'AuthView',
            component: AuthView,
        },
    ],
});
router.beforeEach(function (to, from, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        if (to.matched.some(function (record) { return record.meta.requiresAuth; })) {
            if (!(localStorage.getItem('access_token'))) {
                console.log('redirecting bro');
                next({
                    path: '/auth',
                    query: { redirect: to.fullPath },
                });
            }
            else {
                next();
            }
        }
        else {
            next();
        }
        return [2 /*return*/];
    });
}); });
export default router;
//# sourceMappingURL=router.js.map