<template>
    <v-layout row wrap>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex class="xs12" text-xs-center align-center>
                    <h1> Hello, {{ user.username }}! </h1>
                    <h3> When is your Coffee Time? </h3>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex class="xs4" v-for="(time, idx) in coffeeTimes" :key="idx" text-xs-center align-center>
                    <v-btn flat icon color="teal darken-2" class="coffee-times-btn">
                        {{ coffeeTimes[idx].text }}
                        <v-icon>alarm_on</v-icon>
                    </v-btn>
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
            coffeeTimes: [
                {
                    text: `5 Minutes`,
                    minutes: 5
                },
                {
                    text: `10 Minutes`,
                    minutes: 10
                },
                {
                    text: `30 Minutes`,
                    minutes: 30
                }
            ]
        };
    },
};
</script>

<style scoped>
.coffee-times-btn{
    size: 5em;
}
.coffee-times-btn i{
    font-size: 5em;
}
</style>
