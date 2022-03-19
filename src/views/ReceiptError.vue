<template>
  <DashboardTemplate>
    <Error />
  </DashboardTemplate>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  components: {
    DashboardTemplate,
    Error: () => import('@/components/ReceiptErrorComponent.vue'),
  },
};
</script>
