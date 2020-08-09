<template>
     <v-app-bar
      app
      clipped-left
      color="primary"
      :flat="currentRoute"
    >
      <v-app-bar-nav-icon
      v-if="!currentRoute"
       class="hidden-lg-and-up text-color"
       @click="drawerToggle"></v-app-bar-nav-icon>
       <v-avatar>
         <v-img src="../../assets/logo2.png"></v-img>
       </v-avatar>
      <span class="text-color title ml-3 mr-5 font-weight-light hidden-sm-and-down"
      style="cursor: pointer;"
      @click="goHome"
      >Punter Masters
      </span>
      <v-text-field
      v-if="auth"
        class="hidden-sm-and-down"
        solo-inverted
        dense
        flat
        rounded
        hide-details
        label="Search"
        append-icon="mdi-magnify"
      ></v-text-field>

      <v-spacer></v-spacer>
      <span v-if="auth" class="pa-1 text-color">
        Sub: &#x20A6; {{ currentSub }}
        </span>
       <v-avatar
       v-if="auth"
       size="30"
       >
        <img
          :src="userProfile.photoURL"
          alt="Menu"
        >
      </v-avatar>
       <v-menu
          rounded
          bottom
          origin="center center"
          transition="scale-transition"
          v-if="auth"
        >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
        icon
          class="white--text"
          v-bind="attrs"
          v-on="on"
          small
        >
         <v-icon color="accent">mdi-arrow-down-drop-circle-outline</v-icon>
        </v-btn>
      </template>

      <v-list
      >
        <v-list-item
        v-for="(item, i) in links"
        :key="i"
          link
          @click="doAction(item.name)"
        >
        <v-icon>{{item.icon}}</v-icon>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      <v-app-bar-nav-icon
      class="text-color hidden-lg-and-up"
      v-if="auth"
       @click.stop="drawerRightToggle"></v-app-bar-nav-icon>
    </v-app-bar>
</template>
<script>
import { mapState } from 'vuex';

export default {

  data: () => ({
    dialog: false,
    links: [
      { name: 'Share Code', icon: 'mdi-share' },
      { name: 'Deposit', icon: 'mdi-cash-plus' },
      { name: 'Settings', icon: 'mdi-account-settings-outline' },
      { name: 'Logout', icon: 'mdi-logout' }],
  }),

  computed: {
    ...mapState(['drawer', 'userProfile']),

    auth() {
      console.log(this.userProfile);
      return Object.keys(this.userProfile).length > 1;
    },
    currentRoute() {
      return this.$route.name === 'Home';
    },

    currentSub() {
      const sub = Number((this.userProfile.sub / 100).toFixed(2));
      if (sub > 0) {
        if (sub - Math.floor(sub) === 0) {
          return `${sub}.00`;
        }
        return sub;
      }

      return '0.00';
    },
  },

  methods: {
    drawerToggle() {
      this.$store.commit('TOGGLE_DRAWER');
    },

    drawerRightToggle() {
      this.$store.commit('TOGGLE_RIGHT_DRAWER');
    },

    logout() {
      this.$store.dispatch('logout');
    },

    dialogToggle() {
      this.$store.commit('TOGGLE_SHARE_DIALOG');
    },

    goHome() {
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' });
      }
    },
    doAction(name) {
      if (name === 'Share Code') {
        this.dialogToggle();
      }

      if (name === 'Logout') {
        this.logout();
      }

      if (name === 'Settings') {
        if (this.$route.name === 'Settings') {
          return;
        }
        this.$router.push({ name: 'Settings' });
      }

      if (name === 'Deposit') {
        if (this.$route.name === 'Deposit') {
          return;
        }
        this.$router.push({ name: 'Deposit' });
      }
    },
  },
};
</script>
<style scoped>
.clickable {
  cursor: pointer;
}
</style>
