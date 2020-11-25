const NULL = null;

const getDefaultApplicationState = () => ({
  errorMessage: NULL,
  id: NULL,
  pageCompleteness: {
    overview: {
      start: null,
      objectives: null,
      technologySpecs: null,
    },
    components: {},
  },
  resultsLoaded: false,
  runInProgress: false,
});

const state = getDefaultApplicationState();

const mutations = {
  SET_ID(state, newId) {
    state.id = newId;
  },
  SET_RUN_IN_PROGRESS(state) {
    state.runInProgress = true;
  },
  SET_RESULT_SUCCESS(state) {
    state.resultsLoaded = true;
    state.runInProgress = false;
  },
  SET_RESULT_ERROR(state, errorMessage) {
    state.errorMessage = errorMessage;
    state.runInProgress = false;
  },
  SET_COMPLETENESS(state, payload) {
    const { pageGroup, page, completeness } = payload;
    state.pageCompleteness[pageGroup][page] = completeness;
  },
  RESET_APPLICATION_TO_DEFAULT(state) {
    Object.assign(state, getDefaultApplicationState());
  },
};

const actions = {
  setId({ commit }, newId) {
    commit('SET_ID', newId);
  },
  setCompleteness({ commit }, payload) {
    commit('SET_COMPLETENESS', payload);
  },
  receiveError({ commit }, error) {
    commit('SET_RESULT_ERROR', error);
  },
  resultRecieved({ commit }) {
    commit('SET_RESULT_SUCCESS');
  },
  resetApplicationToDefault({ commit }) {
    commit('RESET_APPLICATION_TO_DEFAULT');
  },
};

export default {
  state,
  mutations,
  actions,
};
