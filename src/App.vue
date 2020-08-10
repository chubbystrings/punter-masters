<template>
  <v-app id="keep" >
    <base-alert />
    <base-overlay />
    <nav-drawer />
    <right-drawer />
    <app-bar />
    <v-main
    class="pt-11"
    :class="homeRoute ? 'backGcolor': ''"
    >
      <v-container
        fluid
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col :class="homeRoute ? '' : 'shrink'"
          >
            <transition mode="out-in"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOutLeftBig">
              <router-view />
            </transition>
          </v-col>
        </v-row>
      </v-container>
      <share-dialog />
    </v-main>
    <notification />
  </v-app>
</template>

<script>
// import { notificationCollection } from './firebase';

export default {
  props: {
    source: String,
  },
  data: () => ({
  }),

  components: {
    AppBar: () => import('@/components/core/AppBar'),
    NavDrawer: () => import('@/components/core/NavDrawer'),
    rightDrawer: () => import('@/components/core/RightDrawer.vue'),
    shareDialog: () => import('@/components/core/ShareDialog.vue'),
    notification: () => import('@/components/core/Notification.vue'),
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true });
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

  updated() {
    if (window.innerWidth > 1200) {
      this.$store.commit('OPEN_DRAWERS');
    }

    if (window.innerWidth < 1200) {
      if (this.$store.state.drawer && this.$store.state.openRightDrawer) {
        this.$store.commit('CLOSE_DRAWERS');
      }
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
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
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
#keep .v-navigation-drawer__border {
  background-color: #a38d65;
  /* display: none; */
}
.theme--light.v-divider {
    border-color: #a38d65 !important;
}

.divBorder {
  border: 1px solid #a38d65;
}

.backGcolor {
  background-color: #AD1457;
}
.text-color{
  color: #a38d65 !important;
}
.pagination--view {
  position: absolute;
  bottom: 0.4rem;
  left: 0;
  right: 0;
}
</style>
