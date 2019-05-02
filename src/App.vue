<template>
  <v-app dark>
    <Navbar />
    <v-layout wrap>
      <v-container grid-list-lg>
        <v-content>
          <router-view />
        </v-content>
      </v-container>
    </v-layout>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {
    };
  },
};
</script>
