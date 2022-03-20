<template>
    <settings />
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Settings: () => import('@/components/SettingsComponent.vue'),
  },
};
</script>
