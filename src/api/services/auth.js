import * as tslib_1 from "tslib";
import AxiosService from './base/axios';
var AuthApi = /** @class */ (function (_super) {
    tslib_1.__extends(AuthApi, _super);
    function AuthApi() {
        return _super.call(this) || this;
    }
    AuthApi.prototype.login = function (username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, bodyParams, data, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = "/auth/login";
                        bodyParams = { username: username, password: password };
                        return [4 /*yield*/, this.send(url, AxiosService.HTTP_METHODS.post, null, bodyParams)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 2:
                        err_1 = _a.sent();
                        console.log("Errored in AuthApi/login: " + err_1);
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthApi.prototype.register = function (username, email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, bodyParams, data, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = "/auth/register";
                        bodyParams = { username: username, email: email, password: password };
                        return [4 /*yield*/, this.send(url, AxiosService.HTTP_METHODS.post, null, bodyParams)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 2:
                        err_2 = _a.sent();
                        console.log("Errored in AuthApi/register: " + err_2);
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthApi.prototype.getVerifiedUserByToken = function (token) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/auth/getVerifiedUserByToken/" + token;
                        return [4 /*yield*/, this.send(url, AxiosService.HTTP_METHODS.get, token)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return AuthApi;
}(AxiosService));
var authApi = new AuthApi();
export default authApi;
//# sourceMappingURL=auth.js.map