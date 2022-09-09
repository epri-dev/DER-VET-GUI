import ResultsData from '@/models/Results/Results';
import * as a from '@/store/actionTypes';
import * as m from '@/store/mutationTypes';

const getDefaultResultState = () => ({
  id: null,
  path: null,
  sensitivityAnalysisCase: null,
  data: null, // save result models here
  sensitivitySummary: null,

  // PLOTS - null if the charts dont exist
  deferralVueObjects: null,
  designVueObjects: null,
  dispatchData: null,
  dispatchEnergyPriceMapData: null,
  financialVueObjects: null,
  reliabilityVueObjects: null,
  summaryVueObjects: null,
});

const state = getDefaultResultState();

const mutations = {
  CREATE_DEFERRAL_PLOTS(state) {
    const runData = state.data;
    state.deferralVueObjects = {
      ...runData.deferralStackedBarChart,
    };
  },
  CREATE_DESIGN_PLOTS(state) {
    const runData = state.data;
    state.designVueObjects = {
      sizeTable: runData.designSizeResultsTable,
      costsTable: runData.designCostsTable,
      numPowerCol: runData.size.numPowerCols,
      numEnergyCol: runData.size.numEnergyCols,
    };
  },
  CREATE_DISPATCH_PLOTS(state) { // TODO put in mutation constants
    const runData = state.data;
    state.dispatchEnergyPriceMapData = runData.dispatchEnergyPriceMapData;
    state.dispatchData = runData.dispatchData;
  },
  CREATE_FINANCIAL_PLOTS(state) {
    const runData = state.data;
    state.financialVueObjects = {
      costBenefit: runData.financialCostBenefitBarChart,
      proForma: runData.financialProformaTable,
      monthlyData: runData.financialBeforeAfterBarChart,
      showMonthlyData: runData.showBeforeAfterMonthlyEnergyBill,
    };
  },
  CREATE_RELIABILITY_PLOTS(state) {
    const runData = state.data;
    state.reliabilityVueObjects = {
      loadCoverageProbability: runData.reliabilityLoadCoverageLineChart,
      outageContribution: runData.reliabilityOutageContributionData,
      showLoadCoverageProbability: runData.showLoadCoverageProbability,
      showOutageContribution: runData.showOutageContribution,
    };
  },
  CREATE_SUMMARY_PLOTS(state) {
    const runData = state.data;
    state.summaryVueObjects = {
      financial: runData.financialSummaryBarChart,
      dispatchData: runData.dispatchSummaryMapData,
      design: runData.designSummaryBarChart,
      showReliability: runData.showLoadCoverageProbability,
      showDeferral: runData.showDeferral,
      showDesign: runData.showPeakLoadDay,
    };
  },
  SET_PATH(state, newPath) {
    state.path = newPath;
  },
  SET_RUN_IN_PROGRESS(state) {
    state.data = null;
    state.runInProgress = true;
  },
  SET_RESULT(state, results) {
    state.data = results;
  },
  [m.RESET_RESULTS](state) {
    Object.assign(state, getDefaultResultState());
  },
};

const actions = {
  [a.RECEIVE_RESULTS]({ commit }, results) {
    // TODO: handle parsing error
    commit(`Application/${m.SET_RUN_NOT_IN_PROGRESS}`, null, { root: true });
    try {
      const resultDataObject = new ResultsData(results);
      commit('SET_RESULT', resultDataObject);
      commit('SET_PATH', results.resultsPath);
      commit('Application/SET_RESULT_SUCCESS', null, { root: true });
      commit('CREATE_SUMMARY_PLOTS');
      commit('CREATE_FINANCIAL_PLOTS');
      commit('CREATE_DISPATCH_PLOTS');
      commit('CREATE_DESIGN_PLOTS');
      commit('CREATE_RELIABILITY_PLOTS');
      commit('CREATE_DEFERRAL_PLOTS');
    } catch (error) {
      commit('Application/SET_RESULT_ERROR', null, { root: true });
      throw error;
    }
  },
  // TODO add action that transforms the data into plots here, call before mounting a page
  [a.RESET]({ commit }) {
    commit(m.RESET_RESULTS);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
