import Vue from 'vue';
import Vuex from 'vuex';

import { createPersistedState } from 'vuex-electron';

import modules from './modules';

Vue.use(Vuex);

const isDev = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules,
  ...(isDev && { plugins: [createPersistedState()] }),
  strict: isDev,
});
