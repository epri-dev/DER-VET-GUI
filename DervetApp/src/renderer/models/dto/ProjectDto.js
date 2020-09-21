import * as d3 from 'd3';
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

// TODO add PV gen profile(s)
const TIMESERIES_FIELDS = [
  'criticalLoad',
  'deferralLoad',
  'daPrice',
  'frPrice',
  'frUpPrice',
  'frDownPrice',
  'srPrice',
  'siteLoad',
  'nsrPrice',
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

export const makeBatteryParameters = (project) => {
  const includeBattery = checkNotNullOrEmpty(project.technologySpecsBattery);

  // TODO extend to more than one
  const battery = project.technologySpecsBattery[0];

  if (includeBattery) {
    const keys = {
      OMexpenses: makeBaseKey(battery.variableOMCosts, FLOAT),
      acr: makeBaseKey(10, FLOAT), // TODO: new, verify value
      ccost: makeBaseKey(battery.capitalCost, FLOAT),
      ccost_kw: makeBaseKey(battery.capitalCostPerkW, FLOAT),
      ccost_kwh: makeBaseKey(battery.capitalCostPerkWh, FLOAT),
      ch_max_rated: makeBaseKey(battery.chargingCapacity, FLOAT),
      ch_min_rated: makeBaseKey(ZERO, FLOAT), // TODO: hardcoded in old GUI
      construction_year: makeBaseKey(convertDateToYear(battery.constructionDate), PERIOD),
      cycle_life_filename: makeBaseKey(makeCsvFilePath(project.inputsDirectory, CYCLE), STRING),
      daily_cycle_limit: makeBaseKey(battery.dailyCycleLimit, FLOAT),
      decommissioning_cost: makeBaseKey(ZERO, FLOAT), // TODO: new, verify value
      dis_max_rated: makeBaseKey(battery.dischargingCapacity, FLOAT),
      dis_min_rated: makeBaseKey(ZERO, FLOAT), // TODO: hardcoded in old GUI
      duration_max: makeBaseKey(battery.maxDuration, FLOAT),
      ene_max_rated: makeBaseKey(battery.energyCapacity, FLOAT),
      expected_lifetime: makeBaseKey(9e10, INT), // TODO: new, verify value
      fixedOM: makeBaseKey(battery.fixedOMCosts, FLOAT),
      hp: makeBaseKey(battery.auxiliaryLoad, FLOAT),
      incl_cycle_degrade: makeBaseKey(convertToOneZero(battery.includeCycleDegradation), BOOL),
      incl_ts_charge_limits: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      incl_ts_discharge_limits: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      incl_ts_energy_limits: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      llsoc: makeBaseKey(battery.lowerSOCLimit, FLOAT),
      macrs_term: makeBaseKey(battery.macrsTerm, FLOAT),
      name: makeBaseKey(battery.name, STRING),
      nsr_response_time: makeBaseKey(ZERO, INT), // TODO new, verify value
      operation_year: makeBaseKey(convertDateToYear(battery.operationDate), PERIOD),
      p_start_ch: makeBaseKey(ZERO, FLOAT), // TODO: hardcoded in old GUI
      p_start_dis: makeBaseKey(ZERO, FLOAT), // TODO: hardcoded in old GUI
      rcost: makeBaseKey(0, FLOAT), // TODO new, verify value
      rcost_kW: makeBaseKey(100, FLOAT), // TODO new, verify value
      rcost_kWh: makeBaseKey(800, FLOAT), // TODO new, verify value
      replaceable: makeBaseKey(ZERO, BOOL), // TODO new, verify value
      rte: makeBaseKey(battery.roundtripEfficiency, FLOAT),
      salvage_value: makeBaseKey(ZERO, FLOAT), // TODO new, verify value
      sdr: makeBaseKey(battery.selfDischargeRate, FLOAT),
      soc_target: makeBaseKey(battery.targetSOC, FLOAT),
      sr_response_time: makeBaseKey(ZERO, INT), // TODO new, verify value
      startup: makeBaseKey(convertToOneZero(battery.includeStartupCost), BOOL),
      startup_time: makeBaseKey(ZERO, INT), // TODO new, verify value
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
  const isActive = convertToYesNo(project.objectivesDA);
  const keys = { growth: makeBaseKey(project.daGrowth, FLOAT) };
  return makeGroup('', isActive, keys);
};

export const makeFinanceParameters = (project) => {
  const externalIncentivesExist = convertToOneZero(checkNotNullOrEmpty(project.externalIncentives));
  const keys = {
    analysis_horizon_mode: makeBaseKey(project.analysisHorizonMode, INT),
    customer_tariff_filename: makeBaseKey(makeCsvFilePath(project.inputsDirectory, TARIFF), STRING),
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

export const makeScenarioParameters = (project) => {
  const keys = {
    apply_interconnection_constraints: makeBaseKey(ZERO, BOOL), // TODO: new, see issue 130
    binary: makeBaseKey(ONE, BOOL), // TODO LL: depends on technology properties
    def_growth: makeBaseKey(project.deferralGrowth, FLOAT),
    dt: makeBaseKey(ONE, FLOAT), // TODO LL
    end_year: makeBaseKey(calculateEndYear(project.startYear, project.analysisHorizon), PERIOD),
    incl_site_load: makeBaseKey(ZERO, BOOL), // TODO LL: calculated based on objectives
    incl_thermal_load: makeBaseKey(ZERO, BOOL), // TODO: new, verify value
    kappa_ch_max: makeBaseKey('100000', FLOAT), // TODO: hardcoded in old GUI
    kappa_ch_min: makeBaseKey('100000', FLOAT), // TODO: hardcoded in old GUI
    kappa_dis_max: makeBaseKey('100000', FLOAT), // TODO: hardcoded in old GUI
    kappa_dis_min: makeBaseKey('100000', FLOAT), // TODO: hardcoded in old GUI
    kappa_ene_max: makeBaseKey('100000', FLOAT), // TODO: hardcoded in old GUI
    kappa_ene_min: makeBaseKey('100000', FLOAT), // TODO: hardcoded in old GUI
    location: makeBaseKey(project.gridLocation.toLowerCase(), STRING),
    max_export: makeBaseKey('40000', FLOAT), // TODO: new, see issue 131
    max_import: makeBaseKey('-10000', FLOAT), // TODO: new, see issue 131
    monthly_data_filename: makeBaseKey(makeCsvFilePath(project.inputsDirectory, MONTHLY), STRING),
    n: makeBaseKey(project.optimizationHorizon, STRING_INT), // TODO optimizationHorizonNum if hrs
    opt_years: makeBaseKey(project.dataYear, LIST_INT),
    ownership: makeBaseKey(project.ownership.toLowerCase(), STRING),
    slack: makeBaseKey(ZERO, BOOL), // TODO: hardcoded in old GUI
    start_year: makeBaseKey(project.startYear, PERIOD),
    time_series_filename: makeBaseKey(makeCsvFilePath(project.inputsDirectory, TIMESERIES), STRING),
    verbose: makeBaseKey(ONE, BOOL),
    verbose_opt: makeBaseKey(ZERO, BOOL),
  };
  return makeGroup('', YES, keys);
};

export const makeModelParameters = project => ({
  name: NONE,
  tags: {
    Battery: makeBatteryParameters(project),
    DA: makeDAParameters(project),
    Finance: makeFinanceParameters(project),
    Scenario: makeScenarioParameters(project),
  },
  type: 'Expert',
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

export const makeDatetimeIndex = (dataYear) => {
  const start = new Date(dataYear, 0, 1);
  const end = new Date(dataYear + 1, 0, 1);

  // TODO this hardcodes the timestep to 1 hour: extend to others based on input
  const timedelta = d3.timeHour.every(1);
  return timedelta.range(start, end);
};

export const makeEmptyCsvDataWithDatetimeIndex = (project) => {
  const datetimeIndex = makeDatetimeIndex(project.dataYear);
  return datetimeIndex.map(d => ({ [TIMESERIES_DATETIME_INDEX]: d }));
};

/* TODO: new timeseries fields
  - RA Active (y/n)
  - VAR Reservation (%)
  - ch_max
  - ch_min
  - dis_max
  - dis_min
  - ene_max
  - ene_min
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
  const data = makeEmptyCsvDataWithDatetimeIndex(project);
  const fields = [TIMESERIES_DATETIME_INDEX];
  const headers = [TIMESERIES_DATETIME_HEADER];

  // Add all available timeseries to CSV
  TIMESERIES_FIELDS.forEach((ts) => {
    if (data[ts]) {
      data[ts] = project[ts];
      fields[ts] = ts;
      headers[ts] = ts.columnHeaderName;
    }
  });

  return objectToCsv(data, fields, headers);
};

export const makeCsvs = project => ({
  batteryCycleLife: makeBatteryCycleLifeCsv(project),
  customerTariff: makeTariffCsv(project),
  yearlyData: makeYearlyCsv(project),
  monthlyData: '', // TODO new, check where this comes from
  timeSeriesData: makeTimeSeriesCsv(project),
});

export const makeDervetInputs = project => ({
  csvs: makeCsvs(project),
  modelParameters: makeModelParameters(project),
});
