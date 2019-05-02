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
    authUserLogin: async ({ commit }: any, {password, username}: any): Promise<any> => {
        try {
            let res = await AuthApi.login(username, password);
            let storedUser = res.;
            console.log('storedUser:', storedUser);
            await commit(types.AUTH_USER_LOGIN, {username: storedUser.userName, password});
        } catch (err) {
            return Promise.reject(err);
        }
    },
    authUserRegister: async ({ commit, dispatch }: any, params: any): Promise<any> => {
        try {
            let {email, password, username} = params;
            let res = await createUserWithEmailAndPassword(email, password);
            let response = await db.collection('users').add({email, username, password});
            localStorage.setItem('username', username);
            await commit(types.AUTH_USER_REGISTER, {username, email, password});
        } catch (err) {
            return Promise.reject(err);
        }
    },
    getUser: async ({ commit }: any) => {
        try {
            let res = await checkUserAuth();
            console.log('now the auth is:', res)
        } catch (err) {
            return Promise.reject(err);
        }
    },
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
