<template>
  <DashboardTemplate>
    <settings />
  </DashboardTemplate>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  name: 'Home',
  components: {
    DashboardTemplate,
    Settings: () => import('@/components/SettingsComponent.vue'),
  },
};
</script>
