import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import { v4 as uuidv4 } from 'uuid';

import { billReductionProject } from '@/assets/cases/billReduction/project';
import { reliabilityProject } from '@/assets/cases/reliability/project';
import { dummyMarketServiceHourly } from '@/assets/cases/dummyMarketServiceHourly/project';
import { ERCOTMarketService } from '@/assets/cases/ERCOTMarketService/project';
import { makeDatetimeIndex } from '@/models/dto/ProjectDto';
import { projectMetadata } from '@/models/Project/ProjectMetadata';
import TechnologySpecsSolarPVMetadata, { LOC, LocType } from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';
import * as m from '@/store/mutationTypes';
import * as a from '@/store/actionTypes';
import * as c from '@/models/Project/constants';

const USECASE_DB = { // its a sad excuse for a database, but serves as one.
  billReductionProject,
  reliabilityProject,
  dummyMarketServiceHourly,
  ERCOTMarketService,
};

const metadataDefaultValues = projectMetadata.getDefaultValues();
const techSolarPVMetadata = TechnologySpecsSolarPVMetadata.getHardcodedMetadata();

// TODO get rid of this completely...move over all DER, timeseries inits to getDefaultValues...
export const getDefaultState = () => ({
  ...metadataDefaultValues,

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
  getIndexOfBatteryId(state) {
    return id => state.technologySpecsBattery.findIndex(x => x.id === id);
  },
  activeBatteryExists(state) {
    return !isEmpty(filter(state.technologySpecsBattery, batt => batt.active));
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
  getTimeseriesXAxis(state) {
    return makeDatetimeIndex(state.dataYear, state.timestep, false);
  },
};

const mutations = {
  [m.RESET_PROJECT](state) {
    Object.assign(state, getDefaultState());
  },
  [m.LOAD_NEW_PROJECT](state, project) {
    Object.assign(state, project);
  },
  // Backup
  [m.SET_BACKUP_ENERGY_PRICE](state, newValue) {
    state[c.MTS_BACKUP_ENERGY_PRICE] = newValue;
  },
  [m.SET_BACKUP_ENERGY_RESERVATION](state, newValue) {
    state[c.MTS_BACKUP_ENERGY_RESERVATION] = newValue;
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
    tmpBatterySpecs[indexMatchingId].complete = (payload.batteryCycles.complete
      && tmpBatterySpecs[indexMatchingId].componentSpecsComplete);
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
  [m.ADD_DATA_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD](state, payload) {
    const tmpSpecs = getters.getControllableLoadSpecsClone(state)();
    const { id, index, data } = payload;
    const indexMatchingId = getters.getIndexOfControllableLoadId(state)(id);
    // this updates the object, while retaining untouched pieces
    Object.assign(tmpSpecs[indexMatchingId].associatedInputs[index], data);
    state.technologySpecsControllableLoad = tmpSpecs;
  },
  [m.SET_COMPLETENESS_OF_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD](state, payload) {
    const tmpSpecs = getters.getControllableLoadSpecsClone(state)();
    const { id, data } = payload;
    const indexMatchingId = getters.getIndexOfControllableLoadId(state)(id);
    tmpSpecs[indexMatchingId].associatedInputsComplete = data.complete;
    tmpSpecs[indexMatchingId].complete = (data.complete
      && tmpSpecs[indexMatchingId].componentSpecsComplete);
    state.technologySpecsControllableLoad = tmpSpecs;
  },
  [m.ADD_ERRORS_STRING_TO_DATA_IN_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD](state, payload) {
    const tmpSpecs = getters.getControllableLoadSpecsClone(state)();
    const { id, index, errorsString } = payload;
    const indexMatchingId = getters.getIndexOfControllableLoadId(state)(id);
    // add errorsString to ts.error
    if (errorsString !== undefined) {
      tmpSpecs[indexMatchingId].associatedInputs[index].ts.error = errorsString;
    }
    state.technologySpecsControllableLoad = tmpSpecs;
  },
  // da page
  [m.SET_DA_GROWTH](state, newDAGrowth) {
    state[c.DA_GROWTH] = newDAGrowth;
  },
  [m.SET_DA_PRICE](state, newDAPrice) {
    state[c.TS_DA_PRICE] = newDAPrice;
  },
  // deferral page
  [m.SET_DEFERRAL_GROWTH](state, newDeferralGrowth) {
    state[c.DEFERRAL_GROWTH] = newDeferralGrowth;
  },
  [m.SET_DEFERRAL_PRICE](state, newDeferralPrice) {
    state[c.DEFERRAL_PRICE] = newDeferralPrice;
  },
  [m.SET_DEFERRAL_PLANNED_LOAD_LIMIT](state, newDeferralPlannedLoadLimit) {
    state[c.DEFERRAL_PLANNED_LOAD_LIMIT] = newDeferralPlannedLoadLimit;
  },
  [m.SET_DEFERRAL_LOAD](state, newDeferralLoad) {
    state[c.TS_DEFERRAL_LOAD] = newDeferralLoad;
  },
  [m.SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT](state, newDeferralReversePowerFlowLimit) {
    state[c.DEFERRAL_REVERSE_POWER_FLOW_LIMIT] = newDeferralReversePowerFlowLimit;
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
  [m.SET_DR_END_MODE](state, newValue) {
    state[c.DR_END_MODE] = newValue;
  },
  [m.SET_DR_EVENT_LENGTH](state, newValue) {
    state[c.DR_EVENT_LENGTH] = newValue;
  },
  [m.SET_DR_PROGRAM_TYPE](state, newValue) {
    state[c.DR_PROGRAM_TYPE] = newValue;
  },
  [m.SET_DR_GROWTH](state, newDRGrowth) {
    state[c.DR_GROWTH] = newDRGrowth;
  },
  [m.SET_DR_APPLIED_MONTHS](state, newValue) {
    state[c.MTS_DR_MONTHS_APPLIED] = newValue;
    state[c.DR_APPLIED_MONTHS_LABELS] = newValue.data;
  },
  [m.SET_DR_APPLIED_MONTHS_LABELS](state, newValue) {
    state[c.DR_APPLIED_MONTHS_LABELS] = newValue;
  },
  [m.SET_DR_CAPACITY_RESERVATION](state, newValue) {
    state[c.MTS_DR_CAPACITY_RESERVATION] = newValue;
  },
  [m.SET_DR_CAPACITY_PRICE](state, newValue) {
    state[c.MTS_DR_CAPACITY_PRICE] = newValue;
  },
  [m.SET_DR_ENERGY_PRICE](state, newValue) {
    state[c.MTS_DR_ENERGY_PRICE] = newValue;
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
  // frequency regulation
  [m.SET_FR_COMBINED_MARKET](state, newFRCombinedMarket) {
    state[c.FR_COMBINED_MARKET] = newFRCombinedMarket;
  },
  [m.SET_FR_DOWN_PRICE](state, newFRDownPrice) {
    state[c.TS_FR_DOWN_PRICE] = newFRDownPrice;
  },
  [m.SET_FR_DURATION](state, newFRDuration) {
    state[c.FR_DURATION] = newFRDuration;
  },
  [m.SET_FR_ENERGY_PRICE_GROWTH](state, payload) {
    state[c.FR_ENERGY_PRICE_GROWTH] = payload;
  },
  [m.SET_FR_EOU](state, newFReou) {
    state[c.FR_EOU] = newFReou;
  },
  [m.SET_FR_EOD](state, newFReod) {
    state[c.FR_EOD] = newFReod;
  },
  [m.SET_FR_GROWTH](state, newFRGrowth) {
    state[c.FR_GROWTH] = newFRGrowth;
  },
  [m.SET_FR_PRICE](state, newFRPrice) {
    state[c.TS_FR_PRICE] = newFRPrice;
  },
  [m.SET_FR_UP_PRICE](state, newFRUpPrice) {
    state[c.TS_FR_UP_PRICE] = newFRUpPrice;
  },
  // Fleet EV
  [m.REPLACE_TECHNOLOGY_SPECS_FLEET_EV](state, payload) {
    const tmpSpecs = getters.getFleetEVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfFleetEVId(state)(payload.id);
    tmpSpecs[indexMatchingId] = payload.newFleetEV;
    state.technologySpecsFleetEV = tmpSpecs;
  },
  // fleet ev upload
  [m.ADD_DATA_TO_TECHNOLOGY_SPECS_FLEET_EV](state, payload) {
    const tmpSpecs = getters.getFleetEVSpecsClone(state)();
    const { id, index, data } = payload;
    const indexMatchingId = getters.getIndexOfFleetEVId(state)(id);
    // this updates the object, while retaining untouched pieces
    Object.assign(tmpSpecs[indexMatchingId].associatedInputs[index], data);
    state.technologySpecsFleetEV = tmpSpecs;
  },
  [m.SET_COMPLETENESS_OF_TECHNOLOGY_SPECS_FLEET_EV](state, payload) {
    const tmpSpecs = getters.getFleetEVSpecsClone(state)();
    const { id, data } = payload;
    const indexMatchingId = getters.getIndexOfFleetEVId(state)(id);
    tmpSpecs[indexMatchingId].associatedInputsComplete = data.complete;
    tmpSpecs[indexMatchingId].complete = (data.complete
      && tmpSpecs[indexMatchingId].componentSpecsComplete);
    state.technologySpecsFleetEV = tmpSpecs;
  },
  [m.ADD_ERRORS_STRING_TO_DATA_IN_TECHNOLOGY_SPECS_FLEET_EV](state, payload) {
    const tmpSpecs = getters.getFleetEVSpecsClone(state)();
    const { id, index, errorsString } = payload;
    const indexMatchingId = getters.getIndexOfFleetEVId(state)(id);
    // add errorsString to ts.error
    if (errorsString !== undefined) {
      tmpSpecs[indexMatchingId].associatedInputs[index].ts.error = errorsString;
    }
    state.technologySpecsFleetEV = tmpSpecs;
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
    state[c.LF_COMBINED_MARKET] = newFRCombinedMarket;
  },
  [m.SET_LF_DOWN_PRICE](state, newFRDownPrice) {
    state[c.TS_LF_DOWN_PRICE] = newFRDownPrice;
  },
  [m.SET_LF_DURATION](state, newFRDuration) {
    state[c.LF_DURATION] = newFRDuration;
  },
  [m.SET_LF_EOU](state, newFReou) {
    state[c.TS_LF_EOU] = newFReou;
  },
  [m.SET_LF_EOD](state, newFReod) {
    state[c.TS_LF_EOD] = newFReod;
  },
  [m.SET_LF_PRICE](state, newFRPrice) {
    state[c.TS_LF_PRICE] = newFRPrice;
  },
  [m.SET_LF_UP_PRICE](state, newFRUpPrice) {
    state[c.TS_LF_UP_PRICE] = newFRUpPrice;
  },
  [m.SET_LF_ENERGY_PRICE_GROWTH](state, payload) {
    state[c.LF_ENERGY_PRICE_GROWTH] = payload;
  },
  [m.SET_LF_GROWTH](state, newFRGrowth) {
    state[c.LF_GROWTH] = newFRGrowth;
  },
  // non-spinning reserve
  [m.SET_NSR_DURATION](state, newNSRDuration) {
    state[c.NSR_DURATION] = newNSRDuration;
  },
  [m.SET_NSR_GROWTH](state, newNSRGrowth) {
    state[c.NSR_GROWTH] = newNSRGrowth;
  },
  [m.SET_NSR_PRICE](state, newNSRPrice) {
    state[c.TS_NSR_PRICE] = newNSRPrice;
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
    customerSited = customerSited || state.objectivesRetailDemandChargeReduction;
    state.includeSiteLoad = customerSited;
    // also set TS boolean attribute
    state[c.TS_SITE_LOAD].required = customerSited;
  },
  [m.SET_INCLUDE_SYSTEM_LOAD](state) {
    let gridDomainProject = state.objectivesDR;
    gridDomainProject = gridDomainProject || state.objectivesRA;
    state.includeSystemLoad = gridDomainProject;
    // also set TS boolean attribute
    state[c.TS_SYSTEM_LOAD].required = gridDomainProject;
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
    state[c.MTS_RA_CAPACITY_PRICE] = newValue;
  },
  [m.SET_RA_ACTIVE](state, newValue) {
    state[c.TS_RA_ACTIVE] = newValue;
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
  [m.SET_RA_GROWTH](state, newRAGrowth) {
    state[c.RA_GROWTH] = newRAGrowth;
  },
  // reliability page
  [m.SET_CRITICAL_LOAD](state, newCriticalLoad) {
    state[c.TS_CRITICAL_LOAD] = newCriticalLoad;
  },
  [m.SET_RELIABILITY_MAX_OUTAGE_DURATION](state, newReliabilityMaxOutageDuration) {
    state[c.RELIABILITY_MAX_OUTAGE_DURATION] = newReliabilityMaxOutageDuration;
  },
  [m.SET_RELIABILITY_POST_OPTIMIZATION_ONLY](state, newPostOptimizationOnly) {
    state[c.RELIABILITY_POST_OPTIMIZATION_ONLY] = newPostOptimizationOnly;
  },
  [m.SET_RELIABILITY_TARGET](state, newReliabilityTarget) {
    state[c.RELIABILITY_TARGET] = newReliabilityTarget;
  },
  // retail tariff file
  [m.ADD_RETAIL_TARIFF_BILLING_PERIOD](state, newBillingPeriod) {
    state.retailTariffBillingPeriods.push(newBillingPeriod);
  },
  [m.ADD_MANY_RETAIL_TARIFF_BILLING_PERIODS](state, newBillingPeriods) {
    const combinedBillingPeriods = [...state.retailTariffBillingPeriods, ...newBillingPeriods];
    state.retailTariffBillingPeriods = combinedBillingPeriods;
  },
  [m.REPLACE_RETAIL_TARIFF_BILLING_PERIODS](state, newBillingPeriods) {
    state.retailTariffBillingPeriods = newBillingPeriods;
  },
  [m.REPLACE_RETAIL_TARIFF_FILE_IMPORT_NOTES](state, newImportNotes) {
    state.retailTariffFileImportNotes = newImportNotes;
  },
  [m.REMOVE_RETAIL_TARIFF_BILLING_PERIOD](state, id) {
    const index = getters.getIndexOfBillingPeriodId(state)(id);
    state.retailTariffBillingPeriods.splice(index, 1);
  },
  [m.REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS](state) {
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
  [m.SET_INCLUDE_POI_CONSTRAINTS](state, payload) {
    state[c.INCLUDE_INTERCONNECTION_CONSTRAINTS] = payload;
  },
  [m.SET_MAX_IMPORT_FROM_GRID](state, payload) {
    state[c.MAX_IMPORT] = payload;
  },
  [m.SET_MAX_EXPORT_TO_GRID](state, payload) {
    state[c.MAX_EXPORT] = payload;
  },
  [m.SET_SITE_LOAD](state, payload) {
    state[c.TS_SITE_LOAD] = payload;
  },
  // Solar PV
  REPLACE_TECHNOLOGY_SPECS_SOLAR_PV(state, payload) {
    const tmpSolarPVSpecs = getters.getSolarPVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.solarId);
    tmpSolarPVSpecs[indexMatchingId] = payload.newSolar;
    state.technologySpecsSolarPV = tmpSolarPVSpecs;
  },
  // solar pv upload
  [m.ADD_DATA_TO_TECHNOLOGY_SPECS_PV](state, payload) {
    const tmpSpecs = getters.getSolarPVSpecsClone(state)();
    const { id, index, data } = payload;
    const indexMatchingId = getters.getIndexOfSolarId(state)(id);
    // this updates the object, while retaining untouched pieces
    Object.assign(tmpSpecs[indexMatchingId].associatedInputs[index], data);
    state.technologySpecsSolarPV = tmpSpecs;
  },
  [m.SET_COMPLETENESS_OF_TECHNOLOGY_SPECS_PV](state, payload) {
    const tmpSpecs = getters.getSolarPVSpecsClone(state)();
    const { id, data } = payload;
    const indexMatchingId = getters.getIndexOfSolarId(state)(id);
    tmpSpecs[indexMatchingId].associatedInputsComplete = data.complete;
    tmpSpecs[indexMatchingId].complete = (data.complete
      && tmpSpecs[indexMatchingId].componentSpecsComplete);
    state.technologySpecsSolarPV = tmpSpecs;
  },
  [m.ADD_ERRORS_STRING_TO_DATA_IN_TECHNOLOGY_SPECS_PV](state, payload) {
    const tmpSpecs = getters.getSolarPVSpecsClone(state)();
    const { id, index, errorsString } = payload;
    const indexMatchingId = getters.getIndexOfSolarId(state)(id);
    // add errorsString to ts.error
    if (errorsString !== undefined) {
      tmpSpecs[indexMatchingId].associatedInputs[index].ts.error = errorsString;
    }
    state.technologySpecsSolarPV = tmpSpecs;
  },
  // spinning reserve
  [m.SET_SR_DURATION](state, newSRDuration) {
    state[c.SR_DURATION] = newSRDuration;
  },
  [m.SET_SR_GROWTH](state, newSRGrowth) {
    state[c.SR_GROWTH] = newSRGrowth;
  },
  [m.SET_SR_PRICE](state, newSRPrice) {
    state[c.TS_SR_PRICE] = newSRPrice;
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
    state[c.TS_SYSTEM_LOAD] = newSystemLoad;
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
  [m.ADD_TO_ALL_ERRORLISTS_IN_TECH](state, { techType, displayName }) {
    const errorMsg = `${displayName} is required`;
    each(state[techType], tech => {
      // only modify tech if it has been saved/started
      if (tech.complete === null) { return; }
      tech.errorList.push(errorMsg);
    });
  },
  [m.REMOVE_FROM_ALL_ERRORLISTS_IN_TECH](state, { techType, displayName }) {
    each(state[techType], tech => {
      // only modify tech if it has been saved/started
      if (tech.complete === null) { return; }
      tech.errorList = tech.errorList.filter(item => !item.includes(displayName));
    });
  },
  [m.SET_ALL_COMPLETENESS_IN_TECH](state, techType) {
    each(state[techType], tech => {
      // only modify tech if it has been saved/started
      if (tech.complete === null) { return; }
      if (tech.componentSpecsComplete !== undefined
        && tech.associatedInputsComplete !== undefined) {
        tech.componentSpecsComplete = tech.errorList.length === 0;
        tech.complete = tech.componentSpecsComplete && tech.associatedInputsComplete;
      } else {
        tech.complete = tech.errorList.length === 0;
      }
    });
  },
  [m.SET_ALL_VALUES_IN_TECH](state, { techType, key, value }) {
    each(state[techType], tech => { tech[key] = value; });
  },
  [m.SET_UNIQUE_IDS_IN_TECH](state) {
    each(c.TECH_TYPES, techType => each(state[techType], tech => { tech.id = uuidv4(); }));
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
    const indexMatchingId = getters.getIndexOfFleetEVId(state)(payload.id);
    state.technologySpecsFleetEV.splice(indexMatchingId, 1);
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
  // timeseries uploads
  [m.SET_TS_ERROR](state, payload) {
    const { tsName, error } = payload;
    state[tsName].error = error;
  },
  [m.SET_TS_REQUIRED](state, payload) {
    const { tsName, required } = payload;
    state[tsName].required = required;
  },
  // user defined service
  [m.SET_USER_ENERGY_MAX](state, payload) {
    state[c.TS_USER_ENERGY_MAX] = payload;
  },
  [m.SET_USER_ENERGY_MIN](state, payload) {
    state[c.TS_USER_ENERGY_MIN] = payload;
  },
  [m.SET_USER_POWER_EXPORT_MAX](state, payload) {
    state[c.TS_USER_POWER_EXPORT_MAX] = payload;
  },
  [m.SET_USER_POWER_EXPORT_MIN](state, payload) {
    state[c.TS_USER_POWER_EXPORT_MIN] = payload;
  },
  [m.SET_USER_POWER_IMPORT_MAX](state, payload) {
    state[c.TS_USER_POWER_IMPORT_MAX] = payload;
  },
  [m.SET_USER_POWER_IMPORT_MIN](state, payload) {
    state[c.TS_USER_POWER_IMPORT_MIN] = payload;
  },
  [m.SET_USER_INFEASIBLE](state, payload) {
    state[c.USER_INFEASIBLE] = payload;
  },
  [m.SET_USER_PRICE](state, payload) {
    state[c.USER_PRICE] = payload;
  },
};

const actions = {
  [a.RESET_PROJECT]({ commit }) {
    commit(m.RESET_PROJECT);
  },
  [a.LOAD_NEW_PROJECT]({ commit }, project) {
    return new Promise((resolve) => {
      commit(m.LOAD_NEW_PROJECT, merge(cloneDeep(getDefaultState()), cloneDeep(project)));
      commit(m.SET_UNIQUE_IDS_IN_TECH);
      resolve();
    });
  },
  [a.LOAD_QUICK_START_PROJECT]({ dispatch }, caseName) {
    const selectedUseCase = USECASE_DB[caseName];
    return dispatch(a.LOAD_NEW_PROJECT, selectedUseCase);
  },
  // backup
  [a.SET_BACKUP_ENERGY_PRICE]({ commit }, payload) {
    commit(m.SET_BACKUP_ENERGY_PRICE, payload);
  },
  [a.SET_BACKUP_ENERGY_RESERVATION]({ commit }, payload) {
    commit(m.SET_BACKUP_ENERGY_RESERVATION, payload);
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
    commit(m.ADD_DATA_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD, payload);
    commit(m.SET_COMPLETENESS_OF_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD, payload);
    commit(m.ADD_ERRORS_STRING_TO_DATA_IN_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD, payload);
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
  [a.SET_DR_END_MODE]({ commit }, newValue) {
    commit(m.SET_DR_END_MODE, newValue);
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
  [a.SET_DR_CAPACITY_PRICE]({ commit }, newValue) {
    commit(m.SET_DR_CAPACITY_PRICE, newValue);
  },
  [a.SET_DR_ENERGY_PRICE]({ commit }, newValue) {
    commit(m.SET_DR_ENERGY_PRICE, newValue);
  },
  [a.SET_DR_GROWTH]({ commit }, newDRGrowth) {
    commit(m.SET_DR_GROWTH, newDRGrowth);
  },
  // diesel
  [a.REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN]({ commit }, payload) {
    commit(m.REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN, payload);
  },
  // external incentives
  [a.ADD_EXTERNAL_INCENTIVE]({ commit }, newExternalIncentive) {
    commit(m.ADD_EXTERNAL_INCENTIVE, newExternalIncentive);
    commit('REPLACE_EXTERNAL_INCENTIVES_FILE_IMPORT_NOTES', []);
  },
  [a.REPLACE_EXTERNAL_INCENTIVES]({ commit }, newExternalIncentives) {
    commit(m.REPLACE_EXTERNAL_INCENTIVES, newExternalIncentives);
  },
  replaceExternalIncentivesFileImportNotes({ commit }, newImportNotes) {
    commit('REPLACE_EXTERNAL_INCENTIVES_FILE_IMPORT_NOTES', newImportNotes);
  },
  removeAllExternalIncentives({ commit }) {
    commit('REMOVE_ALL_EXTERNAL_INCENTIVES');
    commit('REPLACE_EXTERNAL_INCENTIVES_FILE_IMPORT_NOTES', []);
  },
  removeExternalIncentive({ commit }, id) {
    commit('REMOVE_EXTERNAL_INCENTIVE', id);
    commit('REPLACE_EXTERNAL_INCENTIVES_FILE_IMPORT_NOTES', []);
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
  // frequency regulation
  [a.SET_FR_COMBINED_MARKET]({ commit }, newFRCombinedMarket) {
    commit(m.SET_FR_COMBINED_MARKET, newFRCombinedMarket);
  },
  [a.SET_FR_DOWN_PRICE]({ commit }, newFRDownPrice) {
    commit(m.SET_FR_DOWN_PRICE, newFRDownPrice);
  },
  [a.SET_FR_DURATION]({ commit }, newFRDuration) {
    commit(m.SET_FR_DURATION, newFRDuration);
  },
  [a.SET_FR_ENERGY_PRICE_GROWTH]({ commit }, payload) {
    commit(m.SET_FR_ENERGY_PRICE_GROWTH, payload);
  },
  [a.SET_FR_EOU]({ commit }, newFReou) {
    commit(m.SET_FR_EOU, newFReou);
  },
  [a.SET_FR_EOD]({ commit }, newFReod) {
    commit(m.SET_FR_EOD, newFReod);
  },
  [a.SET_FR_GROWTH]({ commit }, newFRGrowth) {
    commit(m.SET_FR_GROWTH, newFRGrowth);
  },
  [a.SET_FR_PRICE]({ commit }, newFRPrice) {
    commit(m.SET_FR_PRICE, newFRPrice);
  },
  [a.SET_FR_UP_PRICE]({ commit }, newFRUpPrice) {
    commit(m.SET_FR_UP_PRICE, newFRUpPrice);
  },
  // Fleet EV
  replaceTechnologySpecsFleetEV({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_FLEET_EV', payload);
  },
  // fleet ev upload page
  [a.ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_FLEET_EV]({ commit }, payload) {
    commit(m.ADD_DATA_TO_TECHNOLOGY_SPECS_FLEET_EV, payload);
    commit(m.SET_COMPLETENESS_OF_TECHNOLOGY_SPECS_FLEET_EV, payload);
    commit(m.ADD_ERRORS_STRING_TO_DATA_IN_TECHNOLOGY_SPECS_FLEET_EV, payload);
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
  [a.SET_LF_EOU]({ commit }, payload) {
    commit(m.SET_LF_EOU, payload);
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
  [a.SET_LF_ENERGY_PRICE_GROWTH]({ commit }, payload) {
    commit(m.SET_LF_ENERGY_PRICE_GROWTH, payload);
  },
  [a.SET_LF_GROWTH]({ commit }, newFRGrowth) {
    commit(m.SET_LF_GROWTH, newFRGrowth);
  },
  // non spinning reserves
  [a.SET_NSR_DURATION]({ commit }, newNSRDuration) {
    commit(m.SET_NSR_DURATION, newNSRDuration);
  },
  [a.SET_NSR_GROWTH]({ commit }, newNSRGrowth) {
    commit(m.SET_NSR_GROWTH, newNSRGrowth);
  },
  [a.SET_NSR_PRICE]({ commit }, newNSRPrice) {
    commit(m.SET_NSR_PRICE, newNSRPrice);
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
  [a.SET_CRITICAL_LOAD]({ commit }, newCriticalLoad) {
    commit(m.SET_CRITICAL_LOAD, newCriticalLoad);
  },
  [a.SET_RELIABILITY_MAX_OUTAGE_DURATION]({ commit }, newReliabilityMaxOutageDuration) {
    commit(m.SET_RELIABILITY_MAX_OUTAGE_DURATION, newReliabilityMaxOutageDuration);
  },
  [a.SET_RELIABILITY_POST_OPTIMIZATION_ONLY]({ commit }, newPostOptimizationOnly) {
    commit(m.SET_RELIABILITY_POST_OPTIMIZATION_ONLY, newPostOptimizationOnly);
  },
  [a.SET_RELIABILITY_TARGET]({ commit }, newReliabilityTarget) {
    commit(m.SET_RELIABILITY_TARGET, newReliabilityTarget);
  },
  // resource adequacy
  [a.SET_RA_ACTIVE]({ commit }, newRAActive) {
    commit(m.SET_RA_ACTIVE, newRAActive);
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
  [a.SET_RA_GROWTH]({ commit }, newRAGrowth) {
    commit(m.SET_RA_GROWTH, newRAGrowth);
  },
  // retail tariff billing period
  [a.ADD_RETAIL_TARIFF_BILLING_PERIOD]({ commit }, newBillingPeriod) {
    commit(m.ADD_RETAIL_TARIFF_BILLING_PERIOD, newBillingPeriod);
    commit(m.REPLACE_RETAIL_TARIFF_FILE_IMPORT_NOTES, []);
  },
  [a.ADD_MANY_RETAIL_TARIFF_BILLING_PERIODS]({ commit }, newBillingPeriod) {
    commit(m.ADD_MANY_RETAIL_TARIFF_BILLING_PERIODS, newBillingPeriod);
    commit(m.REPLACE_RETAIL_TARIFF_FILE_IMPORT_NOTES, []);
  },
  [a.REPLACE_RETAIL_TARIFF_BILLING_PERIODS]({ commit }, newBillingPeriods) {
    commit(m.REPLACE_RETAIL_TARIFF_BILLING_PERIODS, newBillingPeriods);
  },
  [a.REPLACE_RETAIL_TARIFF_FILE_IMPORT_NOTES]({ commit }, newImportNotes) {
    commit(m.REPLACE_RETAIL_TARIFF_FILE_IMPORT_NOTES, newImportNotes);
  },
  [a.REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS]({ commit }) {
    commit(m.REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS);
    commit(m.REPLACE_RETAIL_TARIFF_FILE_IMPORT_NOTES, []);
  },
  [a.REMOVE_RETAIL_TARIFF_BILLING_PERIOD]({ commit }, id) {
    commit(m.REMOVE_RETAIL_TARIFF_BILLING_PERIOD, id);
    commit(m.REPLACE_RETAIL_TARIFF_FILE_IMPORT_NOTES, []);
  },
  // Single EV
  replaceTechnologySpecsSingleEV({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_SINGLE_EV', payload);
  },
  // site information
  [a.SET_INCLUDE_POI_CONSTRAINTS]({ commit }, newIncludePOIConstraints) {
    commit(m.SET_INCLUDE_POI_CONSTRAINTS, newIncludePOIConstraints);
  },
  [a.SET_MAX_IMPORT_FROM_GRID]({ commit }, newChargingFromGridLimit) {
    commit(m.SET_MAX_IMPORT_FROM_GRID, newChargingFromGridLimit);
  },
  [a.SET_MAX_EXPORT_TO_GRID]({ commit }, newDischargingToGridLimit) {
    commit(m.SET_MAX_EXPORT_TO_GRID, newDischargingToGridLimit);
  },
  [a.SET_SITE_LOAD]({ commit }, newSiteLoad) {
    commit(m.SET_SITE_LOAD, newSiteLoad);
  },
  // spinning reserves
  [a.SET_SR_DURATION]({ commit }, newSRDuration) {
    commit(m.SET_SR_DURATION, newSRDuration);
  },
  [a.SET_SR_GROWTH]({ commit }, newSRGrowth) {
    commit(m.SET_SR_GROWTH, newSRGrowth);
  },
  [a.SET_SR_PRICE]({ commit }, newSRPrice) {
    commit(m.SET_SR_PRICE, newSRPrice);
  },
  // solar pv
  replaceTechnologySpecsSolarPV({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_SOLAR_PV', payload);
  },
  // solar pv upload
  [a.ADD_GENERATION_PROFILE_TO_TECHNOLOGY_SPECS_PV]({ commit }, payload) {
    commit(m.ADD_DATA_TO_TECHNOLOGY_SPECS_PV, payload);
    commit(m.SET_COMPLETENESS_OF_TECHNOLOGY_SPECS_PV, payload);
    commit(m.ADD_ERRORS_STRING_TO_DATA_IN_TECHNOLOGY_SPECS_PV, payload);
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
  [a.SET_SYSTEM_LOAD]({ commit }, payload) {
    commit(m.SET_SYSTEM_LOAD, payload);
  },
  // technology specs
  [a.ACTIVATE_TECH]({ commit, getters, dispatch }, payload) {
    if (payload.tag === 'ICE') {
      commit(m.ACTIVATE_TECH_ICE, payload);
    }
    if (payload.tag === 'Diesel') {
      commit(m.ACTIVATE_TECH_DIESEL_GEN, payload);
    }
    if (payload.tag === 'PV') {
      commit(m.ACTIVATE_TECH_SOLAR_PV, payload);
    }
    if (payload.tag === 'Battery') {
      if (!getters.activeBatteryExists) {
        const setValsPayload = {
          techType: c.TECH_SPECS_SOLAR_PV,
          key: LOC,
          value: null,
          displayName: techSolarPVMetadata.loc.displayName,
        };
        commit(m.SET_ALL_VALUES_IN_TECH, setValsPayload);
        dispatch(a.UPDATE_ADD_ALL_ERRORLISTS_IN_TECH, setValsPayload);
        commit(m.SET_ALL_COMPLETENESS_IN_TECH, setValsPayload.techType);
      }
      commit(m.ACTIVATE_TECH_BATTERY, payload);
    }
    if (payload.tag === 'Controllable Load') {
      commit(m.ACTIVATE_TECH_CONTROLLABLE_LOAD, payload);
    }
    if (payload.tag === 'Single EV') {
      commit(m.ACTIVATE_TECH_SINGLE_EV, payload);
    }
    if (payload.tag === 'Fleet EV') {
      commit(m.ACTIVATE_TECH_FLEET_EV, payload);
    }
  },
  [a.ADD_TECH]({ commit, getters, dispatch }, payload) {
    if (payload.tag === 'ICE') {
      commit(m.ADD_TECHNOLOGY_SPECS_ICE, payload);
    }
    if (payload.tag === 'Diesel') {
      commit(m.ADD_TECHNOLOGY_SPECS_DIESEL_GEN, payload);
    }
    if (payload.tag === 'PV') {
      commit(m.ADD_TECHNOLOGY_SPECS_SOLAR_PV, payload);
    }
    if (payload.tag === 'Battery') {
      if (!getters.activeBatteryExists) {
        const setValsPayload = {
          techType: c.TECH_SPECS_SOLAR_PV,
          key: LOC,
          value: null,
          displayName: techSolarPVMetadata.loc.displayName,
        };
        commit(m.SET_ALL_VALUES_IN_TECH, setValsPayload);
        dispatch(a.UPDATE_ADD_ALL_ERRORLISTS_IN_TECH, setValsPayload);
        commit(m.SET_ALL_COMPLETENESS_IN_TECH, setValsPayload.techType);
      }
      commit(m.ADD_TECHNOLOGY_SPECS_BATTERY, payload);
    }
    if (payload.tag === 'Controllable Load') {
      commit(m.ADD_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD, payload);
    }
    if (payload.tag === 'Single EV') {
      commit(m.ADD_TECHNOLOGY_SPECS_SINGLE_EV, payload);
    }
    if (payload.tag === 'Fleet EV') {
      commit(m.ADD_TECHNOLOGY_SPECS_FLEET_EV, payload);
    }
  },
  [a.DEACTIVATE_TECH]({ commit, getters }, payload) {
    if (payload.tag === 'ICE') {
      commit(m.DEACTIVATE_TECH_ICE, payload);
    }
    if (payload.tag === 'Diesel') {
      commit(m.DEACTIVATE_TECH_DIESEL_GEN, payload);
    }
    if (payload.tag === 'PV') {
      commit(m.DEACTIVATE_TECH_SOLAR_PV, payload);
    }
    if (payload.tag === 'Battery') {
      commit(m.DEACTIVATE_TECH_BATTERY, payload);
      if (!getters.activeBatteryExists) {
        const setValsPayload = {
          techType: c.TECH_SPECS_SOLAR_PV,
          key: LOC,
          value: LocType.AC,
          displayName: techSolarPVMetadata.loc.displayName,
        };
        commit(m.SET_ALL_VALUES_IN_TECH, setValsPayload);
        commit(m.REMOVE_FROM_ALL_ERRORLISTS_IN_TECH, setValsPayload);
        commit(m.SET_ALL_COMPLETENESS_IN_TECH, setValsPayload.techType);
      }
    }
    if (payload.tag === 'Controllable Load') {
      commit(m.DEACTIVATE_TECH_CONTROLLABLE_LOAD, payload);
    }
    if (payload.tag === 'Single EV') {
      commit(m.DEACTIVATE_TECH_SINGLE_EV, payload);
    }
    if (payload.tag === 'Fleet EV') {
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
  [a.REMOVE_TECH]({ commit, getters }, payload) {
    if (payload.tag === 'ICE') {
      commit(m.REMOVE_TECH_ICE, payload);
    } else if (payload.tag === 'Diesel') {
      commit(m.REMOVE_TECH_DIESEL_GEN, payload);
    } else if (payload.tag === 'PV') {
      commit(m.REMOVE_TECH_SOLAR_PV, payload);
    } else if (payload.tag === 'Battery') {
      commit(m.REMOVE_TECH_BATTERY, payload);
      if (!getters.activeBatteryExists) {
        const setValsPayload = {
          techType: c.TECH_SPECS_SOLAR_PV,
          key: LOC,
          value: LocType.AC,
          displayName: techSolarPVMetadata.loc.displayName,
        };
        commit(m.SET_ALL_VALUES_IN_TECH, setValsPayload);
        commit(m.REMOVE_FROM_ALL_ERRORLISTS_IN_TECH, setValsPayload);
        commit(m.SET_ALL_COMPLETENESS_IN_TECH, setValsPayload.techType);
      }
    } else if (payload.tag === 'Controllable Load') {
      commit(m.REMOVE_TECH_CONTROLLABLE_LOAD, payload);
    } else if (payload.tag === 'Single EV') {
      commit(m.REMOVE_TECH_SINGLE_EV, payload);
    } else if (payload.tag === 'Fleet EV') {
      commit(m.REMOVE_TECH_FLEET_EV, payload);
    }
  },
  [a.RESET_GAMMA_AND_NU]({ commit, dispatch }, payload) {
    const gammaPayload = {
      techType: 'technologySpecsSolarPV',
      key: 'gamma',
      value: techSolarPVMetadata.gamma.defaultValue,
      displayName: techSolarPVMetadata.gamma.displayName,
    };
    const nuPayload = {
      techType: 'technologySpecsSolarPV',
      key: 'nu',
      value: techSolarPVMetadata.nu.defaultValue,
      displayName: techSolarPVMetadata.nu.displayName,
    };
    commit(m.SET_ALL_VALUES_IN_TECH, gammaPayload);
    commit(m.SET_ALL_VALUES_IN_TECH, nuPayload);
    if (payload) {
      dispatch(a.UPDATE_ADD_ALL_ERRORLISTS_IN_TECH, gammaPayload)
        .then(dispatch(a.UPDATE_ADD_ALL_ERRORLISTS_IN_TECH, nuPayload));
    } else {
      commit(m.REMOVE_FROM_ALL_ERRORLISTS_IN_TECH, gammaPayload);
      commit(m.REMOVE_FROM_ALL_ERRORLISTS_IN_TECH, nuPayload);
    }
    commit(m.SET_ALL_COMPLETENESS_IN_TECH, gammaPayload.techType);
  },
  [a.UPDATE_ADD_ALL_ERRORLISTS_IN_TECH]({ commit }, payload) {
    commit(m.REMOVE_FROM_ALL_ERRORLISTS_IN_TECH, payload);
    commit(m.ADD_TO_ALL_ERRORLISTS_IN_TECH, payload);
  },
  // timeseries uploads
  [a.SET_TS_ERROR]({ commit }, payload) {
    commit(m.SET_TS_ERROR, payload);
  },
  [a.SET_TS_REQUIRED]({ commit }, payload) {
    commit(m.SET_TS_REQUIRED, payload);
  },
  // user defined
  [a.SET_USER_ENERGY_MAX]({ commit }, payload) {
    commit(m.SET_USER_ENERGY_MAX, payload);
  },
  [a.SET_USER_ENERGY_MIN]({ commit }, payload) {
    commit(m.SET_USER_ENERGY_MIN, payload);
  },
  [a.SET_USER_POWER_EXPORT_MAX]({ commit }, payload) {
    commit(m.SET_USER_POWER_EXPORT_MAX, payload);
  },
  [a.SET_USER_POWER_EXPORT_MIN]({ commit }, payload) {
    commit(m.SET_USER_POWER_EXPORT_MIN, payload);
  },
  [a.SET_USER_POWER_IMPORT_MAX]({ commit }, payload) {
    commit(m.SET_USER_POWER_IMPORT_MAX, payload);
  },
  [a.SET_USER_POWER_IMPORT_MIN]({ commit }, payload) {
    commit(m.SET_USER_POWER_IMPORT_MIN, payload);
  },
  [a.SET_USER_INFEASIBLE]({ commit }, payload) {
    commit(m.SET_USER_INFEASIBLE, payload);
  },
  [a.SET_USER_PRICE]({ commit }, payload) {
    commit(m.SET_USER_PRICE, payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
