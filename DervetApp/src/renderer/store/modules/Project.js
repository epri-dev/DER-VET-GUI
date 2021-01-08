import { cloneDeep, flatten, merge } from 'lodash';

import { billReductionProject } from '@/assets/cases/billReduction/project';
import { projectMetadata } from '@/models/Project/Project';

const metadataDefaultValues = projectMetadata.getDefaultValues();

export const getDefaultState = () => ({
  ...metadataDefaultValues,

  // DERS
  technologySpecsSolarPV: [],
  technologySpecsICE: [],
  technologySpecsBattery: [],
  technologySpecsDieselGen: [],
  listOfActiveTechnologies: {
    Generator: [],
    'Energy Storage System': [],
    'Intermittent Resource': [],
  },

  // TIMESERIES ARRAYS
  criticalLoad: null,
  deferralLoad: null,
  daPrice: null,
  srPrice: null,
  nsrPrice: null,
  frPrice: null,
  frUpPrice: null,
  frDownPrice: null,
  siteLoad: null,
  userPowerMin: null,
  userPowerMax: null,
  userEnergyMin: null,
  userEnergyMax: null,

  retailTariffBillingPeriods: [],
  externalIncentives: [],
});

const state = getDefaultState();

const getters = {
  getListFieldById(state) {
    return (field, id) => state[field].find(x => x.id === id);
  },
  getIndexOfListFieldById(state) {
    return (field, id) => state[field].findIndex(x => x.id === id);
  },
  cloneListField(state) {
    return field => cloneDeep(state[field]);
  },
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
  getDieselGenById(state) {
    return id => state.technologySpecsDieselGen.find(x => x.id === id);
  },
  getDieselGenSpecsClone(state) {
    return () => cloneDeep(state.technologySpecsDieselGen);
  },
  getIndexOfDieselGenId(state) {
    return id => state.technologySpecsDieselGen.findIndex(x => x.id === id);
  },
  getIndexOfBillingPeriodId(state) {
    return id => state.retailTariffBillingPeriods.findIndex(x => x.id === id);
  },
  getIndexOfExternalIncentiveId(state) {
    return id => state.externalIncentives.findIndex(x => x.id === id);
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
  getNewRetailTariffBillingPeriodId(state) {
    // Billing Period IDs are integers that begin with 1, and increment by 1
    // When adding a new billing period to retail tariffs,
    //   find the ID of the bottom row, and increment it by 1
    const numberOfRetailTariffRows = state.retailTariffBillingPeriods.length;
    if (numberOfRetailTariffRows === 0) {
      return 1;
    }
    const lastId = state.retailTariffBillingPeriods[numberOfRetailTariffRows - 1].id;
    return lastId + 1;
  },
};

const mutations = {
  RESET_PROJECT_TO_DEFAULT(state) {
    Object.assign(state, getDefaultState());
  },
  LOAD_QUICK_START_PROJECT(state, quickStartBillReduction) {
    Object.assign(state, quickStartBillReduction);
  },
  // Battery
  REPLACE_TECHNOLOGY_SPECS_BATTERY(state, payload) {
    const tmpBatterySpecs = getters.getBatterySpecsClone(state)();
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.batteryId);
    tmpBatterySpecs[indexMatchingId] = payload.newBattery;
    state.technologySpecsBattery = tmpBatterySpecs;
  },
  // battery cycle file
  ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY(state, payload) {
    const tmpBatterySpecs = getters.getBatterySpecsClone(state)();
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.batteryId);
    tmpBatterySpecs[indexMatchingId].batteryCycles = payload.batteryCycles;
    tmpBatterySpecs[indexMatchingId].batteryCyclesComplete = payload.batteryCyclesComplete;
    tmpBatterySpecs[indexMatchingId].complete
      = tmpBatterySpecs[indexMatchingId].batterySpecsComplete && payload.batteryCyclesComplete;
    tmpBatterySpecs[indexMatchingId].batteryCyclesErrorMsg = payload.batteryCyclesErrorMsg;
    state.technologySpecsBattery = tmpBatterySpecs;
  },
  // da page
  SET_DA_GROWTH(state, newDAGrowth) {
    state.daGrowth = newDAGrowth;
  },
  SET_DA_PRICE(state, newDAPrice) {
    state.daPrice = newDAPrice;
  },
  // deferral page
  SET_DEFERRAL_GROWTH(state, newDeferralGrowth) {
    state.deferralGrowth = newDeferralGrowth;
  },
  SET_DEFERRAL_PRICE(state, newDeferralPrice) {
    state.deferralPrice = newDeferralPrice;
  },
  SET_DEFERRAL_PLANNED_LOAD_LIMIT(state, newDeferralPlannedLoadLimit) {
    state.deferralPlannedLoadLimit = newDeferralPlannedLoadLimit;
  },
  SET_DEFERRAL_LOAD(state, newDeferralLoad) {
    state.deferralLoad = newDeferralLoad;
  },
  SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT(state, newDeferralReversePowerFlowLimit) {
    state.deferralReversePowerFlowLimit = newDeferralReversePowerFlowLimit;
  },
  // Diesel
  REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN(state, payload) {
    const tmpDieselGenSpecs = getters.getDieselGenSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.dieselGenId);
    tmpDieselGenSpecs[indexMatchingId] = payload.newDieselGen;
    state.technologySpecsDieselGen = tmpDieselGenSpecs;
  },
  // External incentives file
  ADD_EXTERNAL_INCENTIVE(state, newExternalIncentive) {
    state.externalIncentives.push(newExternalIncentive);
  },
  REPLACE_EXTERNAL_INCENTIVES(state, newExternalIncentives) {
    state.externalIncentives = newExternalIncentives;
  },
  REMOVE_ALL_EXTERNAL_INCENTIVES(state) {
    state.externalIncentives = [];
  },
  REMOVE_EXTERNAL_INCENTIVE(state, id) {
    const index = getters.getIndexOfExternalIncentiveId(state)(id);
    state.externalIncentives.splice(index, 1);
  },
  // finances page
  SET_DISCOUNT_RATE(state, newDiscountRate) {
    state.financeDiscountRate = newDiscountRate;
  },
  SET_INFLATION_RATE(state, newInflationRate) {
    state.financeInflationRate = newInflationRate;
  },
  SET_FEDERAL_TAX_RATE(state, newFederalTaxRate) {
    state.financeFederalTaxRate = newFederalTaxRate;
  },
  SET_PROPERTY_TAX_RATE(state, newPropertyTaxRate) {
    state.financePropertyTaxRate = newPropertyTaxRate;
  },
  SET_STATE_TAX_RATE(state, newStateTaxRate) {
    state.financeStateTaxRate = newStateTaxRate;
  },
  // frequency response
  SET_FR_COMBINED_MARKET(state, newFRCombinedMarket) {
    state.frCombinedMarket = newFRCombinedMarket;
  },
  SET_FR_DOWN_PRICE(state, newFRDownPrice) {
    state.frDownPrice = newFRDownPrice;
  },
  SET_FR_DURATION(state, newFRDuration) {
    state.frDuration = newFRDuration;
  },
  SET_FR_ENERGY_GROWTH(state, newFREnergyGrowth) {
    state.frEnergyPriceGrowth = newFREnergyGrowth;
  },
  SET_FR_EOU(state, newFReou) {
    state.frEOU = newFReou;
  },
  SET_FR_EOD(state, newFReod) {
    state.frEOD = newFReod;
  },
  SET_FR_GROWTH(state, newFRGrowth) {
    state.frGrowth = newFRGrowth;
  },
  SET_FR_PRICE(state, newFRPrice) {
    state.frPrice = newFRPrice;
  },
  SET_FR_UP_PRICE(state, newFRUpPrice) {
    state.frUpPrice = newFRUpPrice;
  },
  // ICE
  REPLACE_TECHNOLOGY_SPECS_ICE(state, payload) {
    const tmpICESpecs = getters.getICESpecsClone(state)();
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.iceId);
    tmpICESpecs[indexMatchingId] = payload.newICE;
    state.technologySpecsICE = tmpICESpecs;
  },
  // non-spinning reserve
  SET_NSR_DURATION(state, newNSRDuration) {
    state.nsrDuration = newNSRDuration;
  },
  SET_NSR_GROWTH(state, newNSRGrowth) {
    state.nsrGrowth = newNSRGrowth;
  },
  SET_NSR_PRICE(state, newNSRPrice) {
    state.nsrPrice = newNSRPrice;
  },
  // objectives
  CHOOSE_ENERGY_STRUCTURE(state, wholesaleEnergyPrices) {
    state.energyPriceSourceWholesale = wholesaleEnergyPrices;
    if (wholesaleEnergyPrices) {
      state.objectivesDA = true;
      state.objectivesRetailEnergyChargeReduction = false;
    } else {
      state.objectivesDA = false;
      state.objectivesRetailEnergyChargeReduction = true;
    }
  },
  SET_INCLUDE_SITE_LOAD(state) {
    let customerSited = state.objectivesRetailEnergyChargeReduction;
    customerSited = customerSited || state.objectivesRetailEnergyChargeReduction;
    customerSited = customerSited || (state.ownership === 'Customer');
    state.includeSiteLoad = customerSited;
  },
  SET_OPTIMIZATION_HORIZON(state, newOptimizataionHorizon) {
    state.optimizationHorizon = newOptimizataionHorizon;
  },
  SET_OPTIMIZATION_HORIZON_NUM(state, newOptimizataionHorizonNum) {
    state.optimizationHorizonNum = newOptimizataionHorizonNum;
  },
  SET_SIZING_EQUIPMENT(state, newSizingEquipment) {
    state.sizingEquipment = newSizingEquipment;
  },
  SELECT_OTHER_SERVICES(state, listOfServices) {
    // TODO maybe refactor into one mutation per service
    state.listOfActiveServices = listOfServices;
    state.objectivesResilience = (listOfServices.indexOf('Reliability') > -1);
    state.objectivesBackupPower = (listOfServices.indexOf('Backup Power') > -1);
    state.objectivesRetailDemandChargeReduction = (listOfServices.indexOf('Retail Demand Charge Reduction') > -1);
    state.objectivesSR = (listOfServices.indexOf('SR') > -1);
    state.objectivesNSR = (listOfServices.indexOf('NSR') > -1);
    state.objectivesFR = (listOfServices.indexOf('FR') > -1);
    state.objectivesLoadFollowing = (listOfServices.indexOf('LF') > -1);
    state.objectivesDeferral = (listOfServices.indexOf('Deferral') > -1);
    state.objectivesUserDefined = (listOfServices.indexOf('User Defined') > -1);
  },
  // reliability page
  SET_CRITICAL_LOAD(state, newCriticalLoad) {
    state.criticalLoad = newCriticalLoad;
  },
  SET_RELIABILITY_GAMMA(state, newReliabilityGamma) {
    state.reliabilityGamma = newReliabilityGamma;
  },
  SET_RELIABILITY_MAX_OUTAGE_DURATION(state, newReliabilityMaxOutageDuration) {
    state.reliabilityMaxOutageDuration = newReliabilityMaxOutageDuration;
  },
  SET_RELIABILITY_NU(state, newReliabilityNu) {
    state.reliabilityNu = newReliabilityNu;
  },
  SET_RELIABILITY_POST_OPTIMIZATION_ONLY(state, newPostOptimizationOnly) {
    state.reliabilityPostOptimizationOnly = newPostOptimizationOnly;
  },
  SET_RELIABILITY_TARGET(state, newReliabilityTarget) {
    state.reliabilityTarget = newReliabilityTarget;
  },
  // retail tariff file
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
  // site information
  SET_INCLUDE_POI_CONTRAINTS(state, newIncludePOIConstraints) {
    state.includeInterconnectionConstraints = newIncludePOIConstraints;
  },
  SET_MAX_IMPORT_FROM_GRID(state, newChargingFromGridLimit) {
    state.maxImport = newChargingFromGridLimit;
  },
  SET_MAX_EXPORT_TO_GRID(state, newDischargingToGridLimit) {
    state.maxExport = newDischargingToGridLimit;
  },
  SET_SITE_LOAD(state, newSiteLoad) {
    state.siteLoad = newSiteLoad;
  },
  // Solar PV
  REPLACE_TECHNOLOGY_SPECS_SOLAR_PV(state, payload) {
    const tmpSolarPVSpecs = getters.getSolarPVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.solarId);
    tmpSolarPVSpecs[indexMatchingId] = payload.newSolar;
    state.technologySpecsSolarPV = tmpSolarPVSpecs;
  },
  // solar pv generation
  ADD_GENERATION_PROFILE_TO_TECHNOLOGY_SPECS_PV(state, payload) {
    const tmpSolarPVSpecs = getters.getSolarPVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.solarId);
    tmpSolarPVSpecs[indexMatchingId].generationProfile = payload.generationProfile;
    state.technologySpecsSolarPV = tmpSolarPVSpecs;
  },
  // spinning reserve
  SET_SR_DURATION(state, newSRDuration) {
    state.srDuration = newSRDuration;
  },
  SET_SR_GROWTH(state, newSRGrowth) {
    state.srGrowth = newSRGrowth;
  },
  SET_SR_PRICE(state, newSRPrice) {
    state.srPrice = newSRPrice;
  },
  // start page
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
  SET_ID(state, newId) {
    state.id = newId;
  },
  SET_OUTPUT_DIRECTORY(state, newOutputDirectory) {
    state.outputDirectory = newOutputDirectory;
  },
  SET_NAME(state, newName) {
    state.name = newName;
  },
  SET_OWNERSHIP(state, newOwnership) {
    state.ownership = newOwnership;
  },
  SET_START_YEAR(state, newStartYear) {
    state.startYear = newStartYear;
  },
  SET_TIMESTEP(state, newTimestep) {
    state.timestep = newTimestep;
  },
  SET_TYPE(state, type) {
    state.type = type;
  },
  // technology specs
  ACTIVATE_TECH_BATTERY(state, payload) {
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.id);
    state.technologySpecsBattery[indexMatchingId].active = true;
  },
  ACTIVATE_TECH_DIESEL_GEN(state, payload) {
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.id);
    state.technologySpecsDieselGen[indexMatchingId].active = true;
  },
  ACTIVATE_TECH_ICE(state, payload) {
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.id);
    state.technologySpecsICE[indexMatchingId].active = true;
  },
  ACTIVATE_TECH_SOLAR_PV(state, payload) {
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.id);
    state.technologySpecsSolarPV[indexMatchingId].active = true;
  },
  ADD_TECHNOLOGY_SPECS_BATTERY(state, newBattery) {
    state.technologySpecsBattery.push(newBattery);
  },
  ADD_TECHNOLOGY_SPECS_DIESEL_GEN(state, newDieselGen) {
    state.technologySpecsDieselGen.push(newDieselGen);
  },
  ADD_TECHNOLOGY_SPECS_ICE(state, newICE) {
    state.technologySpecsICE.push(newICE);
  },
  ADD_TECHNOLOGY_SPECS_SOLAR_PV(state, newSolar) {
    state.technologySpecsSolarPV.push(newSolar);
  },
  ADD_TO_LIST_OF_ACTIVE_TECHNOLOGIES(state, tech) {
    state.listOfActiveTechnologies[tech.technologyType].push(tech);
  },
  DEACTIVATE_TECH_BATTERY(state, payload) {
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.id);
    state.technologySpecsBattery[indexMatchingId].active = false;
  },
  DEACTIVATE_TECH_DIESEL_GEN(state, payload) {
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.id);
    state.technologySpecsDieselGen[indexMatchingId].active = false;
  },
  DEACTIVATE_TECH_ICE(state, payload) {
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.id);
    state.technologySpecsICE[indexMatchingId].active = false;
  },
  DEACTIVATE_TECH_SOLAR_PV(state, payload) {
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.id);
    state.technologySpecsSolarPV[indexMatchingId].active = false;
  },
  REMOVE_TECH_BATTERY(state, payload) {
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.id);
    state.technologySpecsBattery.splice(indexMatchingId, 1);
  },
  REMOVE_TECH_DIESEL_GEN(state, payload) {
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.id);
    state.technologySpecsDieselGen.splice(indexMatchingId, 1);
  },
  REMOVE_TECH_ICE(state, payload) {
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.id);
    state.technologySpecsICE.splice(indexMatchingId, 1);
  },
  REMOVE_TECH_SOLAR_PV(state, payload) {
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.id);
    state.technologySpecsSolarPV.splice(indexMatchingId, 1);
  },
  REPLACE_LIST_FIELD(state, payload) {
    const clonedList = getters.cloneListField(state)(payload.field);
    const index = getters.getIndexOfListFieldById(state)(payload.field, payload.id);
    clonedList[index] = payload.newListItem;
    state[payload.field] = clonedList;
  },
  RESET_LIST_OF_ACTIVE_TECHNOLOGIES(state) {
    state.listOfActiveTechnologies = getDefaultState().listOfActiveTechnologies;
  },
  // user defined service
  SET_USER_ENERGY_MAX(state, newUserEnergyMax) {
    state.userEnergyMax = newUserEnergyMax;
  },
  SET_USER_ENERGY_MIN(state, newUserEnergyMin) {
    state.userEnergyMin = newUserEnergyMin;
  },
  SET_USER_POWER_MAX(state, newUserPowerMax) {
    state.userPowerMax = newUserPowerMax;
  },
  SET_USER_POWER_MIN(state, newUserPowerMin) {
    state.userPowerMin = newUserPowerMin;
  },
  SET_USER_PRICE(state, newUserPrice) {
    state.userPrice = newUserPrice;
  },
};

const actions = {
  resetProjectToDefault({ commit }) {
    commit('RESET_PROJECT_TO_DEFAULT');
  },
  loadQuickStartProject({ commit }) {
    // TODO load actual quickStartProject;
    const defaultProject = getDefaultState();
    return new Promise((resolve) => {
      commit('LOAD_QUICK_START_PROJECT', merge(defaultProject, billReductionProject));
      resolve();
    });
  },
  setType({ commit }, type) {
    commit('SET_TYPE', type);
  },
  // battery
  replaceTechnologySpecsBattery({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_BATTERY', payload);
  },
  // battery cycle file
  addBatteryCyclesToTechnologySpecsBattery({ commit }, payload) {
    commit('ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY', payload);
  },
  // da
  setDAGrowth({ commit }, newDAGrowth) {
    commit('SET_DA_GROWTH', newDAGrowth);
  },
  setDAPrice({ commit }, newDAPrice) {
    commit('SET_DA_PRICE', newDAPrice);
  },
  // deferral
  setDeferralGrowth({ commit }, newDeferralGrowth) {
    commit('SET_DEFERRAL_GROWTH', newDeferralGrowth);
  },
  setDeferralLoad({ commit }, newDeferralLoad) {
    commit('SET_DEFERRAL_LOAD', newDeferralLoad);
  },
  setDeferralPlannedLoadLimit({ commit }, newDeferralPlannedLoadLimit) {
    commit('SET_DEFERRAL_PLANNED_LOAD_LIMIT', newDeferralPlannedLoadLimit);
  },
  setDeferralPrice({ commit }, newDeferralPrice) {
    commit('SET_DEFERRAL_PRICE', newDeferralPrice);
  },
  setDeferralReversePowerFlowLimit({ commit }, newDeferralReversePowerFlowLimit) {
    commit('SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT', newDeferralReversePowerFlowLimit);
  },
  // diesel
  replaceTechnologySpecsDieselGen({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN', payload);
  },
  // external incentives
  addExternalIncentive({ commit }, newExternalIncentive) {
    commit('ADD_EXTERNAL_INCENTIVE', newExternalIncentive);
  },
  replaceExternalIncentives({ commit }, newExternalIncentives) {
    commit('REPLACE_EXTERNAL_INCENTIVES', newExternalIncentives);
  },
  removeAllExternalIncentives({ commit }) {
    commit('REMOVE_ALL_EXTERNAL_INCENTIVES');
  },
  removeExternalIncentive({ commit }, id) {
    commit('REMOVE_EXTERNAL_INCENTIVE', id);
  },
  // finances
  setDiscountRate({ commit }, newDiscountRate) {
    commit('SET_DISCOUNT_RATE', newDiscountRate);
  },
  setFederalTaxRate({ commit }, newFederalTaxRate) {
    commit('SET_FEDERAL_TAX_RATE', newFederalTaxRate);
  },
  setInflationRate({ commit }, newInflationRate) {
    commit('SET_INFLATION_RATE', newInflationRate);
  },
  setPropertyTaxRate({ commit }, newPropertyTaxRate) {
    commit('SET_PROPERTY_TAX_RATE', newPropertyTaxRate);
  },
  setStateTaxRate({ commit }, newStateTaxRate) {
    commit('SET_STATE_TAX_RATE', newStateTaxRate);
  },
  // frequency responce
  setFRCombinedMarket({ commit }, newFRCombinedMarket) {
    commit('SET_FR_COMBINED_MARKET', newFRCombinedMarket);
  },
  setFRDownPrice({ commit }, newFRDownPrice) {
    commit('SET_FR_DOWN_PRICE', newFRDownPrice);
  },
  setFRDuration({ commit }, newFRDuration) {
    commit('SET_FR_DURATION', newFRDuration);
  },
  setFREnergyGrowth({ commit }, newFREnergyGrowth) {
    commit('SET_FR_ENERGY_GROWTH', newFREnergyGrowth);
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
  setFRPrice({ commit }, newFRPrice) {
    commit('SET_FR_PRICE', newFRPrice);
  },
  setFRUpPrice({ commit }, newFRUpPrice) {
    commit('SET_FR_UP_PRICE', newFRUpPrice);
  },
  // ice
  replaceTechnologySpecsICE({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_ICE', payload);
  },
  // non spinning reserves
  setNSRDuration({ commit }, newNSRDuration) {
    commit('SET_NSR_DURATION', newNSRDuration);
  },
  setNSRGrowth({ commit }, newNSRGrowth) {
    commit('SET_NSR_GROWTH', newNSRGrowth);
  },
  setNSRPrice({ commit }, newNSRPrice) {
    commit('SET_NSR_PRICE', newNSRPrice);
  },
  // objectives
  chooseEnergyStructure({ commit }, energyPriceStructure) {
    commit('CHOOSE_ENERGY_STRUCTURE', energyPriceStructure);
  },
  selectOtherServices({ commit }, listOfServices) {
    commit('SELECT_OTHER_SERVICES', listOfServices);
  },
  setIncludeSiteLoad({ commit }) {
    commit('SET_INCLUDE_SITE_LOAD');
  },
  setOptimizationHorizon({ commit }, newOptimizataionHorizon) {
    commit('SET_OPTIMIZATION_HORIZON', newOptimizataionHorizon);
  },
  setOptimizationHorizonNum({ commit }, newOptimizataionHorizonNum) {
    commit('SET_OPTIMIZATION_HORIZON_NUM', newOptimizataionHorizonNum);
  },
  setSizingEquipment({ commit }, newSizingEquipment) {
    commit('SET_SIZING_EQUIPMENT', newSizingEquipment);
  },
  // reliability
  setCriticalLoad({ commit }, newCriticalLoad) {
    commit('SET_CRITICAL_LOAD', newCriticalLoad);
  },
  setReliabilityGamma({ commit }, newReliabilityGamma) {
    commit('SET_RELIABILITY_GAMMA', newReliabilityGamma);
  },
  setReliabilityMaxOutageDuration({ commit }, newReliabilityMaxOutageDuration) {
    commit('SET_RELIABILITY_MAX_OUTAGE_DURATION', newReliabilityMaxOutageDuration);
  },
  setReliabilityNu({ commit }, newReliabilityNu) {
    commit('SET_RELIABILITY_NU', newReliabilityNu);
  },
  setReliabilityPostOptimizationOnly({ commit }, newPostOptimizationOnly) {
    commit('SET_RELIABILITY_POST_OPTIMIZATION_ONLY', newPostOptimizationOnly);
  },
  setReliabilityTarget({ commit }, newReliabilityTarget) {
    commit('SET_RELIABILITY_TARGET', newReliabilityTarget);
  },
  // retail tariff billing period
  addRetailTariffBillingPeriod({ commit }, newExternalIncentive) {
    commit('ADD_RETAIL_TARIFF_BILLING_PERIOD', newExternalIncentive);
  },
  replaceRetailTariffBillingPeriods({ commit }, newBillingPeriods) {
    commit('REPLACE_RETAIL_TARIFF_BILLING_PERIODS', newBillingPeriods);
  },
  removeAllRetailTariffBillingPeriods({ commit }) {
    commit('REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS');
  },
  removeRetailTariffBillingPeriod({ commit }, id) {
    commit('REMOVE_RETAIL_TARIFF_BILLING_PERIOD', id);
  },
  // site information
  setIncludePOIConstraints({ commit }, newIncludePOIConstraints) {
    commit('SET_INCLUDE_POI_CONTRAINTS', newIncludePOIConstraints);
  },
  setMaxImportFromGrid({ commit }, newChargingFromGridLimit) {
    commit('SET_MAX_IMPORT_FROM_GRID', newChargingFromGridLimit);
  },
  setMaxExportToGrid({ commit }, newDischargingToGridLimit) {
    commit('SET_MAX_EXPORT_TO_GRID', newDischargingToGridLimit);
  },
  setSiteLoad({ commit }, newSiteLoad) {
    commit('SET_SITE_LOAD', newSiteLoad);
  },
  // spinning reserves
  setSRDuration({ commit }, newSRDuration) {
    commit('SET_SR_DURATION', newSRDuration);
  },
  setSRGrowth({ commit }, newSRGrowth) {
    commit('SET_SR_GROWTH', newSRGrowth);
  },
  setSRPrice({ commit }, newSRPrice) {
    commit('SET_SR_PRICE', newSRPrice);
  },
  // solar pv
  replaceTechnologySpecsSolarPV({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_SOLAR_PV', payload);
  },
  // solar pv generataion
  addGenerationProfileToTechnologySpecsPV({ commit }, payload) {
    commit('ADD_GENERATION_PROFILE_TO_TECHNOLOGY_SPECS_PV', payload);
  },
  // start project
  setAnalysisHorizon({ commit }, newAnalysisHorizon) {
    commit('SET_ANALYSIS_HORIZON', newAnalysisHorizon);
  },
  setAnalysisHorizonMode({ commit }, newAnalysisHorizonMode) {
    commit('SET_ANALYSIS_HORIZON_MODE', newAnalysisHorizonMode);
  },
  setDataYear({ commit }, newDataYear) {
    commit('SET_DATA_YEAR', newDataYear);
  },
  setGridLocation({ commit }, newGridLocation) {
    commit('SET_GRID_LOCATION', newGridLocation);
  },
  setId({ commit }, newId) {
    commit('SET_ID', newId);
  },
  setOutputDirectory({ commit }, newOutputDirectory) {
    commit('SET_OUTPUT_DIRECTORY', newOutputDirectory);
  },
  setName({ commit }, newName) {
    commit('SET_NAME', newName);
  },
  setOwnership({ commit }, newOwnership) {
    commit('SET_OWNERSHIP', newOwnership);
  },
  setStartYear({ commit }, newStartYear) {
    commit('SET_START_YEAR', newStartYear);
  },
  setTimestep({ commit }, newTimestep) {
    commit('SET_TIMESTEP', newTimestep);
  },
  // technology specs
  activateTech({ commit }, payload) {
    if (payload.tag === 'ICE') {
      commit('ACTIVATE_TECH_ICE', payload);
    } else if (payload.tag === 'DieselGen') {
      commit('ACTIVATE_TECH_DIESEL_GEN', payload);
    } else if (payload.tag === 'PV') {
      commit('ACTIVATE_TECH_SOLAR_PV', payload);
    } else if (payload.tag === 'Battery') {
      commit('ACTIVATE_TECH_BATTERY', payload);
    }
  },
  addTechnologySpecsSolarPV({ commit }, newSolar) {
    commit('ADD_TECHNOLOGY_SPECS_SOLAR_PV', newSolar);
  },
  addTechnologySpecsICE({ commit }, newICE) {
    commit('ADD_TECHNOLOGY_SPECS_ICE', newICE);
  },
  addTechnologySpecsDieselGen({ commit }, newDieselGen) {
    commit('ADD_TECHNOLOGY_SPECS_DIESEL_GEN', newDieselGen);
  },
  addTechnologySpecsBattery({ commit }, newBattery) {
    commit('ADD_TECHNOLOGY_SPECS_BATTERY', newBattery);
  },
  deactivateTech({ commit }, payload) {
    if (payload.tag === 'ICE') {
      commit('DEACTIVATE_TECH_ICE', payload);
    } else if (payload.tag === 'DieselGen') {
      commit('DEACTIVATE_TECH_DIESEL_GEN', payload);
    } else if (payload.tag === 'PV') {
      commit('DEACTIVATE_TECH_SOLAR_PV', payload);
    } else if (payload.tag === 'Battery') {
      commit('DEACTIVATE_TECH_BATTERY', payload);
    }
  },
  makeListOfActiveTechnologies({ commit }, projectSpecs) {
    commit('RESET_LIST_OF_ACTIVE_TECHNOLOGIES');
    const specs = [
      projectSpecs.technologySpecsICE,
      projectSpecs.technologySpecsDieselGen,
      projectSpecs.technologySpecsBattery,
      projectSpecs.technologySpecsSolarPV,
    ];
    flatten(specs).forEach((tech) => {
      if (tech.active) {
        commit('ADD_TO_LIST_OF_ACTIVE_TECHNOLOGIES', tech);
      }
    });
  },
  replaceListField({ commit }, payload) {
    commit('REPLACE_LIST_FIELD', payload);
  },
  removeTech({ commit }, payload) {
    if (payload.tag === 'ICE') {
      commit('REMOVE_TECH_ICE', payload);
    } else if (payload.tag === 'DieselGen') {
      commit('REMOVE_TECH_DIESEL_GEN', payload);
    } else if (payload.tag === 'PV') {
      commit('REMOVE_TECH_SOLAR_PV', payload);
    } else if (payload.tag === 'Battery') {
      commit('REMOVE_TECH_BATTERY', payload);
    }
  },
  // user defined
  setUserEnergyMax({ commit }, newUserEnergyMax) {
    commit('SET_USER_ENERGY_MAX', newUserEnergyMax);
  },
  setUserEnergyMin({ commit }, newUserEnergyMin) {
    commit('SET_USER_ENERGY_Min', newUserEnergyMin);
  },
  setUserPowerMax({ commit }, newUserPowerMax) {
    commit('SET_USER_POWER_MAX', newUserPowerMax);
  },
  setUserPowerMin({ commit }, newUserPowerMin) {
    commit('SET_USER_POWER_Min', newUserPowerMin);
  },
  setUserPrice({ commit }, newUserPrice) {
    commit('SET_USER_PRICE', newUserPrice);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
