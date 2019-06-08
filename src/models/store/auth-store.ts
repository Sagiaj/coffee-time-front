export default class User {
    isLoggedIn: boolean = !!localStorage.getItem('username');
    id: number = 0;
    email: string = '';
    username: string = '';
    password: string = '';
    buddies: [] = [];

    constructor(user?: User) {
        if (user) {
            this.isLoggedIn = user.isLoggedIn || false;
            this.id = user.id || 0;
            this.email = user.email || 'Unknown';
            this.username = user.username || 'Unknown';
            this.password = '*********';
            this.buddies = user.buddies || [];
        }
        return this;
    }

    static parseToUserList(list: Array<any>): Array<User> {
        let userModelList: Array<User> = list.map(userData => new User(userData));
        return userModelList;
    }
};
