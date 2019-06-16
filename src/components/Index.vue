<template>
    <v-layout row wrap>
        <transition name="slide-fade" mode="in-out">
            <v-container grid-list-lg v-if="!ongoingCoffeeTime" v-show="!ongoingCoffeeTime">
                <v-layout row wrap>
                    <v-flex class="xs12" text-xs-center align-center>
                        <h1> Hello, {{ user.username }}! </h1>
                        <h3> When is your Coffee Time? </h3>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex class="xs4" v-for="(time, idx) in coffeeTimes" :key="idx" text-xs-center align-center>
                        <v-btn wrap flat icon color="teal darken-2" class="coffee-times-btn"
                            @click="triggerCoffeeTime(time.minutes)">
                            {{ coffeeTimes[idx].text }}
                            <v-icon>alarm_on</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </transition>
        <transition name="slide-fade" mode="out-in">
            <v-container grid-list-lg v-if="ongoingCoffeeTime">
                <v-layout row wrap>
                    <v-flex xs1>
                        <v-btn wrap flat icon color="teal darken-2"
                            @click="abortCoffeeTime">
                            <v-icon>cancel</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs11 justify-center text-xs-center>
                        <h1>Waiting for your friends...</h1>
                        <BuddiesCoffeeTime
                            :hasBeenInvited="true"
                            @abortCoffeeTime="abortCoffeeTime()"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </transition>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Navbar from '@/components/Navbar';
import BuddiesCoffeeTime from '@/components/Room/BuddiesCoffeeTime';

export default {
    name: 'Index',
    components: {
        BuddiesCoffeeTime,
    },
    sockets: {
        receiveCoffeeTimeInvitation({ invitedToRoom, minutes }) {
            if(buddies.indexOf(this.user.username) !== -1) {
                console.log('I AM a FRIEND!');
                this.beginCoffeeTimeStepsPopup();
            }
            console.log('lol check what ive been through!', minutes);
        },
    },
    computed: {
        ...mapGetters(['user', 'buddies', 'roomName']),
    },
    methods: {
        ...mapActions(['getVerifiedUserByToken']),
        async beginCoffeeTimeStepsPopup() {
            this.coffeeTimePopup = true;
        },
        async triggerCoffeeTime(minutes) {
            // gather buddies id list plus current user id
            this.ongoingCoffeeTime = true;
            let data = {
                buddies: [this.user, ...this.buddies],
                minutes,
                username: this.user.username
            };
            console.log(`Emitting: sendCoffeeTimeInvitationToBuddies`);
            this.$socket.emit('sendCoffeeTimeInvitationToBuddies', data);

            // open group coffee time popup for all users
            // send socket to popup for all
        },
        async approveCoffeeTimeInvitation() {
            this.$socket.emit('joinRoom', invitedToRoom);
            this.setRoomName(invitedToRoom);
            this.ongoingCoffeeTime = true;
        },
        async abortCoffeeTime() {
            this.ongoingCoffeeTime = false;
            this.userLeaveRoom();
        },
        async userLeaveRoom() {
            this.$socket.emit('leaveRoom', this.roomName);
            this.setRoomName(null);
        },
    },
    created () {
        this.$socket.username = this.user.username;
    },
    data() {
        return {
            ongoingCoffeeTime: false,
            clickEvent: false,
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
            ],
            approval: false
        };
    },
};
</script>

<style scoped>
.coffee-times-btn{
    font-size: 1.4em;
}
.coffee-times-btn i{
    font-size: 3em;
}

.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  /* transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* .slide-fade-enter-active {
  transition: all 2s ease;
} */
</style>
