<template>
<div >
    <v-card
    style="width: 80vw"
    class=""
    color="transparent"
    flat
    outlined
  >
  <v-container fluid class="pt-0">
  <v-row no-gutters>
    <v-col cols="12" class="pa-0 ma-0 mb-2">
        <banner />
    </v-col>
    <v-col cols="12" class="pa-0"><v-divider></v-divider></v-col>
    <v-col cols="12" >
      <v-row >
        <v-col cols="12" md="6" sm="6">
          <code-sharers />
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <highest-sharers />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  </v-container>
  </v-card>
</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  components: {
    Banner: () => import('./Banner.vue'),
    codeSharers: () => import('./codeSharers.vue'),
    highestSharers: () => import('./HighestSharers.vue'),
  },

  methods: {
    togglePost() {
      this.$store.commit('TOGGLE_POST_DIALOG');
    },
  },

  computed: {
    ...mapState(['posts']),
    currentRoute() {
      return this.$route.params.forum;
    },
  },

};
</script>
<style scoped>
div {
  transition: all .3s ease-out;
}
</style>
