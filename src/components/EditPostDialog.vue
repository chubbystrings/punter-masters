<template>
<v-row justify="center">
    <v-dialog :value="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                v-model="title"
                  label="Title" required></v-text-field>
              </v-col>
              <v-textarea
              v-model="content"
              label="content"
                    auto-grow
                    clearable
                   required
                   row-height="15"
                   rows="1"
                   outlined
                   >
                   </v-textarea>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancel">Cancel</v-btn>
          <v-btn color="primary" text @click="ok">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-row>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseEdit',
  props: ['editTitle', 'editContent'],
  data: () => ({
    title: '',
    content: '',
  }),

  computed: {
    ...mapState(['editDialog']),
  },

  methods: {
    ok() {
      console.log(this.title);
      console.log(this.content);
      console.log(this.$route.params.id);
    },

    cancel() {
      this.$store.commit('OPEN_EDIT_DIALOG');
    },
  },

  created() {
    this.title = this.editTitle;
    this.content = this.editContent;
    console.log(this.editContent);
  },
};
</script>
