<template>
    <v-layout row wrap>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex class="xs12" text-xs-center align-center>
                    <h1> {{ user.username }} </h1>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Navbar from '@/components/Navbar';

export default {
    name: 'Index',
    components: {
        
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        ...mapActions(['getVerifiedUserByToken'])
    },
    async mounted() {
        try {
            if (!this.user.isLoggedIn) {
                await this.getVerifiedUserByToken();
            }
        } catch (err) {
            this.$router.push('/auth')
        }
    },
    async created () {
    },
    data() {
        return {
            
        };
    },
};
</script>