<template>
  <div class="text-center">
    <img
    style="height: 7rem; width: 7rem"
      @load="onload"
       alt="punter masters logo"
        src="../assets/logo2.png"
      >
      <h3 class="display-2 text-color">Sign Up</h3>
    <login />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Login: () => import('@/components/LoginComponent.vue'),
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
