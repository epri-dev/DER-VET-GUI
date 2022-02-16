import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import modules from './modules';
import { actions } from './global';

Vue.use(Vuex);

const isDev = process.env.NODE_ENV !== 'production';

const persistedStateSubset = createPersistedState({ paths: ['OpenEI'] });
const fullPersistedState = createPersistedState();
const persistedState = isDev ? fullPersistedState : persistedStateSubset;

export default new Vuex.Store({
  modules,
  ...({ plugins: [persistedState] }),
  strict: isDev,
  actions,
});
