/* eslint-disable no-use-before-define */
import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

fb.notificationCollection.orderBy('createdOn', 'asc').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    // eslint-disable-next-line no-use-before-define
    if (store.state.notifications.notification === true) {
      store.commit('REMOVE_NOTIFICATION');
      store.commit('SHOW_NOTIFICATION', change.doc.data());
    }
    store.commit('SHOW_NOTIFICATION', change.doc.data());
  });
});

const alert = (type, message) => {
  const msg = {
    alert: true,
    type,
    message,
  };

  return msg;
};

const store = new Vuex.Store({
  state: {
    drawer: false,
    userProfile: {},
    openRightDrawer: false,
    shareDialog: false,
    postDialog: false,
    resetDialog: false,
    editDialog: false,
    banterRoom: false,
    notifications: {
      notification: false,
    },
    actionDialog: {
      dialog: false,
      action: false,
    },
    posts: [],
    chats: [],
    post: {},
    alerts: {
      alert: false,
    },
    overlay: false,
    commentsData: [],
  },
  mutations: {

    CLEAR_ALL_DATA(state) {
      state.notifications = {
        notification: false,
      };
      state.actionDialog = {
        dialog: false,
        action: false,
      };
      state.posts = [];
      state.chats = [];
      state.post = {};
      state.commentsData = [];
    },

    SHOW_NOTIFICATION(state, data) {
      state.notifications.notification = true;
      state.notifications.name = data.sharerName;
      state.notifications.forum = data.forum;
      state.notifications.code = data.code;
    },

    REMOVE_NOTIFICATION(state) {
      state.notifications = {
        notification: false,
      };
    },

    SET_CHATS(state, val) {
      state.posts = val;
    },

    TOGGLE_DRAWER(state) {
      state.drawer = !state.drawer;
    },

    TOGGLE_SHARE_DIALOG(state) {
      state.shareDialog = !state.shareDialog;
    },

    TOGGLE_POST_DIALOG(state) {
      state.postDialog = !state.postDialog;
    },

    TOGGLE_RIGHT_DRAWER(state) {
      state.openRightDrawer = !state.openRightDrawer;
    },
    TOGGLE_BANTER_ROOM(state) {
      state.banterRoom = !state.banterRoom;
      console.log(state.banterRoom);
    },

    OPEN_EDIT_DIALOG(state) {
      state.editDialog = !state.editDialog;
    },

    CLOSE_DRAWERS(state) {
      state.drawer = false;
      state.openRightDrawer = false;
    },

    OPEN_DRAWERS(state) {
      state.drawer = true;
      state.openRightDrawer = true;
    },

    CLOSE_LEFT_DRAWER(state) {
      state.drawer = false;
    },
    OPEN_ACTION_DIALOG(state, data) {
      state.actionDialog.dialog = true;
      state.actionDialog.type = data.type;
      state.actionDialog.message = data.message;
    },

    CLOSE_ACTION_DIALOG(state) {
      state.actionDialog = {
        dialog: false,
        action: false,
      };
    },

    OK_TO_ACTION(state) {
      console.log('Yeaa do action');
      state.actionDialog.action = true;
    },

    OPEN_RESET_PASS(state) {
      state.resetDialog = true;
    },

    CLOSE_RESET_PASS(state) {
      state.resetDialog = false;
    },

    SET_USER_PROFILE(state, val) {
      state.userProfile = val;
      console.log(state.userProfile);
    },

    LOAD_POSTS(state, val) {
      state.posts = val;
    },

    SET_POST_DATA(state, post, comment) {
      state.post = {
        ...post.data(),
        postId: post.id,
      };

      state.comments = comment;
    },

    ADD_COMMENT(state, payload) {
      state.commentsData.unshift({
        ...payload,
      });
    },

    CLEAR_COMMENT(state) {
      state.commentsData = [];
    },

    LOAD_COMMENTS(state, arr) {
      this.state.commentsData = arr;
    },

    INCREMENT_COMMENTS(state) {
      state.post.comments += state.post.comments;
    },

    INCREMENT_LIKES(state) {
      state.post.likes += state.post.likes;
    },

    DECREMENT_LIKES(state) {
      state.post.likes -= state.post.likes;
    },

    ADD_POST(state, val) {
      state.posts.unshift(val);
    },
    OVERLAY_ON(state) {
      state.overlay = true;
    },

    OVERLAY_OFF(state) {
      state.overlay = false;
    },

    SET_ALERT(state, payload) {
      state.alerts.alert = true;
      state.alerts.type = payload.type;
      state.alerts.message = payload.message;
      setTimeout(() => {
        state.alerts.alert = false;
      }, 4000);
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async signup({ commit, dispatch }, form) {
      commit('OVERLAY_ON');
      // sign user up
      try {
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
        await fb.usersCollection.doc(user.uid).set({
          firstname: form.firstname,
          lastname: form.lastname,
        });
        await user.sendEmailVerification();
        await fb.auth.signOut();
        // create user profile object in userCollections
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('success', 'Successfully created, please check email'));
        router.push({ name: 'Login' });
      } catch (error) {
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('error', error.message));
      }
    },
    // eslint-disable-next-line no-unused-vars
    async login({ commit, dispatch, state }, form) {
      commit('OVERLAY_ON');
      try {
        // sign in user
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
        if (user.emailVerified) {
        // fetch user profile and set in state
          const userProfile = await fb.usersCollection.doc(user.uid).get();

          // set user profile in state
          const data = {
            ...userProfile.data(),
            userId: userProfile.id,
          };
          commit('SET_USER_PROFILE', data);

          // change route to dashboard
          commit('OVERLAY_OFF');
          commit('SET_ALERT', alert('success', `Welcome ${userProfile.data().lastname}`));
        } else {
          commit('SET_ALERT', alert('error', 'please verify your email'));
          commit('OVERLAY_OFF');
          fb.auth.signOut();
        }
      } catch (error) {
        commit('OVERLAY_OFF');
        let message;
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          message = 'Invalid Credentials';
        } else {
          message = error.message;
        }

        commit('SET_ALERT', alert('error', message));
      }
    },

    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      const data = {
        ...userProfile.data(),
        userId: userProfile.id,
      };
      commit('SET_USER_PROFILE', data);

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/home');
      }
    },

    async logout({ commit }) {
      commit('OVERLAY_ON');
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit('SET_USER_PROFILE', {});
      router.push('/login');
      commit('OVERLAY_OFF');
      commit('CLEAR_ALL_DATA');
      commit('SET_ALERT', alert('success', 'logged out successfully'));
    },

    // eslint-disable-next-line no-unused-vars
    async createPost({ commit, state }, post) {
      commit('OVERLAY_ON');
      try {
        const postData = {
          createdOn: new Date(),
          title: post.title,
          content: post.content,
          forum: post.forum,
          forumId: post.forumId,
          userId: fb.auth.currentUser.uid,
          name: `${state.userProfile.lastname} ${state.userProfile.firstname} `,
          comments: 0,
          likes: 0,
        };
        const docRef = await fb.postsCollection.add(postData);
        postData.avatar = 'https://cdn.vuetifyjs.com/images/lists/5.jpg';
        postData.id = docRef.id;
        commit('ADD_POST', postData);
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('success', 'post created, successfully'));
      } catch (error) {
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('error', error.message));
      }
    },
    async loadPosts({ commit }, forum) {
      commit('OVERLAY_ON');
      try {
        const postArray = [];
        const snapshot = await fb.postsCollection.where('forumId', '==', forum).orderBy('createdOn', 'desc').get();
        snapshot.forEach((doc) => {
          postArray.push({
            ...doc.data(),
            id: doc.id,
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          });
        });

        commit('LOAD_POSTS', postArray);
        commit('OVERLAY_OFF');
      } catch (error) {
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('error', error.message));
      }
    },
    async getPost({ commit }, id) {
      commit('OVERLAY_ON');
      try {
        const docRef = await fb.postsCollection.doc(id).get();
        const docs = await fb.commentsCollection.where('postId', '==', id).get();
        const commentsArray = [];
        docs.forEach((doc) => {
          commentsArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        commit('SET_POST_DATA', docRef, commentsArray);
        commit('OVERLAY_OFF');
      } catch (error) {
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('error', error.message));
      }
    },
    async likePost({ commit }, postData) {
      commit('INCREMENT_LIKES');
      try {
        const userId = fb.auth.currentUser.uid;
        const docId = `${userId}_${postData.id}`;

        // check if user has liked post
        const doc = await fb.likesCollection.doc(docId).get();
        if (doc.exists) { return; }
        // create post
        await fb.likesCollection.doc(docId).set({
          postId: postData.id,
          userId,
        });
        fb.likesCollection.doc(docId).delete();
        // update post likes count
        fb.postsCollection.doc(postData.id).update({
          likes: postData.likesCount + 1,
        });
      } catch (error) {
        commit('SET_ALERT', alert('error', error.message));
        commit('DECREMENT_LIKES');
      }
    },

    async unLikePost({ commit }, postData) {
      commit('DECREMENT_LIKES');
      try {
        const userId = fb.auth.currentUser.uid;
        const docId = `${userId}_${postData.id}`;

        // check if user has liked post
        const doc = await fb.likesCollection.doc(docId).get();
        if (!doc.exists) { return; }
        // delete like post
        fb.likesCollection.doc(docId).delete();
        // update post likes count
        fb.postsCollection.doc(postData.id).update({
          likes: postData.likesCount - 1,
        });
      } catch (error) {
        commit('SET_ALERT', alert('error', error.message));
      }
    },

    async editPost({ commit }, editData) {
      const {
        postId, userId, title, content,
      } = editData;

      commit('OVERLAY_ON');

      try {
        const postDoc = await fb.postsCollection.doc(postId).get();

        if (postDoc.exists) {
          if (postDoc.data().userId === userId) {
            await fb.postsCollection.doc(postId).update({
              title,
              content,
              updatedOn: new Date(),
            });
            commit('OVERLAY_OFF');
          } else {
            commit('OVERLAY_OFF');
            commit('SET_ALERT', alert('error', 'Unauthorized'));
          }
        } else {
          commit('OVERLAY_OFF');
          commit('SET_ALERT', alert('error', 'Post does not exist or has been deleted'));
        }
      } catch (error) {
        commit('SET_ALERT', alert('error', error.message));
        commit('OVERLAY_OFF');
      }
    },

    async deletePost({ commit }, postData) {
      const { postId, forumId, forum } = postData;
      const id = postId;
      commit('OVERLAY_ON');
      try {
        const postDoc = fb.postsCollection.doc(id);
        await postDoc.delete();
        const commentSnapshot = await fb.commentsCollection.where('postId', '==', id).get();
        commentSnapshot.forEach((doc) => {
          doc.ref.delete();
        });

        const likesSnapshot = await fb.likesCollection.where('postId', '==', id).get();
        likesSnapshot.forEach((doc) => {
          doc.ref.delete();
        });

        router.push({ name: 'Forum', params: { forum, id: forumId } });
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('success', 'deleted successfully'));
        commit('CLOSE_ACTION_DIALOG');
      } catch (error) {
        commit('OVERLAY_OFF');
        commit('CLOSE_ACTION_DIALOG');
        commit('SET_ALERT', alert('error', error.message));
      }
    },

    async changeUsername({ commit, dispatch }, username) {
      commit('OVERLAY_ON');

      try {
        const user = fb.auth.currentUser;
        await user.updateProfile({
          displayName: username,
        });

        const userProfile = fb.usersCollection.doc(user.uid);
        await userProfile.update({
          displayName: username,
        });

        dispatch('fetchUserProfile', user);
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('success', 'Username updated successfully'));
      } catch (error) {
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('error', error.message));
      }
    },

    async resetPassword({ commit }, email) {
      commit('OVERLAY_ON');
      try {
        await fb.auth.sendPasswordResetEmail(email);
        commit('SET_ALERT', {
          alert: true,
          type: 'success',
          message: 'password reset sent to your email',
        });
        commit('OVERLAY_OFF');
        commit('CLOSE_RESET_PASS');
      } catch (err) {
        commit('OVERLAY_OFF');
        commit('CLOSE_RESET_PASS');
        commit('SET_ALERT', {
          alert: true,
          type: 'error',
          message: err.message,
        });
      }
    },

    async shareBetCode({ commit, state }, payload) {
      commit('OVERLAY_ON');
      console.log(payload);
      try {
        const userId = fb.auth.currentUser.uid;
        const docId = `${userId}_${payload.id}`;
        console.log(docId);
        await fb.codesCollection.doc(docId).set({
          code: payload.code,
          userId,
          sharerName: `${state.userProfile.firstname} ${state.userProfile.lastname}`,
          forum: payload.name,
          forumId: payload.id,
          createdOn: new Date(),
        });

        const userDoc = await fb.usersCollection.doc(userId).get();

        await fb.usersCollection.doc(userId).update({
          codeShared: userDoc.data().codeShared + 1,
        });

        await fb.notificationCollection.add({
          code: payload.code,
          userId,
          sharerName: `${state.userProfile.firstname} ${state.userProfile.lastname}`,
          forum: payload.name,
          forumId: payload.id,
          createdOn: new Date(),
        });
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('success', 'posted successfully'));
      } catch (error) {
        commit('OVERLAY_OFF');
        commit('SET_ALERT', alert('error', error.message));
      }
    },

    showNotification({ commit }) {
      fb.notificationCollection.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            commit('SHOW_NOTIFICATION', change.doc.data());
          }
        });
      });
    },
  },
  modules: {
  },
});

export default store;
