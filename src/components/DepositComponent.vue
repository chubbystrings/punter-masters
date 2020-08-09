<template>
  <v-container
  >
    <v-row
    class="text-center"
    >
    <v-col cols="12">
      <h3 class="display-2 text-color">Deposit</h3>
    </v-col>
    <v-col
      cols="12"
      >
       <v-card flat class=" mx-auto pa-auto"  style="width: 25rem;">
        <v-card-text>
        <v-form>
           <v-select
            v-model="select"
            :items="items"
            dense
            :error-messages="selectErrors"
            label="Choose Payment vendor"
            require
            @blur="$v.select.$touch()"
          ></v-select>
        <v-text-field
          type="number"
          v-model="amount"
          :error-messages="amountErrors"
          label="Amount"
          require
          @blur="$v.amount.$touch()"
        ></v-text-field>
          <v-text-field
          dense
          type="email"
          :value="userProfile.email"
          label="email"
          disabled
        ></v-text-field>
          <v-text-field
          :error-messages="phoneErrors"
          dense
          type="text"
          v-model="phonenumber"
          label="phone number"
          placeholder="08123456789"
          @input="$v.phonenumber.$touch()"
        ></v-text-field>
        <v-btn
        v-if="!btnDisable"
        right
        :disabled="$v.$anyError || !checkForm || !Number(this.phonenumber)"
        color="primary"
        @click.enter="pay"
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
  required, numeric, minLength, maxLength,
} from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

export default {
  mixins: [validationMixin],

  validations: {
    amount: { required, numeric },
    select: { required },
    phonenumber: { required, minLength: minLength(11), maxLength: maxLength(11) },
  },

  data: () => ({
    amount: 200,
    select: '',
    phonenumber: '',
    items: [
      'paystack',
      'flutterwave',
    ],
    disable: false,
  }),

  computed: {
    ...mapState(['userProfile', 'overlay']),
    amountErrors() {
      const errors = [];
      if (!this.$v.amount.$dirty) return errors;
      if (!this.$v.amount.numeric) errors.push('must be a number');
      if (!this.$v.amount.required) errors.push('Amount is required');
      if (this.amount < 100) errors.push('Min amount is 100');
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      if (!this.$v.select.required) errors.push('Option is required');
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phonenumber.$dirty) return errors;
      if (!this.$v.phonenumber.required) errors.push('Option is required');
      if (!this.$v.phonenumber.minLength) errors.push('Invalid format');
      if (!this.$v.phonenumber.maxLength) errors.push('Invalid format');
      if (!Number(this.phonenumber)) errors.push('Invalid format');
      return errors;
    },
    checkForm() {
      // eslint-disable-next-line max-len
      if (!this.amount || !this.select || this.amount < 100 || !this.phonenumber) return false;
      return true;
    },
    btnDisable() {
      if (!this.disable) return false;
      return true;
    },
  },

  methods: {

    pay() {
      this.disable = true;
      if (this.select === 'paystack') {
        this.$store.dispatch('deposit', {
          paymentMethod: this.select,
          email: this.userProfile.email,
          firstname: this.userProfile.firstname,
          lastname: this.userProfile.lastname,
          amount: this.amount,
          userId: this.userProfile.userId,
          phonenumber: this.phonenumber,
        });
        this.disable = false;
      }

      if (this.select === 'flutterwave') {
        const baseUrl = process.env.VUE_APP_FIREBASE_PROD_URL;
        const now = new Date();
        const ref = `${now.getTime()}-${this.userProfile.userId}-${now.getHours()}-${now.getMinutes()}`;
        window.FlutterwaveCheckout({
          public_key: process.env.VUE_APP_PUBLIC_TEST_KEY,
          tx_ref: ref,
          amount: this.amount,
          redirect_url: `${baseUrl}/flutterwave/verify-payment`,
          currency: 'NGN',
          payment_options: 'card, ussd',
          customer: {
            email: this.userProfile.email,
            phone_number: this.phonenumber,
            name: `${this.userProfile.lastname} ${this.userProfile.firstname}`,
          },
          meta: {
            customer_id: this.userProfile.userId,
          },
          callback(data) {
            console.log(data);
          },
          customizations: {
            title: 'Punter Masters',
            description: 'Bettors',
            logo: 'https://res.cloudinary.com/dhclgjajx/image/upload/v1596564871/3053ee39-6884-4061-94ae-548f108550c2_200x200_gasllt.png',
          },

        });
        this.disable = false;
      }
    },
    clear() {
      this.$v.$reset();
    },
  },
  components: {
  },
  created() {
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  },
};
</script>
<style scoped>
.redColor {
  color: red;
}
</style>
