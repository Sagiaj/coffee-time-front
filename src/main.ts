import Vue from 'vue';
import dotenv from 'dotenv';
import './plugins/vuetify';
import App from './App.vue';
import VueSocketIo from 'vue-socket.io';
import router from '@/router/router';
import store from './store/index';

dotenv.config();
Vue.config.productionTip = false;

Vue.use(new VueSocketIo({
  debug: true,
  connection: 'http://localhost:3333',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: { path: "" } //Optional options
}));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
