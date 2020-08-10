export default {
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

  /** **************** APPLICATION MUTATIONS *********** */
  SHOW_NOTIFICATION(state, data) {
    state.notifications.notification = true;
    state.notifications.name = data.sharerName;
    state.notifications.forum = data.forum;
    state.notifications.code = data.code;
    state.notifications.userId = data.userId;
  },

  SET_CODE_SHARED(state, val) {
    state.sharedCodes = val;
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
      message: '',
    };
  },

  OK_TO_ACTION(state) {
    state.actionDialog.action = true;
  },

  OVERLAY_ON(state, message) {
    state.overlay.overlay = true;
    state.overlay.message = message;
  },

  OVERLAY_OFF(state) {
    state.overlay.overlay = false;
    state.overlay.message = '';
  },

  SET_ALERT(state, payload) {
    state.alerts.alert = true;
    state.alerts.type = payload.type;
    state.alerts.message = payload.message;
    setTimeout(() => {
      state.alerts.alert = false;
    }, 4000);
  },

  UPDATE_COMPONENT_KEY(state) {
    state.profileComponentKey += 1;
  },

  /** ********************** USER MUTATIONS ***************************** */

  OPEN_RESET_PASS(state) {
    state.resetDialog = true;
  },

  CLOSE_RESET_PASS(state) {
    state.resetDialog = false;
  },

  SET_USER_PROFILE(state, val) {
    state.userProfile = val;
  },

  CLICKED_USER_DETAILS(state, val) {
    state.userDetails = val;
  },

  /** ************** POSTS MUTATIONS ****************** */

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
    state.commentsData = arr;
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
};
