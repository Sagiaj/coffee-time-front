<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-btn outline color="teal darken-3" large style="border-radius: 50% 7% 50% 1%;"
                @click.stop="loginDialog = true;">
                Login
                <v-icon class="ml-2">fingerprint</v-icon>
            </v-btn>
        </v-flex>
        <LoginDialog :loginDialog="loginDialog"
        @cancelLoginDialog="cancelDialog"
        @attemptLogin="login"/>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoginDialog from '@/components/auth/LoginDialog.vue';

export default {
    name: 'Login',
    components: {LoginDialog,},
    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        ...mapActions(['authUserLogin']),
        async login(username, pass) {
            await this.authUserLogin(username, pass);
            this.cancelDialog();
            this.goToAuthenticatedHome();
        },
        cancelDialog() {
            this.loginDialog = false;
        }
    },
    data() {
        return {
            loginDialog: false,
        };
    },
};
</script>

<style lang="css">

</style>