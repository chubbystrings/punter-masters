<template>
<v-row justify="center">
    <v-dialog :value="resetDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Password Reset</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field
                @input="$v.resetEmail.$touch()"
                type="email"
                 v-model="resetEmail" label="Enter email to reset password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancel">Cancel</v-btn>
          <v-btn color="primary"
          :disabled="$v.$anyError || !resetEmail"
           text @click="ok">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-row>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

export default {
  mixins: [validationMixin],
  validations: {
    resetEmail: { required, email },
  },
  name: 'BaseReset',
  data: () => ({
    resetEmail: '',
  }),

  computed: {
    ...mapState(['resetDialog']),
    emailErrors() {
      const errors = [];
      if (!this.$v.resetEmail.$dirty) return errors;
      if (!this.$v.resetEmail.email) errors.push('Must be valid e-mail');
      if (!this.$v.resetEmail.required) errors.push('E-mail is required');
      return errors;
    },
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
