<template>
    <success />
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Success: () => import('@/components/ReceiptSuccessComponent.vue'),
  },
};
</script>
