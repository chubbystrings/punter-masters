<template>
  <div >
    <Error />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Error: () => import('@/components/ReceiptErrorComponent.vue'),
  },
};
</script>
