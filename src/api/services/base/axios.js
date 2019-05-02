import * as tslib_1 from "tslib";
import axios from 'axios';
// const AXIOS_API_KEY = Symbol.for('@/src/api/services/base/axios');
// const globalSymbols = Object.getOwnPropertySymbols(globalThis);
// const hasSymbol = globalSymbols.indexOf(AXIOS_API_KEY) > -1;
// if (!hasSymbol) {
//     const axiosInstance = axios.create({
//         baseURL: `${process.env.API_BASE_URL}`
//     });
//     globalThis[AXIOS_API_KEY] = axiosInstance;
// }
var axiosInstance = axios.create({
    baseURL: "" + process.env.API_BASE_URL
});
var AxiosService = /** @class */ (function () {
    function AxiosService() {
        this.axios = axiosInstance;
    }
    AxiosService.prototype.send = function (relative_url, method, queryParams, bodyParams) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, _a, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        response = null;
                        _a = method;
                        switch (_a) {
                            case AxiosService.HTTP_METHODS.get: return [3 /*break*/, 1];
                            case AxiosService.HTTP_METHODS.post: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.axios.get(relative_url)];
                    case 2:
                        response = _b.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.axios.post(relative_url, bodyParams)];
                    case 4:
                        response = _b.sent();
                        return [3 /*break*/, 6];
                    case 5: return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, Promise.resolve(response)];
                    case 7:
                        err_1 = _b.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AxiosService.HTTP_METHODS = {
        get: "GET",
        post: "POST",
        put: "PUT",
        delete: "DELETE"
    };
    return AxiosService;
}());
export default AxiosService;
//# sourceMappingURL=axios.js.map