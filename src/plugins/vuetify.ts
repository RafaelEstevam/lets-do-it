import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#E53935',
        secondary: '#3F51B5',
        accent: '#FFCDD2',
      },
    },
  },
});
