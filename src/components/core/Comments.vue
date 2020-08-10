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
        class="pa-0 mt-2 mb-2"
        small
        fill-dot
      >

        <v-card class="mx-n5"
        rounded
        max-height="220"
         flat
         :key="i"
         color="secondary"
         shaped
         >
          <v-card-title class="pa-0 pl-2">
            {{comment.name | lowerCase }}
            <small class="caption pl-1 text-color" >
              commented {{ comment.createdOn | formatDate}}
            </small>
            </v-card-title>
          <v-card-text class="pa-0 pl-2">
            {{comment.content}}
          </v-card-text>
          <v-card-actions class="pa-0 pr-2">
            <v-spacer></v-spacer>
             <v-btn
              icon
              right
              class="pa-0"
               @click.prevent="commentLike(i, comment.id, comment.postId,
                comment.likes, comment.name)"
              >
                <v-badge
                color="accent"
                :content="comment.likes ? comment.likes : '0'"
                inline
                class="mr-2"
                >
                <v-icon
                :color="userLikedComments.filter((i) =>
                 i.commentId === comment.id && i.userId === ID).length > 0 ?
                 'primary' : ''"
                >
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
    v-if="paginatedComments.length > 0"
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
import { commentLikesCollection, auth, commentsCollection } from '../../firebase';

export default {
  data: () => ({
    reverse: true,
    fullPost: {},
    postComments: [],
    page: 1,
    userLikedComments: [],
  }),

  computed: {
    ...mapState(['comments', 'commentsData', 'userProfile']),

    ID() {
      return auth.currentUser.uid;
    },

    liked() {
      const like = this.userLikedComments.filter((i) => i.userId === this.ID);
      return like[0] !== undefined;
    },

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

  methods: {
    // eslint-disable-next-line no-unused-vars
    async commentLike(index, commentId, postId, likes, name) {
      // eslint-disable-next-line max-len
      const likedComment = this.userLikedComments.filter((i) => i.userId === this.ID && i.commentId === commentId);
      if (likedComment.length === 0) {
        this.paginatedComments[index].likes += 1;
        try {
          const userId = auth.currentUser.uid;
          const docId = `${userId}_${commentId}`;

          // check if user has liked comment
          const doc = await commentLikesCollection.doc(docId).get();
          if (doc.exists) { return; }
          // create comment likes
          await commentLikesCollection.doc(docId).set({
            postId,
            userId,
            commentId,
          });
          this.userLikedComments.push({
            id: docId,
            postId,
            userId,
            commentId,
          });
          // update post likes count
          await commentsCollection.doc(commentId).update({
            likes: likes + 1,
          });
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'success',
            message: ` you liked ${name}'s comment`,
          });
        } catch (error) {
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'error',
            message: error.message,
          });
        }
      }
      if (likedComment.length === 1) {
        this.paginatedComments[index].likes -= 1;
        try {
          const userId = auth.currentUser.uid;
          const docId = `${userId}_${commentId}`;

          // check if user has liked comment
          const doc = await commentLikesCollection.doc(docId).get();
          if (doc.exists) {
            // create comment likes
            await commentLikesCollection.doc(docId).delete();
            this.userLikedComments.splice(this.userLikedComments.indexOf(likedComment[0]), 1);
            // update post likes count
            await commentsCollection.doc(commentId).update({
              likes: likes - 1,
            });

            this.$store.commit('SET_ALERT', {
              alert: true,
              type: 'success',
              message: ` you un-liked ${name}'s comment`,
            });
          }
        } catch (error) {
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'error',
            message: error.message,
          });
        }
      }
    },
  },

  async created() {
    const docRef = await commentLikesCollection.where('userId', '==', auth.currentUser.uid).get();
    if (!docRef.empty) {
      docRef.forEach((doc) => {
        this.userLikedComments.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
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
