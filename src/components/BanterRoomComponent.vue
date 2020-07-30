<template>
<div>
  <v-card
  v-if="ready"
    max-width="800"
    class="mx-auto"
    flat
    color="black"
  >
    <v-toolbar
      color="accent"
      dark
      flat
      v-if="chats.length > 0"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title >Banter Room</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
      v-model="bant"
      class="ml-1"
      placeholder="Type bants here"
      >
      </v-text-field>
      <v-btn
      @click="send"
       icon :disabled="!bant">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-toolbar>
     <v-timeline dense
    >
      <v-timeline-item
      class="pa-0 ma-0"
        v-for="(chat, i) in chats"
        :key="chat.id"
        :color="`#${Math.floor(Math.random() * 16777215).toString(16)}`"
      >

        <v-card class="mr-3"
        max-height=""
         flat
         :key="i"
         color="transparent"
         >
          <v-card-title class="pa-0 primary--text">
            @{{chat.displayName}}:
            </v-card-title>
          <v-card-text class="white--text">
            {{chat.bant}}
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-card>
  <div class="text-center" v-if="!ready">
    <h2 class="display-2 text-center" v-if="loadNow">STILL IN PROGRESS</h2>
    <img
    style="height: 7rem; width: 7rem"
      @load="onload"
       alt="punter masters logo"
        src="../assets/logo2.png"
      >
  </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { chatsCollection, auth } from '../firebase';

export default {

  data: () => ({
    dialog: false,
    chats: [],
    bant: '',
    ready: false,
    loadNow: false,
  }),

  computed: {
    ...mapState(['userProfile', 'banterRoom']),
  },

  methods: {
    async send() {
      const userId = auth.currentUser.uid;

      await chatsCollection.add({
        userId,
        bant: this.bant,
        createdOn: new Date(),
        displayName: this.userProfile.displayName ? this.userProfile.displayName : '',
        name: `${this.userProfile.firstname} ${this.userProfile.lastname}`,
      });
      this.bant = '';
    },
    closeBanterRoom() {
      this.$store.commit('TOGGLE_BANTER_ROOM');
    },
    onload() {
      this.loadNow = true;
    },
  },

  created() {
    this.$store.commit('OVERLAY_ON');
    try {
      chatsCollection.orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
        const chatsArray = [];

        snapshot.forEach((doc) => {
          const chat = doc.data();
          chat.id = doc.id;

          chatsArray.push(chat);
        });

        // eslint-disable-next-line no-use-before-define
        this.chats = chatsArray;

        setTimeout(() => {
          this.$store.commit('OVERLAY_OFF');
        }, 4000);
      });
    } catch (error) {
      this.$store.commit('OVELAY_OFF');
      this.$store.commit('SET_ALERT', {
        alert: true,
        type: 'error',
        message: error.message,
      });
    }
  },

};
</script>
<style scoped>
div {
  transition: all .3s ease-out;
}
</style>
