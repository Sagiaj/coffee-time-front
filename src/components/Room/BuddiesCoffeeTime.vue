<template>
    <v-container grid-list-lg>
        <h1>Waiting for your friends...</h1>
        <v-dialog
        v-if="hasBeenInvited"
        v-model="hasBeenInvited"
        scrollable
        absolute
        persistent :overlay="false"
        max-width="55%"
        justify-center
        text-xs-center
        align-center
        centered
        center
    >
        <v-layout row wrap justify-center style="padding: 3%;"
        text-xs-center
        align-center>
            <v-flex xs12>
                <v-card dark class="mb-5" height="100%">
                    <v-card-title class="headline" style="display: block;">
                        Coffee Time with {{ '###' }}
                    </v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs3 v-for="(buddy, idx) in activeBuddies" :key="idx">
                                <v-avatar color="red">
                                </v-avatar>
                                <p class="red--text headline">{{ buddy.username }}</p>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
                <v-btn color="teal darken-2" @click.native="dialogProgressValue = 2">Continue</v-btn>
                <v-btn @click.native="cancelEvent();" flat>Cancel</v-btn>
            </v-flex>
        </v-layout>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'BuddiesCoffeeTime',
    props: ['hasBeenInvited'],
    sockets: {
        removeBuddyFromRoom({ buddy }) {
            this.removeBuddy(buddy);
        }
    },
    computed: {
        ...mapGetters(['activeBuddies', 'roomName']),
    },
    methods: {
        ...mapActions(['buddyJoinRoom', 'buddyLeaveRoom']),
        cancelEvent() {
            console.log('lolol')
            this.$emit('cancelEvent');
        }
    },
    mounted () {
        console.log('mounted!!!!');
    },
    data () {
        return {
            acceptInvitation: false,
            dialogProgressValue: 1
        };
    },
};
</script>

