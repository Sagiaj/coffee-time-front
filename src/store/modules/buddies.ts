import * as types from '../mutation-types';
import User from '../../models/store/auth-store';
import buddiesApi from '../../api/services/buddies';

const state = {
    buddies: [],
    filteredBuddies: [],
};

const mutations = {
    [types.ADD_BUDDY](state: any, username: string, email: string, password: string): any {
        state.buddies.push({username, email, password});
    },
    [types.SET_USER_BUDDIES](state: any, buddies: Array<any>): any {
        state.buddies = buddies;
    },
    [types.BUDDY_QUERY_SET_RESULT](state: any, buddies: []) {
        state.filteredBuddies = buddies;
    },
};

const actions = {
    getBuddies: async ({ commit, rootState }: any, user: User): Promise<any> => {
        try {
            let buddies = User.parseToUserList(await buddiesApi.getBuddies(user.id));
            commit(types.SET_USER_BUDDIES, buddies);
        } catch (err) {
            console.log(`Errored in buddies/getBuddies. Error: ${err}`);
            return Promise.reject(err);
        }
    },
    setUserBuddies: async ({ commit }: any, buddies: Array<any>): Promise<any> => {
        try {
            let parsedBuddies = User.parseToUserList(buddies);
            commit(types.SET_USER_BUDDIES, parsedBuddies);
            return parsedBuddies;
        } catch (err) {
            console.log(`Errored in buddies/setUserBuddies. Error: ${err}`);
            return Promise.reject(err);
        }
    },
    async queryBuddiesLike({ commit, rootState }: any, expression: string) {
        try {
            if (expression.length < 1) {
                commit(types.BUDDY_QUERY_SET_RESULT, User.parseToUserList([]));
                return false;
            }
            let { buddies }: any = await buddiesApi.getMatchingBuddies(expression);
            let { user } = rootState.auth;
            let buddiesWithoutUser: Array<any> = buddies.filter((buddy: any) => buddy.id !== user.id);
            let parsedBuddies = User.parseToUserList(buddiesWithoutUser);
            commit(types.BUDDY_QUERY_SET_RESULT, parsedBuddies);
        } catch (err) {
            console.log(`Errored in queryBuddiesLike: ${err}`);
            return Promise.reject(err);
        }
    },
    async resetQuerySelection({ commit }: any) {
        try {
            commit(types.BUDDY_QUERY_SET_RESULT, []);
        } catch (err) {
            console.log(`Errored in resetQuerySelection. Error: ${err}`);
            return Promise.reject(err);
        }
    },
    saveBuddies: async ({ commit, rootState, dispatch }: any, { user, buddies }: { user: User, buddies: Array<any> }): Promise<any> => {
        try {
            let returnedBuddies = await buddiesApi.saveUserBuddies(user.id, buddies);
            console.log('returned:', returnedBuddies);
            dispatch('setUserBuddies', buddies);
            commit(types.SET_USER_BUDDIES, buddies);
        } catch (err) {
            console.log(`Errored in buddies/saveBuddies. Error: ${err}`);
            return Promise.reject(err);
        }
    },
};

const getters = {
    buddies(): Array<any> {
        return state.buddies;
    },
    filteredBuddies() {
        return state.filteredBuddies;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
