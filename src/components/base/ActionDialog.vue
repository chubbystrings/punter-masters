<template>
  <v-row justify="center">
    <v-dialog :value="actionDialog.dialog" persistent max-width="290">
      <v-card color="primary">
        <v-card-title class="headline white--text">{{actionDialog.type}}</v-card-title>
        <v-card-text class="white--text">{{actionDialog.message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="actionDialog.type === 'Delete'">
          <v-btn color="white" text @click="cancel">Cancel</v-btn>
          <v-btn color="white" text @click="ok">ok</v-btn>
          </div>
          <div v-if="actionDialog.type === 'Confirm'">
            <v-btn color="white" text @click="no">No</v-btn>
            <v-btn color="white" text @click="yes">Yes</v-btn>
          </div>
          <div v-if="actionDialog.type === 'Duplicate'">
            <v-btn color="white" text @click="cancel">Back</v-btn>
          </div>
          <div v-if="actionDialog.type === 'Congratulations'">
            <v-btn color="white" text @click="cancel">Back</v-btn>
          </div>
          <div v-if="actionDialog.type === 'Start'">
            <v-btn color="white" text @click="no">No Yet</v-btn>
            <v-btn color="white" text @click="yes">Yes Please</v-btn>
          </div>
          <div v-if="actionDialog.type === 'Cancel Game'">
            <v-btn color="white" text @click="no">No</v-btn>
            <v-btn color="white" text @click="yes">Yes Please</v-btn>
          </div>
          <div v-if="actionDialog.type === 'New Game'">
            <v-btn color="white" text @click="no">No</v-btn>
            <v-btn color="white" text @click="yes">Yes Please</v-btn>
          </div>
          <div v-if="actionDialog.type === 'Game Lost'">
            <v-btn color="white" text @click="cancel">Back</v-btn>
          </div>
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
    deleteType() {
      return this.actionDialog.type === 'Delete';
    },

    duplicateType() {
      return this.actionDialog.type === 'Duplicate';
    },

    confirmType() {
      return this.actionDialog.type === 'Confirm';
    },

    startType() {
      return this.actionDialog.type === 'Start';
    },
  },

  methods: {
    ok() {
      this.$emit('delete');
    },

    yes() {
      this.$emit('yes');
    },

    no() {
      this.$emit('no');
    },

    cancel() {
      this.$store.commit('CLOSE_ACTION_DIALOG');
    },
  },
};
</script>
