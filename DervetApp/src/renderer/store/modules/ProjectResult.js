import ResultsData from '@/models/Results/Results';

const getDefaultResultState = () => ({
  id: null,
  sensitivityAnalysisCase: null,
  data: null, // save result models here
  sensitivitySummary: null,
});

const state = getDefaultResultState();

const mutations = {
  SET_ID(state, newId) {
    state.id = newId;
  },
  SET_RUN_IN_PROGRESS(state) {
    state.data = null;
    state.runInProgress = true;
  },
  SET_RESULT(state, results) {
    state.data = results;
  },
  RESET_RESULT_TO_DEFAULT(state) {
    Object.assign(state, getDefaultResultState());
  },
};

const actions = {
  receiveResults({ commit }, results) {
    // TODO: handle parsing error
    const resultDataObject = new ResultsData(0, results);
    commit('SET_RESULT', resultDataObject);
  },
  // TODO add action that transforms the data into plots here, call before mounting a page
  resetResultToDefault({ commit }, newId) {
    commit('RESET_RESULT_TO_DEFAULT');
    commit('SET_ID', newId);
  },
};

export default {
  state,
  mutations,
  actions,
};
