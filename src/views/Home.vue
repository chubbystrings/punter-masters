<template>
  <div class="home text-center">
    <transition mode="out-in"
    enter-active-class="animated headShake"
    leave-active-class="animated fadeOut"
    >
    <img @load="onload" alt="punter masters logo" src="../assets/logo2.png">
    </transition>
    <transition mode="out-in"
     enter-active-class="animated headShake"
    leave-active-class="animated fadeOut"
    >
    <HelloWorld v-if="loadNow" />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({
    loadNow: false,
  }),
  methods: {
    onload() {
      this.loadNow = true;
    },
  },

  components: {
    HelloWorld: () => import('@/components/HelloWorld.vue'),
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
