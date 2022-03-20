<template>
    <code-room />
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    CodeRoom: () => import('@/components/CodeRoomComponent.vue'),
  },
};
</script>
<style scoped>

</style>
