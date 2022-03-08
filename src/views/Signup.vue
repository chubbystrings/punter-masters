<template>
  <div class="">
    <signup />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Signup: () => import('@/components/NewSignupComponent.vue'),
  },

  data: () => ({
    loadNow: false,
  }),

  methods: {
    onload() {
      this.loadNow = true;
    },
  },
};
</script>
