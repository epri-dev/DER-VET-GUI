import map from 'lodash/map';

import { getUtilityCompanies } from '@/service/OpenEI/request';

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
  resetUtilities({ commit }) {
    commit('SET_UTILITIES', []);
  },
  loadUtilities({ commit }, apiKey) {
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
  setApiKey({ commit }, newApiKey) {
    return new Promise((resolve) => {
      commit('SET_API_KEY', newApiKey);
      resolve();
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
