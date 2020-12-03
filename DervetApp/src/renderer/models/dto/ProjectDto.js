import * as d3 from 'd3';
import _ from 'lodash';
import moment from 'moment';
import path from 'path';

import { billingPeriodsToCsv } from '@/models/RetailTariffBillingPeriod';
import { externalIncentivesToCsv } from '@/models/ExternalIncentives';
import { objectToCsv } from '@/util/file';

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

const MODEL_PARAMETERS = 'model_parameters.json';
export const LOG_FILE = 'dervet_log.log';

// TODO add PV gen profile(s)
const TIMESERIES_FIELDS = [
  'criticalLoad',
  'deferralLoad',
  'daPrice',
  'frPrice',
  'frUpPrice',
  'frDownPrice',
  'nsrPrice',
  'srPrice',
  'siteLoad',
  'userPowerMin',
  'userPowerMax',
  'userEnergyMin',
  'userEnergyMax',
];

export const convertToYesNo = condition => (condition ? YES : NO);

export const convertToOneZero = condition => (condition ? ONE : ZERO);

export const convertDateToYear = dateString => (new Date(dateString)).getFullYear();

export const calculateEndYear = (startYear, analysisHorizon) => (
  (Number(startYear) + Number(analysisHorizon)).toString()
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
  technologySpecs !== null && technologySpecs.length > 0
);

export const mapListToObjectList = (lst, fieldName) => (
  lst.map(d => ({ [fieldName]: d }))
);

export const makeBatteryParameters = (project) => {
  const includeBattery = checkNotNullOrEmpty(project.technologySpecsBattery);

  // TODO extend to more than one
  const battery = project.technologySpecsBattery[0];

  if (includeBattery) {
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
    // TODO determine DIS_MAX_RATED & CH_MAX_RATED
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
    // TODO determine ENE_MAX_RATED
    let energyCapacity = ZERO;
    if (!battery.shouldEnergySize) {
      ({ energyCapacity } = battery);
    }
    const keys = {
      OMexpenses: makeBaseKey(battery.variableOMCosts, FLOAT),
      acr: makeBaseKey(0, FLOAT), // hardcoded
      ccost: makeBaseKey(battery.capitalCost, FLOAT),
      ccost_kw: makeBaseKey(battery.capitalCostPerkW, FLOAT),
      ccost_kwh: makeBaseKey(battery.capitalCostPerkWh, FLOAT),
      ch_max_rated: makeBaseKey(chargingCapacity, FLOAT),
      ch_min_rated: makeBaseKey(ZERO, FLOAT), // hardcoded
      construction_year: makeBaseKey(convertDateToYear(battery.constructionDate), PERIOD),
      cycle_life_filename: makeBaseKey(makeCsvFilePath(project.inputsDirectory, CYCLE), STRING),
      daily_cycle_limit: makeBaseKey(dailyCycleLimit, FLOAT),
      decommissioning_cost: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      dis_max_rated: makeBaseKey(dischargingCapacity, FLOAT),
      dis_min_rated: makeBaseKey(ZERO, FLOAT), // hardcoded
      duration_max: makeBaseKey(battery.maxDuration, FLOAT),
      'ecc%': makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      ene_max_rated: makeBaseKey(energyCapacity, FLOAT),
      expected_lifetime: makeBaseKey(99, INT), // TODO: new, verify value
      fixedOM: makeBaseKey(battery.fixedOMCosts, FLOAT),
      hp: makeBaseKey(hp, FLOAT),
      incl_cycle_degrade: makeBaseKey(convertToOneZero(battery.includeCycleDegradation), BOOL),
      incl_ts_charge_limits: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      incl_ts_discharge_limits: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      incl_ts_energy_limits: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      llsoc: makeBaseKey(battery.lowerSOCLimit, FLOAT),
      macrs_term: makeBaseKey(battery.macrsTerm, FLOAT),
      name: makeBaseKey(battery.name, STRING),
      nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
      operation_year: makeBaseKey(convertDateToYear(battery.operationDate), PERIOD),
      p_start_ch: makeBaseKey(ZERO, FLOAT), // hardcoded
      p_start_dis: makeBaseKey(ZERO, FLOAT), // hardcoded
      rcost: makeBaseKey(0, FLOAT), // TODO new, verify value
      rcost_kW: makeBaseKey(100, FLOAT), // TODO new, verify value
      rcost_kWh: makeBaseKey(800, FLOAT), // TODO new, verify value
      replaceable: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      replacement_construction_time: makeBaseKey(ONE, INT), // TODO new, verify value
      rte: makeBaseKey(battery.roundtripEfficiency, FLOAT),
      salvage_value: makeBaseKey(ZERO, STRING_INT), // TODO new, verify value
      sdr: makeBaseKey(battery.selfDischargeRate, FLOAT),
      soc_target: makeBaseKey(battery.targetSOC, FLOAT),
      sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
      startup: makeBaseKey(ZERO, BOOL), // hardcoded
      startup_time: makeBaseKey(ZERO, INT), // hardcoded
      state_of_health: makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      ter: makeBaseKey(7, FLOAT), // TODO new, verify value
      ulsoc: makeBaseKey(battery.upperSOCLimit, FLOAT),
      user_ch_rated_max: makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      user_ch_rated_min: makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      user_dis_rated_max: makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      user_dis_rated_min: makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      user_ene_rated_max: makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      user_ene_rated_min: makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      yearly_degrade: makeBaseKey(battery.calendarDegradationRate, INT),
    };
    return makeGroup(battery.id, convertToYesNo(battery.active), keys);
  }
  return makeEmptyGroup();
};

export const makeDAParameters = (project) => {
  if (project.objectivesDA) {
    const isActive = convertToYesNo(project.objectivesDA);
    const keys = { growth: makeBaseKey(project.daETS.growth, FLOAT) };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeDCMParameters = (project) => {
  if (project.objectivesRetailDemandChargeReduction) {
    const isActive = convertToYesNo(project.objectivesRetailDemandChargeReduction);
    const keys = { growth: makeBaseKey(project.dcm.growth, FLOAT) };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeDeferralParameters = (project) => {
  if (project.objectivesDeferral) {
    const isActive = convertToYesNo(project.objectivesDeferral);
    const { deferral } = project;
    const keys = {
      growth: makeBaseKey(deferral.price, FLOAT),
      min_year_objective: makeBaseKey(ZERO, INT), // TODO new, verify value
      planned_load_limit: makeBaseKey(deferral.plannedLoadLimit, FLOAT),
      price: makeBaseKey(deferral.price, FLOAT),
      reverse_power_flow_limit: makeBaseKey(deferral.reversePowerFlowLimit, FLOAT),
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeDieselGensetParameters = (project) => {
  const includeDieselGen = checkNotNullOrEmpty(project.technologySpecsDieselGen);

  // TODO extend to more than one
  const dieselGen = project.technologySpecsDieselGen[0];

  if (includeDieselGen) {
    // find RATED_CAPACITY
    let ratedCapacity = ZERO;
    if (!dieselGen.shouldSize) {
      ({ ratedCapacity } = dieselGen);
    }
    const keys = {
      acr: makeBaseKey(0, FLOAT), // hardcoded
      ccost: makeBaseKey(dieselGen.capitalCost, FLOAT),
      ccost_kw: makeBaseKey(ZERO, FLOAT), // TODO: new value
      construction_year: makeBaseKey(convertDateToYear(dieselGen.constructionDate), PERIOD),
      decommissioning_cost: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      'ecc%': makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      efficiency: makeBaseKey(dieselGen.efficiency, FLOAT),
      expected_lifetime: makeBaseKey(99, INT), // TODO: new, verify value
      fixed_om_cost: makeBaseKey(dieselGen.fixedOMCostIncludingExercise, FLOAT),
      fuel_cost: makeBaseKey(dieselGen.fuelCost, FLOAT),
      macrs_term: makeBaseKey(dieselGen.macrsTerm, FLOAT),
      max_rated_capacity: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      min_power: makeBaseKey(dieselGen.minimumPower, FLOAT),
      min_rated_capacity: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      n: makeBaseKey(dieselGen.numGenerators, INT),
      name: makeBaseKey(dieselGen.name, STRING),
      nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
      operation_year: makeBaseKey(convertDateToYear(dieselGen.operationDate), PERIOD),
      rated_capacity: makeBaseKey(ratedCapacity, FLOAT),
      rcost: makeBaseKey(0, FLOAT), // TODO new, verify value
      rcost_kW: makeBaseKey(100, FLOAT), // TODO new, verify value
      replaceable: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      replacement_construction_time: makeBaseKey(ONE, INT), // TODO new, verify value
      salvage_value: makeBaseKey(ZERO, STRING_INT), // TODO new, verify value
      sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
      startup_time: makeBaseKey(ZERO, INT), // hardcoded
      ter: makeBaseKey(7, FLOAT), // TODO new, verify value
      variable_om_cost: makeBaseKey(dieselGen.variableOMCost, FLOAT),
    };
    return makeGroup(dieselGen.id, convertToYesNo(dieselGen.active), keys);
  }
  return makeEmptyGroup();
};

export const makeFinanceParameters = (project) => {
  const externalIncentivesExist = convertToOneZero(checkNotNullOrEmpty(project.externalIncentives));
  const keys = {
    analysis_horizon_mode: makeBaseKey(project.analysisHorizonMode, INT),
    customer_tariff_filename: makeBaseKey(makeCsvFilePath(project.inputsDirectory, TARIFF), STRING),
    ecc_mode: makeBaseKey(ZERO, BOOL), // TODO new input
    external_incentives: makeBaseKey(externalIncentivesExist, BOOL),
    federal_tax_rate: makeBaseKey(project.federalTaxRate, FLOAT),
    inflation_rate: makeBaseKey(project.inflationRate, FLOAT),
    npv_discount_rate: makeBaseKey(project.discountRate, FLOAT),
    property_tax_rate: makeBaseKey(project.propertyTaxRate, FLOAT),
    state_tax_rate: makeBaseKey(project.stateTaxRate, FLOAT),
    yearly_data_filename: makeBaseKey(makeCsvFilePath(project.inputsDirectory, YEARLY), STRING),
  };
  return makeGroup('', YES, keys);
};

export const makeFRParameters = (project) => {
  if (project.objectivesFR) {
    const isActive = convertToYesNo(project.objectivesFR);
    const { fr } = project;
    const keys = {
      CombinedMarket: makeBaseKey(fr.combinedMarket, BOOL),
      d_ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
      duration: makeBaseKey(fr.duration, FLOAT),
      energyprice_growth: makeBaseKey(fr.energyPriceGrowth, FLOAT),
      eod: makeBaseKey(fr.eod, FLOAT),
      eou: makeBaseKey(fr.eou, FLOAT),
      growth: makeBaseKey(fr.growth, FLOAT),
      u_ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeICEParameters = (project) => {
  const includeICE = checkNotNullOrEmpty(project.technologySpecsICE);

  // TODO extend to more than one
  const iceGen = project.technologySpecsICE[0];

  if (includeICE) {
    // find RATED_CAPACITY
    let ratedCapacity = ZERO;
    if (!iceGen.shouldSize) {
      ({ ratedCapacity } = iceGen);
    }
    const keys = {
      acr: makeBaseKey(0, FLOAT), // hardcoded
      ccost: makeBaseKey(iceGen.capitalCost, FLOAT),
      ccost_kw: makeBaseKey(200, FLOAT), // TODO: new value
      construction_year: makeBaseKey(convertDateToYear(iceGen.constructionDate), PERIOD),
      decommissioning_cost: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      'ecc%': makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      efficiency: makeBaseKey(iceGen.efficiency, FLOAT),
      expected_lifetime: makeBaseKey(99, INT), // TODO: new, verify value
      fixed_om_cost: makeBaseKey(iceGen.fixedOMCostIncludingExercise, FLOAT),
      fuel_cost: makeBaseKey(iceGen.fuelCost, FLOAT),
      macrs_term: makeBaseKey(iceGen.macrsTerm, FLOAT),
      max_rated_capacity: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      min_power: makeBaseKey(iceGen.minimumPower, FLOAT),
      min_rated_capacity: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      n: makeBaseKey(iceGen.numGenerators, INT),
      name: makeBaseKey(iceGen.name, STRING),
      nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
      operation_year: makeBaseKey(convertDateToYear(iceGen.operationDate), PERIOD),
      rated_capacity: makeBaseKey(ratedCapacity, FLOAT),
      rcost: makeBaseKey(0, FLOAT), // TODO new, verify value
      rcost_kW: makeBaseKey(100, FLOAT), // TODO new, verify value
      replaceable: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      replacement_construction_time: makeBaseKey(ONE, INT), // TODO new, verify value
      salvage_value: makeBaseKey(ZERO, STRING_INT), // TODO new, verify value
      sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
      startup_time: makeBaseKey(ZERO, INT), // hardcoded
      ter: makeBaseKey(7, FLOAT), // TODO new, verify value
      variable_om_cost: makeBaseKey(iceGen.variableOMCost, FLOAT),
    };
    return makeGroup(iceGen.id, convertToYesNo(iceGen.active), keys);
  }
  return makeEmptyGroup();
};

export const makeNSRParameters = (project) => {
  if (project.objectivesNSR) {
    const isActive = convertToYesNo(project.objectivesNSR);
    const { nsr } = project;
    const keys = {
      duration: makeBaseKey(nsr.duration, FLOAT),
      growth: makeBaseKey(nsr.growth, FLOAT),
      ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makePVParameters = (project) => {
  const includePV = checkNotNullOrEmpty(project.technologySpecsSolarPV);

  // TODO extend to more than one
  const solarPV = project.technologySpecsSolarPV[0];

  if (includePV) {
    // find RATED_CAPACITY value
    let ratedCapacity = ZERO;
    if (!solarPV.shouldSize) {
      ({ ratedCapacity } = solarPV);
    }
    const keys = {
      acr: makeBaseKey(0, FLOAT), // hardcoded
      ccost_kw: makeBaseKey(solarPV.cost, FLOAT),
      construction_year: makeBaseKey(convertDateToYear(solarPV.constructionDate), PERIOD),
      curtail: makeBaseKey(ZERO, BOOL), // TODO: new, verify value
      decommissioning_cost: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      'ecc%': makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      expected_lifetime: makeBaseKey(99, INT), // TODO: new, verify value
      fixed_om_cost: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      gamma: makeBaseKey(project.reliability.gamma, FLOAT),
      grid_charge: makeBaseKey(ZERO, BOOL), // TODO collect this
      grid_charge_penalty: makeBaseKey(ZERO, BOOL), // hardcoded
      growth: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      inv_max: makeBaseKey(solarPV.inverterMax, FLOAT),
      loc: makeBaseKey(solarPV.loc, FLOAT),
      macrs_term: makeBaseKey(solarPV.macrsTerm, FLOAT),
      max_rated_capacity: makeBaseKey(ZERO, BOOL), // TODO: new, verify value
      min_rated_capacity: makeBaseKey(ZERO, BOOL), // TODO: new, verify value
      name: makeBaseKey(solarPV.name, STRING),
      nsr_response_time: makeBaseKey(ZERO, INT), // hardcoded
      nu: makeBaseKey(project.reliability.nu, FLOAT),
      operation_year: makeBaseKey(convertDateToYear(solarPV.operationDate), PERIOD),
      PPA: makeBaseKey(ZERO, BOOL), // TODO: new, verify value
      PPA_cost: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      PPA_inflation_rate: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      rated_capacity: makeBaseKey(ratedCapacity, FLOAT),
      rcost_kW: makeBaseKey(100, FLOAT), // TODO new, verify value
      replaceable: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      replacement_construction_time: makeBaseKey(1, INT), // TODO new, verify value
      salvage_value: makeBaseKey(ZERO, STRING_INT), // TODO new, verify value
      sr_response_time: makeBaseKey(ZERO, INT), // hardcoded
      startup_time: makeBaseKey(ZERO, INT), // hardcoded
      ter: makeBaseKey(7, FLOAT), // TODO new, verify value
    };
    return makeGroup(solarPV.id, convertToYesNo(solarPV.active), keys);
  }
  return makeEmptyGroup();
};

export const makeReliabilityParameters = (project) => {
  if (project.objectivesResilience) {
    const isActive = convertToYesNo(project.objectivesResilience);
    const { reliability } = project;
    const keys = {
      max_outage_duration: makeBaseKey(reliability.maxOutageDuration, INT),
      'n-2': makeBaseKey(ZERO, BOOL), // hardcoded
      post_facto_initial_soc: makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      post_facto_only: makeBaseKey(reliability.postOptimizationOnly, BOOL),
      target: makeBaseKey(reliability.target, FLOAT),
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeResultsParameters = (project) => {
  const keys = {
    dir_absolute_path: makeBaseKey(project.resultsDirectory, STRING),
    errors_log_path: makeBaseKey(project.resultsDirectory, STRING),
    label: makeBaseKey('', STRING),
  };
  return makeGroup('', YES, keys);
};

export const makeRetailTimeShiftParameters = (project) => {
  if (project.objectivesRetailEnergyChargeReduction) {
    const isActive = convertToYesNo(project.objectivesRetailEnergyChargeReduction);
    const keys = { growth: makeBaseKey(project.retailETS.growth, FLOAT) };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeScenarioParameters = (project) => {
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
  let n = project.optimizationHorizon;
  if (n === 'hours') {
    n = project.optimizationHorizonNum;
  }
  // TODO if any DERs are being sized, N should be 'Year'
  // TODO if customer services, N should be 'month'
  // TODO if wholesale services, N should be a number of hours
  const projSiteInfo = project.objectivesSiteInformation;
  const includePoiConstraints = projSiteInfo.includeInterconnectionConstraints;
  const keys = {
    apply_interconnection_constraints: makeBaseKey(convertToOneZero(includePoiConstraints), BOOL),
    binary: makeBaseKey(binary, BOOL),
    def_growth: makeBaseKey(2, FLOAT), // TODO ask for this value with site load
    dt: makeBaseKey(project.timestep, FLOAT),
    end_year: makeBaseKey(calculateEndYear(project.startYear, project.analysisHorizon), PERIOD),
    incl_site_load: makeBaseKey(convertToOneZero(projSiteInfo.includeSiteLoad), BOOL),
    incl_thermal_load: makeBaseKey(ZERO, BOOL), // TODO: new, verify value
    kappa_ch_max: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_ch_min: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_dis_max: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_dis_min: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_ene_max: makeBaseKey('100000', FLOAT), // hardcoded
    kappa_ene_min: makeBaseKey('100000', FLOAT), // hardcoded
    location: makeBaseKey(project.gridLocation.toLowerCase(), STRING),
    max_export: makeBaseKey(projSiteInfo.maxExport, FLOAT),
    max_import: makeBaseKey(projSiteInfo.maxImport, FLOAT),
    monthly_data_filename: makeBaseKey(makeCsvFilePath(project.inputsDirectory, MONTHLY), STRING),
    n: makeBaseKey(n, STRING_INT),
    opt_years: makeBaseKey(project.dataYear, LIST_INT),
    ownership: makeBaseKey(project.ownership.toLowerCase(), STRING),
    slack: makeBaseKey(ZERO, BOOL), // hardcoded
    start_year: makeBaseKey(project.startYear, PERIOD),
    time_series_filename: makeBaseKey(makeCsvFilePath(project.inputsDirectory, TIMESERIES), STRING),
    verbose: makeBaseKey(ONE, BOOL), // hardcoded
    verbose_opt: makeBaseKey(ZERO, BOOL), // hardcoded
  };
  return makeGroup('', YES, keys);
};

export const makeSRParameters = (project) => {
  if (project.objectivesSR) {
    const isActive = convertToYesNo(project.objectivesSR);
    const { sr } = project;
    const keys = {
      duration: makeBaseKey(sr.duration, FLOAT),
      growth: makeBaseKey(sr.growth, FLOAT),
      ts_constraints: makeBaseKey(ZERO, BOOL), // hardcoded
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeUserParameters = (project) => {
  if (project.objectivesUserDefined) {
    const isActive = convertToYesNo(project.objectivesUserDefined);
    const { userDefined } = project;
    const keys = {
      price: makeBaseKey(userDefined.price, FLOAT),
    };
    return makeGroup('', isActive, keys);
  }
  return makeEmptyGroup();
};

export const makeModelParameters = project => ({
  name: project.name,
  tags: {
    Battery: makeBatteryParameters(project),
    DA: makeDAParameters(project),
    DCM: makeDCMParameters(project),
    Deferral: makeDeferralParameters(project),
    DieselGenset: makeDieselGensetParameters(project),
    Finance: makeFinanceParameters(project),
    FR: makeFRParameters(project),
    ICE: makeICEParameters(project),
    NSR: makeNSRParameters(project),
    PV: makePVParameters(project),
    Reliability: makeReliabilityParameters(project),
    Results: makeResultsParameters(project),
    retailTimeShift: makeRetailTimeShiftParameters(project),
    Scenario: makeScenarioParameters(project),
    SR: makeSRParameters(project),
    User: makeUserParameters(project),
  },
  type: project.type,
});

export const makeBatteryCycleLifeCsv = (project) => {
  /* TODO:
    - see if batteryCycleLife could be part of model parameters (i.e. not written to CSV)
    - check if batteryCycles exist
    - extend to support multiple battery case
  */
  const data = project.technologySpecsBattery[0].batteryCycles;
  const fields = ['ulimit', 'val'];
  const headers = ['Cycle Depth Upper Limit', 'Cycle Life Value'];
  return objectToCsv(data, fields, headers);
};

export const makeTariffCsv = project => billingPeriodsToCsv(project.retailTariffBillingPeriods);

export const makeYearlyCsv = project => externalIncentivesToCsv(project.externalIncentives);

export const makeMonthlyCsv = (project) => {
  const data = _.map(_.range(1, 13), i => ({
    year: project.dataYear,
    month: i,
  }));
  const fields = ['year', 'month'];
  const headers = ['Year', 'Month']; // TODO LL string constants
  return objectToCsv(data, fields, headers);
};

export const makeDatetimeIndex = (dataYear) => {
  const start = new Date(Date.UTC(dataYear, 0, 1, 1));
  const end = new Date(Date.UTC(dataYear + 1, 0, 1, 1));

  // TODO this hardcodes the timestep to 1 hour: extend to others based on input
  const timedelta = d3.timeHour.every(1);
  const datetimeIndex = timedelta.range(start, end);
  return datetimeIndex.map(d => moment.utc(d).format('M/D/YYYY H:mm'));
};

export const makeEmptyCsvDataWithDatetimeIndex = (project) => {
  const datetimeIndex = makeDatetimeIndex(project.dataYear);
  return datetimeIndex.map(d => ({ [TIMESERIES_DATETIME_INDEX]: d }));
};

/* TODO: new timeseries fields
  - RA Active (y/n)
  - POI: max export (kW)
  - POI: max import (kW)
  - Aggregate Energy Max (kWh)
  - Aggregate Energy Min (kWh)
  - LF Price ($/kW)
  - LF Up Price ($/kW)
  - LF Down Price ($/kW)
  - LF Energy Option Up (kWh/kW-hr)
  - LF Energy Option Down (kWh/kW-hr)
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
*/
export const makeTimeSeriesCsv = (project) => {
  // Make datetime index
  let data = [makeEmptyCsvDataWithDatetimeIndex(project)];
  let fields = [TIMESERIES_DATETIME_INDEX];
  let headers = [TIMESERIES_DATETIME_HEADER];

  // Add all available timeseries to CSV
  TIMESERIES_FIELDS.forEach((ts) => {
    const tsClass = project[ts];
    if (tsClass) {
      // TODO Move this to standalone function
      data = data.concat([mapListToObjectList(tsClass.data, ts)]);
      fields = fields.concat(ts);
      headers = headers.concat(tsClass.columnHeaderName);
    }
  });

  const unzippedData = _.unzipWith(data, Object.assign);
  return objectToCsv(unzippedData, fields, headers);
};

class CycleDto {
  constructor(project) {
    this.csv = makeBatteryCycleLifeCsv(project);
    this.filePath = makeCsvFilePath(project.inputsDirectory, CYCLE);
  }
}

class MonthlyDto {
  constructor(project) {
    this.csv = makeMonthlyCsv(project);
    this.filePath = makeCsvFilePath(project.inputsDirectory, MONTHLY);
  }
}

class TariffDto {
  constructor(project) {
    this.csv = makeTariffCsv(project);
    this.filePath = makeCsvFilePath(project.inputsDirectory, TARIFF);
  }
}

class YearlyDto {
  constructor(project) {
    this.csv = makeYearlyCsv(project);
    this.filePath = makeCsvFilePath(project.inputsDirectory, YEARLY);
  }
}

class TimeSeriesDto {
  constructor(project) {
    this.csv = makeTimeSeriesCsv(project);
    this.filePath = makeCsvFilePath(project.inputsDirectory, TIMESERIES);
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
    if (!project.postOptimizationOnly) {
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

export const makeCsvs = project => ([
  // TODO add monthly data
  (new MonthlyDto(project)),
  (new TariffDto(project)),
  (new YearlyDto(project)),
  (new TimeSeriesDto(project)),
  (new CycleDto(project)),
]);


export const makeMeta = project => ({
  modelParametersPath: path.join(project.inputsDirectory, MODEL_PARAMETERS),
  resultsPath: project.resultsDirectory,
});

export const makeDervetInputs = project => ({
  expectedResultCsvs: makeExpectedResultCsvs(project),
  inputCsvs: makeCsvs(project),
  meta: makeMeta(project),
  modelParameters: makeModelParameters(project),
});
