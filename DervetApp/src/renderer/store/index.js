import Vue from 'vue';
import Vuex from 'vuex';

import { createPersistedState } from 'vuex-electron';

import modules from './modules';

Vue.use(Vuex);

const isDev = process.env.NODE_ENV !== 'production';

const persistedStateSubset = createPersistedState({
  whitelist: ['SET_API_KEY', 'SET_UTILITIES'],
});
const fullPersistedState = createPersistedState();

export default new Vuex.Store({
  modules,
  ...({ plugins: isDev ? [fullPersistedState] : [persistedStateSubset] }),
  strict: isDev,
});
