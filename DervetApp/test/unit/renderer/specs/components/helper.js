import Vue from 'vue';
import router from '@/router';
import store from '@/store';

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
