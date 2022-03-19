<template>
  <transition enter-active-class="animated fadeInRightBig" leave-active-class="animated fadeOut">
    <div v-if="auth" style="z-index: 5000; position: fixed; bottom: 5rem; right: 0.5rem; ">
      <v-alert
        :value="notifications.notification"
        color="primary"
        border="left"
        elevation="10"
        colored-border
        icon="mdi-alert"
        style="z-index: 5000"
        width="330"
        class="ma-0 pa-2"
      >
        New Code Alert!!!.
        {{ notifications.userId === userProfile.userId ? "You" : notifications.name }} posted a
        {{ notifications.forum }} code
        <v-btn @click="toCode" text class="font-weight-bold">
          {{ notifications.code }}
        </v-btn>
        <v-icon style="position: absolute; right: 0.1rem" color="primary" @click="closeNotification"
          >mdi-delete</v-icon
        >
      </v-alert>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      alert: true,
    };
  },
  computed: {
    ...mapState(['notifications', 'userProfile']),
    auth() {
      return Object.keys(this.userProfile).length > 1;
    },
  },

  methods: {
    closeNotification() {
      this.$store.commit('REMOVE_NOTIFICATION');
    },

    toCode() {
      if (this.$route.name !== 'CodeRoom') {
        this.$router.push({ name: 'CodeRoom' });
      }
      this.$store.commit('REMOVE_NOTIFICATION');
    },
  },
};
</script>
