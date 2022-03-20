<template>
  <div class="profile">
    <template>
      <v-card class="mx-auto" flat color="transparent">
        <v-card dark flat class=" profile--card">
          <v-avatar
            class="profile--avatar"
            size="62"
          >
          <v-img :src="userDetails.photoURL"></v-img>
          </v-avatar>
          <h2 class="username accent--text">
            {{ userDetails.displayName || userDetails.firstname}}</h2>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
            gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
            height="200"
          >
            <v-container class="fill-height">
              <v-row align="center">
                <base-back v-if="userDetails.firstname" />
              </v-row>
            </v-container>
          </v-img>
        </v-card>
        <v-card-text class="">
          <v-timeline dense>
            <v-timeline-item color="pink" small fill-dot class="mt-5">
              <v-row class="">
                <v-col cols="6">
                  <strong>NAME</strong>
                </v-col>
                <v-col cols="6">
                  <strong class="text-capitalize">
                    {{ userDetails.firstname }} {{ userDetails.lastname }}</strong
                  >
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item color="teal lighten-3" small fill-dot class="">
              <v-row class="">
                <v-col cols="6">
                  <strong>USERNAME:</strong>
                </v-col>
                <v-col cols="6">
                  <strong>
                    {{ userDetails.displayName ? "@" + userDetails.displayName : "None" }}</strong
                  >
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item color="pink" small fill-dot class="">
              <v-row class="">
                <v-col cols="6">
                  <strong>AVERAGE RATINGS:</strong>
                </v-col>
                <v-col cols="6">
                  <strong>
                    {{ userDetails.averageRatings ? userDetails.averageRatings : 0 }}</strong
                  >
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item color="teal lighten-3" small fill-dot class="">
              <v-row class="">
                <v-col cols="6">
                  <strong>CODE SHARED</strong>
                </v-col>
                <v-col cols="6">
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

  methods: {},

  async created() {
    console.log(this.userDetails);
    this.$store.commit('OVERLAY_ON', '');
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

 .profile--card {
   position: relative;
 }

 .profile--avatar {
   position: absolute;
    bottom: 5px;
    left: 2rem;
    z-index: 1;
 }

 .username {
   position: absolute;
   font-size: 20px;
   font-weight: 600;
    left: 50%;
    margin: auto;
    color: #fff;
    top: 25px;
    font-size: 50px;
    z-index: 2;
    text-align: center;
    transform: translateX(-50%)

 }

  @media screen and (max-width: 575px) {
     .username {
     font-size: 35px;
   }
  }

 @media screen and (max-width: 375px) {
   .profile * {
     font-size: 9px;
   }

   .username {
     font-size: 25px;
   }
 }
</style>
