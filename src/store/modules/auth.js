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
        var password = _b.password, username = _b.username;
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var res, storedUser, err_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, AuthApi.login(username, password)];
                    case 1:
                        res = _c.sent();
                        storedUser = res.;
                        console.log('storedUser:', storedUser);
                        return [4 /*yield*/, commit(types.AUTH_USER_LOGIN, { username: storedUser.userName, password: password })];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    authUserRegister: function (_a, params) {
        var commit = _a.commit, dispatch = _a.dispatch;
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var email, password, username, res, response, err_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        email = params.email, password = params.password, username = params.username;
                        return [4 /*yield*/, createUserWithEmailAndPassword(email, password)];
                    case 1:
                        res = _b.sent();
                        return [4 /*yield*/, db.collection('users').add({ email: email, username: username, password: password })];
                    case 2:
                        response = _b.sent();
                        localStorage.setItem('username', username);
                        return [4 /*yield*/, commit(types.AUTH_USER_REGISTER, { username: username, email: email, password: password })];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _b.sent();
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    getUser: function (_a) {
        var commit = _a.commit;
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var res, err_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, checkUserAuth()];
                    case 1:
                        res = _b.sent();
                        console.log('now the auth is:', res);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _b.sent();
                        return [2 /*return*/, Promise.reject(err_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
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