<template>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 text-xs-center>
                <h2>Your Buddies</h2>
            </v-flex>
            <v-flex xs2 v-for="(buddy, idx) in amendedBuddies" :key="idx">
                <v-chip close @input="removeBuddy(buddy, idx)">
                    {{ buddy.username }}
                </v-chip>
            </v-flex>
        </v-layout>
        <template>
            <v-form>
                <v-text-field
                @input="searchBuddies()"
                    label="Search"
                    v-model="searchText"
                    required
                ></v-text-field>
            </v-form>
        </template>
        <v-card>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-list two-line>
                            <v-list-tile avatar v-for="(buddy, idx) in filteredBuddies" :key="idx">
                                <v-list-tile-avatar>
                                    <img src="src">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{buddy.username}}</v-list-tile-title>
                                    <v-list-tile-sub-title>Email: {{buddy.email}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn v-if="amendedBuddiesById[buddy.id] == null" small fab outline flat color="teal darken-1"
                                        @click="addBuddy(buddy)">
                                        <v-icon color="teal darken-3">add</v-icon>
                                    </v-btn>
                                    <v-icon v-else large color="teal">done</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="saveChanges()" class="teal darken-2">
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
        ...mapGetters(['buddies', 'filteredBuddies', 'user']),
    },
    methods: {
        ...mapActions(['saveBuddies', 'queryBuddiesLike', 'resetQuerySelection']),
        async searchBuddies() {
            let isLogicalSubResult = (this.searchText.length > 1) && (this.filteredBuddies.length < 1);
            if (!isLogicalSubResult) {
                let buddyResult = await this.queryBuddiesLike(this.searchText);
            }
        },
        addBuddy(buddy) {
            this.amendedBuddies.push(buddy);
            this.amendedBuddiesById[buddy.id] = buddy;
        },
        removeBuddy(buddy, idx) {
            console.log('removing buddy');
            this.amendedBuddies.splice(idx, 1);
            this.amendedBuddiesById[buddy.id] = undefined;
        },
        revertBuddiesChanges() {
            resetBuddiesList();
            // In the future - also revert group changes
        },
        resetBuddiesList() {
            this.amendedBuddies = [...this.buddies];
            this.buildAmendedBuddiesObject();
        },
        buildAmendedBuddiesObject() {
            let obj = {};
            this.amendedBuddies.map(buddy => obj[buddy.id] = buddy);
            this.amendedBuddiesById = obj;
        },
        async saveChanges() {
            let newBuddies = await this.saveBuddies({
                user: this.user,
                buddies: this.amendedBuddies
            });
            this.resetBuddiesList();
        },
    },
    mounted() {
        this.resetBuddiesList();
    },
    destroyed() {
        this.resetBuddiesList();
        this.resetQuerySelection();
    },
    data() {
        return {
            amendedBuddiesById: {},
            amendedBuddies: [],
            searchText: '',
        };
    },
};
</script>

<style>

</style>
