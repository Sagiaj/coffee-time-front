import * as types from '../mutation-types';
import User from '../../models/store/auth-store';

const state = {
    buddies: [],
};

const mutations = {
    [types.SET_BUDDIES](state: any, {buddyName}: any): any {
        
    },
    [types.ADD_BUDDY](state: any, username: string, email: string, password: string): any {
        
    }
};

const actions = {
    getBuddies: async ({ commit, rootState }: any, user: User): Promise<any> => {
        let buddies = rootState.buddies;
    },
    updateBuddies: async ({ commit }: any, username: string, password: string): Promise<any> => {

    }
};

const getters = {
    buddies(state: any): any {
        return state.buddies;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
