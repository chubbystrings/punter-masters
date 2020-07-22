import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#AD1457',
        secondary: '#FCE4EC',
        error: '#dc3545',
        accent: '#e99fb8;',
        background: '#4CAF50',
      },
    },
    options: {
      customProperties: true,
    },
  },
});
