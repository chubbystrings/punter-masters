<template>
  <div class="text-center">
    <img
    style="height: 7rem; width: 7rem"
      @load="onload"
       alt="punter masters logo"
        src="../assets/logo2.png"
      >
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
