import map from 'lodash/map';

import { getUtilityCompanies } from '@/service/OpenEI/request';
import * as a from '@/store/actionTypes';

const getDefaultOpenEIState = () => ({
  utilities: [],
  apiKey: null,
});

const state = getDefaultOpenEIState();

const mutations = {
  SET_UTILITIES(state, utilities) {
    state.utilities = utilities;
  },
  SET_API_KEY(state, apiKey) {
    state.apiKey = apiKey;
  },
};

const actions = {
  [a.RESET]() {
    // (TODO) All modules will have a reset action that's called by the global reset action,
    // but we never want to reset OpenEI state as part of the global reset.
    return null;
  },
  [a.LOAD_UTILITIES]({ commit }, apiKey) {
    return new Promise((resolve, reject) => {
      if (apiKey) {
        getUtilityCompanies(apiKey)
          .then((response) => {
            const values = map(response.data.items, v => v.label);
            commit('SET_UTILITIES', values);
          });
      } else {
        reject(new Error('Unable to load utilities: must provide an API key.'));
      }
    });
  },
  [a.SET_API_KEY]({ commit }, newApiKey) {
    return new Promise((resolve) => {
      commit('SET_API_KEY', newApiKey);
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
