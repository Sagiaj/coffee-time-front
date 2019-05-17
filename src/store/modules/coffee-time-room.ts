import * as types from '../mutation-types';

const state = {
    activeBuddies: [],
};

const mutations = {
    [types.COFFEE_ROOM_ADD_BUDDY](buddy: any) {
        state.activeBuddies.push(buddy);
    },
    [types.COFFEE_ROOM_REMOVE_BUDDY](buddy: any) {

    },
};

const actions = {
    async buddyJoinRoom({ commit }: any, buddy: any): Promise<any> {
        commit(types.COFFEE_ROOM_ADD_BUDDY, buddy);
    },
};

const getters = {
    activeBuddies(state: any) {
        return state.activeBuddies;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
