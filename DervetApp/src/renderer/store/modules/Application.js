import IpcService from '@/service/Ipc';
import { makeDervetInputs } from '@/models/dto/ProjectDto';
import * as m from '@/store/mutationTypes';
import * as a from '@/store/actionTypes';

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
      financial: {
        externalIncentives: [],
      },
    },
  },
  isError: NULL,
  pageCompleteness: { // TODO remove use HN
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

const state = getDefaultApplicationState();

const mutations = {
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
  [m.SET_NEW_ERROR_LIST](state, errorList) {
    state.errorList = errorList;
  },
  SET_NEW_APPLICATION_STATE(state, application) {
    Object.assign(state, application);
  },
  [m.RESET_APPLICATION](state) {
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
  [a.SET_NEW_APPLICATION_STATE]({ commit }, application) {
    return new Promise((resolve) => {
      commit('SET_NEW_APPLICATION_STATE', application);
      resolve();
    });
  },
  [a.RECEIVE_ERROR]({ commit }) {
    commit(m.SET_RUN_NOT_IN_PROGRESS);
    commit(m.SET_RESULT_ERROR);
    // TODO: handle parsing error here
  },
  [a.RESULTS_RECEIVED]: {
    root: true,
    handler({ commit }) {
      commit(m.SET_RUN_NOT_IN_PROGRESS);
      commit(m.SET_RESULT_SUCCESS);
    },
  },
  [a.RESET]({ commit }) {
    commit(m.RESET_APPLICATION);
  },
  [a.RUN_DERVET]({ commit }, project) {
    commit(m.SET_RUN_IN_PROGRESS);
    // TODO add try catch here HN
    const dervetInputs = makeDervetInputs(project);
    IpcService.sendProject(dervetInputs);
  },
  [a.KILL_PYTHON]({ commit }) {
    commit(m.SET_RUN_NOT_IN_PROGRESS);
    IpcService.stopPython();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
