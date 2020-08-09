<template>
  <v-card
    class="mx-auto mt-5"
    width="400"
  >
    <v-img
      class="white--text mx-auto"
      height="250px"
      width="250px"
      src="../assets/logo2.png"
    >
    </v-img>

    <v-card-title class="pb-0 font-weight-bold mt-1 red--text">
    Your payment was NOT successful!
    </v-card-title>

    <v-card-text class="text--primary">
      <div>Transaction Refrence:
           <span class="primary--text">
            {{ paymentDetails}}
          </span>
        </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
      to="/home"
        color="primary"
        text
      >
        Home
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
  data: () => ({
    paymentDetails: '',
  }),

  created() {
    const receipt = this.$route.params.id;
    this.paymentDetails = receipt;
  },
};
</script>
