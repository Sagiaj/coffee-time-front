import AxiosService from './base/axios';
import User from '@/models/store/auth-store';

class BuddiesApi extends AxiosService {
    constructor() {
        super();
    }

    async saveUserBuddies(userId: number, buddies: Array<any>): Promise<any> {
        try {
            let url = `/users/${userId}/buddies`;
            let bodyParams = { buddies };
            let data = await this.send(url, AxiosService.HTTP_METHODS.post, null, bodyParams);
            return data;
        } catch (err) {
            console.log(`Errored in BuddiesApi/saveUserBuddies: ${err}`);
            return Promise.reject(err);
        }
    }

    async getBuddies(userId: number): Promise<Array<object>> {
        try {
            let url = `users/${userId}/buddies`;
            let data = await this.send(url, AxiosService.HTTP_METHODS.get);
            return data;
        } catch (err) {
            console.log(`Errored in BuddiesApi/getBuddies. Error: ${err}`);
            return Promise.reject(err);
        }
    }
}
const buddiesApi = new BuddiesApi();
export default buddiesApi;
