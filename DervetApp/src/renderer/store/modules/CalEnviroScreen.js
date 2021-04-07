import loadCesScoresFromFile from '@/assets/CalEnviroScreen/csvLoader';
import { parsedCsvToCesScores } from '@/models/CalEnviroScreen/Score';
import * as a from '@/store/actionTypes';

const getDefaultApplicationState = () => ({
  cesScores: null,
  zipCode: null,
});

const state = getDefaultApplicationState();

const getters = {
  getCesScoresByZipCode(state) {
    return zipCode => state.cesScores.filter(score => score.zipCode === zipCode);
  },
};

const mutations = {
  SET_CES_SCORES(state, cesScores) {
    state.cesScores = cesScores;
  },
  SET_ZIP_CODE(state, zipCode) {
    state.zipCode = zipCode;
  },
};

const actions = {
  [a.RESET_ZIP_CODE]({ commit }) {
    commit('SET_ZIP_CODE', null);
  },
  setZipCode({ commit }, zipCode) {
    commit('SET_ZIP_CODE', zipCode);
  },
  loadCesScores({ commit }) {
    loadCesScoresFromFile()
      .then((parsedCsv) => {
        commit('SET_CES_SCORES', parsedCsvToCesScores(parsedCsv.data));
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
