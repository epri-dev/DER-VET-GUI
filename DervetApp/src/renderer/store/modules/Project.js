import { cloneDeep, flatten, merge } from 'lodash';

import { billReductionProject } from '@/assets/cases/billReduction/project';
import { reliabilityProject } from '@/assets/cases/reliability/project';
import { projectMetadata } from '@/models/Project/ProjectMetadata';
import * as m from '@/store/mutationTypes';
import * as a from '@/store/actionTypes';
import * as c from '@/models/Project/constants';

const usecaseDatabase = { // its a sad excuse for a database, but serves as one.
  billReductionProject,
  reliabilityProject,
};

const metadataDefaultValues = projectMetadata.getDefaultValues();

// TODO get rid of this completely...move over all DER, timeseries inits to getDefaultValues...
export const getDefaultState = () => ({
  ...metadataDefaultValues,

  // DERS
  technologySpecsBattery: [],
  technologySpecsControllableLoad: [],
  technologySpecsDieselGen: [],
  technologySpecsFleetEV: [],
  technologySpecsICE: [],
  technologySpecsSingleEV: [],
  technologySpecsSolarPV: [],

  // TODO: make this dynamic/move to getter
  listOfActiveTechnologies: {
    Generator: [],
    'Energy Storage System': [],
    'Intermittent Resource': [],
    'Controllable Load': [],
    'Electric Vehicle': [],
  },

  retailTariffBillingPeriods: [],
  retailTariffFileImportNotes: [],
  externalIncentives: [],
  externalIncentivesFileImportNotes: [],
});

const state = getDefaultState();

const getters = {
  cloneListField(state) {
    return field => cloneDeep(state[field]);
  },
  getControllableLoadById(state) {
    return id => state.technologySpecsControllableLoad.find(x => x.id === id);
  },
  getControllableLoadSpecsClone(state) {
    return () => cloneDeep(state.technologySpecsControllableLoad);
  },
  getBatteryById(state) {
    return id => state.technologySpecsBattery.find(x => x.id === id);
  },
  getBatterySpecsClone(state) {
    return () => cloneDeep(state.technologySpecsBattery);
  },
  getDieselGenById(state) {
    return id => state.technologySpecsDieselGen.find(x => x.id === id);
  },
  getDieselGenSpecsClone(state) {
    return () => cloneDeep(state.technologySpecsDieselGen);
  },
  getFleetEVById(state) {
    return id => state.technologySpecsFleetEV.find(x => x.id === id);
  },
  getFleetEVSpecsClone(state) {
    return () => cloneDeep(state.technologySpecsFleetEV);
  },
  getICEById(state) {
    return id => state.technologySpecsICE.find(x => x.id === id);
  },
  getICESpecsClone(state) {
    return () => cloneDeep(state.technologySpecsICE);
  },
  getIndexOfBatteryId(state) {
    return id => state.technologySpecsBattery.findIndex(x => x.id === id);
  },
  getIndexOfBillingPeriodId(state) {
    return id => state.retailTariffBillingPeriods.findIndex(x => x.id === id);
  },
  getIndexOfControllableLoadId(state) {
    return id => state.technologySpecsControllableLoad.findIndex(x => x.id === id);
  },
  getIndexOfDieselGenId(state) {
    return id => state.technologySpecsDieselGen.findIndex(x => x.id === id);
  },
  getIndexOfExternalIncentiveId(state) {
    return id => state.externalIncentives.findIndex(x => x.id === id);
  },
  getIndexOfFleetEVId(state) {
    return id => state.technologySpecsFleetEV.findIndex(x => x.id === id);
  },
  getIndexOfICEId(state) {
    return id => state.technologySpecsICE.findIndex(x => x.id === id);
  },
  getIndexOfListFieldById(state) {
    return (field, id) => state[field].findIndex(x => x.id === id);
  },
  getIndexOfSingleEVId(state) {
    return id => state.technologySpecsSingleEV.findIndex(x => x.id === id);
  },
  getIndexOfSolarId(state) {
    return id => state.technologySpecsSolarPV.findIndex(x => x.id === id);
  },
  getListFieldById(state) {
    return (field, id) => state[field].find(x => x.id === id);
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
  getSingleEVById(state) {
    return id => state.technologySpecsSingleEV.find(x => x.id === id);
  },
  getSingleEVSpecsClone(state) {
    return () => cloneDeep(state.technologySpecsSingleEV);
  },
  getSolarPVById(state) {
    return id => state.technologySpecsSolarPV.find(x => x.id === id);
  },
  getSolarPVSpecsClone(state) {
    return () => cloneDeep(state.technologySpecsSolarPV);
  },
};

const mutations = {
  [m.RESET_PROJECT_TO_DEFAULT](state) {
    Object.assign(state, getDefaultState());
  },
  [m.LOAD_NEW_PROJECT](state, project) {
    Object.assign(state, project);
  },
  // Backup
  [m.SET_BACKUP_PRICE](state, newValue) {
    state.backupPrice = newValue;
  },
  [m.SET_BACKUP_ENERGY](state, newValue) {
    state.backupEnergyReservation = newValue;
  },
  // Battery
  [m.REPLACE_TECHNOLOGY_SPECS_BATTERY](state, payload) {
    const tmpBatterySpecs = getters.getBatterySpecsClone(state)();
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.batteryId);
    tmpBatterySpecs[indexMatchingId] = payload.newBattery;
    state.technologySpecsBattery = tmpBatterySpecs;
  },
  // battery cycle file
  [m.ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY](state, payload) {
    const tmpBatterySpecs = getters.getBatterySpecsClone(state)();
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.batteryId);
    tmpBatterySpecs[indexMatchingId].associatedInputsComplete = payload.batteryCycles.complete;
    tmpBatterySpecs[indexMatchingId].complete
      = payload.batteryCycles.complete && tmpBatterySpecs[indexMatchingId].componentSpecsComplete;
    // this updates the object, while retaining untouched pieces
    Object.assign(tmpBatterySpecs[indexMatchingId].associatedInputs[0], payload.batteryCycles);
    state.technologySpecsBattery = tmpBatterySpecs;
  },
  // Controllable Load
  [m.REPLACE_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD](state, payload) {
    const tmpSpecs = getters.getControllableLoadSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfControllableLoadId(state)(payload.id);
    tmpSpecs[indexMatchingId] = payload.newControllableLoad;
    state.technologySpecsControllableLoad = tmpSpecs;
  },
  // Controllable Load upload
  [m.ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD](state, payload) {
    const tmpSpecs = getters.getControllableLoadSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfControllableLoadId(state)(payload.solarId);
    tmpSpecs[indexMatchingId].load = payload.load;
    state.technologySpecsControllableLoad = tmpSpecs;
  },
  // da page
  [m.SET_DA_GROWTH](state, newDAGrowth) {
    state.daGrowth = newDAGrowth;
  },
  [m.SET_DA_PRICE](state, newDAPrice) {
    state.daPrice = newDAPrice;
  },
  // deferral page
  [m.SET_DEFERRAL_GROWTH](state, newDeferralGrowth) {
    state.deferralGrowth = newDeferralGrowth;
  },
  [m.SET_DEFERRAL_PRICE](state, newDeferralPrice) {
    state.deferralPrice = newDeferralPrice;
  },
  [m.SET_DEFERRAL_PLANNED_LOAD_LIMIT](state, newDeferralPlannedLoadLimit) {
    state.deferralPlannedLoadLimit = newDeferralPlannedLoadLimit;
  },
  [m.SET_DEFERRAL_LOAD](state, newDeferralLoad) {
    state.deferralLoad = newDeferralLoad;
  },
  [m.SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT](state, newDeferralReversePowerFlowLimit) {
    state.deferralReversePowerFlowLimit = newDeferralReversePowerFlowLimit;
  },
  // Diesel
  [m.REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN](state, payload) {
    const tmpDieselGenSpecs = getters.getDieselGenSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.dieselGenId);
    tmpDieselGenSpecs[indexMatchingId] = payload.newDieselGen;
    state.technologySpecsDieselGen = tmpDieselGenSpecs;
  },
  // Demand response
  [m.SET_DR_NUMBER_EVENTS](state, newValue) {
    state[c.DR_NUMBER_EVENTS] = newValue;
  },
  [m.SET_DR_INCLUDE_WEEKENDS](state, newValue) {
    state[c.DR_INCLUDE_WEEKENDS] = newValue;
  },
  [m.SET_DR_START_HOUR](state, newValue) {
    state[c.DR_START_HOUR] = newValue;
  },
  [m.SET_DR_END_HOUR](state, newValue) {
    state[c.DR_END_HOUR] = newValue;
  },
  [m.SET_DR_EVENT_LENGTH](state, newValue) {
    state[c.DR_EVENT_LENGTH] = newValue;
  },
  [m.SET_DR_PROGRAM_TYPE](state, newValue) {
    state[c.DR_PROGRAM_TYPE] = newValue;
  },
  [m.SET_DR_APPLIED_MONTHS](state, newValue) {
    state.drMonthsApplied = newValue;
  },
  [m.SET_DR_APPLIED_MONTHS_LABELS](state, newValue) {
    state.drMonthsAppliedLabels = newValue;
  },
  [m.SET_DR_CAPACITY_RESERVATION](state, newValue) {
    state.drCapacityReservation = newValue;
  },
  [m.SET_DR_CAPACITY_AWARDS](state, newValue) {
    state.drCapacityAwards = newValue;
  },
  [m.SET_DR_ENERGY_AWARDS](state, newValue) {
    state.drEnergyAwards = newValue;
  },
  // External incentives file
  [m.ADD_EXTERNAL_INCENTIVE](state, newExternalIncentive) {
    state.externalIncentives.push(newExternalIncentive);
  },
  [m.REPLACE_EXTERNAL_INCENTIVES](state, newExternalIncentives) {
    state.externalIncentives = newExternalIncentives;
  },
  REPLACE_EXTERNAL_INCENTIVES_FILE_IMPORT_NOTES(state, newImportNotes) {
    state.externalIncentivesFileImportNotes = newImportNotes;
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
  // Fleet EV
  [m.REPLACE_TECHNOLOGY_SPECS_FLEET_EV](state, payload) {
    const tmpSpecs = getters.getFleetEVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfFleetEVId(state)(payload.id);
    tmpSpecs[indexMatchingId] = payload.newFleetEV;
    state.technologySpecsFleetEV = tmpSpecs;
  },
  // fleet ev upload
  [m.ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_FLEET_EV](state, payload) {
    const tmpSpecs = getters.getFleetEVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfFleetEVId(state)(payload.solarId);
    tmpSpecs[indexMatchingId].baselineLoad = payload.baselineLoad;
    state.technologySpecsControllableLoad = tmpSpecs;
  },
  // ICE
  REPLACE_TECHNOLOGY_SPECS_ICE(state, payload) {
    const tmpICESpecs = getters.getICESpecsClone(state)();
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.iceId);
    tmpICESpecs[indexMatchingId] = payload.newICE;
    state.technologySpecsICE = tmpICESpecs;
  },
  // load following
  [m.SET_LF_COMBINED_MARKET](state, newFRCombinedMarket) {
    state.lfCombinedMarket = newFRCombinedMarket;
  },
  [m.SET_LF_DOWN_PRICE](state, newFRDownPrice) {
    state.lfDownPrice = newFRDownPrice;
  },
  [m.SET_LF_DURATION](state, newFRDuration) {
    state.lfDuration = newFRDuration;
  },
  [m.SET_LF_EOU](state, newFReou) {
    state.lfEOU = newFReou;
  },
  [m.SET_LF_EOD](state, newFReod) {
    state.lfEOD = newFReod;
  },
  [m.SET_LF_PRICE](state, newFRPrice) {
    state.lfPrice = newFRPrice;
  },
  [m.SET_LF_UP_PRICE](state, newFRUpPrice) {
    state.lfUpPrice = newFRUpPrice;
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
  [m.CHOOSE_ENERGY_STRUCTURE](state, wholesaleEnergyPrices) {
    state.energyPriceSourceWholesale = wholesaleEnergyPrices;
    if (wholesaleEnergyPrices !== null) {
      if (wholesaleEnergyPrices) {
        state.objectivesDA = true;
        state.objectivesRetailEnergyChargeReduction = false;
      } else {
        state.objectivesDA = false;
        state.objectivesRetailEnergyChargeReduction = true;
      }
    }
  },
  [m.SET_INCLUDE_SITE_LOAD](state) {
    let customerSited = state.objectivesRetailEnergyChargeReduction;
    customerSited = customerSited || state.objectivesRetailEnergyChargeReduction;
    customerSited = customerSited || (state.ownership === 'Customer');
    state.includeSiteLoad = customerSited;
  },
  [m.SET_INCLUDE_SYSTEM_LOAD](state) {
    let gridDomainProject = state.objectivesDR;
    gridDomainProject = gridDomainProject || state.objectivesRA;
    gridDomainProject = gridDomainProject || (state.ownership !== 'Customer');
    state.includeSystemLoad = gridDomainProject;
  },
  [m.SET_OPTIMIZATION_HORIZON](state, newOptimizataionHorizon) {
    state.optimizationHorizon = newOptimizataionHorizon;
  },
  [m.SET_OPTIMIZATION_HORIZON_NUM](state, newOptimizataionHorizonNum) {
    state.optimizationHorizonNum = newOptimizataionHorizonNum;
  },
  [m.SET_SIZING_EQUIPMENT](state, newSizingEquipment) {
    state.sizingEquipment = newSizingEquipment;
  },
  [m.SELECT_OTHER_SERVICES](state, listOfServices) {
    // TODO maybe refactor into one mutation per service
    state.listOfActiveServices = listOfServices;
    state.objectivesResilience = (listOfServices.indexOf('Resilience') > -1);
    state.objectivesBackupPower = (listOfServices.indexOf('BackupPower') > -1);
    state.objectivesRetailDemandChargeReduction = (listOfServices.indexOf('RetailDemandChargeReduction') > -1);
    state.objectivesSR = (listOfServices.indexOf('SR') > -1);
    state.objectivesNSR = (listOfServices.indexOf('NSR') > -1);
    state.objectivesFR = (listOfServices.indexOf('FR') > -1);
    state.objectivesLF = (listOfServices.indexOf('LF') > -1);
    state.objectivesDeferral = (listOfServices.indexOf('Deferral') > -1);
    state.objectivesUserDefined = (listOfServices.indexOf('UserDefined') > -1);
    state.objectivesDR = (listOfServices.indexOf('DR') > -1);
    state.objectivesRA = (listOfServices.indexOf('RA') > -1);
  },
  // resource adequacy
  [m.SET_RA_CAPACITY_PRICE](state, newValue) {
    state.raCapacityAwards = newValue;
  },
  [m.SET_RA_ACTIVE_TIMESTEP](state, newValue) {
    state.raActive = newValue;
  },
  [m.SET_RA_NUMBER_EVENTS](state, newValue) {
    state[c.RA_NUMBER_EVENTS] = newValue;
  },
  [m.SET_RA_DISPATCH_MODE](state, newValue) {
    state[c.RA_DISPATCH_MODE] = newValue;
  },
  [m.SET_RA_EVENT_SELECTION_METHOD](state, newValue) {
    state[c.RA_EVENT_SELECTION_METHOD] = newValue;
  },
  [m.SET_RA_EVENT_LENGTH](state, newValue) {
    state[c.RA_EVENT_LENGTH] = newValue;
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
  REPLACE_RETAIL_TARIFF_FILE_IMPORT_NOTES(state, newImportNotes) {
    state.retailTariffFileImportNotes = newImportNotes;
  },
  REMOVE_RETAIL_TARIFF_BILLING_PERIOD(state, id) {
    const index = getters.getIndexOfBillingPeriodId(state)(id);
    state.retailTariffBillingPeriods.splice(index, 1);
  },
  REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS(state) {
    state.retailTariffBillingPeriods = [];
  },
  // Single EV
  REPLACE_TECHNOLOGY_SPECS_SINGLE_EV(state, payload) {
    const tmpSpecs = getters.getSingleEVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfSingleEVId(state)(payload.id);
    tmpSpecs[indexMatchingId] = payload.newSingleEV;
    state.technologySpecsSingleEV = tmpSpecs;
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
  // system load
  [m.SET_SYSTEM_LOAD](state, newSystemLoad) {
    state.systemLoad = newSystemLoad;
  },
  // technology specs
  [m.ACTIVATE_TECH_BATTERY](state, payload) {
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.id);
    state.technologySpecsBattery[indexMatchingId].active = true;
  },
  [m.ACTIVATE_TECH_CONTROLLABLE_LOAD](state, payload) {
    const indexMatchingId = getters.getIndexOfControllableLoadId(state)(payload.id);
    state.technologySpecsControllableLoad[indexMatchingId].active = true;
  },
  [m.ACTIVATE_TECH_DIESEL_GEN](state, payload) {
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.id);
    state.technologySpecsDieselGen[indexMatchingId].active = true;
  },
  [m.ACTIVATE_TECH_FLEET_EV](state, payload) {
    const indexMatchingId = getters.getIndexOfFleetEVId(state)(payload.id);
    state.technologySpecsFleetEV[indexMatchingId].active = true;
  },
  [m.ACTIVATE_TECH_ICE](state, payload) {
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.id);
    state.technologySpecsICE[indexMatchingId].active = true;
  },
  [m.ACTIVATE_TECH_SINGLE_EV](state, payload) {
    const indexMatchingId = getters.getIndexOfSingleEVId(state)(payload.id);
    state.technologySpecsSingleEV[indexMatchingId].active = true;
  },
  [m.ACTIVATE_TECH_SOLAR_PV](state, payload) {
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.id);
    state.technologySpecsSolarPV[indexMatchingId].active = true;
  },
  [m.ADD_TECHNOLOGY_SPECS_BATTERY](state, newBattery) {
    state.technologySpecsBattery.push(newBattery);
  },
  [m.ADD_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD](state, newControllableLoad) {
    state.technologySpecsControllableLoad.push(newControllableLoad);
  },
  [m.ADD_TECHNOLOGY_SPECS_DIESEL_GEN](state, newDieselGen) {
    state.technologySpecsDieselGen.push(newDieselGen);
  },
  [m.ADD_TECHNOLOGY_SPECS_FLEET_EV](state, newFleetEV) {
    state.technologySpecsFleetEV.push(newFleetEV);
  },
  [m.ADD_TECHNOLOGY_SPECS_ICE](state, newICE) {
    state.technologySpecsICE.push(newICE);
  },
  [m.ADD_TECHNOLOGY_SPECS_SINGLE_EV](state, newFleetEV) {
    state.technologySpecsSingleEV.push(newFleetEV);
  },
  [m.ADD_TECHNOLOGY_SPECS_SOLAR_PV](state, newSolar) {
    state.technologySpecsSolarPV.push(newSolar);
  },
  [m.ADD_TO_LIST_OF_ACTIVE_TECHNOLOGIES](state, tech) {
    state.listOfActiveTechnologies[tech.technologyType].push(tech);
  },
  [m.DEACTIVATE_TECH_BATTERY](state, payload) {
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.id);
    state.technologySpecsBattery[indexMatchingId].active = false;
  },
  [m.DEACTIVATE_TECH_CONTROLLABLE_LOAD](state, payload) {
    const indexMatchingId = getters.getIndexOfControllableLoadId(state)(payload.id);
    state.technologySpecsControllableLoad[indexMatchingId].active = false;
  },
  [m.DEACTIVATE_TECH_DIESEL_GEN](state, payload) {
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.id);
    state.technologySpecsDieselGen[indexMatchingId].active = false;
  },
  [m.DEACTIVATE_TECH_FLEET_EV](state, payload) {
    const indexMatchingId = getters.getIndexOfFleetEVId(state)(payload.id);
    state.technologySpecsFleetEV[indexMatchingId].active = false;
  },
  [m.DEACTIVATE_TECH_ICE](state, payload) {
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.id);
    state.technologySpecsICE[indexMatchingId].active = false;
  },
  [m.DEACTIVATE_TECH_SINGLE_EV](state, payload) {
    const indexMatchingId = getters.getIndexOfSingleEVId(state)(payload.id);
    state.technologySpecsSingleEV[indexMatchingId].active = false;
  },
  [m.DEACTIVATE_TECH_SOLAR_PV](state, payload) {
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.id);
    state.technologySpecsSolarPV[indexMatchingId].active = false;
  },
  [m.REMOVE_TECH_BATTERY](state, payload) {
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.id);
    state.technologySpecsBattery.splice(indexMatchingId, 1);
  },
  [m.REMOVE_TECH_CONTROLLABLE_LOAD](state, payload) {
    const indexMatchingId = getters.getIndexOfControllableLoadId(state)(payload.id);
    state.technologySpecsControllableLoad.splice(indexMatchingId, 1);
  },
  [m.REMOVE_TECH_DIESEL_GEN](state, payload) {
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.id);
    state.technologySpecsDieselGen.splice(indexMatchingId, 1);
  },
  [m.REMOVE_TECH_FLEET_EV](state, payload) {
    const indexMatchingId = getters.getIndexOfHomeEVId(state)(payload.id);
    state.technologySpecsHomeEV.splice(indexMatchingId, 1);
  },
  [m.REMOVE_TECH_ICE](state, payload) {
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.id);
    state.technologySpecsICE.splice(indexMatchingId, 1);
  },
  [m.REMOVE_TECH_SINGLE_EV](state, payload) {
    const indexMatchingId = getters.getIndexOfSingleEVId(state)(payload.id);
    state.technologySpecsSingleEV.splice(indexMatchingId, 1);
  },
  [m.REMOVE_TECH_SOLAR_PV](state, payload) {
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.id);
    state.technologySpecsSolarPV.splice(indexMatchingId, 1);
  },
  [m.REPLACE_LIST_FIELD](state, payload) {
    const clonedList = getters.cloneListField(state)(payload.field);
    const index = getters.getIndexOfListFieldById(state)(payload.field, payload.id);
    clonedList[index] = payload.newListItem;
    state[payload.field] = clonedList;
  },
  [m.RESET_LIST_OF_ACTIVE_TECHNOLOGIES](state) {
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
  [a.RESET_PROJECT_TO_DEFAULT]({ commit }) {
    commit(m.RESET_PROJECT_TO_DEFAULT);
  },
  [a.LOAD_NEW_PROJECT]({ commit }, project) {
    return new Promise((resolve) => {
      commit(m.LOAD_NEW_PROJECT, merge(getDefaultState(), project));
      resolve();
    });
  },
  [a.LOAD_QUICK_START_PROJECT]({ commit }, caseName) {
    const selectedUseCase = usecaseDatabase[caseName];
    return new Promise((resolve) => {
      commit(m.LOAD_NEW_PROJECT, merge(getDefaultState(), selectedUseCase));
      resolve();
    });
  },
  // battery
  [a.REPLACE_TECHNOLOGY_SPECS_BATTERY]({ commit }, payload) {
    commit(m.REPLACE_TECHNOLOGY_SPECS_BATTERY, payload);
  },
  // Controllable Load
  [a.REPLACE_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD]({ commit }, payload) {
    commit(m.REPLACE_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD, payload);
  },
  // Controllable Load upload page
  [a.ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD]({ commit }, payload) {
    commit(m.ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD, payload);
  },
  // battery cycle file
  [a.ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY]({ commit }, payload) {
    commit(m.ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY, payload);
  },
  // da
  [a.SET_DA_GROWTH]({ commit }, newDAGrowth) {
    commit(m.SET_DA_GROWTH, newDAGrowth);
  },
  [a.SET_DA_PRICE]({ commit }, newDAPrice) {
    commit(m.SET_DA_PRICE, newDAPrice);
  },
  // deferral
  [a.SET_DEFERRAL_GROWTH]({ commit }, newDeferralGrowth) {
    commit(m.SET_DEFERRAL_GROWTH, newDeferralGrowth);
  },
  [a.SET_DEFERRAL_LOAD]({ commit }, newDeferralLoad) {
    commit(m.SET_DEFERRAL_LOAD, newDeferralLoad);
  },
  [a.SET_DEFERRAL_PLANNED_LOAD_LIMIT]({ commit }, newDeferralPlannedLoadLimit) {
    commit(m.SET_DEFERRAL_PLANNED_LOAD_LIMIT, newDeferralPlannedLoadLimit);
  },
  [a.SET_DEFERRAL_PRICE]({ commit }, newDeferralPrice) {
    commit(m.SET_DEFERRAL_PRICE, newDeferralPrice);
  },
  [a.SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT]({ commit }, newDeferralReversePowerFlowLimit) {
    commit(m.SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT, newDeferralReversePowerFlowLimit);
  },
  // Demand response
  [a.SET_DR_NUMBER_EVENTS]({ commit }, newValue) {
    commit(m.SET_DR_NUMBER_EVENTS, newValue);
  },
  [a.SET_DR_INCLUDE_WEEKENDS]({ commit }, newValue) {
    commit(m.SET_DR_INCLUDE_WEEKENDS, newValue);
  },
  [a.SET_DR_START_HOUR]({ commit }, newValue) {
    commit(m.SET_DR_START_HOUR, newValue);
  },
  [a.SET_DR_END_HOUR]({ commit }, newValue) {
    commit(m.SET_DR_END_HOUR, newValue);
  },
  [a.SET_DR_EVENT_LENGTH]({ commit }, newValue) {
    commit(m.SET_DR_EVENT_LENGTH, newValue);
  },
  [a.SET_DR_PROGRAM_TYPE]({ commit }, newValue) {
    commit(m.SET_DR_PROGRAM_TYPE, newValue);
  },
  [a.SET_DR_APPLIED_MONTHS]({ commit }, newValue) {
    commit(m.SET_DR_APPLIED_MONTHS, newValue);
  },
  [a.SET_DR_APPLIED_MONTHS_LABELS]({ commit }, newValue) {
    commit(m.SET_DR_APPLIED_MONTHS_LABELS, newValue);
  },
  [a.SET_DR_CAPACITY_RESERVATION]({ commit }, newValue) {
    commit(m.SET_DR_CAPACITY_RESERVATION, newValue);
  },
  [a.SET_DR_CAPACITY_AWARDS]({ commit }, newValue) {
    commit(m.SET_DR_CAPACITY_AWARDS, newValue);
  },
  [a.SET_DR_ENERGY_AWARDS]({ commit }, newValue) {
    commit(m.SET_DR_ENERGY_AWARDS, newValue);
  },
  // diesel
  [a.REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN]({ commit }, payload) {
    commit(m.REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN, payload);
  },
  // external incentives
  [a.ADD_EXTERNAL_INCENTIVE]({ commit }, newExternalIncentive) {
    commit(m.ADD_EXTERNAL_INCENTIVE, newExternalIncentive);
  },
  [a.REPLACE_EXTERNAL_INCENTIVES]({ commit }, newExternalIncentives) {
    commit(m.REPLACE_EXTERNAL_INCENTIVES, newExternalIncentives);
  },
  replaceExternalIncentivesFileImportNotes({ commit }, newImportNotes) {
    commit('REPLACE_EXTERNAL_INCENTIVES_FILE_IMPORT_NOTES', newImportNotes);
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
  // Fleet EV
  replaceTechnologySpecsFleetEV({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_FLEET_EV', payload);
  },
  // fleet ev upload page
  [a.ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_FLEET_EV]({ commit }, payload) {
    commit(m.ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_FLEET_EV, payload);
  },
  // ice
  replaceTechnologySpecsICE({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_ICE', payload);
  },
  // load following
  [a.SET_LF_COMBINED_MARKET]({ commit }, newLFCombinedMarket) {
    commit(m.SET_LF_COMBINED_MARKET, newLFCombinedMarket);
  },
  [a.SET_LF_DOWN_PRICE]({ commit }, newLFDownPrice) {
    commit(m.SET_LF_DOWN_PRICE, newLFDownPrice);
  },
  [a.SET_LF_DURATION]({ commit }, newLFDuration) {
    commit(m.SET_LF_DURATION, newLFDuration);
  },
  [a.SET_LF_EOU]({ commit }, newLFEnergyGrowth) {
    commit(m.SET_LF_EOU, newLFEnergyGrowth);
  },
  [a.SET_LF_EOD]({ commit }, newLFeou) {
    commit(m.SET_LF_EOD, newLFeou);
  },
  [a.SET_LF_PRICE]({ commit }, newLFeod) {
    commit(m.SET_LF_PRICE, newLFeod);
  },
  [a.SET_LF_UP_PRICE]({ commit }, newLFGrowth) {
    commit(m.SET_LF_UP_PRICE, newLFGrowth);
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
  [a.CHOOSE_ENERGY_STRUCTURE]({ commit }, energyPriceStructure) {
    commit(m.CHOOSE_ENERGY_STRUCTURE, energyPriceStructure);
  },
  [a.SELECT_OTHER_SERVICES]({ commit }, listOfServices) {
    commit(m.SELECT_OTHER_SERVICES, listOfServices);
  },
  [a.SET_INCLUDE_SITE_LOAD]({ commit }) {
    commit(m.SET_INCLUDE_SITE_LOAD);
  },
  [a.SET_INCLUDE_SYSTEM_LOAD]({ commit }) {
    commit(m.SET_INCLUDE_SYSTEM_LOAD);
  },
  [a.SET_OPTIMIZATION_HORIZON]({ commit }, newOptimizataionHorizon) {
    commit(m.SET_OPTIMIZATION_HORIZON, newOptimizataionHorizon);
  },
  [a.SET_OPTIMIZATION_HORIZON_NUM]({ commit }, newOptimizataionHorizonNum) {
    commit(m.SET_OPTIMIZATION_HORIZON_NUM, newOptimizataionHorizonNum);
  },
  [a.SET_SIZING_EQUIPMENT]({ commit }, newSizingEquipment) {
    commit(m.SET_SIZING_EQUIPMENT, newSizingEquipment);
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
  // resource adequacy
  [a.SET_RA_ACTIVE_TIMESTEP]({ commit }, newRAActive) {
    commit(m.SET_RA_ACTIVE_TIMESTEP, newRAActive);
  },
  [a.SET_RA_CAPACITY_PRICE]({ commit }, newRACapacityPrice) {
    commit(m.SET_RA_CAPACITY_PRICE, newRACapacityPrice);
  },
  [a.SET_RA_DISPATCH_MODE]({ commit }, newRADispatchMode) {
    commit(m.SET_RA_DISPATCH_MODE, newRADispatchMode);
  },
  [a.SET_RA_EVENT_LENGTH]({ commit }, newRAEventDuration) {
    commit(m.SET_RA_EVENT_LENGTH, newRAEventDuration);
  },
  [a.SET_RA_EVENT_SELECTION_METHOD]({ commit }, newRAEventSelectionMethod) {
    commit(m.SET_RA_EVENT_SELECTION_METHOD, newRAEventSelectionMethod);
  },
  [a.SET_RA_NUMBER_EVENTS]({ commit }, newRANumberEvents) {
    commit(m.SET_RA_NUMBER_EVENTS, newRANumberEvents);
  },
  // retail tariff billing period
  addRetailTariffBillingPeriod({ commit }, newBillingPeriod) {
    commit('ADD_RETAIL_TARIFF_BILLING_PERIOD', newBillingPeriod);
  },
  replaceRetailTariffBillingPeriods({ commit }, newBillingPeriods) {
    commit('REPLACE_RETAIL_TARIFF_BILLING_PERIODS', newBillingPeriods);
  },
  replaceRetailTariffFileImportNotes({ commit }, newImportNotes) {
    commit('REPLACE_RETAIL_TARIFF_FILE_IMPORT_NOTES', newImportNotes);
  },
  removeAllRetailTariffBillingPeriods({ commit }) {
    commit('REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS');
  },
  removeRetailTariffBillingPeriod({ commit }, id) {
    commit('REMOVE_RETAIL_TARIFF_BILLING_PERIOD', id);
  },
  // Single EV
  replaceTechnologySpecsSingleEV({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_SINGLE_EV', payload);
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
  // system load
  [a.SET_SYSTEM_LOAD]({ commit }, newSiteLoad) {
    commit(m.SET_SYSTEM_LOAD, newSiteLoad);
  },
  // technology specs
  [a.ACTIVATE_TECH]({ commit }, payload) {
    if (payload.tag === 'ICE') {
      commit(m.ACTIVATE_TECH_ICE, payload);
    } else if (payload.tag === 'DieselGen') {
      commit(m.ACTIVATE_TECH_DIESEL_GEN, payload);
    } else if (payload.tag === 'PV') {
      commit(m.ACTIVATE_TECH_SOLAR_PV, payload);
    } else if (payload.tag === 'Battery') {
      commit(m.ACTIVATE_TECH_BATTERY, payload);
    } else if (payload.tag === 'ControllableLoad') {
      commit(m.ACTIVATE_TECH_CONTROLLABLE_LOAD, payload);
    } else if (payload.tag === 'ElectricVehicle1') {
      commit(m.ACTIVATE_TECH_SINGLE_EV, payload);
    } else if (payload.tag === 'ElectricVehicle2') {
      commit(m.ACTIVATE_TECH_FLEET_EV, payload);
    }
  },
  [a.ADD_TECH]({ commit }, payload) {
    if (payload.tag === 'ICE') {
      commit(m.ADD_TECHNOLOGY_SPECS_ICE, payload);
    } else if (payload.tag === 'DieselGen') {
      commit(m.ADD_TECHNOLOGY_SPECS_DIESEL_GEN, payload);
    } else if (payload.tag === 'PV') {
      commit(m.ADD_TECHNOLOGY_SPECS_SOLAR_PV, payload);
    } else if (payload.tag === 'Battery') {
      commit(m.ADD_TECHNOLOGY_SPECS_BATTERY, payload);
    } else if (payload.tag === 'ControllableLoad') {
      commit(m.ADD_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD, payload);
    } else if (payload.tag === 'ElectricVehicle1') {
      commit(m.ADD_TECHNOLOGY_SPECS_SINGLE_EV, payload);
    } else if (payload.tag === 'ElectricVehicle2') {
      commit(m.ADD_TECHNOLOGY_SPECS_FLEET_EV, payload);
    }
  },
  [a.DEACTIVATE_TECH]({ commit }, payload) {
    if (payload.tag === 'ICE') {
      commit(m.DEACTIVATE_TECH_ICE, payload);
    } else if (payload.tag === 'DieselGen') {
      commit(m.DEACTIVATE_TECH_DIESEL_GEN, payload);
    } else if (payload.tag === 'PV') {
      commit(m.DEACTIVATE_TECH_SOLAR_PV, payload);
    } else if (payload.tag === 'Battery') {
      commit(m.DEACTIVATE_TECH_BATTERY, payload);
    } else if (payload.tag === 'ControllableLoad') {
      commit(m.DEACTIVATE_TECH_CONTROLLABLE_LOAD, payload);
    } else if (payload.tag === 'ElectricVehicle1') {
      commit(m.DEACTIVATE_TECH_SINGLE_EV, payload);
    } else if (payload.tag === 'ElectricVehicle2') {
      commit(m.DEACTIVATE_TECH_FLEET_EV, payload);
    }
  },
  [a.MAKE_LIST_OF_ACTIVE_TECHNOLOGIES]({ commit }, projectSpecs) {
    commit(m.RESET_LIST_OF_ACTIVE_TECHNOLOGIES);
    const specs = [
      projectSpecs.technologySpecsICE,
      projectSpecs.technologySpecsDieselGen,
      projectSpecs.technologySpecsBattery,
      projectSpecs.technologySpecsSolarPV,
      projectSpecs.technologySpecsControllableLoad,
      projectSpecs.technologySpecsSingleEV,
      projectSpecs.technologySpecsFleetEV,
    ];
    flatten(specs).forEach((tech) => {
      if (tech.active) {
        commit(m.ADD_TO_LIST_OF_ACTIVE_TECHNOLOGIES, tech);
      }
    });
  },
  [a.REPLACE_LIST_FIELD]({ commit }, payload) {
    commit(m.REPLACE_LIST_FIELD, payload);
  },
  [a.REMOVE_TECH]({ commit }, payload) {
    if (payload.tag === 'ICE') {
      commit(m.REMOVE_TECH_ICE, payload);
    } else if (payload.tag === 'DieselGen') {
      commit(m.REMOVE_TECH_DIESEL_GEN, payload);
    } else if (payload.tag === 'PV') {
      commit(m.REMOVE_TECH_SOLAR_PV, payload);
    } else if (payload.tag === 'Battery') {
      commit(m.REMOVE_TECH_BATTERY, payload);
    } else if (payload.tag === 'ControllableLoad') {
      commit(m.REMOVE_TECH_CONTROLLABLE_LOAD, payload);
    } else if (payload.tag === 'ElectricVehicle1') {
      commit(m.REMOVE_TECH_SINGLE_EV, payload);
    } else if (payload.tag === 'ElectricVehicle2') {
      commit(m.REMOVE_TECH_FLEET_EV, payload);
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
