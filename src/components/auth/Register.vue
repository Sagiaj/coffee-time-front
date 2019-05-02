<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-btn outline color="teal darken-3" large style="border-radius: 1% 50% 7% 50%;">
                <v-icon class="mr-2">group_add</v-icon>
                Register
            </v-btn>
        </v-flex>
        <RegisterDialog />
    </v-layout>
</template>

<script>
export default {
    name: 'Register',
    components: {},
};
</script>
