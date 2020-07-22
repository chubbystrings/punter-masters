<template>
  <div >
    <post />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Post: () => import('@/components/ViewPostComponent.vue'),
  },
};
</script>
<style scoped>
div {
  transition: all .3s ease-out;
}
</style>
