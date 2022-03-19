<template>
  <DashboardTemplate>
    <profile />
  </DashboardTemplate>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  name: 'Home',
  components: {
    DashboardTemplate,
    Profile: () => import('@/components/core/ProfileView.vue'),
  },
};
</script>
