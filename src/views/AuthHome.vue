<template>
  <div >
    <auth-home />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    AuthHome: () => import('@/components/home/HomeViewsComponent.vue'),
  },
};
</script>
<style scoped>

</style>
