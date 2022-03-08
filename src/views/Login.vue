<template>
  <div class="">
    <login />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Login: () => import('@/components/NewLoginComponent.vue'),
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
