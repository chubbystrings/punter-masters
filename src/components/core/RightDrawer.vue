<template>
    <v-navigation-drawer
      app
      clipped
      right
      :value="openRightDrawer"
      color=""
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
    rightDrawer: true,
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

  methods: {
    routesPush(route, id) {
      if (this.forumName !== route || this.$route.name !== 'Forum') {
        this.$router.push({ name: 'Forum', params: { forum: route, id } });
      }
    },
  },

  // watch: {
  //   // eslint-disable-next-line quote-props
  //   '$route': 'fetchData',
  // },
};
</script>
<style scoped>
.activeBtnClass {
  background-color: #E8F5E9;
}
</style>
