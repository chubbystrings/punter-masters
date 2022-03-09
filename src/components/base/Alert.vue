<template>
    <div class="text-center successBar"  v-if="alerts.alert">
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    >
    <v-snackbar
      v-model="snackbar"
      :color="alerts.type === 'success' ? 'green' : 'error'"
      :timeout="timeout"
      top
      right
    >
    <v-spacer></v-spacer>
      {{ alerts.message }}
      <v-icon>{{alerts.type === 'success' ? 'mdi-marker-check' : 'mdi-cancel'}}</v-icon>
    </v-snackbar>
      </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseAlert',
  data: () => ({
    multiLine: true,
    snackbar: true,
    timeout: -1,
  }),

  computed: {
    ...mapState(['alerts']),
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
