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
    async register (username: string, email: string, password: string, buddies: Array<any>): Promise<any> {
        try {
            let url = `/auth/register`;
            let bodyParams = { username, email, password, buddies };
            let data = await this.send(url, AxiosService.HTTP_METHODS.post, null, bodyParams);
            return data;
        } catch (err) {
            console.log(`Errored in AuthApi/register: ${err}`);
            return Promise.reject(err);
        }
    }
    async getVerifiedUserByToken(): Promise<any> {
        try {
            let url = `/auth/getVerifiedUserByToken`;
            let data = await this.send(url, AxiosService.HTTP_METHODS.get);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
const authApi = new AuthApi();
export default authApi;
