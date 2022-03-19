<template>
  <DashboardTemplate>
    <code-room />
  </DashboardTemplate>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  name: 'Home',
  components: {
    DashboardTemplate,
    CodeRoom: () => import('@/components/CodeRoomComponent.vue'),
  },
};
</script>
<style scoped>

</style>
