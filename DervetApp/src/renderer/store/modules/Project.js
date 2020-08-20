import { cloneDeep } from 'lodash';


const getDefaultState = () => ({
  id: null,
  name: null,
  type: null,
  startYear: (new Date()).getFullYear(),
  analysisHorizon: 0,
  analysisHorizonMode: '1',
  dataYear: (new Date()).getFullYear(),
  gridLocation: 'Customer',
  ownership: 'Customer',
  resultsData: null,
  technologySpecsSolarPV: [],
  technologySpecsICE: [],
  technologySpecsBattery: [],
  discountRate: 0,
  inflationRate: 0,
  federalTaxRate: 0,
  stateTaxRate: 0,
  propertyTaxRate: 0,
  noChargingFromGrid: false,
  noDischargingToGrid: false,
  siteLoad: null,
  deferralPlannedLoadLimit: 0,
  deferralReversePowerFlowLimit: 0,
  deferralGrowth: 0,
  deferralPrice: 0,
  deferralLoad: null,
});

const state = getDefaultState();

const getters = {
  getSolarPVById(state) {
    return id => state.technologySpecsSolarPV.find(x => x.id === id);
  },
  getSolarPVSpecsClone(state) {
    return () => cloneDeep(state.technologySpecsSolarPV);
  },
  getIndexOfSolarId(state) {
    return id => state.technologySpecsSolarPV.findIndex(x => x.id === id);
  },
  getICEById(state) {
    return id => state.technologySpecsICE.find(x => x.id === id);
  },
  getICESpecsClone(state) {
    return () => cloneDeep(state.technologySpecsICE);
  },
  getIndexOfICEId(state) {
    return id => state.technologySpecsICE.findIndex(x => x.id === id);
  },
  getBatteryById(state) {
    return id => state.technologySpecsBattery.find(x => x.id === id);
  },
  getBatterySpecsClone(state) {
    return () => cloneDeep(state.technologySpecsBattery);
  },
  getIndexOfBatteryId(state) {
    return id => state.technologySpecsBattery.findIndex(x => x.id === id);
  },
};

const mutations = {
  SET_ID(state, newId) {
    state.id = newId;
  },
  SET_NAME(state, newName) {
    state.name = newName;
  },
  SET_TYPE(state, type) {
    state.type = type;
  },
  SET_DISCOUNT_RATE(state, newDiscountRate) {
    state.discountRate = newDiscountRate;
  },
  SET_INFLATION_RATE(state, newInflationRate) {
    state.inflationRate = newInflationRate;
  },
  SET_FEDERAL_TAX_RATE(state, newFederalTaxRate) {
    state.federalTaxRate = newFederalTaxRate;
  },
  SET_STATE_TAX_RATE(state, newStateTaxRate) {
    state.stateTaxRate = newStateTaxRate;
  },
  SET_PROPERTY_TAX_RATE(state, newPropertyTaxRate) {
    state.propertyTaxRate = newPropertyTaxRate;
  },
  SET_NO_CHARGING_FROM_GRID(state, newNoChargingFromGrid) {
    state.noChargingFromGrid = newNoChargingFromGrid;
  },
  SET_NO_DISCHARGING_TO_GRID(state, newNoDischargingToGrid) {
    state.noDischargingToGrid = newNoDischargingToGrid;
  },
  SET_SITE_LOAD(state, newSiteLoad) {
    state.siteLoad = newSiteLoad;
  },
  SET_DEFERRAL_PLANNED_LOAD_LIMIT(state, newDeferralPlannedLoadLimit) {
    state.deferralPlannedLoadLimit = newDeferralPlannedLoadLimit;
  },
  SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT(state, newDeferralReversePowerFlowLimit) {
    state.deferralReversePowerFlowLimit = newDeferralReversePowerFlowLimit;
  },
  SET_DEFERRAL_GROWTH(state, newDeferralGrowth) {
    state.deferralGrowth = newDeferralGrowth;
  },
  SET_DEFERRAL_PRICE(state, newDeferralPrice) {
    state.deferralPrice = newDeferralPrice;
  },
  SET_DEFERRAL_LOAD(state, newDeferralLoad) {
    state.deferralLoad = newDeferralLoad;
  },
  ADD_TECHNOLOGY_SPECS_SOLAR_PV(state, newSolar) {
    state.technologySpecsSolarPV.push(newSolar);
  },
  ADD_TECHNOLOGY_SPECS_ICE(state, newICE) {
    state.technologySpecsICE.push(newICE);
  },
  ADD_TECHNOLOGY_SPECS_BATTERY(state, newBattery) {
    state.technologySpecsBattery.push(newBattery);
  },
  REPLACE_TECHNOLOGY_SPECS_SOLAR_PV(state, payload) {
    const tmpSolarPVSpecs = getters.getSolarPVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.solarId);
    tmpSolarPVSpecs[indexMatchingId] = payload.newSolar;
    state.technologySpecsSolarPV = tmpSolarPVSpecs;
  },
  REPLACE_TECHNOLOGY_SPECS_ICE(state, payload) {
    const tmpICESpecs = getters.getICESpecsClone(state)();
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.iceId);
    tmpICESpecs[indexMatchingId] = payload.newICE;
    state.technologySpecsICE = tmpICESpecs;
  },
  REPLACE_TECHNOLOGY_SPECS_BATTERY(state, payload) {
    const tmpBatterySpecs = getters.getBatterySpecsClone(state)();
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.batteryId);
    tmpBatterySpecs[indexMatchingId] = payload.newBattery;
    state.technologySpecsBattery = tmpBatterySpecs;
  },
  ADD_GENERATION_PROFILE_TO_TECHNOLOGY_SPECS_PV(state, payload) {
    const tmpSolarPVSpecs = getters.getSolarPVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.solarId);
    tmpSolarPVSpecs[indexMatchingId].generationProfile = payload.generationProfile;
    state.technologySpecsSolarPV = tmpSolarPVSpecs;
  },
  RESET_PROJECT_TO_DEFAULT(state) {
    Object.assign(state, getDefaultState());
  },
  SET_START_YEAR(state, newStartYear) {
    state.startYear = newStartYear;
  },
  SET_ANALYSIS_HORIZON_MODE(state, newAnalysisHorizonMode) {
    state.analysisHorizonMode = newAnalysisHorizonMode;
  },
  SET_ANALYSIS_HORIZON(state, newAnalysisHorizon) {
    state.analysisHorizon = newAnalysisHorizon;
  },
  SET_DATA_YEAR(state, newDataYear) {
    state.dataYear = newDataYear;
  },
  SET_GRID_LOCATION(state, newGridLocation) {
    state.gridLocation = newGridLocation;
  },
  SET_OWNERSHIP(state, newOwnership) {
    state.ownership = newOwnership;
  },
};

const actions = {
  setId({ commit }, newId) {
    commit('SET_ID', newId);
  },
  setName({ commit }, newName) {
    commit('SET_NAME', newName);
  },
  setType({ commit }, type) {
    commit('SET_TYPE', type);
  },
  setDiscountRate({ commit }, newDiscountRate) {
    commit('SET_DISCOUNT_RATE', newDiscountRate);
  },
  setInflationRate({ commit }, newInflationRate) {
    commit('SET_INFLATION_RATE', newInflationRate);
  },
  setFederalTaxRate({ commit }, newFederalTaxRate) {
    commit('SET_FEDERAL_TAX_RATE', newFederalTaxRate);
  },
  setStateTaxRate({ commit }, newStateTaxRate) {
    commit('SET_STATE_TAX_RATE', newStateTaxRate);
  },
  setPropertyTaxRate({ commit }, newPropertyTaxRate) {
    commit('SET_PROPERTY_TAX_RATE', newPropertyTaxRate);
  },
  setNoChargingFromGrid({ commit }, newNoChargingFromGrid) {
    commit('SET_NO_CHARGING_FROM_GRID', newNoChargingFromGrid);
  },
  setNoDischargingToGrid({ commit }, newNoDischargingToGrid) {
    commit('SET_NO_DISCHARGING_TO_GRID', newNoDischargingToGrid);
  },
  setSiteLoad({ commit }, newSiteLoad) {
    commit('SET_SITE_LOAD', newSiteLoad);
  },
  setDeferralPlannedLoadLimit({ commit }, newDeferralPlannedLoadLimit) {
    commit('SET_DEFERRAL_PLANNED_LOAD_LIMIT', newDeferralPlannedLoadLimit);
  },
  setDeferralReversePowerFlowLimit({ commit }, newDeferralReversePowerFlowLimit) {
    commit('SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT', newDeferralReversePowerFlowLimit);
  },
  setDeferralGrowth({ commit }, newDeferralGrowth) {
    commit('SET_DEFERRAL_GROWTH', newDeferralGrowth);
  },
  setDeferralPrice({ commit }, newDeferralPrice) {
    commit('SET_DEFERRAL_PRICE', newDeferralPrice);
  },
  setDeferralLoad({ commit }, newDeferralLoad) {
    commit('SET_DEFERRAL_LOAD', newDeferralLoad);
  },
  addTechnologySpecsSolarPV({ commit }, newSolar) {
    commit('ADD_TECHNOLOGY_SPECS_SOLAR_PV', newSolar);
  },
  addTechnologySpecsICE({ commit }, newICE) {
    commit('ADD_TECHNOLOGY_SPECS_ICE', newICE);
  },
  addTechnologySpecsBattery({ commit }, newBattery) {
    commit('ADD_TECHNOLOGY_SPECS_BATTERY', newBattery);
  },
  replaceTechnologySpecsSolarPV({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_SOLAR_PV', payload);
  },
  replaceTechnologySpecsICE({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_ICE', payload);
  },
  replaceTechnologySpecsBattery({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_BATTERY', payload);
  },
  addGenerationProfileToTechnologySpecsPV({ commit }, payload) {
    commit('ADD_GENERATION_PROFILE_TO_TECHNOLOGY_SPECS_PV', payload);
  },
  resetProjectToDefault({ commit }) {
    commit('RESET_PROJECT_TO_DEFAULT');
  },
  setStartYear({ commit }, newStartYear) {
    commit('SET_START_YEAR', newStartYear);
  },
  setAnalysisHorizonMode({ commit }, newAnalysisHorizonMode) {
    commit('SET_ANALYSIS_HORIZON_MODE', newAnalysisHorizonMode);
  },
  setAnalysisHorizon({ commit }, newAnalysisHorizon) {
    commit('SET_ANALYSIS_HORIZON', newAnalysisHorizon);
  },
  setDataYear({ commit }, newDataYear) {
    commit('SET_DATA_YEAR', newDataYear);
  },
  setGridLocation({ commit }, newGridLocation) {
    commit('SET_GRID_LOCATION', newGridLocation);
  },
  setOwnership({ commit }, newOwnership) {
    commit('SET_OWNERSHIP', newOwnership);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
