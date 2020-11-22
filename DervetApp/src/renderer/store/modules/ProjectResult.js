import IpcService from '@/IpcService';
import { makeDervetInputs } from '@/models/dto/ProjectDto';
import ResultsData from '@/models/Results/Results';

const getDefaultResultState = () => ({
  id: null,
  sensitivityAnalysisCase: null,
  resultsLoaded: false,
  isError: false,
  data: null, // save result models here
  sensitivitySummary: null,
  runInProgress: false,
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
  SET_RESULT_SUCCESS(state, results) {
    state.data = results;
    state.resultsLoaded = true;
    state.runInProgress = false;
  },
  SET_RESULT_ERROR(state) {
    state.isError = true;
    state.runInProgress = false;
  },
  RESET_RESULT_TO_DEFAULT(state) {
    Object.assign(state, getDefaultResultState());
  },
};

const actions = {
  setId({ commit }, newId) {
    commit('SET_ID', newId);
  },
  runDervet({ commit }, project) {
    commit('SET_RUN_IN_PROGRESS');
    const dervetInputs = makeDervetInputs(project);
    IpcService.sendProject(dervetInputs);
  },
  receiveError({ commit }) {
    commit('SET_RESULT_ERROR');
  },
  receiveResults({ commit }, results) {
    // TODO: handle parsing error
    const resultDataObject = new ResultsData(0, results);
    commit('SET_RESULT_SUCCESS', resultDataObject);
  },
  resetResultToDefault({ commit }) {
    commit('RESET_RESULT_TO_DEFAULT');
  },
};

export default {
  state,
  mutations,
  actions,
};
