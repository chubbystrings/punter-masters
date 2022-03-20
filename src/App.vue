<template>
  <v-app class="app-background">
    <base-alert />
    <base-overlay />
    <v-main>
      <v-container fluid>
        <div class="main--container">
          <transition mode="out-in" name="route" appear>
            <router-view />
          </transition>
          <share-dialog />
          <notification />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import { notificationCollection } from './firebase';

export default {
  props: {
    source: String,
  },
  data: () => ({}),

  components: {
    shareDialog: () => import('@/components/core/ShareDialog.vue'),
    notification: () => import('@/components/core/Notification.vue'),
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true });
      window.removeEventListener('transitionend', { passive: true });
    }
  },

  async created() {
    if (window.innerWidth > 1200) {
      this.$store.commit('OPEN_DRAWERS');
    }

    if (window.innerWidth < 1200) {
      if (this.$store.state.drawer && this.$store.state.openRightDrawer) {
        this.$store.commit('CLOSE_DRAWERS');
      }
    }
  },

  // updated() {
  //   if (window.innerWidth > 1200) {
  //     this.$store.commit('OPEN_DRAWERS');
  //   }

  //   if (window.innerWidth < 1200) {
  //     if (this.$store.state.drawer && this.$store.state.openRightDrawer) {
  //       this.$store.commit('CLOSE_DRAWERS');
  //     }
  //   }
  // },

  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
    // window.addEventListener('transitionend', this.removeNavDrawer);
  },

  methods: {
    onResize() {
      if (window.innerWidth > 1200) {
        this.$store.commit('OPEN_DRAWERS');
      }
    },
  },

  computed: {
    currentRoute() {
      return this.$route.name === 'Banter';
    },

    homeRoute() {
      return this.$route.name === 'Home';
    },

    noAuthBackground() {
      return this.$route.name === 'Login' || this.$route.name === 'Signup'
        ? 'main--container no-auth-color'
        : 'main--container';
    },
  },
};
</script>

<style>
/* @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"; */
/* #keep .v-navigation-drawer__border {
  background-color: #a38d65;
}
.theme--light.v-divider {
  border-color: #a38d65 !important;
} */

/* .divBorder {
  border: 1px solid #a38d65;
} */
.no-auth-color {
  /* background-image: url("./assets/images/layered-waves.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-origin: border-box; */
  background-color: #ede9f2;
}
.backGcolor {
  background-color: #ad1457;
}
.text-color {
  color: #a38d65 !important;
}
.pagination--view {
  position: absolute;
  bottom: 0.4rem;
  left: 0;
  right: 0;
}

button {
  outline: none !important;
}

.main--container {
  margin: 0;
  padding: 0;
  background-color: #ede9f2;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 1.5s ease;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}

.app-background {
  background: #ede9f2 !important;
}
.container {
  padding: 0 !important;
}

@media screen and (max-width: 395px) {
  .v-application--wrap {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100% !important;
  }
}
</style>
