<template>
    <v-dialog
        v-if="registerDialog"
        v-model="registerDialog"
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
                            <span class="headline">User Login</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field v-model="username" color="teal darken-2" label="*User Name" required></v-text-field>
                                    </v-flex>
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
                    </v-card>
                    <v-btn color="primary" @click.native="dialogProgressValue = 2">Continue</v-btn>
                    <v-btn @click.native="cancelDialog();" flat>Cancel</v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                    
                    <v-card dark class="mb-5" height="100%">
                        <v-list subheader>
                            <v-card avatar v-for="(buddy, idx) in buddiesList">
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
                    <v-btn dark flat color="teal darken-2" @click.native="cancelDialog();">Cancel</v-btn>
                </v-stepper-content>
                <div class="text-xs-center">
                    <v-progress-circular
                        v-if="isSubmitting"
                        :size="50"
                        class="sagi"
                        color="teal darken-2"
                        indeterminate
                    ></v-progress-circular>
                </div>
            </v-stepper-items>
        </v-stepper>
    </v-dialog>
</template>

<script>
import BuddyItem from '@/components/buddies/BuddyItem.vue';

export default {
    name: 'RegisterDialog',
    props: ['registerDialog', 'isSubmitting',],
    components: {BuddyItem,},
    computed: {},
    methods: {
        cancelDialog() {
            this.$emit('cancelDialog', []);
            this.resetValues();
        },
        attemptRegister() {
            this.$emit('attemptRegister', this.username, this.email, this.password);
            this.resetValues();
        },
        resetValues() {
            this.dialogProgressValue = 0;
            this.username = '';
            this.email = '';
            this.password = '';
        },
        toggleBuddy(buddy) {
            let buddyIdx = this.buddies.indexOf(buddy);
            if (buddyIdx !== -1) {
                this.buddies.splice(buddyIdx, 1);
            } else {
                this.buddies.push(buddy);
            }
        },
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            buddies: [],
            dialogProgressValue: 0,
            buddies: [],
            buddiesList: [
                {
                    name: 'alexa',
                    imgSrc: 'https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-200w.jpeg',
                },
                {
                    name: 'john',
                    imgSrc: 'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
                },
                {
                    name: 'nathan',
                    imgSrc: 'https://tinyfac.es/data/avatars/282A12CA-E0D7-4011-8BDD-1FAFAAB035F7-200w.jpeg',
                },
            ],
        };
    },
};
</script>