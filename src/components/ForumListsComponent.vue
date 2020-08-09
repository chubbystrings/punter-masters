<template>
<div class="divBorder">
  <base-back  v-if="posts" />
    <v-card
    style="width: 95vw"
    class="mx-auto"
    color="transparent"
    flat
    outlined
    :loading="loading"
  >
  <v-container fluid>
  <v-row>
    <v-col cols="12">
      <div class="text-center">
        <v-btn color="primary"
        text @click.stop="togglePost">Write post in {{currentRoute}} room
        <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <span v-if="posts" class="text-color">({{ posts.length }} posts)</span>
      </div>
      <post />
    </v-col>
      <v-row>
      <v-col cols="12">
        <forum-list />
      </v-col>
      </v-row>
  </v-row>
  </v-container>
  </v-card>
</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
  }),
  components: {
    forumList: () => import('./ForumListComponent.vue'),
    Post: () => import('./PostComponent.vue'),
  },

  methods: {
    togglePost() {
      this.$store.commit('TOGGLE_POST_DIALOG');
    },
  },

  computed: {
    ...mapState(['posts', 'overlay']),
    currentRoute() {
      return this.$route.params.forum;
    },

    loading() {
      return this.posts.length <= 0 && this.overlay.overlay ? 'primary' : '';
    },
  },

};
</script>
<style scoped>
div {
  transition: all .3s ease-out;
}
</style>
