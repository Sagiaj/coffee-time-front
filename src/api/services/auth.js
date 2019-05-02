import * as tslib_1 from "tslib";
import AxiosService from './base/axios';
var AuthApi = /** @class */ (function (_super) {
    tslib_1.__extends(AuthApi, _super);
    function AuthApi() {
        return _super.call(this) || this;
    }
    AuthApi.prototype.login = function (username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, bodyParams, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/auth/login";
                        bodyParams = { username: username, password: password };
                        return [4 /*yield*/, this.send(url, AxiosService.HTTP_METHODS.post, null, bodyParams)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    AuthApi.prototype.register = function (username, email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, bodyParams, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/auth/register";
                        bodyParams = { username: username, email: email, password: password };
                        return [4 /*yield*/, this.send(url, AxiosService.HTTP_METHODS.post, null, bodyParams)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthApi;
}(AxiosService));
var authApi = new AuthApi();
export default authApi;
//# sourceMappingURL=auth.js.map