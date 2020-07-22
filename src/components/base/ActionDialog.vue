<template>
  <v-row justify="center">
    <v-dialog :value="actionDialog.dialog" persistent max-width="290">
      <v-card color="primary">
        <v-card-title class="headline white--text">{{actionDialog.type}}</v-card-title>
        <v-card-text class="white--text">{{actionDialog.message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" text @click="cancel">Cancel</v-btn>
          <v-btn color="white" text @click="ok">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {

  name: 'BaseDialog',
  data: () => ({
  }),

  computed: {
    ...mapState(['actionDialog']),
  },

  methods: {
    ok() {
      this.$emit('delete');
    },

    cancel() {
      this.$store.commit('CLOSE_ACTION_DIALOG');
    },
  },
};
</script>
