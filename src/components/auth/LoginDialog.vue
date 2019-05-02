<template>
    <v-dialog
        v-if="loginDialog"
        v-model="loginDialog"
        scrollable
        absolute
        persistent :overlay="false"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card>
            <v-card-title>
                <span class="headline">User Login</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field v-model="email" color="teal darken-2" label="*Email" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="password" color="teal darken-2" label="*Password" type="password" required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions v-if="!isSubmitting">
                <v-spacer></v-spacer>
                <v-btn dark outline color="teal darken-2" flat @click.native="cancelDialog()"><v-icon>cancel</v-icon></v-btn>
                <v-btn dark outline color="teal darken-2" flat @click.native="attemptLogin()"><v-icon>check</v-icon></v-btn>
            </v-card-actions>
            <v-layout row wrap v-else>
                <v-flex class="xs12 text-xs-center">
                    <v-progress-circular
                        :size="70"
                        class="sagi"
                        color="teal darken-2"
                        indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'LoginDialog',
    props: ['loginDialog', 'isSubmitting',],
    components: {},
    methods: {
        cancelDialog() {
            this.$emit('cancelDialog', []);
            this.username = '';
            this.email = '';
            this.password = '';
        },
        async attemptLogin() {
            this.$emit('attemptLogin', this.email, this.password);
        },
    },
    computed: {},
    data() {
        return {
            username: '',
            email: '',
            password: ''
        };
    },
};
</script>