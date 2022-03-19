<template>
  <DashboardTemplate>
    <deposit />
  </DashboardTemplate>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  components: {
    DashboardTemplate,
    Deposit: () => import('@/components/DepositComponent.vue'),
  },
};
</script>
<style scoped>

</style>
