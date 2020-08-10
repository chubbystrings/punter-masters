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
import { forumsCollection } from '../../firebase';

export default {
  data: () => ({
    forums: [],
    rightDrawer: true,
  }),
  computed: {
    ...mapState(['userProfile', 'openRightDrawer']),
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
    async fetchData() {
      if (this.auth) {
        const querySnapshot = await forumsCollection.get();
        querySnapshot.forEach((doc) => {
          this.forums.push({
            id: doc.id,
            name: doc.data().name,
            title: doc.data().title,
          });
        });
      }
    },
  },

  async created() {
    this.fetchData();
  },

  updated() {
    if (this.forums.length === 0) {
      this.fetchData();
    }
  },

  watch: {
    // eslint-disable-next-line quote-props
    '$route': 'fetchData',
  },
};
</script>
<style scoped>
.activeBtnClass {
  background-color: #E8F5E9;
}
</style>
