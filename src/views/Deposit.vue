<template>
  <div >
    <deposit />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Deposit: () => import('@/components/DepositComponent.vue'),
  },
};
</script>
<style scoped>

</style>
