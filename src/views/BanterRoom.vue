<template>

    <banter-room />

</template>

<script>
// @ is an alias to /src

export default {
  components: {
    BanterRoom: () => import('@/components/BanterRoomComponent.vue'),
  },
};
</script>
<style scoped>

</style>
