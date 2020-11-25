const getDefaultApplicationState = () => ({
  errorMessage: null,
  id: null,
  pageCompleteness: {
    overview: {
      objectives: null,
      start: null,
      technologySpecs: null,
    },
    components: {
      // TODO mutably build based on selected technology & objectives upon naviation AWAY from page
      financialInputs: null,
      financialInputsExternalIncentives: null,
      financialInputsRetailTariff: null,
      objectivesDA: null,
      objectivesDeferral: null,
      objectivesFR: null,
      objectivesNSR: null,
      objectivesReliability: null,
      objectivesSiteInformation: null,
      objectivesSR: null,
      objectivesUserDefiined: null,
      // note: technologies are ignored bc they have a complete attribute (TODO: record them here?)
    },
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
  SET_COMPLETENESS(state, pageGroup, page, completeness) {
    state.pageCompleteness[pageGroup][page] = completeness;
  },
};

const actions = {
  setId({ commit }, newId) {
    commit('SET_ID', newId);
  },
  setCompleteness({ commit }, pageGroup, page, completeness) {
    commit('SET_COMPLETENESS', pageGroup, page, completeness);
  },
  receiveError({ commit }, error) {
    commit('SET_RESULT_ERROR', error);
  },
  resultRecieved({ commit }) {
    commit('SET_RESULT_SUCCESS');
  },
};

export default {
  state,
  mutations,
  actions,
};
