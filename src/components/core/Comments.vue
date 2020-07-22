<template>
  <div>
    <transition-group
    mode="out-in"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    >
    <v-divider key="divider"></v-divider>
    <v-timeline key="timeline" dense v-if="paginatedComments.length > 0"
      class="pt-1"
    >
      <v-timeline-item
        v-for="(comment, i) in paginatedComments"
        :key="comment.comment"
        :color="`#${Math.floor(Math.random() * 16777215).toString(16)}`"
        class=""
      >

        <v-card class="mr-3"
        rounded
        max-height="200"
         flat
         :key="i"
         color="secondary"
         shaped
         >
          <v-card-title class="pa-0 pl-2">
            {{comment.name | lowerCase }}
            <small class="caption"  style="color: blue; margin-left: 0.5rem;">
              commented {{ comment.createdOn | formatDate}}
            </small>
            </v-card-title>
          <v-card-text class="pa-0 pl-2">
            {{comment.content}}
          </v-card-text>
          <v-card-actions class="pa-0 pr-2">
            <v-spacer></v-spacer>
             <v-btn icon right class="pa-0">
                <v-badge
                color="primary"
                content="0"
                inline
                class="mr-2"
                >
                <v-icon>
                  mdi-heart
                </v-icon>
              </v-badge>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-divider key="divider2"></v-divider>
    <v-pagination
    key="pagination"
      v-model="page"
      :length="pages"
      circle
    ></v-pagination>
    </transition-group>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  data: () => ({
    reverse: true,
    fullPost: {},
    postComments: [],
    page: 1,
  }),

  computed: {
    ...mapState(['comments', 'commentsData']),

    pages() {
      return (
        this.commentsData.length > 3
          ? Math.ceil(this.commentsData.length / 5) : 1);
    },

    paginatedComments() {
      const start = (this.page - 1) * 5;
      const stop = this.page * 5;

      return this.commentsData ? this.commentsData.slice(start, stop) : '';
    },
  },

  filters: {
    formatDate(val) {
      console.log(val);
      if (!val) { return '-'; }
      if (val.seconds) {
        return moment(Date.parse(val.toDate())).fromNow();
      }
      return moment(Date.parse(val)).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) { return val; }
      return `${val.substring(0, 200)}...`;
    },

    lowerCase(val) {
      return val.toLowerCase();
    },
  },
  beforeUpdate() {
    this.$store.commit('OVERLAY_ON');
  },

  updated() {
    setTimeout(() => {
      this.$store.commit('OVERLAY_OFF');
    }, 1000);
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
.v-pagination__item, .v-pagination__navigation {
  outline: none !important;
}
div {
  transition: all .3s ease-out;
}
</style>
