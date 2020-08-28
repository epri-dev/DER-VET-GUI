import { cloneDeep } from 'lodash';
import PageLink from '../../models/PageRouting';


const getDefaultState = () => ({
  id: null,
  name: null,
  type: null,
  resultsData: null,

  energyPriceSourceWholesale: false,
  objectivesRetailEnergyChargeReduction: false,
  objectivesDA: false,

  listOfActiveServices: [],
  objectivesResilience: false,
  objectivesBackupPower: false,
  objectivesRetailDemandChargeReduction: false,
  objectivesSR: false,
  objectivesNSR: false,
  objectivesFR: false,
  objectivesDeferral: false,
  objectivesLoadFollowing: false,
  objectivesUserDefined: false,
  paths: {
    startProject: '/wizard/start-project',
    techSpecs: '/wizard/technology-specs',
    sensitivityAnalysis: '/wizard/sensitivity-analysis',
    objectives: '/wizard/objectives',
    objectivesSiteInformation: '/wizard/objectives-parameters-site-information',
    objectivesDeferral: '/wizard/objectives-parameters-deferral',
    objectivesDA: '/wizard/objectives-parameters-da',
    objectivesFR: '/wizard/objectives-parameters-fr',
    objectivesSR: '/wizard/objectives-parameters-sr',
    objectivesNSR: '/wizard/objectives-parameters-nsr',
    objectivesUserDefined: '/wizard/objectives-parameters-user-defined',
    objectivesReliability: '/wizard/objectives-parameters-reliability',
    financialInputs: '/wizard/financial-inputs',
    financialInputsExternalIncentives: '/wizard/financial-inputs-external-incentives',
    financialInputsRetailTariff: '/wizard/financial-inputs-retail-tariff',
  },
  routeObjectivesFinancialsLL: null,

  // SCENARIO
  startYear: (new Date()).getFullYear(),
  analysisHorizon: 0,
  analysisHorizonMode: '1',
  dataYear: (new Date()).getFullYear(),
  gridLocation: 'Customer',
  ownership: 'Customer',
  optimizationHorizon: 'year',
  optimizationHorizonNum: 0,
  timestep: 60,
  noChargingFromGrid: false,
  noDischargingToGrid: false,
  // FINANCES
  discountRate: 0,
  inflationRate: 0,
  federalTaxRate: 0,
  stateTaxRate: 0,
  propertyTaxRate: 0,
  // DEFERRAL
  deferralPlannedLoadLimit: 0,
  deferralReversePowerFlowLimit: 0,
  deferralGrowth: 0,
  deferralPrice: 0,

  daGrowth: 0,

  srGrowth: 0,
  srDuration: 0,

  nsrGrowth: 0,
  nsrDuration: 0,

  frEOU: 0.3,
  frEOD: 0.3,
  frGrowth: 0,
  frEnergyPriceGrowth: 0,
  frCombinedMarket: false,
  frDuration: 0,

  reliabilityTarget: 4,
  postOptimizationOnly: false,
  reliabilityNu: 20,
  reliabilityGamma: 43,
  reliabilityMaxOutageDuration: 168,

  userPrice: 0,
  // DERS
  technologySpecsSolarPV: [],
  technologySpecsICE: [],
  technologySpecsBattery: [],
  // TARIFF
  retailTariffBillingPeriods: [],
  // TIMESERIES ARRAYS
  siteLoad: null,
  deferralLoad: null,
  daPrice: null,
  srPrice: null,
  nsrPrice: null,
  frPrice: null,
  frUpPrice: null,
  frDownPrice: null,
  criticalLoad: null,
  userPowerMin: null,
  userPowerMax: null,
  userEnergyMin: null,
  userEnergyMax: null,
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
  getIndexOfBillingPeriodId(state) {
    return id => state.retailTariffBillingPeriods.findIndex(x => x.id === id);
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
  SET_RELIABILITY_POST_OPTIMIZATION_ONLY(state, newPostOptimizationOnly) {
    state.postOptimizationOnly = newPostOptimizationOnly;
  },
  SET_RELIABILITY_TARGET(state, newReliabilityTarget) {
    state.reliabilityTarget = newReliabilityTarget;
  },
  SET_RELIABILITY_NU(state, newReliabilityNu) {
    state.reliabilityNu = newReliabilityNu;
  },
  SET_RELIABILITY_GAMMA(state, newReliabilityGamma) {
    state.reliabilityGamma = newReliabilityGamma;
  },
  SET_RELIABILITY_MAX_OUTAGE_DURATION(state, newReliabilityMaxOutageDuration) {
    state.reliabilityMaxOutageDuration = newReliabilityMaxOutageDuration;
  },
  SET_CRITICAL_LOAD(state, newCriticalLoad) {
    state.criticalLoad = newCriticalLoad;
  },
  SET_DA_GROWTH(state, newDAGrowth) {
    state.daGrowth = newDAGrowth;
  },
  SET_DA_PRICE(state, newDAPrice) {
    state.daPrice = newDAPrice;
  },
  SET_SR_GROWTH(state, newSRGrowth) {
    state.srGrowth = newSRGrowth;
  },
  SET_SR_PRICE(state, newSRPrice) {
    state.srPrice = newSRPrice;
  },
  SET_SR_DURATION(state, newSRDuration) {
    state.srDuration = newSRDuration;
  },
  SET_NSR_GROWTH(state, newNSRGrowth) {
    state.nsrGrowth = newNSRGrowth;
  },
  SET_NSR_PRICE(state, newNSRPrice) {
    state.nsrPrice = newNSRPrice;
  },
  SET_NSR_DURATION(state, newNSRDuration) {
    state.nsrDuration = newNSRDuration;
  },
  SET_FR_EOU(state, newFReou) {
    state.frEou = newFReou;
  },
  SET_FR_EOD(state, newFReod) {
    state.frEod = newFReod;
  },
  SET_FR_GROWTH(state, newFRGrowth) {
    state.frGrowth = newFRGrowth;
  },
  SET_FR_ENERGY_GROWTH(state, newFREnergyGrowth) {
    state.frEnergyPriceGrowth = newFREnergyGrowth;
  },
  SET_FR_COMBINED_MARKET(state, newFRCombinedMarket) {
    state.frCombinedMarket = newFRCombinedMarket;
  },
  SET_FR_DURATION(state, newFRDuration) {
    state.frDuration = newFRDuration;
  },
  SET_FR_PRICE(state, newFRPrice) {
    state.frPrice = newFRPrice;
  },
  SET_FR_UP_PRICE(state, newFRUpPrice) {
    state.frUpPrice = newFRUpPrice;
  },
  SET_FR_DOWN_PRICE(state, newFRDownPrice) {
    state.frDownPrice = newFRDownPrice;
  },
  SET_USER_PRICE(state, newUserPrice) {
    state.userPrice = newUserPrice;
  },
  SET_USER_POWER_MAX(state, newUserPowerMax) {
    state.userPowerMax = newUserPowerMax;
  },
  SET_USER_POWER_MIN(state, newUserPowerMin) {
    state.userPowerMin = newUserPowerMin;
  },
  SET_USER_ENERGY_MAX(state, newUserEnergyMax) {
    state.userEnergyMax = newUserEnergyMax;
  },
  SET_USER_ENERGY_MIN(state, newUserEnergyMin) {
    state.userEnergyMin = newUserEnergyMin;
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
  ADD_RETAIL_TARIFF_BILLING_PERIOD(state, newBillingPeriod) {
    state.retailTariffBillingPeriods.push(newBillingPeriod);
  },
  REPLACE_RETAIL_TARIFF_BILLING_PERIODS(state, newBillingPeriods) {
    state.retailTariffBillingPeriods = newBillingPeriods;
  },
  REMOVE_RETAIL_TARIFF_BILLING_PERIOD(state, id) {
    const index = getters.getIndexOfBillingPeriodId(state)(id);
    state.retailTariffBillingPeriods.splice(index, 1);
  },
  REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS(state) {
    state.retailTariffBillingPeriods = [];
  },
  ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY(state, payload) {
    const tmpBatterySpecs = getters.getBatterySpecsClone(state)();
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.batteryId);
    tmpBatterySpecs[indexMatchingId].batteryCycles = payload.batteryCycles;
    state.technologySpecsBattery = tmpBatterySpecs;
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
  SET_TIMESTEP(state, newTimestep) {
    state.timestep = newTimestep;
  },
  SET_OPTIMIZATION_HORIZON(state, newOptimizataionHorizon) {
    state.optimizationHorizon = newOptimizataionHorizon;
  },
  SET_OPTIMIZATION_HORIZON_NUM(state, newOptimizataionHorizonNum) {
    state.optimizationHorizonNum = newOptimizataionHorizonNum;
  },
  CHOOSE_ENERGY_STRUCTURE(state, wholesaleEnergyPrices) {
    state.energyPriceSourceWholesale = wholesaleEnergyPrices;
    if (wholesaleEnergyPrices) {
      state.objectivesDA = true;
    } else {
      state.objectivesRetailEnergyChargeReduction = true;
    }
  },
  SELECT_OTHER_SERVICES(state, listOfServices) {
    state.listOfActiveServices = listOfServices;
    state.objectivesResilience = (listOfServices.indexOf('Reliability') > -1);
    state.objectivesBackupPower = (listOfServices.indexOf('BackupPower') > -1);
    state.objectivesRetailDemandChargeReduction = (listOfServices.indexOf('RetailDemandChargeReduction') > -1);
    state.objectivesSR = (listOfServices.indexOf('SR') > -1);
    state.objectivesNSR = (listOfServices.indexOf('NSR') > -1);
    state.objectivesFR = (listOfServices.indexOf('FR') > -1);
    state.objectivesLoadFollowing = (listOfServices.indexOf('LF') > -1);
    state.objectivesDeferral = (listOfServices.indexOf('Deferral') > -1);
    state.objectivesUserDefined = (listOfServices.indexOf('UserDefined') > -1);
  },
  SET_OBJECTIVE_FINANCES_ORDER(state) {
    let tail = null;
    // retail energy price link
    let activateTariff = state.objectivesRetailEnergyChargeReduction;
    activateTariff = (activateTariff || state.objectivesRetailDemandChargeReduction);
    if (activateTariff) {
      tail = new PageLink(state.paths.financialInputsRetailTariff, tail);
    }
    // link rest of financials
    tail = new PageLink(state.paths.financialInputsExternalIncentives, tail);
    tail = new PageLink(state.paths.financialInputs, tail);
    // da energy price link
    if (state.objectivesDA) {
      tail = new PageLink(state.paths.objectivesDA, tail);
    }
    // link up service pages (aka objectives)
    if (state.objectivesUserDefined) {
      tail = new PageLink(state.paths.objectivesUserDefined, tail);
    }
    if (state.objectivesSR) {
      tail = new PageLink(state.paths.objectivesSR, tail);
    }
    if (state.objectivesResilience) {
      tail = new PageLink(state.paths.objectivesResilience, tail);
    }
    if (state.objectivesNSR) {
      tail = new PageLink(state.paths.objectivesNSR, tail);
    }
    if (state.objectivesLoadFollowing) {
      tail = new PageLink(state.paths.objectivesLoadFollowing, tail);
    }
    if (state.objectivesFR) {
      tail = new PageLink(state.paths.objectivesFR, tail);
    }
    if (state.objectivesRetailDemandChargeReduction) {
      tail = new PageLink(state.paths.objectivesRetailDemandChargeReduction, tail);
    }
    if (state.objectivesDeferral) {
      tail = new PageLink(state.paths.objectivesDeferral, tail);
    }
    if (state.objectivesBackupPower) {
      tail = new PageLink(state.paths.objectivesBackupPower, tail);
    }
    // add objectives to head of link list
    tail = new PageLink(state.paths.objectivesSiteInformation, tail);
    tail = new PageLink(state.paths.objectives, tail);
    state.routeObjectivesFinancialsLL = tail;
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
  setReliabilityPostOptimizationOnly({ commit }, newPostOptimizationOnly) {
    commit('SET_RELIABILITY_POST_OPTIMIZATION_ONLY', newPostOptimizationOnly);
  },
  setReliabilityTarget({ commit }, newReliabilityTarget) {
    commit('SET_RELIABILITY_TARGET', newReliabilityTarget);
  },
  setReliabilityNu({ commit }, newReliabilityNu) {
    commit('SET_RELIABILITY_NU', newReliabilityNu);
  },
  setReliabilityGamma({ commit }, newReliabilityGamma) {
    commit('SET_RELIABILITY_GAMMA', newReliabilityGamma);
  },
  setReliabilityMaxOutageDuration({ commit }, newReliabilityMaxOutageDuration) {
    commit('SET_RELIABILITY_MAX_OUTAGE_DURATION', newReliabilityMaxOutageDuration);
  },
  setCriticalLoad({ commit }, newCriticalLoad) {
    commit('SET_CRITICAL_LOAD', newCriticalLoad);
  },
  setDAGrowth({ commit }, newDAGrowth) {
    commit('SET_DA_GROWTH', newDAGrowth);
  },
  setDAPrice({ commit }, newDAPrice) {
    commit('SET_DA_PRICE', newDAPrice);
  },
  setSRGrowth({ commit }, newSRGrowth) {
    commit('SET_SR_GROWTH', newSRGrowth);
  },
  setSRPrice({ commit }, newSRPrice) {
    commit('SET_SR_PRICE', newSRPrice);
  },
  setSRDuration({ commit }, newSRDuration) {
    commit('SET_SR_DURATION', newSRDuration);
  },
  setNSRGrowth({ commit }, newNSRGrowth) {
    commit('SET_NSR_GROWTH', newNSRGrowth);
  },
  setNSRPrice({ commit }, newNSRPrice) {
    commit('SET_NSR_PRICE', newNSRPrice);
  },
  setNSRDuration({ commit }, newNSRDuration) {
    commit('SET_NSR_DURATION', newNSRDuration);
  },
  setFReou({ commit }, newFReou) {
    commit('SET_FR_EOU', newFReou);
  },
  setFReod({ commit }, newFReod) {
    commit('SET_FR_EOD', newFReod);
  },
  setFRGrowth({ commit }, newFRGrowth) {
    commit('SET_FR_GROWTH', newFRGrowth);
  },
  setFREnergyGrowth({ commit }, newFREnergyGrowth) {
    commit('SET_FR_ENERGY_GROWTH', newFREnergyGrowth);
  },
  setFRCombinedMarket({ commit }, newFRCombinedMarket) {
    commit('SET_FR_COMBINED_MARKET', newFRCombinedMarket);
  },
  setFRDuration({ commit }, newFRDuration) {
    commit('SET_FR_DURATION', newFRDuration);
  },
  setFRPrice({ commit }, newFRPrice) {
    commit('SET_FR_PRICE', newFRPrice);
  },
  setFRUpPrice({ commit }, newFRUpPrice) {
    commit('SET_FR_UP_PRICE', newFRUpPrice);
  },
  setFRDownPrice({ commit }, newFRDownPrice) {
    commit('SET_FR_DOWN_PRICE', newFRDownPrice);
  },
  setUserPrice({ commit }, newUserPrice) {
    commit('SET_USER_PRICE', newUserPrice);
  },
  setUserPowerMax({ commit }, newUserPowerMax) {
    commit('SET_USER_POWER_MAX', newUserPowerMax);
  },
  setUserPowerMin({ commit }, newUserPowerMin) {
    commit('SET_USER_POWER_Min', newUserPowerMin);
  },
  setUserEnergyMax({ commit }, newUserEnergyMax) {
    commit('SET_USER_ENERGY_MAX', newUserEnergyMax);
  },
  setUserEnergyMin({ commit }, newUserEnergyMin) {
    commit('SET_USER_ENERGY_Min', newUserEnergyMin);
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
  addRetailTariffBillingPeriod({ commit }, newBillingPeriod) {
    commit('ADD_RETAIL_TARIFF_BILLING_PERIOD', newBillingPeriod);
  },
  replaceRetailTariffBillingPeriods({ commit }, newBillingPeriods) {
    commit('REPLACE_RETAIL_TARIFF_BILLING_PERIODS', newBillingPeriods);
  },
  removeRetailTariffBillingPeriod({ commit }, id) {
    commit('REMOVE_RETAIL_TARIFF_BILLING_PERIOD', id);
  },
  removeAllRetailTariffBillingPeriods({ commit }) {
    commit('REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS');
  },
  addBatteryCyclesToTechnologySpecsBattery({ commit }, payload) {
    commit('ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY', payload);
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
  setTimestep({ commit }, newTimestep) {
    commit('SET_TIMESTEP', newTimestep);
  },
  setOptimizationHorizon({ commit }, newOptimizataionHorizon) {
    commit('SET_OPTIMIZATION_HORIZON', newOptimizataionHorizon);
  },
  setOptimizationHorizonNum({ commit }, newOptimizataionHorizonNum) {
    commit('SET_OPTIMIZATION_HORIZON_NUM', newOptimizataionHorizonNum);
  },
  chooseEnergyStructure({ commit }, energyPriceStructure) {
    commit('CHOOSE_ENERGY_STRUCTURE', energyPriceStructure);
  },
  selectOtherServices({ commit }, listOfServices) {
    commit('SELECT_OTHER_SERVICES', listOfServices);
  },
  setObjectiveFinancesOrder({ commit }) {
    commit('SET_OBJECTIVE_FINANCES_ORDER');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
