<template>
<transition name="fade"  appear>

  <div class="container--wrapper" ref="containerWrap">
    <div ref="cardWrapper">
      <v-card class="login-card"  elevation="8">
        <div class="home--icon">
          <v-btn rounded depressed outlined to="/">
          Home
          </v-btn>
        </div>
        <div class="img-res">
          <img  src="../assets/images/Saly-2.svg" />
        </div>

        <v-card-title class="primary--text">
          LOGIN
          <small class="no-account-text">
            No account?
            <router-link class="" to="/signup">Sign Up</router-link>
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
                  color="primary"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="mx-2" :style="{ display: 'flex', flexDirection: 'column' }">
            <v-btn text color="primary" block @click.prevent="openReset">Reset Password </v-btn>
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
    </div>
    <base-reset />
  </div>
</transition>
</template>
<script>
import { gsap } from 'gsap';
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
    tween: null,
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

  mounted() {
    this.tween = gsap.timeline();

    this.tween.to(this.$refs.containerWrap, {
      delay: 1,
    })
      .from(
        this.$refs.cardWrapper,
        {
          opacity: 0,
          x: -80,
          duration: 1,
        },
      );
  },

  beforeDestroy() {
    this.tween.kill();
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

    beforeEnter(el) {
      console.log('yeaaaa');
      // eslint-disable-next-line no-param-reassign
      el.style.opacity = '0';
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
  position: relative;
}
.img-res {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.img-res img {
  width: 100%;
  height: 100%;
}
.home--icon {
  position: absolute;
  left: 5px;
  top: 5px;
  z-index: 2;
}

.card-container {
  position: relative;
}

.container--wrapper {
  /* background-image: url("../assets/images/layered-waves.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-origin: border-box; */
   background-color: #EDE9F2;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: grid;
  place-items: center;
  width: 100%;
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

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease-out;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

@media screen and (max-width: 575px){

  .login-card {
     width: calc(100% - 50px);
     margin: 0 auto;
  }
}
</style>
