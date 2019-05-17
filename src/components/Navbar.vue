<template>
    <div>
        <v-layout row wrap text-xs-center class="grey darken-4">
            <v-flex class="xs1">
                <div style="height: 100%;position:relative;">
                    <v-btn bottom left absolute fab small outline color="teal lighten-1" @click.stop="drawer = !drawer" class="ml-2">
                        <v-icon>list</v-icon>
                    </v-btn>
                </div>
            </v-flex>
            <v-flex class="xs9 pt-4 pb-4">
                <h3> Welcome to Coffee Time! </h3>
            </v-flex>
            <v-flex xs1 v-if="user.isLoggedIn">
                <v-btn flat fab @click="goToBuddiesView()" color="">
                    <v-icon color="teal">group</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs1 right v-if="user.isLoggedIn">
                <v-btn flat fab @click="logUserOut()" color="">
                    <v-icon color="teal">logout</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <v-navigation-drawer temporary v-model="drawer" absolute>
            <v-toolbar flat>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title class="title">
                            <h5>Welcome to Coffee Time!</h5>
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pt-0">
                <v-list-tile avatar>
                    <v-icon color="teal">settings</v-icon>
                </v-list-tile>
                <v-list-tile avatar v-if="user.isLoggedIn">
                    <v-btn flat @click="logUserOut()" color="">
                        <v-icon color="teal">logout</v-icon>
                        Logout
                    </v-btn>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Navbar',
    components: {

    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        goToBuddiesView() {
            this.$router.push({
                path: '/buddies'
            });
        },
        ...mapActions(['logout']),
        async logUserOut() {
            await this.logout();
            this.$router.push({
                path: '/auth'
            });
        },
    },
    data() {
        return {
            drawer: null,
        };
    },
};
</script>