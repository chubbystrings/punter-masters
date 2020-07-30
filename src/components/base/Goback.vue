<template>
    <div
    >
        <v-btn
        rounded
        large
        icon
        @click="goBack"
        >
        <v-icon
         color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn>
    </div>
</template>
<script>
export default {
  name: 'BaseBack',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
