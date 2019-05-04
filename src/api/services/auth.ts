import Axios from 'axios';
import AxiosService from './base/axios';

class AuthApi extends AxiosService {
    constructor() {
        super();
    }

    async login (username: string, password: string): Promise<any> {
        try {
            let url = `/auth/login`;
            let bodyParams = { username, password };
            let data = await this.send(url, AxiosService.HTTP_METHODS.post, null, bodyParams);
            return data;
        } catch (err) {
            console.log(`Errored in AuthApi/login: ${err}`);
            return Promise.reject(err);
        }
    }
    async register (username: string, email: string, password: string): Promise<any> {
        try {
            let url = `/auth/register`;
            let bodyParams = { username, email, password };
            let data = await this.send(url, AxiosService.HTTP_METHODS.post, null, bodyParams);
            return data;
        } catch (err) {
            console.log(`Errored in AuthApi/register: ${err}`);
            return Promise.reject(err);
        }
    }
    async getVerifiedUserByToken (token: string): Promise<any> {
        let url = `/auth/getVerifiedUserByToken/${token}`;
        let data = await this.send(url, AxiosService.HTTP_METHODS.get, token);
        return data;
    }
}
const authApi = new AuthApi();
export default authApi;
