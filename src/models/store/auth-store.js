var User = /** @class */ (function () {
    function User() {
        this.isLoggedIn = !!localStorage.getItem('username');
        this.email = '';
        this.username = '';
        this.password = '';
    }
    return User;
}());
export default User;
;
//# sourceMappingURL=auth-store.js.map