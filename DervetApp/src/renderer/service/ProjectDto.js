import * as d3 from 'd3';
import _ from 'lodash';
import dateFormat from 'dateformat';
import moment from 'moment';
import path from 'path';

import * as c from '@/models/Project/constants';
import MetadataFactory from '@/models/Project/Metadata/Factory';
import { CollectionType } from '@/models/Project/CollectionType';
import { billingPeriodsToCsv } from '@/models/Project/Metadata/Finances/RetailTariffBillingPeriod';
import { externalIncentivesToCsv } from '@/models/Project/Metadata/Finances/ExternalIncentives';
import { getAppDataPath, createDirectory, objectToCsv } from '@/util/file';
import { isNotNullAndNotUndefined, isNullOrUndefined } from '@/util/logic';

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
  ...c.TS_ALL,
];

const MONTHLY_FIELDS = [
  ...c.MTS_ALL,
];

export const convertToYesNo = condition => (condition ? YES : NO);

export const convertToOneZero = condition => (condition ? ONE : ZERO);

export const calculateEndYear = (startYear, analysisHorizon) => (
  (Number(startYear) + Number(analysisHorizon) - 1).toString()
);

export const calculateSalvageValue = (techSpecs) => {
  const { salvageValueOption, salvageValue } = techSpecs;
  return salvageValueOption === 'User defined' ? salvageValue : salvageValueOption;
};

export const setUndefinedNullToZero = value => (
  isNullOrUndefined(value) ? 0 : value
);

export const setUndefinedNullToOne = value => (
  isNullOrUndefined(value) ? 1 : value
);

export const setUndefinedNullToDefaultValue = (value, defaultValue) => (
  isNullOrUndefined(value) ? defaultValue : value
);

export const makeCsvFilePath = (directory, fileName) => (
  path.join(directory, `${fileName}.csv`)
);

export const makeBaseKey = (value, type) => ({
  // set undefined or null values to null
  opt_value: isNullOrUndefined(value) ? null : value.toString(),
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

export const makeBatteryCsvFilePath = (inputsDirectory, id) => (
  makeCsvFilePath(inputsDirectory, `${CYCLE}_${id}`)
);

export const makeSingleBatteryParameter = (battery, inputsDirectory) => {
  // determine DAILY_CYCLE_LIMIT
  let dailyCycleLimit = ZERO;
  const { values } = battery;
  if (values.shouldLimitDailyCycling) {
    ({ dailyCycleLimit } = values);
  }
  // determine HP
  let hp = ZERO;
  if (values.includeAuxiliaryLoad) {
    hp = values.auxiliaryLoad;
  }
  // determine DIS_MAX_RATED & CH_MAX_RATED
  let chargingCapacity = ZERO;
  let dischargingCapacity = ZERO;
  if (!values.shouldPowerSize) {
    if (values.shouldDiffChargeDischarge) {
      ({ chargingCapacity, dischargingCapacity } = values);
    } else {
      chargingCapacity = values.powerCapacity;
      dischargingCapacity = values.powerCapacity;
    }
  }

  // determine ENE_MAX_RATED
  let energyCapacity = ZERO;
  if (!values.shouldEnergySize) {
    ({ energyCapacity } = values);
  }
  const replacementConstructionTime = setUndefinedNullToOne(values.replacementConstructionTime);

  const keys = {
    OMexpenses: makeBaseKey(values.variableOMCosts, FLOAT),
    ccost: makeBaseKey(values.capitalCost, FLOAT),
    ccost_kW: makeBaseKey(values.capitalCostPerkW, FLOAT),
    ccost_kWh: makeBaseKey(values.capitalCostPerkWh, FLOAT),
    ch_max_rated: makeBaseKey(chargingCapacity, FLOAT),
    ch_min_rated: makeBaseKey(ZERO, FLOAT), // hardcoded
    construction_year: makeBaseKey(values.constructionYear, PERIOD),
    cycle_life_filename: makeBaseKey(makeBatteryCsvFilePath(inputsDirectory, battery.id), STRING),
    cycle_life_table_eol_condition: makeBaseKey(80, FLOAT), // TODO hardcode
    daily_cycle_limit: makeBaseKey(dailyCycleLimit, FLOAT),
    decommissioning_cost: makeBaseKey(values.decomissioningCost, FLOAT),
    dis_max_rated: makeBaseKey(dischargingCapacity, FLOAT),
    dis_min_rated: makeBaseKey(ZERO, FLOAT), // hardcoded
    duration_max: makeBaseKey(setUndefinedNullToZero(values.maxDuration), FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    ene_max_rated: makeBaseKey(energyCapacity, FLOAT),
    expected_lifetime: makeBaseKey(values.expectedLifetime, INT),
    fixedOM: makeBaseKey(values.fixedOMCosts, FLOAT),
    hp: makeBaseKey(hp, FLOAT),
    incl_cycle_degrade: makeBaseKey(convertToOneZero(values.includeCycleDegradation), BOOL),
    incl_ts_charge_limits: makeBaseKey(ZERO, BOOL), // hardcode
    incl_ts_discharge_limits: makeBaseKey(ZERO, BOOL), // hardcode
    incl_ts_energy_limits: makeBaseKey(ZERO, BOOL), // hardcode
    llsoc: makeBaseKey(values.lowerSOCLimit, FLOAT),
    macrs_term: makeBaseKey(values.macrsTerm, FLOAT),
    name: makeBaseKey(values.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(values.operationYear, PERIOD),
    p_start_ch: makeBaseKey(ZERO, FLOAT), // hardcoded
    p_start_dis: makeBaseKey(ZERO, FLOAT), // hardcoded
    rcost: makeBaseKey(setUndefinedNullToZero(values.replacementCost), FLOAT),
    rcost_kW: makeBaseKey(setUndefinedNullToZero(values.replacementCostPerkW), FLOAT),
    rcost_kWh: makeBaseKey(setUndefinedNullToZero(values.replacementCostPerkWh), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(values.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    rte: makeBaseKey(values.roundtripEfficiency, FLOAT),
    salvage_value: makeBaseKey(calculateSalvageValue(values), STRING_INT),
    sdr: makeBaseKey(values.selfDischargeRate, FLOAT),
    soc_target: makeBaseKey(values.targetSOC, FLOAT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup: makeBaseKey(ZERO, BOOL), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    state_of_health: makeBaseKey(setUndefinedNullToZero(values.state_of_health), FLOAT),
    ter: makeBaseKey(values.ter, FLOAT),
    ulsoc: makeBaseKey(values.upperSOCLimit, FLOAT),
    user_ch_rated_max: makeBaseKey(setUndefinedNullToZero(values.powerCapacityMaximum), FLOAT),
    user_ch_rated_min: makeBaseKey(setUndefinedNullToZero(values.powerCapacityMinimum), FLOAT),
    user_dis_rated_max: makeBaseKey(setUndefinedNullToZero(values.powerCapacityMaximum), FLOAT),
    user_dis_rated_min: makeBaseKey(setUndefinedNullToZero(values.powerCapacityMinimum), FLOAT),
    user_ene_rated_max: makeBaseKey(setUndefinedNullToZero(values.energyCapacityMaximum), FLOAT),
    user_ene_rated_min: makeBaseKey(setUndefinedNullToZero(values.energyCapacityMinimum), FLOAT),
    yearly_degrade: makeBaseKey(setUndefinedNullToZero(values.calendarDegradationRate), FLOAT),
  };
  return makeGroup(battery.id, convertToYesNo(battery.active), keys);
};

export const makeBatteryParameters = (project, inputsDirectory) => {
  const wrapped = tech => makeSingleBatteryParameter(tech, inputsDirectory);
  return makeTechnologyParameters(project.technologySpecsBattery, wrapped);
};

export const makeSingleControllableLoadParameter = (controllableLoad) => {
  const { values } = controllableLoad;
  const replaceConstruction = setUndefinedNullToOne(values.replacementConstructionTime);

  const keys = {
    ccost: makeBaseKey(values.capitalCost, FLOAT),
    construction_year: makeBaseKey(values.constructionYear, PERIOD),
    decommissioning_cost: makeBaseKey(values.decomissioningCost, FLOAT),
    duration: makeBaseKey(setUndefinedNullToZero(values.duration), FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    expected_lifetime: makeBaseKey(values.expectedLifetime, INT),
    fixed_om: makeBaseKey(values.fixedOMCosts, FLOAT),
    macrs_term: makeBaseKey(values.macrsTerm, FLOAT),
    name: makeBaseKey(values.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(values.operationYear, PERIOD),
    power_rating: makeBaseKey(values.ratedCapacity, FLOAT),
    rcost: makeBaseKey(setUndefinedNullToZero(values.replacementCost), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(values.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replaceConstruction, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(values), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(values.ter, FLOAT),
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
    const keys = { growth: makeBaseKey(project[c.DA_GROWTH], FLOAT) };
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
  const { values } = dieselGen;
  if (!values.shouldSize) {
    ({ ratedCapacity } = values);
  }
  const replacementConstructionTime = setUndefinedNullToOne(values.replacementConstructionTime);
  const keys = {
    ccost: makeBaseKey(values.capitalCost, FLOAT),
    ccost_kW: makeBaseKey(values.capitalCostPerkW, FLOAT),
    construction_year: makeBaseKey(values.constructionYear, PERIOD),
    decommissioning_cost: makeBaseKey(values.decomissioningCost, FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    efficiency: makeBaseKey(values.efficiency, FLOAT),
    expected_lifetime: makeBaseKey(values.expectedLifetime, INT),
    fixed_om_cost: makeBaseKey(values.fixedOMCostIncludingExercise, FLOAT),
    fuel_type: makeBaseKey(values.fuelType, STRING),
    macrs_term: makeBaseKey(values.macrsTerm, FLOAT),
    max_rated_capacity: makeBaseKey(setUndefinedNullToZero(values.ratedCapacityMaximum), FLOAT),
    min_power: makeBaseKey(values.minimumPower, FLOAT),
    min_rated_capacity: makeBaseKey(setUndefinedNullToZero(values.ratedCapacityMinimum), FLOAT),
    n: makeBaseKey(values.numGenerators, INT),
    name: makeBaseKey(values.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(values.operationYear, PERIOD),
    rated_capacity: makeBaseKey(ratedCapacity, FLOAT),
    rcost: makeBaseKey(setUndefinedNullToZero(values.replacementCost), FLOAT),
    rcost_kW: makeBaseKey(setUndefinedNullToZero(values.replacementCostPerkW), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(values.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(values), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(values.ter, FLOAT),
    variable_om_cost: makeBaseKey(values.variableOMCost, FLOAT),
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
    fuel_price_gas: makeBaseKey(setUndefinedNullToZero(project.fuelPriceGas), FLOAT),
    fuel_price_liquid: makeBaseKey(setUndefinedNullToZero(project.fuelPriceLiquid), FLOAT),
    fuel_price_other: makeBaseKey(setUndefinedNullToZero(project.fuelPriceOther), FLOAT),
    inflation_rate: makeBaseKey(project.financeInflationRate, FLOAT),
    npv_discount_rate: makeBaseKey(project.financeDiscountRate, FLOAT),
    property_tax_rate: makeBaseKey(project.financePropertyTaxRate, FLOAT),
    state_tax_rate: makeBaseKey(project.financeStateTaxRate, FLOAT),
    yearly_data_filename: makeBaseKey(makeCsvFilePath(inputsDirectory, YEARLY), STRING),
  };
  return makeGroup('', YES, keys);
};

export const makeSingleFleetEVParameter = (fleetEV) => {
  const { values } = fleetEV;
  const replacementConstructionTime = setUndefinedNullToOne(values.replacementConstructionTime);
  const keys = {
    ccost: makeBaseKey(values.capitalCost, FLOAT),
    construction_year: makeBaseKey(values.constructionYear, PERIOD),
    decommissioning_cost: makeBaseKey(values.decomissioningCost, FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    expected_lifetime: makeBaseKey(values.expectedLifetime, INT),
    fixed_om: makeBaseKey(values.fixedOMCosts, FLOAT),
    lost_load_cost: makeBaseKey(values.lostLoadCost, FLOAT),
    macrs_term: makeBaseKey(values.macrsTerm, FLOAT),
    max_load_ctrl: makeBaseKey(values.maximumLoadCtrl, INT),
    name: makeBaseKey(values.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(values.operationYear, PERIOD),
    rcost: makeBaseKey(setUndefinedNullToZero(values.replacementCost), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(values.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(values), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(values.ter, FLOAT),
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
      CombinedMarket: makeBaseKey(convertToOneZero(project.frCombinedMarket), BOOL),
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
  const { values } = iceGen;
  let ratedCapacity = ZERO;
  if (!values.shouldSize) {
    ({ ratedCapacity } = values);
  }
  const replacementConstructionTime = setUndefinedNullToOne(values.replacementConstructionTime);
  const keys = {
    ccost: makeBaseKey(values.capitalCost, FLOAT),
    ccost_kW: makeBaseKey(values.capitalCostPerkW, FLOAT),
    construction_year: makeBaseKey(values.constructionYear, PERIOD),
    decommissioning_cost: makeBaseKey(values.decomissioningCost, FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    efficiency: makeBaseKey(values.efficiency, FLOAT),
    expected_lifetime: makeBaseKey(values.expectedLifetime, INT),
    fixed_om_cost: makeBaseKey(values.fixedOMCostIncludingExercise, FLOAT),
    fuel_type: makeBaseKey(values.fuelType, STRING),
    macrs_term: makeBaseKey(values.macrsTerm, FLOAT),
    max_rated_capacity: makeBaseKey(setUndefinedNullToZero(values.ratedCapacityMaximum), FLOAT),
    min_power: makeBaseKey(values.minimumPower, FLOAT),
    min_rated_capacity: makeBaseKey(setUndefinedNullToZero(values.ratedCapacityMinimum), FLOAT),
    n: makeBaseKey(values.numGenerators, INT),
    name: makeBaseKey(values.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(values.operationYear, PERIOD),
    rated_capacity: makeBaseKey(ratedCapacity, FLOAT),
    rcost: makeBaseKey(setUndefinedNullToZero(values.replacementCost), FLOAT),
    rcost_kW: makeBaseKey(setUndefinedNullToZero(values.replacementCostPerkW), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(values.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(values), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(values.ter, FLOAT),
    variable_om_cost: makeBaseKey(values.variableOMCost, FLOAT),
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
      duration: makeBaseKey(project[c.NSR_DURATION], FLOAT),
      growth: makeBaseKey(project[c.NSR_GROWTH], FLOAT),
      ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeSinglePVParameter = (pv) => {
  // find RATED_CAPACITY value
  const { values } = pv;
  let ratedCapacity = ZERO;
  if (!values.shouldSize) {
    ({ ratedCapacity } = values);
  }
  const replacementConstructionTime = setUndefinedNullToOne(values.replacementConstructionTime);
  const keys = {
    ccost_kW: makeBaseKey(values.cost, FLOAT),
    construction_year: makeBaseKey(values.constructionYear, PERIOD),
    curtail: makeBaseKey(convertToOneZero(values.includeCurtailment), BOOL),
    decommissioning_cost: makeBaseKey(setUndefinedNullToZero(values.decomissioningCost), FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    expected_lifetime: makeBaseKey(values.expectedLifetime, INT),
    fixed_om_cost: makeBaseKey(setUndefinedNullToZero(values.fixedOMCosts), FLOAT),
    gamma: makeBaseKey(setUndefinedNullToZero(values.gamma), FLOAT),
    grid_charge: makeBaseKey(convertToOneZero(values.allowGridCharge), BOOL),
    grid_charge_penalty: makeBaseKey(ZERO, BOOL), // hardcoded
    growth: makeBaseKey(ZERO, FLOAT), // hardcoded
    inv_max: makeBaseKey(values.inverterMax, FLOAT),
    loc: makeBaseKey(values.loc, FLOAT),
    macrs_term: makeBaseKey(setUndefinedNullToDefaultValue(values.macrsTerm, 10), FLOAT),
    max_rated_capacity: makeBaseKey(setUndefinedNullToZero(values.ratedCapacityMaximum), BOOL),
    min_rated_capacity: makeBaseKey(setUndefinedNullToZero(values.ratedCapacityMinimum), BOOL),
    name: makeBaseKey(values.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    nu: makeBaseKey(setUndefinedNullToZero(values.nu), FLOAT),
    operation_year: makeBaseKey(values.operationYear, PERIOD),
    PPA: makeBaseKey(convertToOneZero(values.includePPA), BOOL),
    PPA_cost: makeBaseKey(setUndefinedNullToZero(values.ppaCost), FLOAT),
    PPA_inflation_rate: makeBaseKey(setUndefinedNullToZero(values.ppaInflationRate), FLOAT),
    rated_capacity: makeBaseKey(ratedCapacity, FLOAT),
    rcost_kW: makeBaseKey(setUndefinedNullToZero(values.replacementCost), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(values.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    salvage_value: makeBaseKey(setUndefinedNullToZero(calculateSalvageValue(values)), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(values.ter, FLOAT),
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
      target: makeBaseKey(setUndefinedNullToOne(project.reliabilityTarget), FLOAT),
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
  const isPowerSizingOn = (projectTechSpecs) => {
    // For a battery, power sizing can be on or off when sizing
    // set to true for all battery sizing; check .shouldPowerSize and .shouldEnergySize
    // For all other DERS, check with .shouldSize
    if (checkNotNullOrEmpty(projectTechSpecs)) {
      let techNum = 0;
      while (techNum < projectTechSpecs.length) {
        if ((projectTechSpecs[techNum].values.shouldSize)
        || (projectTechSpecs[techNum].values.shouldPowerSize)
        || (projectTechSpecs[techNum].values.shouldEnergySize)) {
          return true;
        }
        techNum += 1;
      }
    }
    return false;
  };
  const shouldBinaryBeOff = (project) => {
    if (isPowerSizingOn(project.technologySpecsDieselGen)
    || isPowerSizingOn(project.technologySpecsICE)
    || isPowerSizingOn(project.technologySpecsSolarPV)
    || isPowerSizingOn(project.technologySpecsBattery)) {
      return true;
    }
    return false;
  };
  // find BINARY value
  let binary = ONE;
  if (shouldBinaryBeOff(project)) {
    binary = ZERO;
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
  if (n === 'Hour') {
    n = project.optimizationHorizonNum;
  }

  const includePoiConstraints = project.includeInterconnectionConstraints;
  const includeSiteLoad = (
    project.objectivesRetailDemandChargeReduction || project.objectivesRetailEnergyChargeReduction);
  const keys = {
    activate_electricity_load_dump: makeBaseKey(ZERO, BOOL),
    apply_interconnection_constraints: makeBaseKey(convertToOneZero(includePoiConstraints), BOOL),
    binary: makeBaseKey(binary, BOOL),
    def_growth: makeBaseKey(2, FLOAT), // TODO ask for this value with site load
    dt: makeBaseKey(project.timestep / 60, FLOAT),
    end_year: makeBaseKey(calculateEndYear(project.startYear, project.analysisHorizon), PERIOD),
    incl_site_load: makeBaseKey(convertToOneZero(includeSiteLoad), BOOL),
    incl_thermal_load: makeBaseKey(ZERO, BOOL), // TODO: new, verify value
    kappa_ch_max: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_ch_min: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_dis_max: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_dis_min: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_ene_max: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_ene_min: makeBaseKey('100000', FLOAT), // hardcoded
    location: makeBaseKey(project.gridLocation.toLowerCase(), STRING),
    max_export: makeBaseKey(setUndefinedNullToZero(project.maxExport), FLOAT),
    max_import: makeBaseKey(setUndefinedNullToZero(project.maxImport), FLOAT),
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
  const { values } = singleEV;
  const replacementConstructionTime = setUndefinedNullToOne(values.replacementConstructionTime);
  const keys = {
    ccost: makeBaseKey(values.capitalCost, FLOAT),
    ch_max_rated: makeBaseKey(values.maximumChargingPower, FLOAT),
    ch_min_rated: makeBaseKey(values.minimumChargingPower, FLOAT),
    construction_year: makeBaseKey(values.constructionYear, PERIOD),
    decommissioning_cost: makeBaseKey(values.decomissioningCost, FLOAT),
    'ecc%': makeBaseKey(ZERO, FLOAT), // TODO hardcoded
    ene_target: makeBaseKey(values.energyTarget, FLOAT),
    expected_lifetime: makeBaseKey(values.expectedLifetime, INT),
    fixed_om: makeBaseKey(values.fixedOMCosts, FLOAT),
    macrs_term: makeBaseKey(values.macrsTerm, FLOAT),
    name: makeBaseKey(values.name, STRING),
    nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    operation_year: makeBaseKey(values.operationYear, PERIOD),
    plugin_time: makeBaseKey(values.plugInHour, INT),
    plugout_time: makeBaseKey(setUndefinedNullToZero(values.plugOutHour), INT),
    rcost: makeBaseKey(setUndefinedNullToZero(values.replacementCost), FLOAT),
    replaceable: makeBaseKey(convertToOneZero(values.isReplaceable), BOOL),
    replacement_construction_time: makeBaseKey(replacementConstructionTime, INT),
    salvage_value: makeBaseKey(calculateSalvageValue(values), STRING_INT),
    sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
    startup_time: makeBaseKey(ZERO, INT), // hardcoded
    ter: makeBaseKey(values.ter, FLOAT),
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
      duration: makeBaseKey(project[c.SR_DURATION], FLOAT),
      growth: makeBaseKey(project[c.SR_GROWTH], FLOAT),
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
  // if the boolean that controls using the cycle degradation curve or not is true,
  //   then create a cycle-degradataion-curve file with data,
  //   otherwise create the file with no data (header only)
  const data = battery.includeCycleDegradation ? battery.cycleLifeCurve : [];
  const fields = ['ulimit', 'val'];
  const headers = ['Cycle Depth Upper Limit', 'Cycle Life Value']; // TODO HN string constants
  return objectToCsv(data, fields, headers);
};

export const makeTariffCsv = project => (
  billingPeriodsToCsv(_.map(project.retailTariffBillingPeriods, 'values'))
);

export const makeYearlyCsv = project => externalIncentivesToCsv(project.externalIncentives);

export const makeMonthlyCsv = (project) => {
  const data = []; // List of lists of objects with format { 'field key': value }
  const fields = []; // List of field keys
  const headers = []; // List of field headers

  function addSingleSeries(d, f, h) {
    data.push(d);
    fields.push(f);
    headers.push(h);
  }

  // add month column
  const monthObjectList = mapListToObjectList(_.range(1, 13), 'month');
  addSingleSeries(monthObjectList, 'month', 'Month');
  // add year column
  const year = [...Array(12)].fill(project.dataYear);
  const yearObjectList = mapListToObjectList(year, 'year');
  addSingleSeries(yearObjectList, 'year', 'Year');

  const metadata = MetadataFactory.getMetadata(CollectionType.Project);

  // Add all available monthly to CSV
  MONTHLY_FIELDS.forEach((tsFieldName) => {
    const tsData = project[tsFieldName];
    if (tsData && tsData.length !== 0) {
      const dataObjectList = mapListToObjectList(tsData, tsFieldName);
      const columnHeader = metadata[tsFieldName].columnHeaderName;
      addSingleSeries(dataObjectList, tsFieldName, columnHeader);
    }
  });
  const unzippedData = _.unzipWith(data, Object.assign);
  return objectToCsv(unzippedData, fields, headers);
};

export const makeLoadShedCsv = () => {
  // placeholder for Load shed data - user cant seslect/define this mode
  const data = _.map(_.range(1, 13), i => ({
    length: i,
    loadShed: i,
  }));
  const fields = ['length', 'loadShed'];
  const headers = ['Outage Length (hrs)', 'Load Shed (%)']; // TODO LL string constants
  return objectToCsv(data, fields, headers);
};

// TODO move timeseries handling into a class HN
export const makeDatetimeIndex = (dataYear, minuteTimestep, reformat = true) => {
  if (['', null].includes(minuteTimestep) || !Number.isInteger(dataYear)) {
    return [];
  }
  const start = new Date(Date.UTC(dataYear, 0, 1, 0, minuteTimestep));
  const end = new Date(Date.UTC(dataYear + 1, 0, 1, 0, minuteTimestep));

  const timedelta = d3.timeMinute.every(minuteTimestep);
  const datetimeIndex = timedelta.range(start, end);
  if (reformat) {
    return datetimeIndex.map(d => moment.utc(d).format('M/D/YYYY H:mm'));
  }
  return datetimeIndex.map(d => moment.utc(d).format());
};

export const makeEmptyCsvDataWithDatetimeIndex = (project) => {
  const datetimeIndex = makeDatetimeIndex(project.dataYear, project.timestep);
  return datetimeIndex.map(d => ({ [TIMESERIES_DATETIME_INDEX]: d }));
};

export const addTechnologyTimeSeries = (tsData, id, tagName, columnHeader) => {
  const tag = `${tagName} -- ${id}`;
  const data = mapListToObjectList(tsData, tag);
  const header = `${columnHeader}/${id}`;
  return { data, tag, header };
};

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

  const projectMetadata = MetadataFactory.getMetadata(CollectionType.Project);
  // Add all available timeseries to CSV
  // limit to ts that have required not-eql-to false
  //   (pre-defined ts data may not have required set)
  // TODO: also limit to active ts?
  TIMESERIES_FIELDS.forEach((tsFieldName) => {
    const tsData = project[tsFieldName];
    if (tsData && tsData.length !== 0) {
      const dataObjectList = mapListToObjectList(tsData, tsFieldName);
      const columnHeader = projectMetadata[tsFieldName].columnHeaderName;
      addSingleSeries(dataObjectList, tsFieldName, columnHeader);
    }
  });

  // TODO DRY everything below
  // Add PV timeseries
  _.forEach(project.technologySpecsSolarPV, (pv) => {
    const tsData = pv.values.tsSolarPVGenerationProfile;
    const metadata = MetadataFactory.getMetadata(CollectionType.SolarPV);
    const columnHeader = metadata.tsSolarPVGenerationProfile.columnHeaderName;
    const { data, tag, header } = addTechnologyTimeSeries(tsData, pv.id, 'PV', columnHeader);
    addSingleSeries(data, tag, header);
  });

  // Add fleet EV timeseries
  _.forEach(project.technologySpecsFleetEV, (ev) => {
    const tsData = ev.values.tsFleetEVBaselineLoadProfile;
    const metadata = MetadataFactory.getMetadata(CollectionType.FleetEV);
    const columnHeader = metadata.tsFleetEVBaselineLoadProfile.columnHeaderName;
    const { data, tag, header } = addTechnologyTimeSeries(tsData, ev.id, 'Fleet EV', columnHeader);
    addSingleSeries(data, tag, header);
  });

  // Add controllable load timeseries
  _.forEach(project.technologySpecsControllableLoad, (load) => {
    const tsData = load.values.tsControllableLoadProfile;
    const metadata = MetadataFactory.getMetadata(CollectionType.ControllableLoad);
    const columnHeader = metadata.tsControllableLoadProfile.columnHeaderName;
    const { data, tag, header } = addTechnologyTimeSeries(tsData, load.id, 'Controllable Load', columnHeader);
    addSingleSeries(data, tag, header);
  });

  // Convert to CSV
  const unzippedData = _.unzipWith(data, Object.assign);
  return objectToCsv(unzippedData, fields, headers);
};

class CycleDto {
  constructor(battery, inputsDirectory) {
    this.csv = makeBatteryCycleLifeCsv(battery.values);
    this.filePath = makeBatteryCsvFilePath(inputsDirectory, battery.id);
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
  // always create a battery csv, even if it contains no data
  // batteries = batteries.filter(battery => battery.includeCycleDegradation);
  return _.map(batteries, battery => new CycleDto(battery, inputsDirectory));
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
  if (isNullOrUndefined(outputDirectory)) {
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
