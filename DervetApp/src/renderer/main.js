import Vue from 'vue';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './assets/site.css';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
