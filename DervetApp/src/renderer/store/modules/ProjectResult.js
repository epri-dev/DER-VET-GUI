import IpcService from '@/IpcService';
import { makeDervetInputs } from '@/models/dto/ProjectDto';
import ResultsData from '@/models/Results/Results';

const getDefaultResultState = () => ({
  id: null,
  sensitivityAnalysisCase: null,
  resultsLoaded: false,
  errorMessage: null,
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
  SET_RESULT_ERROR(state, errorMessage) {
    state.errorMessage = errorMessage;
    state.runInProgress = false;
  },
};

const actions = {
  setId({ commit }, newId) {
    commit('SET_ID', newId);
  },
  runDervet({ commit }, project) {
    const dervetInputs = makeDervetInputs(project);
    commit('SET_RUN_IN_PROGRESS');
    IpcService.sendProject(dervetInputs);
  },
  receiveError({ commit }, error) {
    commit('SET_RESULT_ERROR', error);
  },
  receiveResults({ commit }, results) {
    // TODO: handle parsing error
    const resultDataObject = new ResultsData(0, results);
    commit('SET_RESULT_SUCCESS', resultDataObject);
  },
};

export default {
  state,
  mutations,
  actions,
};
