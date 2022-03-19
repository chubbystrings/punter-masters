<template>
  <DashboardTemplate>
    <forums />
  </DashboardTemplate>
</template>

<script>
// @ is an alias to /src
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  components: {
    DashboardTemplate,
    Forums: () => import('@/components/ForumListsComponent.vue'),
  },
};
</script>
