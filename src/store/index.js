/* eslint-disable no-use-before-define */
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import state from './state';
import * as fb from '../firebase';

Vue.use(Vuex);

const HOUR = 1000 * 60 * 60;
const anHourAgo = new Date() - HOUR;

// LISTEN TO CHANGES TO NOTIFICATION TABLE
fb.notificationCollection.orderBy('createdOn', 'asc').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    // eslint-disable-next-line no-use-before-define
    if (change.doc.data().createdOn.toDate() >= anHourAgo) {
      if (store.state.notifications.notification === true) {
        store.commit('REMOVE_NOTIFICATION');
        store.commit('SHOW_NOTIFICATION', change.doc.data());
      }
      store.commit('SHOW_NOTIFICATION', change.doc.data());
    }
  });
});

const store = new Vuex.Store({
  state,
  mutations,
  actions,
});

export default store;
