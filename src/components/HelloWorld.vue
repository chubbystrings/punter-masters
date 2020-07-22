<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1
         class="display-3 text-color">
         Welcome To Punter Masters
         </h1>
         <small class="text-color"><i>A place for Master Bettors</i></small>
      </v-col>
      <v-col cols="12" v-if="auth">
      <v-btn
      @click="forum"
      width="200"
      height="70"
      class="text-color mr-3 mt-2"
      elevation="10"
      tile
      >Go To Forums</v-btn>
      <v-btn
      @click="logout"
      width="200"
      height="70"
      elevation="10"
      tile
      class="text-color mr-3 mt-2"
      >Logout</v-btn>
      </v-col>
      <v-col cols="12" v-else>
      <v-btn
      to="/login"
      width="200"
      height="70"
      class="mr-3 mt-2 text-color"
      elevation="10"
      tile
      >Login</v-btn>
      <v-btn
      to="/signup"
      width="200"
      height="70"
      elevation="10"
      tile
      class="text-color mr-3 mt-2"
      >Sign Up</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import router from '../router/index';

export default {
  name: 'HelloWorld',
  computed: {
    ...mapState(['userProfile']),

    auth() {
      return Object.keys(this.userProfile).length > 1;
    },
  },

  data: () => ({
  }),

  methods: {
    forum() {
      router.push({ name: 'Forum', params: { forum: 'bet9ja', id: 'EyxGucjNSy3AGXd9cWUz' } });
    },

    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
