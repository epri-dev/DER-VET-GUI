import ResultsData from '@/models/Results/Results';

const getDefaultResultState = () => ({
  id: null,
  sensitivityAnalysisCase: null,
  data: null, // save result models here
  sensitivitySummary: null,

  // PLOTS - null if the charts dont exist
  deferralVueObjects: null,
  designVueObjects: null,
  dispatchVueObjects: null,
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
  CREATE_DISPATCH_PLOTS(state) {
    const runData = state.data;
    state.dispatchVueObjects = {
      stackedLineChart: runData.dispatchStackedLineChart,
      energyPriceMap: runData.dispatchEnergyPriceMap,
    };
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
      outageContribution: runData.reliabilityOutageContributionBarChart,
      showLoadCoverageProbability: runData.showLoadCoverageProbability,
      showOutageContribution: runData.showOutageContribution,
    };
  },
  CREATE_SUMMARY_PLOTS(state) {
    const runData = state.data;
    state.summaryVueObjects = {
      financial: runData.financialSummaryBarChart,
      dispatch: runData.dispatchSummaryMap,
      design: runData.designSummaryBarChart,
      showReliability: runData.showLoadCoverageProbability,
      showDeferral: runData.showDeferral,
      showDesign: runData.showPeakLoadDay,
    };
  },
  SET_ID(state, newId) {
    state.id = newId;
  },
  SET_RUN_IN_PROGRESS(state) {
    state.data = null;
    state.runInProgress = true;
  },
  SET_RESULT(state, results) {
    state.data = results;
  },
  RESET_RESULT_TO_DEFAULT(state) {
    Object.assign(state, getDefaultResultState());
  },
};

const actions = {
  createDeferralPlots({ commit }) {
    commit('CREATE_DEFERRAL_PLOTS');
  },
  createDesignPlots({ commit }) {
    commit('CREATE_DESIGN_PLOTS');
  },
  createDispatchPlots({ commit }) {
    commit('CREATE_DISPATCH_PLOTS');
  },
  createFinancialPlots({ commit }) {
    commit('CREATE_FINANCIAL_PLOTS');
  },
  createReliabilityPlots({ commit }) {
    commit('CREATE_RELIABILITY_PLOTS');
  },
  createSummaryPlots({ commit }) {
    commit('CREATE_SUMMARY_PLOTS');
  },
  receiveResults({ commit }, results) {
    // TODO: handle parsing error
    try {
      const resultDataObject = new ResultsData(0, results);
      commit('SET_RESULT', resultDataObject);
      commit('Application/SET_RESULT_SUCCESS');
    } catch (error) {
      commit('Application/SET_RESULT_ERROR');
      throw error;
    }
  },
  // TODO add action that transforms the data into plots here, call before mounting a page
  resetResultToDefault({ commit }, newId) {
    commit('RESET_RESULT_TO_DEFAULT');
    commit('SET_ID', newId);
  },
};

export default {
  state,
  mutations,
  actions,
};
