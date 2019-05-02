<template>
    <v-list-tile avatar dark>
        <v-list-tile-avatar>
            <v-img
                :src="`${buddy.imgSrc}`">
            </v-img>
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title>{{ buddy.name }}</v-list-tile-title>
            <v-list-tile-action>
                <v-btn small fab outline dark color="teal darken-2"
                    @click="toggleBuddy()">
                    <v-icon>{{ ["group_add", "group_remove"][!!buddyExists] }}</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
export default {
    name: 'BuddyItem',
    props: ['buddy',],
    components: {},
    methods: {
        toggleBuddy() {
            console.log('toggling buddy:', this.buddy);
            this.$emit('toggleBuddy', this.buddy);
            this.buddyExists = !!this.buddyExists;
        },
    },
    data() {
        return {
            buddyExists: false,
        };
    },
};
</script>
