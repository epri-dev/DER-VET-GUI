import map from 'lodash/map';

import { getUtilityCompanies } from '@/service/OpenEI/request';

const getDefaultApplicationState = () => ({
  utilities: null,
});

const state = getDefaultApplicationState();

const mutations = {
  SET_UTILITIES(state, utilities) {
    state.utilities = utilities;
  },
};

const actions = {
  resetUtilities({ commit }) {
    commit('SET_UTILITIES', null);
  },
  loadUtilities({ commit }) {
    getUtilityCompanies('NDaTseTlWcxclr9jN2c0xxMKgn9aNJ55G0zGhmVb')
      .then((response) => {
        const values = map(response.data.items, v => v.label);
        commit('SET_UTILITIES', values);
      })
      .catch(err => {
        console.log(err);
      });
  },
};

export default {
  state,
  mutations,
  actions,
};
