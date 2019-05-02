import Vuex from 'vuex';
import Vue from 'vue';
// Import different modules to be used in the store
// Ex: import mobs from "./modules/mobs"
import auth from './modules/auth';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        auth: auth
    },
});
//# sourceMappingURL=index.js.map