import Vue from 'vue';
import dotenv from 'dotenv';
import './plugins/vuetify';
import App from './App.vue';
import router from '@/router/router';
import store from './store/index';
import Axios from 'axios';

dotenv.config();
Vue.config.productionTip = false;
// Vue.prototype.$http = Axios;
// const accessToken = localStorage.getItem('access_token');

// if (accessToken) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken;
// }

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
