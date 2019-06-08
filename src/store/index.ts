import Vuex from 'vuex';
import Vue from 'vue';

// Import different modules to be used in the store
import auth from './modules/auth';
import buddies from './modules/buddies';
import coffeeTimeRoom from './modules/coffee-time-room';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        buddies,
        coffeeTimeRoom,
    },
});
