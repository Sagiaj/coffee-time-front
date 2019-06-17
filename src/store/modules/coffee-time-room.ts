import * as types from '../mutation-types';

const state = {
    activeBuddies: [],
    roomName: "",
};

const mutations = {
    [types.COFFEE_ROOM_ADD_BUDDY](buddy: any) {
        state.activeBuddies.push(buddy);
    },
    [types.COFFEE_ROOM_REMOVE_BUDDY](buddy: any) {
        state.activeBuddies.splice(state.activeBuddies.indexOf(buddy), 1);
    },
    [types.COFFEE_ROOM_SET_NAME](roomName: string) {
        state.roomName = roomName;
    },
};

const actions = {
    async buddyJoinRoom({ commit }: any, buddy: any): Promise<any> {
        commit(types.COFFEE_ROOM_ADD_BUDDY, buddy);
    },
    async buddyLeaveRoom({ commit }: any, buddy: any): Promise<any> {
        commit(types.COFFEE_ROOM_REMOVE_BUDDY, buddy);
    },
    setRoomName({ commit }: any, roomName: string): any {
        commit(types.COFFEE_ROOM_SET_NAME);
    },
};

const getters = {
    activeBuddies(state: any) {
        return state.activeBuddies;
    },
    roomName(state: any) {
        return state.roomName;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
