<template>
    <landing-page></landing-page>
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
    LandingPage: () => import('@/components/LandingPage.vue'),
  },
};
</script>
<style scoped>

</style>
