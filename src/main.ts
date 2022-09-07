import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { worker } from './mocks/browser';
import './index.css';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
