<template>
  <div >
    <rollover />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Rollover: () => import('@/components/RolloverGameComponent.vue'),
  },
};
</script>
