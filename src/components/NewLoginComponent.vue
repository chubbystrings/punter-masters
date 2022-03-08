<template>
  <v-container class="card-container">
    <base-square :styles="{top: '20px', right: '50%', background: '#AD1457'}"></base-square>
    <v-card :loading="loading" class="mx-auto my-12 login-card" elevation="8">
      <v-img height="200" src="../assets/umbrella.jpg"></v-img>

      <v-card-title class="text-color">
        LOGIN
        <small class="no-account-text t">
          No account?
          <router-link class="text-color" to="/signup">Sign Up</router-link>
        </small>
      </v-card-title>

      <v-form @submit.prevent="login">
        <v-card-text>
          <v-row no-gutters v-if="!showPasswordReset">
            <v-col cols="12">
              <v-text-field
                label="email"
                dense
                outlined
                flat
                v-model="email"
                :error-messages="emailErrors"
                name="email"
                type="email"
                required
                @blur="$v.email.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="password"
                outlined
                flat
                dense
                v-model="password"
                :error-messages="passwordErrors"
                id="password"
                name="password"
                type="password"
                @blur="$v.email.$touch()"
                :disabled="!$v.email.email || !email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="mx-2" :style="{ display: 'flex', flexDirection: 'column'}">
          <v-btn text color="accent" block @click.prevent="openReset">Reset Password </v-btn>
          <v-btn
            block
            depressed
            color="primary"
            :disabled="$v.$anyError || !email || !password"
            type="submit"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
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
.no-account-text {
  position: absolute;
  right: 15px;
  font-size: 12px;
}
.login-card {

  width: 375px;
}

.card-container{
  position: relative;
}

/* .blob {
  height: 50px;
  width: 55px;
  background: yellow;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  position: absolute;
  z-index: 999;
  top: 25px;
  left: -25px
} */
</style>
