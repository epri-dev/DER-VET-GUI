import _ from 'lodash';
import Vue from 'vue';

import IpcService from '@/service/Ipc';
import { makeDervetInputs } from '@/service/ProjectDto';
import * as m from '@/store/mutationTypes';
import * as a from '@/store/actionTypes';
import { getDefaultApplicationState, defaultPageStatus } from '@/util/application';
import { isTimeSeries } from '@/service/Validation/TimeSeries/Factory';

// TODO Type this module with something like this design
// https://medium.com/@vlad_19457/using-action-creators-with-vuex-fd9bcf8fb838

const state = getDefaultApplicationState(false);

function getPageStatus(state) {
  return (page, id) => {
    if (id === undefined) {
      return state.pageStatus[page];
    }
    return state.pageStatus[page][id];
  };
}

const getters = {
  getPageStatus,
  isPageComplete(state) {
    return (page, id) => {
      const { submitted, errors } = getPageStatus(state)(page, id);
      return _.keys(errors).length === 0 && submitted;
    };
  },
  isPageSubmitted(state) {
    return (page, id) => getPageStatus(state)(page, id).submitted;
  },
  getPageErrors(state) {
    return (page, id) => getPageStatus(state)(page, id).errors;
  },
};

const mutations = {
  [m.SET_NEW_APPLICATION_STATE](state, application) {
    Object.assign(state, application);
  },
  [m.RESET_APPLICATION](state) {
    Object.assign(state, getDefaultApplicationState(false));
  },
  [m.SET_PAGE_STATUS](state, payload) {
    const {
      page,
      id,
      pageStatus,
    } = payload;
    if (id === undefined) {
      return state.pageStatus[page] = pageStatus;
    }
    return state.pageStatus[page][id] = pageStatus;
  },
  [m.SET_MANY_COLLECTION_PAGE_STATUS](state, payload) {
    const { collectionType, pageStatusSet } = payload;
    state.pageStatus[collectionType] = pageStatusSet;
  },
  [m.REMOVE_COLLECTION_PAGE_STATUS](state, payload) {
    const { page, id } = payload;
    Vue.delete(state.pageStatus[page], id);
  },
  // TODO add test
  [m.REMOVE_ALL_COLLECTION_PAGE_STATUS](state, page) {
    state.pageStatus[page] = {};
  },
  [m.MERGE_PAGE_STATUS](state, payload) {
    function customizer(stateValue, payloadValue) {
      if (_.isObject(stateValue) && !_.isArray(stateValue)) {
        const stateTimeSeriesKeys = _.filter(_.keys(stateValue), key => isTimeSeries(key));
        const payloadTimeSeriesKeys = _.filter(_.keys(payloadValue), key => isTimeSeries(key));

        // Get timeseries keys in state that aren't in payload
        const keysInStateNotPayload = _.difference(stateTimeSeriesKeys, payloadTimeSeriesKeys);

        if (!_.isEmpty(keysInStateNotPayload)) {
          const merged = _.merge(_.cloneDeep(stateValue), _.cloneDeep(payloadValue));
          _.each(keysInStateNotPayload, key => delete merged[key]);
          return merged;
        }
      }
      return undefined;
    }

    state.pageStatus = _.mergeWith(state.pageStatus, payload, customizer);
  },
  [m.SET_RUN_IN_PROGRESS](state) {
    state.runInProgress = true;
  },
  [m.SET_RUN_NOT_IN_PROGRESS](state) {
    state.runInProgress = false;
  },
  [m.SET_RESULT_SUCCESS](state) {
    state.resultsLoaded = true;
    state.dervetRunError = false;
  },
  [m.SET_RESULT_ERROR](state) {
    state.dervetRunError = true;
    state.runInProgress = false;
  },
};

const actions = {
  [a.SET_NEW_APPLICATION_STATE]({ commit }, application) {
    return new Promise((resolve) => {
      commit(m.SET_NEW_APPLICATION_STATE, application);
      resolve();
    });
  },
  [a.RESET]({ commit }) {
    commit(m.RESET_APPLICATION);
  },
  [a.SET_PAGE_STATUS]({ commit }, payload) {
    commit(m.SET_PAGE_STATUS, payload);
  },
  [a.SET_MANY_COLLECTION_PAGE_STATUS]({ commit }, payload) {
    commit(m.SET_MANY_COLLECTION_PAGE_STATUS, payload);
  },
  [a.REMOVE_COLLECTION_PAGE_STATUS]({ commit }, payload) {
    commit(m.REMOVE_COLLECTION_PAGE_STATUS, payload);
  },
  [a.REMOVE_ALL_COLLECTION_PAGE_STATUS]({ commit }, page) {
    commit(m.REMOVE_ALL_COLLECTION_PAGE_STATUS, page);
  },
  [a.SET_DEFAULT_PAGE_STATUS]({ commit }, payload) {
    commit(m.SET_PAGE_STATUS, {
      ...payload,
      pageStatus: defaultPageStatus(false),
    });
  },
  [a.MERGE_PAGE_STATUS]({ commit }, payload) {
    commit(m.MERGE_PAGE_STATUS, payload);
  },
  [a.RECEIVE_ERROR]({ commit }) {
    commit(m.SET_RUN_NOT_IN_PROGRESS);
    commit(m.SET_RESULT_ERROR);
    // TODO: handle parsing error here
  },
  [a.RUN_DERVET]({ commit }, project) {
    commit(m.SET_RUN_IN_PROGRESS);
    // TODO add try catch here HN
    const dervetInputs = makeDervetInputs(project);
    IpcService.sendProject(dervetInputs);
  },
  // TODO Rename KILL_DERVET for consistency
  [a.KILL_PYTHON]({ commit }) {
    commit(m.SET_RUN_NOT_IN_PROGRESS);
    IpcService.stopPython();
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
