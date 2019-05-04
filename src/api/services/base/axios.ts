import axios, { AxiosInstance } from 'axios';

// const AXIOS_API_KEY = Symbol.for('@/src/api/services/base/axios');
// const globalSymbols = Object.getOwnPropertySymbols(globalThis);
// const hasSymbol = globalSymbols.indexOf(AXIOS_API_KEY) > -1;

// if (!hasSymbol) {
//     const axiosInstance = axios.create({
//         baseURL: `${process.env.API_BASE_URL}`
//     });
//     globalThis[AXIOS_API_KEY] = axiosInstance;
// }

const axiosInstance = axios.create({
    baseURL: /*`${process.env.API_BASE_URL}`*/ `${'http://localhost:3333'}`
});

class AxiosService {
    axios: AxiosInstance;
    static HTTP_METHODS = {
        get: "GET",
        post: "POST",
        put: "PUT",
        delete: "DELETE"
    };

    constructor() {
        this.axios = axiosInstance;
    }

    async send (relative_url: string, method: string, queryParams: any, bodyParams: any = {}) {
        try {
            let response = null;
            switch (method) {
                case AxiosService.HTTP_METHODS.get:
                    response = await this.axios.get(relative_url);
                    break;
                case AxiosService.HTTP_METHODS.post:
                    response = await this.axios.post(relative_url, bodyParams);
                    break;
                default:
                    return Promise.reject(`Unrecorgnized method ${method}`);
                    break;
            }
            if (!response || response.status != 200) {
                return Promise.reject("Error retrieving user");
            }
            return Promise.resolve(response.data);
        } catch (err) {
            return Promise.reject(err);
        }
        
    }
}

export default AxiosService;
