var _this = this;
import * as tslib_1 from "tslib";
var _a;
import * as types from '../mutation-types';
import User from '../../models/store/auth-store';
import AuthApi from '../../api/services/auth';
var state = {
    user: new User(),
};
var mutations = (_a = {},
    _a[types.AUTH_USER_LOGIN] = function (state, _a) {
        var username = _a.username, password = _a.password;
        state.user.username = username;
        state.user.password = password;
        state.user.isLoggedIn = true;
    },
    _a[types.AUTH_USER_REGISTER] = function (state, _a) {
        var username = _a.username, email = _a.email, password = _a.password;
        state.user.email = email;
        state.user.username = username;
        state.user.password = password;
        state.user.isLoggedIn = true;
    },
    _a);
var actions = {
    authUserLogin: function (_a, _b) {
        var commit = _a.commit;
        var username = _b.username, password = _b.password;
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _c, user, token, err_1;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, AuthApi.login(username, password)];
                    case 1:
                        _c = _d.sent(), user = _c.user, token = _c.token;
                        localStorage.setItem('access_token', token);
                        return [4 /*yield*/, commit(types.AUTH_USER_LOGIN, user)];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _d.sent();
                        console.log("Errored in Auth/authUserLogin: " + err_1);
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    authUserRegister: function (_a, _b) {
        var commit = _a.commit, dispatch = _a.dispatch;
        var email = _b.email, password = _b.password, username = _b.username;
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _c, user, token, err_2;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, AuthApi.register(username, email, password)];
                    case 1:
                        _c = _d.sent(), user = _c.user, token = _c.token;
                        localStorage.setItem('access_token', token);
                        return [4 /*yield*/, commit(types.AUTH_USER_REGISTER, user)];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _d.sent();
                        console.log("Errored in Auth/authUserRegister: " + err_2);
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    getUser: function (_a) {
        var commit = _a.commit, rootState = _a.rootState;
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var res;
            return tslib_1.__generator(this, function (_b) {
                try {
                    res = state.user;
                    console.log('now the auth is:', res);
                }
                catch (err) {
                    console.log("Errored in Auth/getUser: " + err);
                    return [2 /*return*/, Promise.reject(err)];
                }
                return [2 /*return*/];
            });
        });
    },
    getVerifiedUserByToken: function (_a, token) {
        var commit = _a.commit;
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var user, err_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, AuthApi.getVerifiedUserByToken(token)];
                    case 1:
                        user = (_b.sent()).user;
                        console.log("now check user: " + Object.values(user));
                        commit(types.AUTH_USER_LOGIN, user);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _b.sent();
                        console.log("Errored in Auth/getVerifiedUserByToken: " + err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};
var getters = {
    user: function (state) {
        return state.user;
    },
};
export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
};
//# sourceMappingURL=auth.js.map