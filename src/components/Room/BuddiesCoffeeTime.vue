<template>
    <v-container grid-list-lg>
        <v-dialog
        v-if="hasBeenInvited"
        v-model="hasBeenInvited"
        scrollable
        absolute
        persistent :overlay="false"
        max-width="100%"
        justify-center
        text-xs-center
        align-center
        centered
        center
        transition="dialog-transition"
    >
            <v-stepper v-model="dialogProgressValue" style="margin:0 auto; width: 500px;">
                <v-stepper-header>
                    <v-stepper-step step="1" :complete="dialogProgressValue > 1">Authentication</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2" :complete="dialogProgressValue > 2">Choose Buddies</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card dark class="mb-5" height="100%">
                            <v-card-title>
                                <h3 class="headline">You have been invited by {{ 'someone' }} to coffee time!</h3>
                                <h4>Do you approve?</h4>

                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-btn flat icon color="teal darken-2">
                                                <v-icon>check</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                        </v-card>
                        <v-btn color="teal darken-2" @click.native="dialogProgressValue = 2">Continue</v-btn>
                        <v-btn @click.native="abortCoffeeTime();" flat>Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        
                        <v-card dark class="mb-5" height="100%">
                            <v-list subheader>
                                <v-card avatar v-for="(buddy, idx) in activeBuddies">
                                    <BuddyItem :buddy="buddy"
                                        @toggleBuddy="toggleBuddy"/>
                                </v-card>
                            </v-list>
                        </v-card>
                        <v-btn
                            dark 
                            color="teal darken-2" 
                            @click.native="dialogProgressValue = 3;attemptRegister();">Save 
                            <v-icon>check</v-icon>
                        </v-btn>
                        <v-btn dark flat color="teal darken-2" @click.native="abortCoffeeTime();">Cancel</v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'BuddiesCoffeeTime',
    props: ['hasBeenInvited'],
    computed: {
        ...mapGetters(['activeBuddies', 'roomName']),
    },
    methods: {
        ...mapActions(['buddyJoinRoom', 'removeBuddy']),
        abortCoffeeTime() {
            this.$emit('abortCoffeeTime');
        }
    },
    data () {
        return {
            acceptInvitation: false,
            dialogProgressValue: 1
        };
    },
};
</script>

