import IpcService from '@/IpcService';
import { makeDervetInputs } from '@/models/dto/ProjectDto';

const NULL = null;

const getDefaultApplicationState = () => ({
  errorMessage: NULL,
  id: NULL,
  isError: NULL,
  pageCompleteness: {
    overview: {
      start: NULL,
      objectives: NULL,
      technologySpecs: NULL,
    },
    components: {},
  },
  resultsLoaded: NULL,
  runInProgress: NULL,
});

const namespaced = true;

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
  SET_RESULT_ERROR(state) {
    state.isError = true;
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
  setCompleteness({ commit }, payload) {
    commit('SET_COMPLETENESS', payload);
  },
  receiveError({ commit }) {
    // TODO: handle parsing error
    commit('SET_RESULT_ERROR');
  },
  resultRecieved: {
    root: true,
    handler({ commit }) {
      commit('SET_RESULT_SUCCESS');
    },
  },
  resetApplicationToDefault({ commit }, newId) {
    commit('RESET_APPLICATION_TO_DEFAULT');
    commit('SET_ID', newId);
  },
  runDervet({ commit }, project) {
    commit('SET_RUN_IN_PROGRESS');
    const dervetInputs = makeDervetInputs(project);
    IpcService.sendProject(dervetInputs);
  },
};

export default {
  namespaced,
  state,
  mutations,
  actions,
};
