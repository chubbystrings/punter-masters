<template>
<transition name="fade" mode="out-in" appear>

<div>
    <v-card
    style=""
    class=""
    color="transparent"
    flat
    outlined
  >
  <v-container fluid class="pt-0">
  <v-row no-gutters>
    <v-col cols="12" class="pa-0 ma-0 mb-2">
        <banner />
    </v-col>
    <v-col cols="12" class="pa-0"><v-divider></v-divider></v-col>
    <v-col cols="12" >
      <v-row >
        <v-col cols="12" md="6" sm="6">
          <code-sharers />
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <highest-sharers />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  </v-container>
  </v-card>
</div>
</transition>
</template>
<script>
import { mapState } from 'vuex';
// import { gsap } from 'gsap';

export default {
  data: () => ({
    tween: null,
  }),
  components: {
    Banner: () => import('./Banner.vue'),
    codeSharers: () => import('./codeSharers.vue'),
    highestSharers: () => import('./HighestSharers.vue'),
  },

  methods: {
    togglePost() {
      this.$store.commit('TOGGLE_POST_DIALOG');
    },

    beforeEnter() {
      console.log('enter');
    },

    enter(e) {
      console.log(e);
    },
  },

  mounted() {
    // this.tween = gsap.from(
    //   this.$refs.homeView,
    //   {
    //     opacity: 0,
    //     delay: 1.5,
    //     duration: 1,
    //   },
    // );
  },

  // beforeDestroy() {
  //   this.tween.kill();
  // },

  computed: {
    ...mapState(['posts']),
    currentRoute() {
      return this.$route.params.forum;
    },
  },

};
</script>
<style scoped>
/* div {
  transition: all .3s ease-out;
} */

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1.5s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
