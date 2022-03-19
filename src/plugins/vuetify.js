import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // primary: '#AD1457',
        button: '#8E6BBF',
        primary: '#260D40',
        secondary: '#FCE4EC',
        error: '#dc3545',
        accent: '#a38d65',
        background: '#ede9f2',
      },
    },
    options: {
      customProperties: true,
    },
  },
});
