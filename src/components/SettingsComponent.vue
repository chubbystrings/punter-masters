<template>
  <div class="divBorder">
    <base-back  v-if="userProfile" />
    <base-reset />
      <v-card
    style="width: 95vw;"
    class="mx-auto"
    color="transparent"
    outlined
    flat
    >
        <v-card-title class="primary--text text-center">User Settings</v-card-title>
      <v-container fluid>
          <v-row>
              <v-col cols="12">
                  <v-row>
                    <v-col cols='12' class="">
                      <v-card
                        style="width: 95vw;"
                        class=""
                        color="transparent"
                        flat
                        >
                        <small>
                          current Username : <span class= "primary--text">{{ userProfile.displayName
                           ? '@' + userProfile.displayName : 'None' }}
                           </span>
                        </small><br>
                        <small v-if="displayName" style="color: red">
                         User exists
                        </small>
                        <v-text-field
                        @input="checkUsername"
                        v-model="username"
                            dense
                            filled
                            label="username"
                            prepend-icon="@"
                        ></v-text-field>
                        <v-btn
                         small
                         color="primary"
                          :disabled="!username || displayName"
                          @click.prevent="changeUsername"
                          >
                          {{ userProfile.displayName ? 'Change' : 'Add' }}
                        </v-btn>
                      </v-card>
                    </v-col>
                     <v-col cols='12'>
                       <v-card-subtitle class="primary--text">Change Password</v-card-subtitle>
                      <v-card>
                        <v-btn
                        @click="resetOpen"
                        color="primary"
                        block
                        small
                        >Reset Password
                        </v-btn>
                    </v-card>
                    </v-col>
                  </v-row>
              </v-col>
          </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { usersCollection } from '../firebase';

export default {

  data: () => ({
    username: '',
    displayName: false,
  }),
  computed: {
    ...mapState(['userProfile']),
  },

  methods: {
    resetOpen() {
      this.$store.commit('OPEN_RESET_PASS');
    },

    changeUsername() {
      this.$store.dispatch('changeUsername', this.username);
      this.username = '';
    },

    async checkUsername() {
      const doc = await usersCollection.where('displayName', '==', this.username).get();
      console.log(doc.size);
      if (doc.size > 0) {
        this.displayName = true;
      } else {
        this.displayName = false;
      }
    },
  },
};
</script>
