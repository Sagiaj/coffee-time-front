import Axios from 'axios';
import AxiosService from './base/axios';

class AuthApi extends AxiosService {
    constructor() {
        super();
    }

    async login (username: string, password: string): Promise<any> {
        let url = `/auth/login`;
        let bodyParams = { username, password };
        let response = await this.send(url, AxiosService.HTTP_METHODS.post, null, bodyParams);
        return response;
    }
    async register (username: string, email: string, password: string): Promise<any> {
        let url = `/auth/register`;
        let bodyParams = { username, email, password };
        let response = await this.send(url, AxiosService.HTTP_METHODS.post, null, bodyParams);
    }
}
const authApi = new AuthApi();
export default authApi;
