<template>
<v-row justify="center">
    <v-dialog :value="resetDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Password Reset</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                 v-model="resetEmail" label="Enter email to reset password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancel">Cancel</v-btn>
          <v-btn color="primary" text @click="ok">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-row>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseReset',
  data: () => ({
    resetEmail: '',
  }),

  computed: {
    ...mapState(['resetDialog']),
  },

  methods: {
    ok() {
      this.$store.dispatch('resetPassword', this.resetEmail);
    },

    cancel() {
      this.$store.commit('CLOSE_RESET_PASS');
    },
  },

};
</script>
