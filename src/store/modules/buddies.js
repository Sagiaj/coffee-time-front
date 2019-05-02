var _this = this;
import * as tslib_1 from "tslib";
var _a;
import * as types from '../mutation-types';
var state = {
    buddies: [],
};
var mutations = (_a = {},
    _a[types.SET_BUDDIES] = function (state, _a) {
        var buddyName = _a.buddyName;
    },
    _a[types.ADD_BUDDY] = function (state, username, email, password) {
    },
    _a);
var actions = {
    getBuddies: function (_a, user) {
        var commit = _a.commit, rootState = _a.rootState;
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var buddies;
            return tslib_1.__generator(this, function (_b) {
                buddies = rootState.buddies;
                return [2 /*return*/];
            });
        });
    },
    updateBuddies: function (_a, username, password) {
        var commit = _a.commit;
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/];
            });
        });
    }
};
var getters = {
    buddies: function (state) {
        return state.buddies;
    },
};
export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
};
//# sourceMappingURL=buddies.js.map