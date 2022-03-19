<template>
  <DashboardTemplate>
    <post />
  </DashboardTemplate>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  name: 'Home',
  components: {
    DashboardTemplate,
    Post: () => import('@/components/ViewPostComponent.vue'),
  },
};
</script>
<style scoped>
div {
  transition: all .3s ease-out;
}
</style>
