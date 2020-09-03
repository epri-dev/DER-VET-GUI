const getDefaultResultState = () => ({
  id: null,
  sensitivityAnalysisCase: null,
  resultsLoaded: false,
  errorMessage: null,
  data: [], // save result models here
  sensitivitySummary: null,

});

const state = getDefaultResultState();

// const getters = {
// };

const mutations = {
  SET_ID(state, newId) {
    state.id = newId;
  },
  
};

const actions = {
  setId({ commit }, newId) {
    commit('SET_ID', newId);
  },
  
};

export default {
  state,
  // getters,
  mutations,
  actions,
};


