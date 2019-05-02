<template>
    <v-layout row wrap>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex class="xs12" text-xs-center align-center>
                    You are logged in
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Navbar from '@/components/Navbar';
import AuthView from '@/components/auth/AuthView.vue';
export default {
    name: 'Index',
    components: {
        AuthView
    },
    computed: {
    },
    mounted() {
        console.log('mounted bro!')
    },
    data() {
        return {
            isLoggedIn: false,
        };
    },
};
</script>