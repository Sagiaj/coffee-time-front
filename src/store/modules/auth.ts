import * as types from '../mutation-types';
import User from '../../models/store/auth-store';
import AuthApi from '../../api/services/auth';
const state = {
    user: new User(),
};

const mutations = {
    [types.AUTH_USER_LOGIN](state: any, { username, password }: any): any {
        state.user.username = username;
        state.user.password = password;
        state.user.isLoggedIn = true;
    },
    [types.AUTH_USER_REGISTER](state: any, { username, email, password }: any): any {
        state.user.email = email;
        state.user.username = username;
        state.user.password = password;
        state.user.isLoggedIn = true;
    },
    [types.AUTH_SET_BUDDIES](state: any, { buddies }: any): any {
        state.user.buddies = buddies;
    },
    [types.AUTH_USER_LOGOUT](state: any): any {
        state.user = new User();
    },
};

const actions = {
    authUserLogin: async ({ commit, dispatch }: any, { username, password }: any): Promise<any> => {
        try {
            let { user, token } = await AuthApi.login(username, password);
            localStorage.setItem('access_token', token);
            dispatch(`setUserBuddies`, [...user.buddies], { root: true });
            await commit(types.AUTH_USER_LOGIN, user);
        } catch (err) {
            console.log(`Errored in Auth/authUserLogin: ${err}`);
            return Promise.reject(err);
        }
    },
    authUserRegister: async ({ commit, dispatch, rootState }: any, { email, password, username, buddies }: any): Promise<any> => {
        try {
            let { user, token } = await AuthApi.register(username, email, password, buddies);
            localStorage.setItem('access_token', token);
            dispatch(`setUserBuddies`, [...user.buddies], { root: true });
            await commit(types.AUTH_USER_REGISTER, user);
            return state.user;
        } catch (err) {
            console.log(`Errored in Auth/authUserRegister: ${err}`);
            return Promise.reject(err);
        }
    },
    getVerifiedUserByToken: async ({ commit, dispatch }: any): Promise<any> => {
        try {
            let { user } = await AuthApi.getVerifiedUserByToken();
            dispatch('setUserBuddies', [...user.buddies], { root: true });
            commit(types.AUTH_USER_LOGIN, user);
            return state.user;
        } catch (err) {
            console.log(`Errored in Auth/getVerifiedUserByToken: ${err}`);
            return Promise.reject(err);
        }
    },
    logout: async ({ commit }: any): Promise<any> => {
        try {
            localStorage.removeItem('access_token');
            commit(types.AUTH_USER_LOGOUT);
        } catch (err) {
            console.log(`Errored in Auth/logout: ${err}`);
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
