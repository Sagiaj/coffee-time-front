import * as types from '../mutation-types';
import User from '../../models/store/auth-store';
import AuthApi from '../../api/services/auth';
const state = {
    user: new User(),
};

const mutations = {
    [types.AUTH_USER_LOGIN](state: any, {username, password}: any): any {
        state.user.username = username;
        state.user.password = password;
        state.user.isLoggedIn = true;
    },
    [types.AUTH_USER_REGISTER](state: any, {username, email, password}: any): any {
        state.user.email = email;
        state.user.username = username;
        state.user.password = password;
        state.user.isLoggedIn = true;
    },
};

const actions = {
    authUserLogin: async ({ commit }: any, {username, password}: any): Promise<any> => {
        try {
            let { user, token } = await AuthApi.login(username, password);
            localStorage.setItem('access_token', token);
            await commit(types.AUTH_USER_LOGIN, user);
        } catch (err) {
            console.log(`Errored in Auth/authUserLogin: ${err}`);
            return Promise.reject(err);
        }
    },
    authUserRegister: async ({ commit, dispatch }: any, { email, password, username }: any): Promise<any> => {
        try {
            let { user, token } = await AuthApi.register(username, email, password);
            localStorage.setItem('access_token', token);
            await commit(types.AUTH_USER_REGISTER, user);
        } catch (err) {
            console.log(`Errored in Auth/authUserRegister: ${err}`);
            return Promise.reject(err);
        }
    },
    getVerifiedUserByToken: async ({ commit }: any): Promise<any> => {
        try {
            let { user } = await AuthApi.getVerifiedUserByToken();
            commit(types.AUTH_USER_LOGIN, user);
            return state.user;
        } catch (err) {
            console.log(`Errored in Auth/getVerifiedUserByToken: ${err}`);
            return Promise.reject(err);
        }
    }
};

const getters = {
    user(state: any): User {
        return state.user;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
