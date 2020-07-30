<template>
  <div >
    <profile />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Profile: () => import('@/components/core/ProfileView.vue'),
  },
};
</script>
