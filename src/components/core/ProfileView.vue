<template>
  <div class="">
     <template>
       <v-avatar
        style="
        position: absolute;
        top: 12rem;
        left: 1.5rem;
        z-index: 1;
        "
        size="62"
        >
          <v-img :src="userDetails.photoURL"></v-img>
      </v-avatar>
      <v-card
        class="mx-auto"
      style="width: 95vw;"
      flat
      >
      <v-card
        dark
        flat
        class=""
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
          gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
          height="200"
        >
          <v-container class="fill-height">
            <v-row align="center">
            <base-back  v-if="userDetails.firstname" />
            </v-row>
          </v-container>
        </v-img>
      </v-card>
        <v-card-text class="py-0">
          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              color="pink"
              small
              fill-dot
              class="pa-0 mt-5"
            >
              <v-row class="">
                <v-col cols="6">
                  <strong>NAME</strong>
                </v-col>
                <v-col>
                  <strong
                  class="text-capitalize">
                  {{ userDetails.firstname}} {{ userDetails.lastname}}</strong>
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item
              color="teal lighten-3"
              small
              fill-dot
              class="pa-0"
            >
              <v-row class="">
                <v-col cols="6">
                  <strong>USERNAME:</strong>
                </v-col>
                <v-col>
                  <strong>
                    {{ userDetails.displayName ? '@' + userDetails.displayName : 'None' }}</strong>
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item
              color="pink"
              small
              fill-dot
              class="pa-0"
            >
              <v-row class="">
                <v-col cols="6">
                  <strong>AVERAGE RATINGS:</strong>
                </v-col>
                <v-col>
                  <strong>
                     {{ userDetails.averageRatings ? userDetails.averageRatings : 0 }}</strong>
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item
              color="teal lighten-3"
              small
              fill-dot
              class="pa-0"
            >
              <v-row class="">
                <v-col cols="6">
                  <strong>CODE SHARED</strong>
                </v-col>
                <v-col>
                  <strong> {{ userDetails.codeShared }} times</strong>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { usersCollection } from '../../firebase';

export default {

  data: () => ({
    username: '',
    displayName: false,
  }),
  computed: {
    ...mapState(['userProfile', 'userDetails', 'profileComponentKey']),
  },

  methods: {

  },

  async created() {
    this.$store.commit('OVERLAY_ON');
    try {
      const user = await usersCollection.doc(this.$route.params.id).get();
      if (user.exists) {
        this.$store.dispatch('getUser', this.$route.params.id);
      } else {
        this.$store.commit('OVERLAY_OFF');
        this.$router.go(-1);
        this.$store.commit('SET_ALERT', {
          alert: true,
          type: 'error',
          message: 'User does not exists',
        });
      }
    } catch (error) {
      console.log(error);
      this.$store.commit('OVERLAY_OFF');
      this.$router.go(-1);
      this.$store.commit('SET_ALERT', {
        alert: true,
        type: 'error',
        message: 'An error occured',
      });
    }
  },
};
</script>
<style scoped>
.abs {
  position: absolute;
  right: 5rem;
  top: 10rem;
}
</style>
