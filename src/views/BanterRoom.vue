<template>
  <div >
    <banter-room />
  </div>
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
