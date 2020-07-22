<template>
  <div class="text-center" style="z-index: 1500">

    <v-overlay :value="overlay"
     v-bind="$attrs"
    v-on="$listeners"
    >
      <v-progress-circular
       color="primary" indeterminate size="100">Please wait</v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  name: 'BaseOverlay',
  data: () => ({
  }),

  computed: {
    ...mapState(['overlay']),
  },
};
</script>
