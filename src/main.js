import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/base';
import { auth } from './firebase';

Vue.config.productionTip = false;

let app;

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }

  if (user && user.emailVerified === true) {
    store.dispatch('fetchUserProfile', user);
  }
});
