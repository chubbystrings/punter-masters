<template>
  <DashboardTemplate>
    <rollover />
  </DashboardTemplate>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  components: {
    DashboardTemplate,
    Rollover: () => import('@/components/RolloverGameComponent.vue'),
  },
};
</script>
