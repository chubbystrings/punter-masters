<template>
  <div>
    <Preloader @done="preloader = false" />
    <Main :preloader="preloader" />
  </div>
</template>

<script>
import Preloader from './LandingPage/PreLoader.vue';
import Main from './LandingPage/Main.vue';
// @ is an alias to /src

export default {
  name: 'Landing',
  data: () => ({
    loadNow: false,
    preloader: true,
  }),
  methods: {
    onload() {
      this.loadNow = true;
    },
  },

  components: {
    Preloader,
    Main,
  },
};
</script>
<style scoped>
/* .preloader {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background: purple;
  position: absolute;
  left: 0;
  right: 0;
} */
</style>
