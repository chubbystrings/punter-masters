<template>
  <DashboardTemplate>
    <success />
  </DashboardTemplate>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  components: {
    DashboardTemplate,
    Success: () => import('@/components/ReceiptSuccessComponent.vue'),
  },
};
</script>
