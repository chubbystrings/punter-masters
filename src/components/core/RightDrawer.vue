<template>
    <v-navigation-drawer
      app
      right
      clipped
      :value="openRightDrawer"
      @input="trans"
      color="background"
      v-if="!currentRoute && auth"
    >
      <v-list dense>
         <v-list-item-content>
              <v-list-item-title class="ml-4 primary--text text--bold">
                <v-icon color="primary">mdi-home</v-icon>
                BET ROOMS
              </v-list-item-title>
            </v-list-item-content>
        <v-divider></v-divider>
        <v-list-item
         v-for="(forum, i) in forums"
         :key="i"
         @click.stop="routesPush(forum.name, forum.id)"
         :class="forum.name === forumName ? 'activeBtnClass' : ''"
         >
          <v-list-item-action>
            <v-icon color="primary">mdi-fire</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">{{forum.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    rightDrawer: false,
  }),
  computed: {
    ...mapState(['userProfile', 'openRightDrawer', 'forums']),
    auth() {
      return Object.keys(this.userProfile).length > 1;
    },

    forumName() {
      return this.$route.params.forum;
    },

    currentRoute() {
      return this.$route.name === 'Home';
    },
  },

  mounted() {
    this.rightDrawer = this.openRightDrawer;
  },

  methods: {
    routesPush(route, id) {
      if (this.forumName !== route || this.$route.name !== 'Forum') {
        this.$router.push({ name: 'Forum', params: { forum: route, id } });
      }
    },
    trans(e) {
      this.$store.commit('TOGGLE_RIGHT_DRAWER', e);
    },
  },
};
</script>
<style scoped>
.activeBtnClass {
  transition: all .1s linear;
  background: #e6e3e3;
  color: #260D40 !important;
}
</style>
