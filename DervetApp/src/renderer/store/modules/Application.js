const NULL = null;

const getDefaultApplicationState = () => ({
  errorMessage: NULL,
  id: NULL,
  pageCompleteness: {
    overview: {
      objectives: NULL,
      start: NULL,
      technologySpecs: NULL,
    },
    components: {
      // TODO mutably build based on selected technology & objectives upon naviation AWAY from page
      financialInputs: NULL,
      financialInputsExternalIncentives: NULL,
      financialInputsRetailTariff: NULL,
      objectivesDA: NULL,
      objectivesDeferral: NULL,
      objectivesFR: NULL,
      objectivesNSR: NULL,
      objectivesReliability: NULL,
      objectivesSiteInformation: NULL,
      objectivesSR: NULL,
      objectivesUserDefiined: NULL,
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
