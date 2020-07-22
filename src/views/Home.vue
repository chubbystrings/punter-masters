<template>
  <div class="home text-center">
    <img @load="onload" alt="punter masters logo" src="../assets/logo2.png">
    <HelloWorld v-if="loadNow" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({
    loadNow: false,
  }),
  methods: {
    onload() {
      this.loadNow = true;
    },
  },

  components: {
    HelloWorld: () => import('@/components/HelloWorld.vue'),
  },
};
</script>
