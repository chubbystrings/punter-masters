<template>
<v-container fluid>
     <v-row justify="center" >
    <v-dialog :value="postDialog" persistent max-width="600px">
        <v-card>
        <v-card-title>
          <span class="headline primary--text">Write a post in {{currentRoute}} room</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                :error-messages="titleErrors"
                 v-model="title"
                  label="Title"
                  required
                  @input="$v.title.$touch()"
                  >
                  </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                 v-model="content"
                 :error-messages="contentErrors"
                    auto-grow
                    clearable
                   required
                   row-height="15"
                   rows="1"
                   outlined
                   @input="$v.content.$touch()"
                   >
                   </v-textarea>
              </v-col>
            </v-row>
          </v-container>
         </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancel">Cancel</v-btn>
          <v-btn color="primary"
          :disabled="$v.$anyError || !title || !content"
           text @click="createPost">Ok</v-btn>
        </v-card-actions>
      </v-card>

      </v-dialog>
      </v-row>
</v-container>
</template>
<script>
import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  validations: {
    title: { required, maxLength: maxLength(25) },
    content: { required, maxLength: maxLength(250) },
  },
  data: () => ({
    title: '',
    content: '',
  }),
  computed: {
    ...mapState(['userProfile', 'postDialog']),
    currentRoute() {
      return this.$route.params.forum;
    },

    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      if (!this.$v.title.maxLength) errors.push('Title too Long');
      if (!this.$v.title.required) errors.push('Title is required');
      return errors;
    },

    contentErrors() {
      const errors = [];
      if (!this.$v.content.$dirty) return errors;
      if (!this.$v.content.maxLength) errors.push('Content too Long');
      if (!this.$v.content.required) errors.push('Content is required.');
      return errors;
    },
  },
  methods: {
    createPost() {
      this.$store.dispatch('createPost',
        {
          title: this.title,
          content: this.content,
          forum: this.$route.params.forum,
          forumId: this.$route.params.id,
        });
      this.content = '';
      this.title = '';
      this.$store.commit('TOGGLE_POST_DIALOG');
    },

    cancel() {
      this.$store.commit('TOGGLE_POST_DIALOG');
    },
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
