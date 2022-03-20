<template>
    <forums />
</template>

<script>

export default {
  components: {
    Forums: () => import('@/components/ForumListsComponent.vue'),
  },
};
</script>
