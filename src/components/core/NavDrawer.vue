<template>
     <v-navigation-drawer
      :value="drawer"
      app
      clipped
      color="secondary"
      v-if="!currentRoute"
    >
      <v-list dense>
          <v-list-item two-line>
            <v-list-item-avatar v-if="auth">
              <img  :src="userProfile.photoURL">
            </v-list-item-avatar>

            <v-list-item-content v-if="auth">
              <v-list-item-title class="text-color">
                <v-btn
                class="pa-0 text-lowercase"
                color="accent"
               @click="doAction('route', 'Profile')" text
                >
                {{userProfile.displayName ? '@' + userProfile.displayName : userProfile.lastname}}
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content v-else>
              <div>
               <v-btn
                class="text-color" small color="primary"
                  @click="doAction('route', 'Signup')" block>
                  Sign Up
                  </v-btn>
               </div>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
        @click="doAction('route', 'Home')"
        >
          <v-list-item-action>
            <v-icon color="primary">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color" >
                 HOME
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="auth"
        @click="toggleDialog"
        >
          <v-list-item-action>
            <v-icon color="primary">mdi-share</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 SHARE BETCODE
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="auth"
        @click="doAction('route', 'CodeRoom')"
        >
          <v-list-item-action>
            <v-icon color="primary">mdi-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 CODE ROOM
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="auth"
        @click="doAction('route', 'Banter')"
        >
          <v-list-item-action>
            <v-icon color="primary">mdi-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 BANTER ROOM
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item link v-if="auth"
        @click="doAction('route', 'Rollover')"
        >
          <v-list-item-action>
            <v-icon color="primary">mdi-gamepad</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 ROLLOVER GAME
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
        @click="doAction('route', 'Settings')"
         link v-if="auth"
        >
          <v-list-item-action>
            <v-icon color="primary">mdi-account-settings-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 SETTINGS
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div v-if="auth" class="pa-2">
          <v-btn small class="text-color" color="primary"
            @click="doAction('dispatch', 'logout')" block>
            Logout
            </v-btn>
        </div>
        <div v-else class="pa-2">
          <v-btn small class="text-color" color="primary"
            @click="doAction('route', 'Login')" block
            >Log In
            </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
  }),

  computed: {
    ...mapState(['drawer', 'userProfile']),
    auth() {
      return Object.keys(this.userProfile).length > 1;
    },

    currentRoute() {
      return this.$route.name === 'Home';
    },
  },

  methods: {

    doAction(action, word) {
      if (action === 'route') {
        if (word === 'Profile') {
          if (this.$route.name === 'Profile') {
            this.$store.commit('CLICKED_USER_DETAILS', this.userProfile);
          } else {
            this.$router.push({ name: word, params: { id: this.userProfile.userId } });
          }
        } else if (word === 'Home' && this.auth) {
          this.$router.push({ name: 'AuthHome' });
        } else {
          this.$router.push({ name: word });
        }
      }

      if (action === 'dispatch') {
        this.$store.dispatch(word);
      }

      if (action === 'commit') {
        this.$store.commit(word);
      }
    },

    toggleDialog() {
      this.$store.commit('TOGGLE_SHARE_DIALOG');
    },
  },
};
</script>
<style scoped>
#keep .v-navigation-drawer__border {
  display: none
}
</style>
