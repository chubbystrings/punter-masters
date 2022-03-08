<template>
  <v-container>
    <base-square :styles="{top: '15px', right: '50%', background: '#AD1457'}"></base-square>
    <v-card :loading="loading" class="mx-auto login-card" elevation="8">
      <v-img height="150" src="../assets/umbrella.jpg"></v-img>

      <v-card-title class="text-color">
        Sign Up
        <small class="user-text">
          have an account?
          <router-link class="text-color" to="/login">Login</router-link>
        </small>
        </v-card-title>

      <v-form @submit.prevent="">
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                dense
                v-model="firstName"
                :error-messages="fnameErrors"
                label="Firstname"
                required
                outlined
                flat
                @input="$v.firstName.$touch()"
                @blur="$v.firstName.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                dense
                v-model="lastName"
                :error-messages="lnameErrors"
                label="Lastname"
                required
                @input="$v.lastName.$touch()"
                @blur="$v.lastName.$touch()"
                outlined
                flat
              ></v-text-field>
            </v-col>
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
            <v-col cols="12">
              <v-text-field
                dense
                type="password"
                v-model="confirmPassword"
                :error-messages="passwordErrors"
                label="Confirm Password"
                required
                outlined
                flat
                @input="$v.confirmPassword.$touch()"
                @blur="$v.confirmPassword.$touch()"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn
                block
                :disabled="$v.$anyError || !checkForm"
                color="primary"
                @click.enter="signup"
                class="text-color"
                >submit</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate';
import {
  required, minLength, maxLength, email, sameAs,
} from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

export default {
  mixins: [validationMixin],

  validations: {
    firstName: { required, maxLength: maxLength(10) },
    lastName: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, minLength: minLength(7) },
    confirmPassword: {
      required,
      sameAs: sameAs((vm) => vm.password),
    },
  },

  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),

  computed: {
    ...mapState(['userProfile']),
    fnameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      if (!this.$v.firstName.maxLength) errors.push('Name must be at most 10 characters long');
      if (!this.$v.firstName.required) errors.push('Name is required.');
      return errors;
    },
    lnameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      if (!this.$v.lastName.maxLength) errors.push('Name must be at most 10 characters long');
      if (!this.$v.lastName.required) errors.push('Name is required.');
      return errors;
    },
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
      if (!this.$v.password.minLength) errors.push('Must be more than & characters');
      if (!this.$v.password.required) errors.push('Password is required');
      return errors;
    },

    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      if (!this.$v.confirmPassword.sameAs) errors.push('Password Mismatch');
      if (!this.$v.confirmPassword.required) errors.push('This field is required');
      return errors;
    },
    checkForm() {
      // eslint-disable-next-line max-len
      if (
        !this.firstName
        || !this.lastName
        || !this.email
        || !this.password
        || !this.confirmPassword
      ) {
        return false;
      }
      return true;
    },
  },

  methods: {
    signup() {
      this.$store.dispatch('signup', {
        email: this.email,
        password: this.password,
        firstname: this.firstName,
        lastname: this.lastName,
      });
    },
    clear() {
      this.$v.$reset();
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
    },
  },
  components: {},
};
</script>
<style scoped>
.user-text {
  position: absolute;
  right: 15px;
  font-size: 12px;
}
.login-card {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 375px;
}
</style>
