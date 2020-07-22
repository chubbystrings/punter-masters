<template>
  <div>
    <forums />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Forums: () => import('@/components/ForumListsComponent.vue'),
  },
};
</script>
