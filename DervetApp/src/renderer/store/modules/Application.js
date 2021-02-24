import IpcService from '@/service/Ipc';
import { makeDervetInputs } from '@/models/dto/ProjectDto';
import * as m from '@/store/mutationTypes';
import * as a from '@/store/actionTypes';

import { billReductionCompleteness } from '@/assets/cases/billReduction/project';

const NULL = null;
export const APPLICATION = 'application';

const getDefaultApplicationState = () => ({
  errorMessage: NULL,
  errorList: {
    overview: {
      start: NULL,
      objectives: NULL,
      technologySpecs: NULL,
    },
    components: {
      objectives: {},
      financial: {},
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
        // this finance component is optional
        externalIncentives: true,
      },
    },
  },
  resultsLoaded: NULL,
  storeType: APPLICATION,
  runInProgress: NULL,
});

const namespaced = true;

const state = getDefaultApplicationState();

const mutations = {
  SET_ID(state, newId) {
    state.id = newId;
  },
  [m.SET_RUN_IN_PROGRESS](state) {
    state.runInProgress = true;
  },
  [m.SET_RUN_NOT_IN_PROGRESS](state) {
    state.runInProgress = false;
  },
  [m.SET_RESULT_SUCCESS](state) {
    state.resultsLoaded = true;
    state.isError = false;
  },
  [m.SET_RESULT_ERROR](state) {
    state.isError = true;
    state.runInProgress = false;
  },
  [m.SET_COMPLETENESS](state, payload) {
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
  [m.SET_ERROR_LIST](state, payload) {
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
  SET_NEW_COMPLETENESS(state, completeness) {
    state.pageCompleteness = completeness;
  },
  SET_NEW_APPLICATION_STATE(state, application) {
    Object.assign(state, application);
  },
  RESET_APPLICATION_TO_DEFAULT(state) {
    Object.assign(state, getDefaultApplicationState());
  },
};

const actions = {
  [a.SET_COMPLETENESS]({ commit }, payload) {
    commit(m.SET_COMPLETENESS, payload);
  },
  [a.SET_ERROR_LIST]({ commit }, payload) {
    commit(m.SET_ERROR_LIST, payload);
  },
  setNewApplicationState({ commit }, application) {
    return new Promise((resolve) => {
      commit('SET_NEW_APPLICATION_STATE', application);
      resolve();
    });
  },
  setQuickStartCompleteness({ commit }) {
    commit('SET_NEW_COMPLETENESS', billReductionCompleteness);
  },
  [a.RECEIVE_ERROR]({ commit }) {
    commit(m.SET_RESULT_ERROR);
    // TODO: handle parsing error here
    commit(m.SET_RUN_NOT_IN_PROGRESS);
  },
  [a.RESULTS_RECEIVED]: {
    root: true,
    handler({ commit }) {
      commit(m.SET_RESULT_SUCCESS);
      commit(m.SET_RUN_NOT_IN_PROGRESS);
    },
  },
  resetApplicationToDefault({ commit }, newId) {
    commit('RESET_APPLICATION_TO_DEFAULT');
    commit('SET_ID', newId);
  },
  runDervet({ commit }, project) {
    commit(m.SET_RUN_IN_PROGRESS);
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
