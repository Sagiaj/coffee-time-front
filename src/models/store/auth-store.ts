export default class User {
    isLoggedIn: boolean = !!localStorage.getItem('username');
    email: string = '';
    username: string = '';
    password: string = '';
};
