<template>
  <div class="">
    <base-back  v-if="userDetails.firstname" />
      <v-card
        style="width: 80vw;"
        class="mx-auto"
        color="transparent"
        outlined
        flat
        v-if="userDetails.firstname"
        :key="profileComponentKey"
    >
    <v-card-title class="primary--text text-center">User Profile</v-card-title>
      <v-container fluid>
          <v-row class="">
              <v-col cols="4" class="">
                  <v-img
                   aspect-ratio="1.7" src="https://picsum.photos/510/300?random" >
                   </v-img>
              </v-col>
              <v-col cols="8" class="">
                <span class="font-weight-bold">
                  <span class="text-color" > name: </span>
                   {{ userDetails.firstname}} {{ userDetails.lastname}}
                </span><br>
                <span class="font-weight-bold">
                  <span class="text-color"> username: </span>
                  {{ userDetails.displayName ? '@'+ userDetails.displayName : 'None'}}
                </span><br>
                 <span class="font-weight-bold">
                  <span class="text-color"> codeshared: </span> {{ userDetails.codeShared}}
                </span><br>
                <span class="font-weight-bold">
                  <span class="text-color"> ratings: </span> 3.5
                </span>
              </v-col>
          </v-row>
      </v-container>
    </v-card>
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

</style>
