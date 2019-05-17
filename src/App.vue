<template>
  <v-app dark>
    <Navbar />
    <v-layout wrap>
      <v-container grid-list-lg>
        <v-content>
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>

