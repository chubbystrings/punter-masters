<template>
  <div >
    <banter-room />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    BanterRoom: () => import('@/components/BanterRoomComponent.vue'),
  },
};
</script>
<style scoped>

</style>
