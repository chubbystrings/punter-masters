<template>
 <v-container>
    <v-row
    v-if="!showPasswordReset"
    class="text-center"
    >
    <v-col cols="12">
      <h3 class="display-2 text-color">Log In</h3>
    </v-col>
      <v-col
        cols="12"
      >
        <v-card class=""
          flat
          style="width: 25rem;">
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    name="email"
                    type="email"
                    required
                    @blur="$v.email.$touch()"
                  />

                  <v-text-field
                  v-model="password"
                  :error-messages="passwordErrors"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    @blur="$v.email.$touch()"
                    :disabled="!$v.email.email || !email"
                  />
                  <v-btn
                  text
                  color="primary"
                  @click.prevent="openReset"
                  >Reset Password</v-btn>
                  <v-spacer/>
                  <v-btn
                  :disabled="$v.$anyError || !email || !password"
                  class="btnSubmit text-color"
                  type="submit"
                  color="primary">Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      <base-reset />
    </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

export default {
  mixins: [validationMixin],
  validations: {
    password: { required, minLength: minLength(8) },
    email: { required, email },
  },

  data: () => ({
    password: '',
    email: '',
    showPasswordReset: false,
    dialog: true,
    errorMsg: '',
    showSuccess: false,
    resetEmail: '',
  }),

  computed: {
    ...mapState(['userProfile']),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.email) errors.push('Must be valid e-mail');
      if (!this.$v.email.required) errors.push('E-mail is required');
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required) errors.push('password is required.');
      return errors;
    },

  },

  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });
    },
    openReset() {
      this.$store.commit('OPEN_RESET_PASS');
    },
    clear() {
      this.$v.$reset();
      this.name = '';
      this.email = '';
      this.message = '';
    },

    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
<style scoped>
.redColor {
  color: red;
}

.punterLogoWriting {
  color: #343a40
}

.centered {
  display: flex;
  align-items: center;
}
</style>
