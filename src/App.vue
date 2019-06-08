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
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(['user']),
  },
  async created() {
      try {
        // console.log('trying to get user', this.user)
        await this.getVerifiedUserByToken();
      } catch (err) {
          this.$router.push('/auth')
      }
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

