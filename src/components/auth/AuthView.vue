<template>
    <v-layout row wrap text-xs-center>
        <v-flex class="xs6">
            <v-layout row wrap justify-center>
                <v-flex>
                    <v-btn outline color="teal darken-3" large style="border-radius: 50% 7% 50% 1%;"
                        @click.stop="loginDialog = true;">
                        Login
                        <v-icon class="ml-2">fingerprint</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex class="xs6">
            <v-layout row wrap justify-center>
                <v-flex>
                    <v-btn outline color="teal darken-3" large style="border-radius: 1% 50% 7% 50%;"
                        @click.stop="registerDialog = true;">
                        <v-icon class="mr-2">group_add</v-icon>
                        Register
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
        <LoginDialog :loginDialog="loginDialog" :isSubmitting="isSubmitting"
            @cancelDialog="cancelDialog"
            @attemptLogin="login"/>
        <RegisterDialog :registerDialog="registerDialog" :isSubmitting="isSubmitting"
            @cancelDialog="cancelDialog"
            @attemptRegister="register"/>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoginDialog from '@/components/auth/LoginDialog.vue';
import RegisterDialog from '@/components/auth/RegisterDialog.vue';


export default {
    name: 'AuthView',
    components: {
        LoginDialog,
        RegisterDialog
    },
    sockets: {
        connect: () => {
            console.log('connected');
        }
    },
    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        ...mapActions([
            'authUserLogin',
            'authUserRegister',
            'getVerifiedUserByToken',
        ]),
        async login({username, password}) {
            try {
                this.isSubmitting = true;
                await this.authUserLogin({username, password});
                this.goToAuthenticatedHome();
            } catch (err) {
                console.log(`Failed logging in`);
            }
            this.cancelDialog();
            this.isSubmitting = false;
        },
        cancelDialog() {
            this.loginDialog = false;
            this.registerDialog = false;
            this.isSubmitting = false;
        },
        goToAuthenticatedHome() {
            this.$router.push({
                path: '/'
            });
        },
        async register(username, email, password, buddies) {
            try {
                this.isSubmitting = true;
                await this.authUserRegister({ username, email, password, buddies });
                this.goToAuthenticatedHome();
            } catch (err) {
                console.log(`Failed registering. Error: ${err}`);
            }
            this.cancelDialog();
            this.isSubmitting = false;
        },
        async attachBuddiesSocketRooms(buddies) {
            // buddies.forEach(buddy => {
            //     let roomName = `friendOf_${buddy.username}`;
            //     this.$socket.emit('joinRoom', roomName);
            // });
            console.log('joining!', `private_${this.user.username}`)
            this.$socket.emit('joinRoom', `private_${this.user.username}`);
        },
    },
    async created() {
        try {
            let user = await this.getVerifiedUserByToken();
            this.attachBuddiesSocketRooms(user.buddies);
            if (user.isLoggedIn) {
                this.goToAuthenticatedHome();
            }
        } catch (err) {
            console.log(`Failed getting verified user.`);
        }
    },
    data() {
        return {
            loginDialog: false,
            registerDialog: false,
            isSubmitting: false,
        };
    },
}
</script>