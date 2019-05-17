import * as types from '../mutation-types';
import User from '../../models/store/auth-store';
import buddiesApi from '../../api/services/buddies';

const state = {
    buddies: [],
};

const mutations = {
    [types.ADD_BUDDY](state: any, username: string, email: string, password: string): any {
        state.buddies.push({username, email, password});
    },
    [types.SET_USER_BUDDIES](state: any, buddies: Array<any>): any {
        state.buddies = buddies;
    }
};

const actions = {
    getBuddies: async ({ commit, rootState }: any, user: User): Promise<any> => {
        try {
            let buddies = await buddiesApi.getBuddies(user.id);
            commit(types.SET_USER_BUDDIES, buddies);
        } catch (err) {
            console.log(`Errored in buddies/getBuddies. Error: ${err}`);
            return Promise.reject(err);
        }
    },
    setUserBuddies: async ({ commit }: any, buddies: Array<any>): Promise<any> => {
        try {
            commit(types.SET_USER_BUDDIES, buddies);
            console.log(`commited buddies:`, state.buddies)
            return buddies;
        } catch (err) {
            console.log(`Errored in buddies/setUserBuddies. Error: ${err}`);
            return Promise.reject(err);
        }
    },
    saveBuddies: async ({ commit, rootState, dispatch }: any, user: User, buddies: Array<any>): Promise<any> => {
        try {
            let returnedBuddies = await buddiesApi.saveUserBuddies(user.id, buddies);
            dispatch('setUserBuddies', returnedBuddies);
            commit(types.SET_USER_BUDDIES, returnedBuddies);
        } catch (err) {
            console.log(`Errored in buddies/saveBuddies. Error: ${err}`);
            return Promise.reject(err);
        }
    }
};

const getters = {
    buddies(): Array<any> {
        console.log('returning state buddies', state);
        return state.buddies;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
