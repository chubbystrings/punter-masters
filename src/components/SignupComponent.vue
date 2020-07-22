<template>
  <v-container
  >
    <v-row
    class="text-center"
    >
    <v-col
      cols="12"
      >
       <v-card flat class=" mx-auto pa-auto"  style="width: 25rem;">
        <v-card-text>
        <v-form>
        <v-text-field
          dense
          v-model="firstName"
          :error-messages="fnameErrors"
          label="Firstname"
          required
          @input="$v.firstName.$touch()"
          @blur="$v.firstName.$touch()"
        ></v-text-field>
         <v-text-field
          dense
          v-model="lastName"
          :error-messages="lnameErrors"
          label="Lastname"
          required
          @input="$v.lastName.$touch()"
          @blur="$v.lastName.$touch()"
        ></v-text-field>
        <v-text-field
          dense
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
          <v-text-field
          dense
          type="password"
          v-model="password"
          :error-messages="passwordErrors"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
          <v-text-field
          dense
          type="password"
          v-model="confirmPassword"
          :error-messages="passwordErrors"
          label="Confirm Password"
          required
          @input="$v.confirmPassword.$touch()"
          @blur="$v.confirmPassword.$touch()"
        ></v-text-field>
        <v-btn
        right
        :disabled="$v.$anyError || !checkForm"
        color="primary"
        @click.enter="signup"
        class="text-color"
        >submit</v-btn>
      </v-form>
  </v-card-text>
    </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-unused-expressions */
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
      if (!this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword) return false;
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
  components: {
  },
};
</script>
<style scoped>
.redColor {
  color: red;
}
</style>
