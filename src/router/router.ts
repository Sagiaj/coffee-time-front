import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index.vue';
import AuthView from '@/components/auth/AuthView.vue';
import BuddiesView from '@/components/buddies/BuddiesView';

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
    {
      path: '/buddies',
      name: 'BuddiesView',
      component: BuddiesView,
      meta: {requiresAuth: true}
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
      console.log('lololol')
      next();
    }
  } else {
    next();
  }
});


export default router;