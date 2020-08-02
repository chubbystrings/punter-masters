import * as fb from '../firebase';
import router from '../router/index';

const alert = (type, message) => {
  const msg = {
    alert: true,
    type,
    message,
  };

  return msg;
};

export default {
  /** USER AND USER AUTH ACTIONS ************************************************* */

  // SIGN UP
  // eslint-disable-next-line no-unused-vars
  async signup({ commit, dispatch }, form) {
    commit('OVERLAY_ON');
    // sign user up
    try {
      const defaultPhoto = 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown';
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
      await fb.usersCollection.doc(user.uid).set({
        firstname: form.firstname,
        lastname: form.lastname,
        codeShared: 0,
        photoURL: defaultPhoto,
      });
      await user.sendEmailVerification();
      await user.updateProfile({
        photoURL: defaultPhoto,
      });
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

  // LOG IN
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
          photoURL: user.photoURL,
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

  // FETCH AND COMMIT USER DATA
  async fetchUserProfile({ commit }, user) {
    // fetch user profile
    const userProfile = await fb.usersCollection.doc(user.uid).get();

    // set user profile in state
    const data = {
      ...userProfile.data(),
      userId: userProfile.id,
      photoURL: user.photoURL,
    };
    commit('SET_USER_PROFILE', data);

    // change route to dashboard
    if (router.currentRoute.path === '/login') {
      router.push('/home');
    }
  },

  // get a specific details for profile view
  async getUser({ commit }, id) {
    commit('OVERLAY_ON');
    try {
      const user = await fb.usersCollection.doc(id).get();
      if (user.exists) {
        console.log(user);
        commit('CLICKED_USER_DETAILS', user.data());
      }
      commit('OVERLAY_OFF');
    } catch (error) {
      console.log(error);
      commit('OVERLAY_OFF');
    }
  },

  // USER CAN UPDATE OR SET USERNAME
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

  // USER CAN RESET PASSWORD
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

  async updateAvatar({ commit, dispatch }, url) {
    try {
      const user = fb.auth.currentUser;
      await user.updateProfile({
        photoURL: url,
      });
      await fb.usersCollection.doc(user.uid).update({
        photoURL: url,
      });

      const codeUser = await fb.codesCollection.where('userId', '==', user.uid).get();
      codeUser.forEach((code) => {
        code.ref.update({
          userAvatar: url,
        });
      });
      commit('SET_ALERT', alert('success', 'Update successful'));
      dispatch('fetchUserProfile', user);
    } catch (error) {
      commit('SET_ALERT', alert('error', 'Ops something went wrong'));
      console.log(error);
    }
  },

  // LOGOUT ACTION
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

  /* **************** POSTS AND POSTS ACTIONS ************************************************* */

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
        userAvatar: fb.auth.currentUser.photoURL,
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

  // GET/LOAD ALL POSTS IN A FORUM
  async loadPosts({ commit }, forum) {
    commit('OVERLAY_ON');
    try {
      const postArray = [];
      const snapshot = await fb.postsCollection.where('forumId', '==', forum).orderBy('createdOn', 'desc').get();
      snapshot.forEach((doc) => {
        postArray.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      commit('LOAD_POSTS', postArray);
      commit('OVERLAY_OFF');
    } catch (error) {
      commit('OVERLAY_OFF');
      commit('SET_ALERT', alert('error', error.message));
    }
  },

  // GET/VIEW A SINGLE POST IN A FORUM
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

  // LIKE A POST
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

  // UNLIKE A POST
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

  // EDIT A PARTICULAR POST **only posted by user
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

  // DELETE A PARTICULAR POST **only posted by user
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

  // SHARE BETCODE ACTIONS
  async shareBetCode({ commit, state }, payload) {
    commit('OVERLAY_ON');
    console.log(payload);
    let allRatings = 0;
    let overallUserRatings = 0;
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
        ratings: 0,
        userRated: 0,
        userAvatar: fb.auth.currentUser.photoURL,
        thumbsUp: 0,
        thumbsDown: 0,
        createdOn: new Date(),
      });

      const userDoc = await fb.usersCollection.doc(userId).get();
      const userRef = await fb.codesCollection.where('userId', '==', userId).get();
      userRef.forEach((ratings) => {
        allRatings += ratings.data().ratings;
        overallUserRatings += ratings.data().userRated;
      });

      const averageRatings = Number((allRatings / overallUserRatings).toFixed(1));
      await fb.usersCollection.doc(userId).update({
        codeShared: userDoc.data().codeShared + 1,
        averageRatings,
      });

      await fb.notificationCollection.doc(docId).set({
        code: payload.code,
        userId,
        sharerName: `${state.userProfile.firstname} ${state.userProfile.lastname}`,
        forum: payload.name,
        forumId: payload.id,
        createdOn: new Date(),
      });
      commit('OVERLAY_OFF');
      commit('SET_ALERT', alert('success', 'posted successfully'));
      if (router.currentRoute.name !== 'CodeRoom') {
        router.push({ name: 'CodeRoom' });
      }
    } catch (error) {
      commit('OVERLAY_OFF');
      commit('SET_ALERT', alert('error', error.message));
    }
  },

  async DeleteCode({ commit }, id) {
    try {
      commit('OVERLAY_ON');
      await fb.codesCollection.doc(id).delete();
      console.log(id);
      await fb.notificationCollection.doc(id).delete();
      commit('SET_ALERT', alert('success', 'deleted successfully'));
      commit('CLOSE_ACTION_DIALOG');
      commit('OVERLAY_OFF');
    } catch (error) {
      commit('SET_ALERT', alert('error', 'Oops something went wrong'));
      console.log(error);
      commit('OVERLAY_OFF');
    }
  },

  // SHOW WHO SHARED A CODE INSTANT NOTIFICATION
  showNotification({ commit }) {
    fb.notificationCollection.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          commit('SHOW_NOTIFICATION', change.doc.data());
        }
      });
    });
  },

  // eslint-disable-next-line no-unused-vars
  async updateRatings({ commit }, id) {
    try {
      let allRatings = 0;
      let overallUserRatings = 0;
      const userRef = await fb.codesCollection.where('userId', '==', id).get();
      userRef.forEach((ratings) => {
        allRatings += ratings.data().ratings;
        overallUserRatings += ratings.data().userRated;
      });

      const averageRatings = Number((allRatings / overallUserRatings).toFixed(1));
      await fb.usersCollection.doc(id).update({
        averageRatings,
      });
      console.log('DONE');
    } catch (error) {
      console.log(error);
    }
  },
};
