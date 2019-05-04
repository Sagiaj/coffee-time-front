import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index.vue';
import AuthView from '@/components/auth/AuthView.vue';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {requiresAuth: true}
    },
    {
      path: '/auth',
      name: 'AuthView',
      component: AuthView,
    },
  ],
});


router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('access_token')) {
      console.log('redirecting bro');
      next({
        path: '/auth',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;