export default class User {
    isLoggedIn: boolean = !!localStorage.getItem('username');
    id: number = 0;
    email: string = '';
    username: string = '';
    password: string = '';
    buddies: [] = [];
};
