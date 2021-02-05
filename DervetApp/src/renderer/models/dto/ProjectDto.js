import * as d3 from 'd3';
import _ from 'lodash';
import dateFormat from 'dateformat';
import moment from 'moment';
import path from 'path';

import * as c from '@/models/Project/constants';
import { billingPeriodsToCsv } from '@/models/RetailTariffBillingPeriod';
import { externalIncentivesToCsv } from '@/models/ExternalIncentives';
import { getAppDataPath, createDirectory, objectToCsv } from '@/util/file';
import { isNotNullAndNotUndefined } from '@/util/logic';

const NO = 'no';
const YES = 'yes';

const ZERO = 0;
const ONE = 1;

const NAN = 'nan';
const NONE = 'None';

const BOOL = 'bool';
const FLOAT = 'float';
const INT = 'int';
const LIST_INT = 'list/int';
const PERIOD = 'Period';
const STRING = 'string';
const STRING_INT = 'string/int';

const TIMESERIES_DATETIME_INDEX = 'datetime';
const TIMESERIES_DATETIME_HEADER = 'Datetime (he)';

// Timeseries file names
const CYCLE = 'cycle';
const MONTHLY = 'monthly';
const TARIFF = 'tariff';
const TIMESERIES = 'timeseries';
const YEARLY = 'yearly';
const LOAD_SHEAD = 'load_shed_percentage';

const INPUTS = 'inputs';
const MODEL_PARAMETERS = 'model_parameters.json';
const RESULTS = 'results';
export const LOG_FILE = 'dervet_log.log';

const TIMESERIES_FIELDS = [
  'criticalLoad',
  'deferralLoad',
  'daPrice',
  'lfEOU',
  'lfEOD',
  'lfPrice',
  'lfUpPrice',
  'lfDownPrice',
  'frPrice',
  'frUpPrice',
  'frDownPrice',
  'nsrPrice',
  'siteLoad',
  'srPrice',
  'systemLoad',
  'userPowerMin',
  'userPowerMax',
  'userEnergyMin',
  'userEnergyMax',
];

const MONTHLY_FIELDS = [
  'backupPrice',
  'backupEnergyReservation',
  'drMonthsApplied',
  'drCapacityReservation',
  'drCapacityAwards',
  'drEnergyAwards',
  'raCapacityAwards',
];

export const convertToYesNo = condition => (condition ? YES : NO);

export const convertToOneZero = condition => (condition ? ONE : ZERO);

export const calculateEndYear = (startYear, analysisHorizon) => (
  (Number(startYear) + Number(analysisHorizon)).toString()
);

export const calculateSalvageValue = (techSpecs) => {
  const { salvageValueOption, salvageValue } = techSpecs;
  return salvageValueOption === 'User defined' ? salvageValue : salvageValueOption;
};

export const setUndefinedNullToZero = value => (
  (value === undefined || value === null) ? 0 : value
);

export const makeCsvFilePath = (directory, fileName) => (
  path.join(directory, `${fileName}.csv`)
);

export const makeBaseKey = (value, type) => ({
  opt_value: value.toString(),
  sensitivity: {
    active: NO,
    coupled: NONE,
    value: NAN,
  },
  type,
});

export const makeGroup = (name, active, keys) => ({
  [name]: {
    active,
    keys,
  },
});

export const makeEmptyGroup = () => ({
  '': {
    active: NO,
  },
});

export const checkNotNullOrEmpty = technologySpecs => (
  isNotNullAndNotUndefined(technologySpecs) && technologySpecs.length > 0
);

export const mapListToObjectList = (lst, fieldName) => (
  lst.map(d => ({ [fieldName]: d }))
);

export const makeTechnologyParameters = (technologySpecs, makeSingleTechFn) => {
  const includeTech = checkNotNullOrEmpty(technologySpecs);

  if (includeTech) {
    return _.reduce(technologySpecs, (result, tech) => (
      _.extend(result, makeSingleTechFn(tech))
    ), {});
  }
  return makeEmptyGroup();
};

export const makeBackupParameters = (project) => {
  if (project.objectivesBackupPower) {
    const isActive = convertToYesNo(project.objectivesBackupPower);
    const keys = {};
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeBatteryCsvFilePath = (inputsDirectory, battery) => (
  makeCsvFilePath(inputsDirectory, `${CYCLE}_${battery.id}`)
);

export const makeSingleBatteryParameter = (battery, inputsDirectory) => {
  // determine DAILY_CYCLE_LIMIT
  let dailyCycleLimit = ZERO;
  if (battery.shouldLimitDailyCycling) {
    ({ dailyCycleLimit } = battery);
  }
  // determine HP
  let hp = ZERO;
  if (battery.includeAuxiliaryLoad) {
    hp = battery.auxiliaryLoad;
  }
  // determine DIS_MAX_RATED & CH_MAX_RATED
  let chargingCapacity = ZERO;
  let dischargingCapacity = ZERO;
  if (!battery.shouldPowerSize) {
    if (battery.shouldDiffChargeDischarge) {
      ({ chargingCapacity, dischargingCapacity } = battery);
    } else {
      chargingCapacity = battery.powerCapacity;
      dischargingCapacity = battery.powerCapacity;
    }
  }

  // determine ENE_MAX_RATED
  let energyCapacity = ZERO;
  if (!battery.shouldEnergySize) {
    ({ energyCapacity } = battery);
  }
  const replacementConstructionTime = setUndefinedNullToZero(battery.replacementConstructionTime);

  const keys = {
    OMexpenses: makeBaseKey(battery.variableOMCosts, FLOAT),
    ccost: makeBaseKey(battery.capitalCost, FLOAT),
    ccost_kw: makeBaseKey(battery.capitalCostPerkW, FLOAT),
    ccost_kwh: makeBaseKey(battery.capitalCostPerkWh, FLOAT),
    ch_max_rated: makeBaseKey(chargingCapacity, FLOAT),
    ch_min_rated: makeBaseKey(ZERO, FLOAT), // hardcoded
    construction_year: makeBaseKey(battery.constructionYear, PERIOD),
    cycle_life_filename: makeBaseKey(makeBatteryCsvFilePath(inputsDirectory, battery), STRING),
    daily_cycle_limit: makeBaseKey(dailyCycleLimit, FLOAT),
    decommissioning_cost: makeBaseKey(battery.decomissioningCost, FLOAT),
    dis_max_rated: makeBaseKey(dischargingCapacity, FLOAT),
    dis_min_rated: makeBaseKey(ZERO, FLOAT), // hardcoded
    duration_max: makeBaseKey(setUndefinedNullToZero(battery.maxDuration), FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    ene_max_rated: makeBaseKey(energyCapacity, FLOAT),
    expected_lifetime: makeBaseKey(battery.expectedLifetime, INT),
    fixedOM: makeBaseKey(battery.fixedOMCosts, FLOAT),
    hp: makeBaseKey(hp, FLOAT),
    incl_cycle_degrade: makeBaseKey(convertToOneZero(battery.includeCycleDegradation), BOOL),
    incl_ts_charge_limits: makeBaseKey(ZERO, BOOL), // hardcode
    incl_ts_discharge_limits: makeBaseKey(ZERO, BOOL), // hardcode
    incl_ts_energy_limits: makeBaseKey(ZERO, BOOL), // hardcode
    llsoc: makeBaseKey(battery.lowerSOCLimit, FLOAT),
    macrs_term: makeBaseKey(battery.macrsTerm, FLOAT),
    name: makeBaseKey(battery.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(battery.operationYear, PERIOD),
    p_start_ch: makeBaseKey(ZERO, FLOAT), // hardcoded
    p_start_dis: makeBaseKey(ZERO, FLOAT), // hardcoded
    rcost: makeBaseKey(setUndefinedNullToZero(battery.replacementCost), FLOAT),
    rcost_kW: makeBaseKey(setUndefinedNullToZero(battery.replacementCostPerkW), FLOAT),
    rcost_kWh: makeBaseKey(setUndefinedNullToZero(battery.replacementCostPerkWh), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(battery.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    rte: makeBaseKey(battery.roundtripEfficiency, FLOAT),
    salvage_value: makeBaseKey(calculateSalvageValue(battery), STRING_INT),
    sdr: makeBaseKey(battery.selfDischargeRate, FLOAT),
    soc_target: makeBaseKey(battery.targetSOC, FLOAT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup: makeBaseKey(ZERO, BOOL), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    state_of_health: makeBaseKey(setUndefinedNullToZero(battery.state_of_health), FLOAT),
    ter: makeBaseKey(battery.ter, FLOAT),
    ulsoc: makeBaseKey(battery.upperSOCLimit, FLOAT),
    user_ch_rated_max: makeBaseKey(setUndefinedNullToZero(battery.powerCapacityMaximum), FLOAT),
    user_ch_rated_min: makeBaseKey(setUndefinedNullToZero(battery.powerCapacityMinimum), FLOAT),
    user_dis_rated_max: makeBaseKey(setUndefinedNullToZero(battery.powerCapacityMaximum), FLOAT),
    user_dis_rated_min: makeBaseKey(setUndefinedNullToZero(battery.powerCapacityMinimum), FLOAT),
    user_ene_rated_max: makeBaseKey(setUndefinedNullToZero(battery.energyCapacityMaximum), FLOAT),
    user_ene_rated_min: makeBaseKey(setUndefinedNullToZero(battery.energyCapacityMinimum), FLOAT),
    yearly_degrade: makeBaseKey(setUndefinedNullToZero(battery.calendarDegradationRate), INT),
  };
  return makeGroup(battery.id, convertToYesNo(battery.active), keys);
};

export const makeBatteryParameters = (project, inputsDirectory) => {
  const wrapped = tech => makeSingleBatteryParameter(tech, inputsDirectory);
  return makeTechnologyParameters(project.technologySpecsBattery, wrapped);
};

export const makeSingleControllableLoadParameter = (controllableLoad) => {
  const replaceConstruction = setUndefinedNullToZero(controllableLoad.replacementConstructionTime);

  const keys = {
    construction_year: makeBaseKey(controllableLoad.constructionYear, PERIOD),
    decommissioning_cost: makeBaseKey(controllableLoad.decomissioningCost, FLOAT),
    duration: makeBaseKey(setUndefinedNullToZero(controllableLoad.duration), FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    expected_lifetime: makeBaseKey(controllableLoad.expectedLifetime, INT),
    name: makeBaseKey(controllableLoad.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(controllableLoad.operationYear, PERIOD),
    power_rating: makeBaseKey(controllableLoad.ratedCapacity, FLOAT),
    replaceable: makeBaseKey(convertToOneZero(controllableLoad.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replaceConstruction, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(controllableLoad), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(controllableLoad.ter, FLOAT),
  };
  return makeGroup(controllableLoad.id, convertToYesNo(controllableLoad.active), keys);
};

export const makeControllableLoadParameters = (project) => {
  const wrapped = tech => makeSingleControllableLoadParameter(tech);
  return makeTechnologyParameters(project.technologySpecsControllableLoad, wrapped);
};

export const makeDAParameters = (project) => {
  if (project.objectivesDA) {
    const isActive = convertToYesNo(project.objectivesDA);
    const keys = { growth: makeBaseKey(project.daGrowth, FLOAT) };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeDCMParameters = (project) => {
  if (project.objectivesRetailDemandChargeReduction) {
    const isActive = convertToYesNo(project.objectivesRetailDemandChargeReduction);
    const keys = { growth: makeBaseKey(setUndefinedNullToZero(project.dcmGrowth), FLOAT) };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeDeferralParameters = (project) => {
  if (project.objectivesDeferral) {
    const isActive = convertToYesNo(project.objectivesDeferral);
    const keys = {
      growth: makeBaseKey(project.deferralGrowth, FLOAT),
      min_year_objective: makeBaseKey(ZERO, INT), // TODO new, eventually add into GUI
      planned_load_limit: makeBaseKey(project.deferralPlannedLoadLimit, FLOAT),
      price: makeBaseKey(project.deferralPrice, FLOAT),
      reverse_power_flow_limit: makeBaseKey(project.deferralReversePowerFlowLimit, FLOAT),
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeSingleDieselGensetParameter = (dieselGen) => {
  // find RATED_CAPACITY
  let ratedCapacity = ZERO;
  if (!dieselGen.shouldSize) {
    ({ ratedCapacity } = dieselGen);
  }
  const replacementConstructionTime = setUndefinedNullToZero(dieselGen.replacementConstructionTime);
  const keys = {
    ccost: makeBaseKey(dieselGen.capitalCost, FLOAT),
    ccost_kW: makeBaseKey(dieselGen.capitalCostPerkW, FLOAT),
    construction_year: makeBaseKey(dieselGen.constructionYear, PERIOD),
    decommissioning_cost: makeBaseKey(dieselGen.decomissioningCost, FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    efficiency: makeBaseKey(dieselGen.efficiency, FLOAT),
    expected_lifetime: makeBaseKey(dieselGen.expectedLifetime, INT),
    fixed_om_cost: makeBaseKey(dieselGen.fixedOMCostIncludingExercise, FLOAT),
    fuel_cost: makeBaseKey(dieselGen.fuelCost, FLOAT),
    macrs_term: makeBaseKey(dieselGen.macrsTerm, FLOAT),
    max_rated_capacity: makeBaseKey(setUndefinedNullToZero(dieselGen.ratedCapacityMaximum), FLOAT),
    min_power: makeBaseKey(dieselGen.minimumPower, FLOAT),
    min_rated_capacity: makeBaseKey(setUndefinedNullToZero(dieselGen.ratedCapacityMinimum), FLOAT),
    n: makeBaseKey(dieselGen.numGenerators, INT),
    name: makeBaseKey(dieselGen.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(dieselGen.operationYear, PERIOD),
    rated_capacity: makeBaseKey(ratedCapacity, FLOAT),
    rcost: makeBaseKey(setUndefinedNullToZero(dieselGen.replacementCost), FLOAT),
    rcost_kW: makeBaseKey(setUndefinedNullToZero(dieselGen.replacementCostPerkW), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(dieselGen.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(dieselGen), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(dieselGen.ter, FLOAT),
    variable_om_cost: makeBaseKey(dieselGen.variableOMCost, FLOAT),
  };
  return makeGroup(dieselGen.id, convertToYesNo(dieselGen.active), keys);
};

export const makeDieselGensetParameters = (project) => {
  const wrapped = tech => makeSingleDieselGensetParameter(tech);
  return makeTechnologyParameters(project.technologySpecsDieselGen, wrapped);
};

export const makeDRParameters = (project) => {
  function convertToNan(value) {
    return value === null ? 'nan' : value;
  }
  if (project.objectivesDR) {
    // convert DR_PROGRAM_TYPE into bool (day ahead is true)
    const isDayAhead = project[c.DR_PROGRAM_TYPE] === 'Day ahead';
    const isActive = convertToYesNo(project.objectivesDR);
    const keys = {
      day_ahead: makeBaseKey(convertToOneZero(isDayAhead), BOOL),
      days: makeBaseKey(project[c.DR_NUMBER_EVENTS], INT),
      growth: makeBaseKey(project[c.DR_GROWTH], FLOAT),
      length: makeBaseKey(convertToNan(project[c.DR_EVENT_LENGTH]), STRING_INT),
      program_end_hour: makeBaseKey(convertToNan(project[c.DR_END_HOUR]), STRING_INT),
      program_start_hour: makeBaseKey(project[c.DR_START_HOUR], INT),
      weekend: makeBaseKey(convertToOneZero(project[c.DR_INCLUDE_WEEKENDS]), BOOL),
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeFinanceParameters = (project, inputsDirectory) => {
  const externalIncentivesExist = convertToOneZero(checkNotNullOrEmpty(project.externalIncentives));
  const keys = {
    analysis_horizon_mode: makeBaseKey(project.analysisHorizonMode, INT),
    customer_tariff_filename: makeBaseKey(makeCsvFilePath(inputsDirectory, TARIFF), STRING),
    ecc_mode: makeBaseKey(ZERO, BOOL), // TODO new input
    external_incentives: makeBaseKey(externalIncentivesExist, BOOL),
    federal_tax_rate: makeBaseKey(project.financeFederalTaxRate, FLOAT),
    inflation_rate: makeBaseKey(project.financeInflationRate, FLOAT),
    npv_discount_rate: makeBaseKey(project.financeDiscountRate, FLOAT),
    property_tax_rate: makeBaseKey(project.financePropertyTaxRate, FLOAT),
    state_tax_rate: makeBaseKey(project.financeStateTaxRate, FLOAT),
    yearly_data_filename: makeBaseKey(makeCsvFilePath(inputsDirectory, YEARLY), STRING),
  };
  return makeGroup('', YES, keys);
};

export const makeSingleFleetEVParameter = (fleetEV) => {
  const replacementConstructionTime = setUndefinedNullToZero(fleetEV.replacementConstructionTime);
  const keys = {
    ccost: makeBaseKey(fleetEV.capitalCost, FLOAT),
    construction_year: makeBaseKey(fleetEV.constructionYear, PERIOD),
    decommissioning_cost: makeBaseKey(fleetEV.decomissioningCost, FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    expected_lifetime: makeBaseKey(fleetEV.expectedLifetime, INT),
    fixed_om_cost: makeBaseKey(fleetEV.fixedOMCosts, FLOAT),
    lost_load_cost: makeBaseKey(fleetEV.lostLoadCost, FLOAT),
    macrs_term: makeBaseKey(fleetEV.macrsTerm, FLOAT),
    max_load_ctrl: makeBaseKey(fleetEV.maximumLoadCtrl, INT),
    name: makeBaseKey(fleetEV.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(fleetEV.operationYear, PERIOD),
    rcost: makeBaseKey(setUndefinedNullToZero(fleetEV.replacementCost), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(fleetEV.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(fleetEV), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(fleetEV.ter, FLOAT),
  };
  return makeGroup(fleetEV.id, convertToYesNo(fleetEV.active), keys);
};

export const makeFleetEVParameters = (project) => {
  const wrapped = tech => makeSingleFleetEVParameter(tech);
  return makeTechnologyParameters(project.technologySpecsFleetEV, wrapped);
};

export const makeFRParameters = (project) => {
  if (project.objectivesFR) {
    const isActive = convertToYesNo(project.objectivesFR);
    const keys = {
      CombinedMarket: makeBaseKey(project.frCombinedMarket, BOOL),
      d_ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
      duration: makeBaseKey(project.frDuration, FLOAT),
      energyprice_growth: makeBaseKey(project.frEnergyPriceGrowth, FLOAT),
      eod: makeBaseKey(project.frEOD, FLOAT),
      eou: makeBaseKey(project.frEOU, FLOAT),
      growth: makeBaseKey(project.frGrowth, FLOAT),
      u_ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeSingleICEParameter = (iceGen) => {
  // find RATED_CAPACITY
  let ratedCapacity = ZERO;
  if (!iceGen.shouldSize) {
    ({ ratedCapacity } = iceGen);
  }
  const replacementConstructionTime = setUndefinedNullToZero(iceGen.replacementConstructionTime);
  const keys = {
    ccost: makeBaseKey(iceGen.capitalCost, FLOAT),
    ccost_kW: makeBaseKey(iceGen.capitalCostPerkW, FLOAT),
    construction_year: makeBaseKey(iceGen.constructionYear, PERIOD),
    decommissioning_cost: makeBaseKey(iceGen.decomissioningCost, FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    efficiency: makeBaseKey(iceGen.efficiency, FLOAT),
    expected_lifetime: makeBaseKey(iceGen.expectedLifetime, INT),
    fixed_om_cost: makeBaseKey(iceGen.fixedOMCostIncludingExercise, FLOAT),
    fuel_cost: makeBaseKey(iceGen.fuelCost, FLOAT),
    macrs_term: makeBaseKey(iceGen.macrsTerm, FLOAT),
    max_rated_capacity: makeBaseKey(setUndefinedNullToZero(iceGen.ratedCapacityMaximum), FLOAT),
    min_power: makeBaseKey(iceGen.minimumPower, FLOAT),
    min_rated_capacity: makeBaseKey(setUndefinedNullToZero(iceGen.ratedCapacityMinimum), FLOAT),
    n: makeBaseKey(iceGen.numGenerators, INT),
    name: makeBaseKey(iceGen.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(iceGen.operationYear, PERIOD),
    rated_capacity: makeBaseKey(ratedCapacity, FLOAT),
    rcost: makeBaseKey(setUndefinedNullToZero(iceGen.replacementCost), FLOAT),
    rcost_kW: makeBaseKey(setUndefinedNullToZero(iceGen.replacementCostPerkW), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(iceGen.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(iceGen), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(iceGen.ter, FLOAT),
    variable_om_cost: makeBaseKey(iceGen.variableOMCost, FLOAT),
  };
  return makeGroup(iceGen.id, convertToYesNo(iceGen.active), keys);
};

export const makeICEParameters = project => (
  makeTechnologyParameters(project.technologySpecsICE, makeSingleICEParameter)
);

export const makeLFParameters = (project) => {
  if (project.objectivesLF) {
    const isActive = convertToYesNo(project.objectivesLF);
    const keys = {
      CombinedMarket: makeBaseKey(convertToOneZero(project[c.LF_COMBINED_MARKET]), BOOL),
      d_ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
      duration: makeBaseKey(project[c.LF_DURATION], FLOAT),
      energyprice_growth: makeBaseKey(project[c.LF_ENERGY_PRICE_GROWTH], FLOAT),
      growth: makeBaseKey(project[c.LF_GROWTH], FLOAT),
      u_ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeNSRParameters = (project) => {
  if (project.objectivesNSR) {
    const isActive = convertToYesNo(project.objectivesNSR);
    const keys = {
      duration: makeBaseKey(project.nsrDuration, FLOAT),
      growth: makeBaseKey(project.nsrGrowth, FLOAT),
      ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeSinglePVParameter = (pv) => {
  // find RATED_CAPACITY value
  let ratedCapacity = ZERO;
  if (!pv.shouldSize) {
    ({ ratedCapacity } = pv);
  }
  const replacementConstructionTime = setUndefinedNullToZero(pv.replacementConstructionTime);
  const keys = {
    ccost_kW: makeBaseKey(pv.cost, FLOAT),
    construction_year: makeBaseKey(pv.constructionYear, PERIOD),
    curtail: makeBaseKey(convertToOneZero(pv.includeCurtailment), BOOL),
    decommissioning_cost: makeBaseKey(pv.decomissioningCost, FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    expected_lifetime: makeBaseKey(pv.expectedLifetime, INT),
    fixed_om_cost: makeBaseKey(pv.fixedOMCosts, FLOAT),
    gamma: makeBaseKey(setUndefinedNullToZero(pv.gamma), FLOAT),
    grid_charge: makeBaseKey(convertToOneZero(pv.allowGridCharge), BOOL),
    grid_charge_penalty: makeBaseKey(ZERO, BOOL), // hardcoded
    growth: makeBaseKey(ZERO, FLOAT), // hardcoded
    inv_max: makeBaseKey(pv.inverterMax, FLOAT),
    loc: makeBaseKey(pv.loc, FLOAT),
    macrs_term: makeBaseKey(pv.macrsTerm, FLOAT),
    max_rated_capacity: makeBaseKey(setUndefinedNullToZero(pv.ratedCapacityMaximum), BOOL),
    min_rated_capacity: makeBaseKey(setUndefinedNullToZero(pv.ratedCapacityMinimum), BOOL),
    name: makeBaseKey(pv.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    nu: makeBaseKey(setUndefinedNullToZero(pv.nu), FLOAT),
    operation_year: makeBaseKey(pv.operationYear, PERIOD),
    PPA: makeBaseKey(convertToOneZero(pv.includePV), BOOL),
    PPA_cost: makeBaseKey(setUndefinedNullToZero(pv.ppaCost), FLOAT),
    PPA_inflation_rate: makeBaseKey(setUndefinedNullToZero(pv.ppaInflationRate), FLOAT),
    rated_capacity: makeBaseKey(ratedCapacity, FLOAT),
    rcost_kW: makeBaseKey(setUndefinedNullToZero(pv.replacementCost), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(pv.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(pv), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(pv.ter, FLOAT),
  };
  return makeGroup(pv.id, convertToYesNo(pv.active), keys);
};

export const makePVParameters = project => (
  makeTechnologyParameters(project.technologySpecsSolarPV, makeSinglePVParameter)
);

export const makeRAParameters = (project) => {
  if (project.objectivesRA) {
    // convert RA_DISPATCH_MODE to boolean (contrain power is TRUE)
    const dispModeBool = project[c.RA_DISPATCH_MODE] === 'Constrain power';
    const isActive = convertToYesNo(project.objectivesRA);
    const keys = {
      days: makeBaseKey(project[c.RA_NUMBER_EVENTS], INT),
      dispmode: makeBaseKey(convertToOneZero(dispModeBool), BOOL),
      growth: makeBaseKey(project[c.RA_GROWTH], FLOAT),
      idmode: makeBaseKey(project[c.RA_EVENT_SELECTION_METHOD], STRING),
      length: makeBaseKey(project[c.RA_EVENT_LENGTH], INT),
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeReliabilityParameters = (project, inputsDirectory) => {
  if (project.objectivesResilience) {
    const isActive = convertToYesNo(project.objectivesResilience);
    const keys = {
      max_outage_duration: makeBaseKey(project.reliabilityMaxOutageDuration, INT),
      'n-2': makeBaseKey(ZERO, BOOL), // hardcoded
      post_facto_initial_soc: makeBaseKey(100, FLOAT), // TODO new, hardcoded for now
      post_facto_only: makeBaseKey(convertToOneZero(project.reliabilityPostOptimizationOnly), BOOL),
      target: makeBaseKey(project.reliabilityTarget, FLOAT),
      load_shed_percentage: makeBaseKey(convertToOneZero(false), BOOL), // hardcoded
      load_shed_perc_filename: makeBaseKey(makeCsvFilePath(inputsDirectory, LOAD_SHEAD), STRING),
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeResultsParameters = (project, resultsDirectory) => {
  const keys = {
    dir_absolute_path: makeBaseKey(resultsDirectory, STRING),
    errors_log_path: makeBaseKey(resultsDirectory, STRING),
    label: makeBaseKey('', STRING),
  };
  return makeGroup('', YES, keys);
};

export const makeRetailTimeShiftParameters = (project) => {
  if (project.objectivesRetailEnergyChargeReduction) {
    const isActive = convertToYesNo(project.objectivesRetailEnergyChargeReduction);
    const keys = {
      growth: makeBaseKey(setUndefinedNullToZero(project.retailTimeShiftGrowth), FLOAT),
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeScenarioParameters = (project, inputsDirectory) => {
  // find BINARY value
  let binary = ONE;
  const includeBattery = checkNotNullOrEmpty(project.technologySpecsBattery);
  if (includeBattery) {
    let batteryNum = 0;
    while (batteryNum < project.technologySpecsBattery.length) {
      if (project.technologySpecsBattery[batteryNum].shouldEnergySize) {
        binary = ZERO;
      }
      batteryNum += 1;
    }
  }

  // find N value
  // TODO move to standalone function
  // TODO if customer services, N should be 'month'
  // TODO if wholesale services, N should be a number of hours
  let n;
  if (project.sizingEquipment) {
    n = 'Year';
  } else {
    n = project.optimizationHorizon;
  }
  if (n === 'hours') {
    n = project.optimizationHorizonNum;
  }

  const includePoiConstraints = project.includeInterconnectionConstraints;
  const keys = {
    apply_interconnection_constraints: makeBaseKey(convertToOneZero(includePoiConstraints), BOOL),
    binary: makeBaseKey(binary, BOOL),
    def_growth: makeBaseKey(2, FLOAT), // TODO ask for this value with site load
    dt: makeBaseKey(project.timestep / 60, FLOAT),
    end_year: makeBaseKey(calculateEndYear(project.startYear, project.analysisHorizon), PERIOD),
    incl_site_load: makeBaseKey(convertToOneZero(project.includeSiteLoad), BOOL),
    incl_thermal_load: makeBaseKey(ZERO, BOOL), // TODO: new, verify value
    kappa_ch_max: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_ch_min: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_dis_max: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_dis_min: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_ene_max: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_ene_min: makeBaseKey('100000', FLOAT), // hardcoded
    location: makeBaseKey(project.gridLocation.toLowerCase(), STRING),
    max_export: makeBaseKey(project.maxExport, FLOAT),
    max_import: makeBaseKey(project.maxImport, FLOAT),
    monthly_data_filename: makeBaseKey(makeCsvFilePath(inputsDirectory, MONTHLY), STRING),
    n: makeBaseKey(n, STRING_INT),
    opt_years: makeBaseKey(project.dataYear, LIST_INT),
    ownership: makeBaseKey(project.ownership.toLowerCase(), STRING),
    slack: makeBaseKey(ZERO, BOOL), // hardcoded
    start_year: makeBaseKey(project.startYear, PERIOD),
    time_series_filename: makeBaseKey(makeCsvFilePath(inputsDirectory, TIMESERIES), STRING),
    verbose: makeBaseKey(ONE, BOOL), // hardcoded
    verbose_opt: makeBaseKey(ZERO, BOOL), // hardcoded
  };
  return makeGroup('', YES, keys);
};

export const makeSingleSingleEVParameter = (singleEV) => {
  const replacementConstructionTime = setUndefinedNullToZero(singleEV.replacementConstructionTime);
  const keys = {
    ccost: makeBaseKey(singleEV.capitalCost, FLOAT),
    ch_max_rated: makeBaseKey(singleEV.maximumChargingPower, FLOAT),
    ch_min_rated: makeBaseKey(singleEV.minimumChargingPower, FLOAT),
    construction_year: makeBaseKey(singleEV.constructionYear, PERIOD),
    decommissioning_cost: makeBaseKey(singleEV.decomissioningCost, FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    ene_target: makeBaseKey(singleEV.energyTarget, FLOAT),
    expected_lifetime: makeBaseKey(singleEV.expectedLifetime, INT),
    fixed_om_cost: makeBaseKey(singleEV.fixedOMCosts, FLOAT),
    macrs_term: makeBaseKey(singleEV.macrsTerm, FLOAT),
    name: makeBaseKey(singleEV.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(singleEV.operationYear, PERIOD),
    plugin_time: makeBaseKey(singleEV.plugInHour, INT),
    plugout_time: makeBaseKey(setUndefinedNullToZero(singleEV.plugOutHour), INT),
    rcost: makeBaseKey(setUndefinedNullToZero(singleEV.replacementCost), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(singleEV.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(singleEV), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(singleEV.ter, FLOAT),
  };
  return makeGroup(singleEV.id, convertToYesNo(singleEV.active), keys);
};

export const makeSingleEVParameters = (project) => {
  const wrapped = tech => makeSingleSingleEVParameter(tech);
  return makeTechnologyParameters(project.technologySpecsSingleEV, wrapped);
};

export const makeSRParameters = (project) => {
  if (project.objectivesSR) {
    const isActive = convertToYesNo(project.objectivesSR);
    const keys = {
      duration: makeBaseKey(project.srDuration, FLOAT),
      growth: makeBaseKey(project.srGrowth, FLOAT),
      ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeUserParameters = (project) => {
  if (project.objectivesUserDefined) {
    const isActive = convertToYesNo(project.objectivesUserDefined);
    const keys = {
      price: makeBaseKey(project.userPrice, FLOAT),
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeModelParameters = (project, inputsDirectory, resultsDirectory) => ({
  name: project.name,
  tags: {
    Backup: makeBackupParameters(project),
    Battery: makeBatteryParameters(project, inputsDirectory),
    ControllableLoad: makeControllableLoadParameters(project),
    DA: makeDAParameters(project),
    DCM: makeDCMParameters(project),
    Deferral: makeDeferralParameters(project),
    DieselGenset: makeDieselGensetParameters(project),
    DR: makeDRParameters(project),
    ElectricVehicle1: makeSingleEVParameters(project),
    ElectricVehicle2: makeFleetEVParameters(project),
    Finance: makeFinanceParameters(project, inputsDirectory),
    FR: makeFRParameters(project),
    ICE: makeICEParameters(project),
    LF: makeLFParameters(project),
    NSR: makeNSRParameters(project),
    PV: makePVParameters(project),
    RA: makeRAParameters(project),
    Reliability: makeReliabilityParameters(project, inputsDirectory),
    Results: makeResultsParameters(project, resultsDirectory),
    retailTimeShift: makeRetailTimeShiftParameters(project),
    Scenario: makeScenarioParameters(project, inputsDirectory),
    SR: makeSRParameters(project),
    User: makeUserParameters(project),
  },
});

export const makeBatteryCycleLifeCsv = (battery) => {
  /* TODO:
    - check if batteryCycles exist
    - extend to support multiple battery case
  */
  const data = battery.batteryCycles;
  const fields = ['ulimit', 'val'];
  const headers = ['Cycle Depth Upper Limit', 'Cycle Life Value']; // TODO HN string constants
  return objectToCsv(data, fields, headers);
};

export const makeTariffCsv = project => billingPeriodsToCsv(project.retailTariffBillingPeriods);

export const makeYearlyCsv = project => externalIncentivesToCsv(project.externalIncentives);

export const makeMonthlyCsv = (project) => {
  // initialize variables with monthly index
  const data = _.map(_.range(1, 13), i => ({
    year: project.dataYear,
    month: i,
  })); // List of lists of objects with format { 'field key': value }
  const fields = ['year', 'month']; // List of field keys
  const headers = ['Year', 'Month']; // TODO LL string constants - List of field headers

  function addSingleSeries(d, f, h) {
    data.push(d);
    fields.push(f);
    headers.push(h);
  }

  // Add all available monthly to CSV
  MONTHLY_FIELDS.forEach((ts) => {
    const tsClass = project[ts];
    if (tsClass) {
      const dataObjectList = mapListToObjectList(tsClass.data, ts);
      addSingleSeries(dataObjectList, ts, tsClass.columnHeaderName);
    }
  });

  return objectToCsv(data, fields, headers);
};

export const makeLoadShedCsv = () => {
  // TODO implement this
  const data = _.map(_.range(1, 13), i => ({
    length: i,
    loadShed: i,
  }));
  const fields = ['length', 'loadShed'];
  const headers = ['Outage Length (hrs)', 'Load Shed (%)']; // TODO LL string constants
  return objectToCsv(data, fields, headers);
};

export const makeDatetimeIndex = (dataYear, minuteTimestep) => {
  const start = new Date(Date.UTC(dataYear, 0, 1, 0, minuteTimestep));
  const end = new Date(Date.UTC(dataYear + 1, 0, 1, 0, minuteTimestep));

  const timedelta = d3.timeMinute.every(minuteTimestep);
  const datetimeIndex = timedelta.range(start, end);
  return datetimeIndex.map(d => moment.utc(d).format('M/D/YYYY H:mm'));
};

export const makeEmptyCsvDataWithDatetimeIndex = (project) => {
  const datetimeIndex = makeDatetimeIndex(project.dataYear, project.timestep);
  return datetimeIndex.map(d => ({ [TIMESERIES_DATETIME_INDEX]: d }));
};

export const addPvTimeSeries = (pv) => {
  const tsClass = pv.generationProfile;
  const pvData = mapListToObjectList(tsClass.data, 'pv');
  const pvField = 'pv';
  const pvHeader = `${tsClass.columnHeaderName}/${pv.id}`;
  return { pvData, pvField, pvHeader };
};

/* TODO: new timeseries fields
  - RA Active (y/n)  TODO HN forgot about this input
  - LF Reg Up Max (kW)
  - LF Reg Up Min (kW)
  - LF Reg Down Max (kW)
  - LF Reg Down Min (kW)
  - Battery: Charge Min (kW)/1
  - Battery: Charge Max (kW)/1
  - Battery: Energy Max (kWh)/1
  - Battery: Energy Min (kWh)/1
  - Battery: Discharge Min (kW)/1
  - Battery: Discharge Max (kW)/1
  - FR Reg Up Max (kW)
  - FR Reg Up Min (kW)
  - FR Reg Down Max (kW)
  - FR Reg Down Min (kW)
  - SR Max (kW)
  - SR Min (kW)
  - NSR Max (kW)
  - NSR Min (kW)

  Also turn this whole function into its own class/module
*/
export const makeTimeSeriesCsv = (project) => {
  const data = []; // List of lists of objects with format { 'field key': value }
  const fields = []; // List of field keys
  const headers = []; // List of field headers

  function addSingleSeries(d, f, h) {
    data.push(d);
    fields.push(f);
    headers.push(h);
  }

  // Add datetime index
  const dtIndex = makeEmptyCsvDataWithDatetimeIndex(project);
  addSingleSeries(dtIndex, TIMESERIES_DATETIME_INDEX, TIMESERIES_DATETIME_HEADER);

  // Add all available timeseries to CSV
  TIMESERIES_FIELDS.forEach((ts) => {
    const tsClass = project[ts];
    if (tsClass) {
      const dataObjectList = mapListToObjectList(tsClass.data, ts);
      addSingleSeries(dataObjectList, ts, tsClass.columnHeaderName);
    }
  });

  // Add PV timeseries
  _.forEach(project.technologySpecsSolarPV, (pv) => {
    const { pvData, pvField, pvHeader } = addPvTimeSeries(pv);
    addSingleSeries(pvData, pvField, pvHeader);
  });

  // TODO HN Add fleet EV timeseries

  // TODO HN Add controllable load timeseries

  // Convert to CSV
  const unzippedData = _.unzipWith(data, Object.assign);
  return objectToCsv(unzippedData, fields, headers);
};

class CycleDto {
  constructor(battery, inputsDirectory) {
    this.csv = makeBatteryCycleLifeCsv(battery);
    this.filePath = makeBatteryCsvFilePath(inputsDirectory, battery);
  }
}

class MonthlyDto {
  constructor(project, inputsDirectory) {
    this.csv = makeMonthlyCsv(project);
    this.filePath = makeCsvFilePath(inputsDirectory, MONTHLY);
  }
}

class LoadShedDto {
  constructor(project, inputsDirectory) {
    this.csv = makeLoadShedCsv();
    this.filePath = makeCsvFilePath(inputsDirectory, LOAD_SHEAD);
  }
}

class TariffDto {
  constructor(project, inputsDirectory) {
    this.csv = makeTariffCsv(project);
    this.filePath = makeCsvFilePath(inputsDirectory, TARIFF);
  }
}

class YearlyDto {
  constructor(project, inputsDirectory) {
    this.csv = makeYearlyCsv(project);
    this.filePath = makeCsvFilePath(inputsDirectory, YEARLY);
  }
}

class TimeSeriesDto {
  constructor(project, inputsDirectory) {
    this.csv = makeTimeSeriesCsv(project);
    this.filePath = makeCsvFilePath(inputsDirectory, TIMESERIES);
  }
}

export const makeExpectedResultCsvs = (project) => {
  const expectedResultsCsvs = [
    {
      fieldName: 'proForma',
      fileName: 'pro_forma.csv',
    },
    {
      fieldName: 'costBenefit',
      fileName: 'cost_benefit.csv',
    },
    {
      fieldName: 'size',
      fileName: 'size.csv',
    },
    {
      fieldName: 'timeSeries',
      fileName: 'timeseries_results.csv',
    },
  ];
  const selectedRetailETS = project.objectivesRetailEnergyChargeReduction;
  const selectedRetailDCM = project.objectivesRetailDemandChargeReduction;
  if (selectedRetailETS || selectedRetailDCM) {
    expectedResultsCsvs.push({
      fieldName: 'simpleMonthlyBill',
      fileName: 'simple_monthly_bill.csv',
    });
    expectedResultsCsvs.push({
      fieldName: 'peakLoadDay',
      fileName: 'peak_day_load.csv',
    });
  }
  if (project.objectivesResilience) {
    expectedResultsCsvs.push({
      fieldName: 'loadCoverageProbability',
      fileName: 'load_coverage_prob.csv',
    });
    if (!project.reliabilityPostOptimizationOnly) {
      expectedResultsCsvs.push({
        fieldName: 'outageContribution',
        fileName: 'outage_energy_contributions.csv',
      });
    }
  }
  if (project.objectivesDeferral) {
    expectedResultsCsvs.push({
      fieldName: 'deferral',
      fileName: 'deferral_results.csv',
    });
  }
  return expectedResultsCsvs;
};

export const makeBatteryCsvs = (project, inputsDirectory) => {
  const batteries = project.technologySpecsBattery;
  const includeBatteryParameters = checkNotNullOrEmpty(batteries);

  if (includeBatteryParameters) {
    return _.map(batteries, battery => new CycleDto(battery, inputsDirectory));
  }
  return [];
};

export const makeCsvs = (project, inputsDirectory) => {
  const result = [
    // TODO add monthly data
    (new MonthlyDto(project, inputsDirectory)),
    (new LoadShedDto(project, inputsDirectory)),
    (new TariffDto(project, inputsDirectory)),
    (new YearlyDto(project, inputsDirectory)),
    (new TimeSeriesDto(project, inputsDirectory)),
  ];
  return _.concat(result, makeBatteryCsvs(project, inputsDirectory));
};

export const makeMeta = (project, inputsDirectory, resultsDirectory) => ({
  modelParametersPath: path.join(inputsDirectory, MODEL_PARAMETERS),
  resultsPath: resultsDirectory,
});

export const makeOutputDirectoryName = (outputDirectory) => {
  // If user does not select an output directory, default to their app data directory
  if (outputDirectory === undefined || outputDirectory === null) {
    return path.join(getAppDataPath(), 'DER-VET');
  }
  // If user selects a directory, create a timestamped output folder
  const timestamp = dateFormat(new Date(), 'yyyymmddHHMMss');
  return path.join(outputDirectory, `DER-VET_${timestamp}`);
};

export const createOutputDirectory = (outputDirectory) => {
  const timestampedOutputDir = makeOutputDirectoryName(outputDirectory);
  return createDirectory(timestampedOutputDir);
};

export const createInputsDirectory = timestampedOutputDir => (
  createDirectory(path.join(timestampedOutputDir, INPUTS))
);

export const createResultsDirectory = timestampedOutputDir => (
  createDirectory(path.join(timestampedOutputDir, RESULTS))
);

export const makeDervetInputs = (project) => {
  const timestampedOutputDir = createOutputDirectory(project.outputDirectory);
  const inputsDirectory = createInputsDirectory(timestampedOutputDir);
  const resultsDirectory = createResultsDirectory(timestampedOutputDir);
  return {
    expectedResultCsvs: makeExpectedResultCsvs(project),
    inputCsvs: makeCsvs(project, inputsDirectory),
    meta: makeMeta(project, inputsDirectory, resultsDirectory),
    modelParameters: makeModelParameters(project, inputsDirectory, resultsDirectory),
  };
};
