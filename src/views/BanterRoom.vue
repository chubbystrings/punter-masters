<template>
  <DashboardTemplate>
    <banter-room />
  </DashboardTemplate>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  components: {
    DashboardTemplate,
    BanterRoom: () => import('@/components/BanterRoomComponent.vue'),
  },
};
</script>
<style scoped>

</style>
