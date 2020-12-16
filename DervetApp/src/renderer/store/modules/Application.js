import IpcService from '@/IpcService';
import { makeDervetInputs } from '@/models/dto/ProjectDto';

import { billReductionCompleteness } from '@/assets/cases/billReduction/project';

const NULL = null;

const getDefaultApplicationState = () => ({
  errorMessage: NULL,
  errorList: {
    overview: {
      start: NULL,
      objectives: NULL,
      technologySpecs: NULL,
    },
    components: {
      // technology: {},
      objectives: {
        siteInformation: NULL,
        deferral: NULL,
        FR: NULL,
        NSR: NULL,
        resilience: NULL,
        SR: NULL,
        userDefined: NULL,
        DA: NULL,
      },
      financial: {
        inputs: NULL,
        retailTariff: NULL,
      },
    },
  },
  id: NULL,
  isError: NULL,
  pageCompleteness: {
    overview: {
      start: NULL,
      objectives: NULL,
      technologySpecs: NULL,
    },
    components: {
      // technology: {},
      objectives: {
        siteInformation: NULL,
        deferral: NULL,
        FR: NULL,
        NSR: NULL,
        resilience: NULL,
        SR: NULL,
        userDefined: NULL,
        DA: NULL,
      },
      financial: {
        inputs: NULL,
        retailTariff: NULL,
      },
    },
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
    const {
      pageGroup,
      pageKey,
      page,
      completeness,
    } = payload;
    if (pageKey !== undefined) {
      // component pages
      state.pageCompleteness[pageGroup][pageKey][page] = completeness;
    } else {
      // overview pages
      state.pageCompleteness[pageGroup][page] = completeness;
    }
  },
  SET_ERROR_LIST(state, payload) {
    const {
      pageGroup,
      pageKey,
      page,
      errorList,
    } = payload;
    if (pageKey !== undefined) {
      // component pages
      state.errorList[pageGroup][pageKey][page] = errorList;
    } else {
      // overview pages
      state.errorList[pageGroup][page] = errorList;
    }
  },
  SET_FULL_COMPLETENESS(state, completeness) {
    state.pageCompleteness = completeness;
  },
  RESET_APPLICATION_TO_DEFAULT(state) {
    Object.assign(state, getDefaultApplicationState());
  },
};

const actions = {
  setCompleteness({ commit }, payload) {
    commit('SET_COMPLETENESS', payload);
  },
  setErrorList({ commit }, payload) {
    commit('SET_ERROR_LIST', payload);
  },
  setQuickStartCompleteness({ commit }) {
    commit('SET_FULL_COMPLETENESS', billReductionCompleteness);
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
