<template>
  <dashboard-template>
    <auth-home />
  </dashboard-template>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  name: 'Home',
  components: {
    DashboardTemplate,
    AuthHome: () => import('@/components/home/HomeViewsComponent.vue'),
  },
};
</script>
<style scoped>

</style>
