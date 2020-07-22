<template>
  <div class="text-center">
    <v-pagination
      :v-value="pageChange"
      :length="length"
      circle
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  data: () => ({
    currentPage: 1,
  }),
  props: ['page', 'length'],

  computed: {
    pageChange() {
      return this.page;
    },
  },

};
</script>
