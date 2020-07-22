<template>
     <v-app-bar
      app
      clipped-left
      color="primary"
      :flat="currentRoute"
    >
      <v-app-bar-nav-icon
      v-if="!currentRoute"
       class="hidden-lg-and-up"
       @click="drawerToggle"></v-app-bar-nav-icon>
       <v-avatar>
         <v-img src="../../assets/logo2.png"></v-img>
       </v-avatar>
      <span class="text-color title ml-3 mr-5 font-weight-light">Punter Masters</span>
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
      <v-btn
      v-if="!auth"
      to="/login"
      class="text-color hidden-sm-and-down"
      text
      >
        Login
      </v-btn>
       <v-btn
       v-else
      @click="logout"
      class="text-color hidden-sm-and-down"
      text
      >
        Logout
      </v-btn>
      <v-btn
       v-if="auth"
      @click="dialogToggle"
      class="text-color hidden-sm-and-down"
      text
      >
        share Betcode
      </v-btn>
      <v-btn
      v-if="!auth"
      class="text-color hidden-sm-and-down"
      to="/signup"
      text
      >
        Signup
      </v-btn>
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
  },
};
</script>
