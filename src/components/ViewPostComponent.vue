<template>
<div class="">
  <base-back  v-if="post" />
  <transition
  mode="out-in"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <v-card
    style="width: 95vw;"
    class="mx-auto"
    color="transparent"
    outlined
    flat
    id="cardHeight"
    :loading="loading"
    >
       <v-list-item v-if="post.title">
        <v-list-item-avatar>
          <v-img :src="post.userAvatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
        <v-list-item-title
        class="headline">
        {{post.title}} <small class="primary--text">{{ post.updatedOn ? 'edited' : ''}}</small>
        </v-list-item-title>
        <v-list-item-subtitle>
          posted by {{post.name}}
          </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text >
      {{post.content}}
    </v-card-text>
     <v-card-actions>
       <v-btn @click="commentOpen = !commentOpen"
      text
      class=" primary--text"
      color="grey"
      small>
        reply
      </v-btn>

      <v-badge
      class="mr-4"
      color="accent"
      :content="post.comments ? `${post.comments}` : '0'"
      >
        <v-icon color="primary">mdi-comment-outline</v-icon>
      </v-badge>

       <v-btn icon class="mr-4">
          <v-badge
          color="accent"
          :content="post.likes ? `${post.likes}` : '0'"
        >
          <v-icon
          @click="likePost"
          :color="userLiked ? 'primary' : ''"
          >{{ userLiked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
        </v-badge>
      </v-btn>

      <v-btn
      v-if="post.userId === userProfile.userId"
      text
      color="primary"
      class="caption"
      icon
      @click="openEdit(post.title, post.content)"
      >
      <v-icon color="primary">mdi-file-edit-outline</v-icon>
      </v-btn>
      <v-btn icon text color="primary"
      @click="confirmDeletePost()"
      class="caption"
      v-if="post.userId === userProfile.userId"
      >
      <v-icon color="primary">mdi-delete-outline</v-icon>
      </v-btn>
     </v-card-actions>
      <v-col cols="12">
        <transition-group
       mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
      <v-textarea
      key="commentBox"
      v-if="commentOpen"
            label="comment"
            class=""
            v-model="comment"
            rows="1"
            clearable
            counter="250"
            solo-reverse
      >
      </v-textarea>
      <v-btn
      key="commentBtn"
      v-if="commentOpen"
          color="primary"
          :disabled="!comment || comment.length > 250" @click="addComment"
          >reply
        </v-btn>
        </transition-group>
      </v-col>
      <transition
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      >
     <comments :commentsdata="commentsData"></comments>
      </transition>
    </v-card>
  </transition>
    <base-dialog @delete="deletePost" />
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
                v-model="editTitle"
                  label="Title" required></v-text-field>
              </v-col>
              <v-textarea
              v-model="editContent"
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
          <v-btn color="primary" text @click="editDialog = false">Cancel</v-btn>
          <v-btn
           :disabled="!editContent || !editTitle" color="primary" text @click="editPost">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-row>
</div>
</template>
<script>
import { mapState } from 'vuex';
import {
  commentsCollection, postsCollection, auth, likesCollection,
} from '../firebase';

export default {
  data: () => ({
    comment: '',
    userLiked: false,
    commentOpen: false,
    post: {},
    editDialog: false,
    editTitle: '',
    editContent: '',
    loading: 'primary',
  }),
  components: {
    comments: () => import('./core/Comments.vue'),
  },

  computed: {
    ...mapState(['commentsData', 'userProfile', 'actionDialog']),
  },
  async created() {
    console.log('heyyyy');
    this.$store.commit('OVERLAY_ON', '');
    try {
      const docRef = await postsCollection.doc(this.$route.params.id).get();
      const docs = await commentsCollection.where('postId', '==', this.$route.params.id).orderBy('createdOn', 'desc').get();
      const userId = auth.currentUser.uid;
      const docId = `${userId}_${this.$route.params.id}`;

      // check if user has liked post

      const likesDoc = await likesCollection.doc(docId).get();
      const commentsArray = [];
      docs.forEach((doc) => {
        commentsArray.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      this.post = {
        ...docRef.data(),
        id: docRef.id,
      };
      if (likesDoc.exists) {
        this.userLiked = true;
      } else {
        this.userLiked = false;
      }
      this.$store.commit('OVERLAY_OFF');
      this.$store.commit('LOAD_COMMENTS', commentsArray);
      this.loading = '';
    } catch (error) {
      console.log(error);
      this.$store.commit('OVERLAY_OFF');
      this.$store.commit('SET_ALERT', {
        alert: true,
        type: 'error',
        message: error.message,

      });
    }
  },

  destroyed() {
    this.clear();
    console.log('YASSSSSSS');
    this.$store.commit('CLEAR_COMMENT');
  },

  methods: {
    async addComment() {
      try {
        // create comment
        const dataForComment = {
          createdOn: new Date(),
          content: this.comment,
          postId: this.$route.params.id,
          userId: auth.currentUser.uid,
          name: `${this.$store.state.userProfile.firstname} ${this.$store.state.userProfile.lastname} `,
          likes: 0,
        };
        await commentsCollection.add(dataForComment);
        await postsCollection.doc(this.$route.params.id).update({
        // eslint-disable-next-line radix
          comments: parseInt(this.post.comments) + 1,
        });
        this.$store.commit('ADD_COMMENT', dataForComment);
        this.post.comments += 1;
        this.$store.commit('SET_ALERT', {
          alert: true,
          type: 'success',
          message: 'comment posted',
        });
        this.comment = '';
      } catch (error) {
        this.$store.commit('OVERLAY_OFF');
        this.$store.commit('SET_ALERT', {
          alert: true,
          type: 'error',
          message: error.message,
        });
      }
    },

    clear() {
      this.post = {};
      this.comment = '';
      this.userLiked = false;
    },

    deletePost() {
      const postId = this.$route.params.id;
      const { forum, forumId } = this.post;
      this.$store.dispatch('deletePost', {
        forum,
        postId,
        forumId,
      });
    },

    openEdit(title, content) {
      this.editTitle = title;
      this.editContent = content;
      this.editDialog = true;
    },

    async editPost() {
      const postData = {
        postId: this.$route.params.id,
        title: this.editTitle,
        content: this.editContent,
        userId: this.userProfile.userId,
        updatedOn: new Date(),
      };

      this.$store.commit('OVERLAY_ON', '');

      try {
        const postDoc = await postsCollection.doc(postData.postId).get();

        if (postDoc.exists) {
          if (postDoc.data().userId === postData.userId) {
            await postsCollection.doc(postData.postId).update({
              title: postData.title,
              content: postData.content,
              updatedOn: postData.updatedOn,
            });

            this.post.title = postData.title;
            this.post.content = postData.content;
            this.post.updatedOn = postData.updatedOn;
            this.$store.commit('OVERLAY_OFF');
            this.$store.commit('SET_ALERT', {
              alert: true,
              type: 'success',
              message: 'Post updated Successfully',
            });
            this.editDialog = false;
          } else {
            this.$store.commit('OVERLAY_OFF');
            this.$store.commit('SET_ALERT', {
              alert: true,
              type: 'error',
              message: 'Unauthorized User',
            });
            this.editDialog = false;
          }
        } else {
          this.$store.commit('OVERLAY_OFF');
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'error',
            message: 'Post does not exist',
          });
          this.editDialog = false;
        }
      } catch (error) {
        this.$store.commit('SET_ALERT', {
          alert: true,
          type: 'error',
          message: error.message,
        });
        this.$store.commit('OVERLAY_OFF');
        this.editDialog = false;
      }
    },

    confirmDeletePost() {
      this.$store.commit('OPEN_ACTION_DIALOG', {
        type: 'Delete',
        message: 'Are you sure you want to delete ?',
      });
    },

    async likePost() {
      this.userLiked = !this.userLiked;
      try {
        const userId = auth.currentUser.uid;
        const docId = `${userId}_${this.$route.params.id}`;

        // check if user has liked post

        const doc = await likesCollection.doc(docId).get();
        if (doc.exists) {
          await likesCollection.doc(docId).delete();
          const postData = await postsCollection.doc(this.$route.params.id);
          const data = await postData.get();
          await postData.update({
            likes: data.data().likes - 1,
          });
          this.post.likes -= 1;
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'success',
            message: `unliked ${this.post.name}'s post`,
          });
        } else {
          await likesCollection.doc(docId).set({
            postId: this.$route.params.id,
            userId,
          });
          // update post likes count
          const postData = await postsCollection.doc(this.$route.params.id);
          const data = await postData.get();
          await postData.update({
            likes: data.data().likes + 1,
          });
          this.post.likes += 1;
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'success',
            message: `liked ${this.post.name}'s post`,
          });
        }
      } catch (error) {
        this.$store.commit('SET_ALERT', {
          alert: true,
          type: 'error',
          message: error.message,
        });
      }
    },
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";

div, .divBorder {
  transition: all .3s ease-out;
}
</style>
