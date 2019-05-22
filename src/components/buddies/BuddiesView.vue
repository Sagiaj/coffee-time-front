<template>
    <v-container grid-list-lg>
        <v-card>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-list two-line>
                            <v-list-tile avatar v-for="(buddy, idx) in buddies" :key="idx">
                                <v-list-tile-avatar>
                                    <img src="src">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>title</v-list-tile-title>
                                    <v-list-tile-sub-title>subTitle</v-list-tile-sub-title>
                            </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn teal darken-1>
                    Save
                    <v-icon>save</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>

import BuddyList from '@/components/buddies/BuddyList';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'BudiesView',
    components: {
        BuddyList
    },
    computed: {
        ...mapGetters(['buddies']),
    },
    methods: {
        ...mapActions(['saveBuddies']),
        revertBuddiesChanges() {
            resetBuddiesList();
            // In the future - also revert group changes
        },
        resetBuddiesList() {
            this.amendedBuddies = [...this.buddies];
        },
        async saveChanges() {
            let newBuddies = await this.saveBuddies(this.amendedBuddies);
        },
    },
    mounted() {
        this.resetBuddiesList();
    },
    data() {
        return {
            amendedBuddies: [],
        };
    },
};
</script>

<style>

</style>
