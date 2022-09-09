import Vue from 'vue';
import { GraphQLClient } from 'graphql-request';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
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

const apolloClient = new ApolloClient({
  uri: 'https://api-sa-east-1.hygraph.com/v2/cl7to33t006a801ul74826xik/master',
});

Vue.use(VueApollo);
Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
