import Vue from 'vue';
import Vuelidate from 'vuelidate';
import router from '@/router';
import store from '@/store';

Vue.use(Vuelidate);

const mountVueElement = (component, props) => (
  new Vue({
    el: document.createElement('div'),
    render: h => h(
      component,
      { props },
    ),
    router,
    store,
  }).$mount()
);

export default mountVueElement;
