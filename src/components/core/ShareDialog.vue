<template>
<v-container fluid>
     <v-row justify="center" >
    <v-dialog :value="shareDialog" persistent max-width="600px">
        <v-card>
        <v-card-title>
          <span class="headline">Share Your bet Code</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                 v-model="betCode" label="Type betcode" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                 v-model="betForum" :items="names"  required></v-select>
              </v-col>
            </v-row>
          </v-container>
         </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="toggleDialog">Cancel</v-btn>
          <v-btn color="primary"
          :disabled="!betCode || !betForum"
           text @click="shareBetCode"
           >
           Ok
           </v-btn>
        </v-card-actions>
      </v-card>

      </v-dialog>
      </v-row>
</v-container>
</template>
<script>
import { mapState } from 'vuex';
import { forumsCollection } from '../../firebase';

export default {
  data: () => ({
    betForum: '',
    betCode: '',
    forums: [],
    names: [],
  }),

  computed: {
    ...mapState(['shareDialog', 'userProfile']),

    auth() {
      return Object.keys(this.userProfile).length > 1;
    },
  },

  methods: {
    toggleDialog() {
      this.$store.commit('TOGGLE_SHARE_DIALOG');
    },

    shareBetCode() {
      const codeDetails = this.forums.filter((f) => f.name === this.betForum);
      const code = this.betCode;
      this.$store.dispatch('shareBetCode', {
        ...codeDetails[0],
        code,
      });
      this.betCode = '';
      this.betForum = '';
      this.toggleDialog();
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
          this.names.push(doc.data().name);
        });
      }
    },
  },

  async created() {
    if (this.auth && this.forums.length === 0) {
      const querySnapshot = await forumsCollection.get();
      querySnapshot.forEach((doc) => {
        this.forums.push({
          id: doc.id,
          name: doc.data().name,
          title: doc.data().title,
        });
        this.names.push(doc.data().name);
      });
    }
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
