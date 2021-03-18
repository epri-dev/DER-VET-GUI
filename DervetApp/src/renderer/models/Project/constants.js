import _ from 'lodash';

export const ANALYSIS_HORIZON = 'analysisHorizon';
export const ANALYSIS_HORIZON_MODE = 'analysisHorizonMode';
export const DA_GROWTH = 'daGrowth';
export const DATA_YEAR = 'dataYear';
export const DEFERRAL_PLANNED_LOAD_LIMIT = 'deferralPlannedLoadLimit';
export const DEFERRAL_REVERSE_POWER_FLOW_LIMIT = 'deferralReversePowerFlowLimit';
export const DEFERRAL_GROWTH = 'deferralGrowth';
export const DEFERRAL_PRICE = 'deferralPrice';
export const DR_NUMBER_EVENTS = 'drNumberEvents';
export const DR_GROWTH = 'drGrowth';
export const DR_INCLUDE_WEEKENDS = 'drIncludeWeekends';
export const DR_START_HOUR = 'drStartHour';
export const DR_END_HOUR = 'drEndHour';
export const DR_END_MODE = 'drEndMode';
export const DR_EVENT_LENGTH = 'drEventLength';
export const DR_PROGRAM_TYPE = 'drProgramType';
export const DR_APPLIED_MONTHS_LABELS = 'drMonthsAppliedLabels';
export const ENERGY_PRICE_SOURCE_WHOLESALE = 'energyPriceSourceWholesale';
export const FINANCE_DISCOUNT_RATE = 'financeDiscountRate';
export const FINANCE_FEDERAL_TAX_RATE = 'financeFederalTaxRate';
export const FINANCE_INFLATION_RATE = 'financeInflationRate';
export const FINANCE_PROPERTY_TAX_RATE = 'financePropertyTaxRate';
export const FINANCE_STATE_TAX_RATE = 'financeStateTaxRate';
export const FR_EOU = 'frEOU';
export const FR_EOD = 'frEOD';
export const FR_GROWTH = 'frGrowth';
export const FR_ENERGY_PRICE_GROWTH = 'frEnergyPriceGrowth';
export const FR_DURATION = 'frDuration';
export const FR_COMBINED_MARKET = 'frCombinedMarket';
export const LF_DURATION = 'lfDuration';
export const LF_COMBINED_MARKET = 'lfCombinedMarket';
export const LF_GROWTH = 'lfGrowth';
export const LF_ENERGY_PRICE_GROWTH = 'lfEnergyPriceGrowth';
export const GRID_LOCATION = 'gridLocation';
export const INCLUDE_INTERCONNECTION_CONSTRAINTS = 'includeInterconnectionConstraints';
export const MAX_EXPORT = 'maxExport';
export const MAX_IMPORT = 'maxImport';
export const NAME = 'name';
export const NSR_GROWTH = 'nsrGrowth';
export const NSR_DURATION = 'nsrDuration';
export const OPTIMIZATION_HORIZON = 'optimizationHorizon';
export const OPTIMIZATION_HORIZON_NUM = 'optimizationHorizonNum';
export const OUTPUT_DIRECTORY = 'outputDirectory';
export const OWNERSHIP = 'ownership';
export const PROJECT = 'project';
export const RA_NUMBER_EVENTS = 'raNumberEvents';
export const RA_EVENT_LENGTH = 'raEventLength';
export const RA_DISPATCH_MODE = 'raDispatchMode';
export const RA_EVENT_SELECTION_METHOD = 'raEventSelectionMethod';
export const RA_GROWTH = 'raGrowth';
export const RELIABILITY_MAX_OUTAGE_DURATION = 'reliabilityMaxOutageDuration';
export const RELIABILITY_POST_OPTIMIZATION_ONLY = 'reliabilityPostOptimizationOnly';
export const RELIABILITY_TARGET = 'reliabilityTarget';
export const SIZING_EQUIPMENT = 'sizingEquipment';
export const SR_GROWTH = 'srGrowth';
export const SR_DURATION = 'srDuration';
export const START_YEAR = 'startYear';
export const TIMESTEP = 'timestep';
export const USER_PRICE = 'userPrice';

// Timeseries
export const TS_DA_PRICE = 'tsDaPrice';
export const TS_DA_FIELDS = [TS_DA_PRICE];
export const TS_DEFERRAL_LOAD = 'tsDeferralLoad';
export const TS_DEFERRAL_FIELDS = [TS_DEFERRAL_LOAD];
export const TS_FR_PRICE = 'tsFrPrice';
export const TS_FR_UP_PRICE = 'tsFrUpPrice';
export const TS_FR_DOWN_PRICE = 'tsFrDownPrice';
export const TS_FR_FIELDS = [TS_FR_PRICE, TS_FR_UP_PRICE, TS_FR_DOWN_PRICE];
export const TS_LF_EOU = 'tsLfEOU';
export const TS_LF_EOD = 'tsLfEOD';
export const TS_LF_PRICE = 'tsLfPrice';
export const TS_LF_UP_PRICE = 'tsLfUpPrice';
export const TS_LF_DOWN_PRICE = 'tsLfDownPrice';
export const TS_LF_FIELDS = [TS_LF_EOU, TS_LF_EOD, TS_LF_PRICE, TS_LF_UP_PRICE, TS_LF_DOWN_PRICE];
export const TS_NSR_PRICE = 'tsNsrPrice';
export const TS_NSR_FIELDS = [TS_NSR_PRICE];
export const TS_RA_ACTIVE = 'tsRaActive';
export const TS_RA_FIELDS = [TS_RA_ACTIVE];
export const TS_CRITICAL_LOAD = 'tsCriticalLoad';
export const TS_RESILIENCE_FIELDS = [TS_CRITICAL_LOAD];
export const TS_SITE_LOAD = 'tsSiteLoad';
export const TS_SITE_FIELDS = [TS_SITE_LOAD];
export const TS_SR_PRICE = 'tsSrPrice';
export const TS_SR_FIELDS = [TS_SR_PRICE];
export const TS_SYSTEM_LOAD = 'tsSystemLoad';
export const TS_SYSTEM_FIELDS = [TS_SYSTEM_LOAD];
export const TS_USER_ENERGY_MAX = 'tsUserEnergyMax';
export const TS_USER_ENERGY_MIN = 'tsUserEnergyMin';
export const TS_USER_POWER_MAX = 'tsUserPowerMax';
export const TS_USER_POWER_MIN = 'tsUserPowerMin';
export const TS_USER_DEFINED_FIELDS = [TS_USER_ENERGY_MAX, TS_USER_ENERGY_MIN,
  TS_USER_POWER_MAX, TS_USER_POWER_MIN];
// technology timeseries
export const TS_SOLARPV_GENERATION_PROFILE = 'tsSolarPVGenerationProfile';
export const TS_CONTROLLABLE_LOAD_PROFILE = 'tsControllableLoadProfile';
export const TS_FLEETEV_BASELINE_LOAD_PROFILE = 'tsFleetEVBaselineLoadProfile';

export const TS_ALL = [
  ...TS_DA_FIELDS,
  ...TS_DEFERRAL_FIELDS,
  ...TS_FR_FIELDS,
  ...TS_LF_FIELDS,
  ...TS_NSR_FIELDS,
  ...TS_RA_FIELDS,
  ...TS_RESILIENCE_FIELDS,
  ...TS_SITE_FIELDS,
  ...TS_SR_FIELDS,
  ...TS_SYSTEM_FIELDS,
  ...TS_USER_DEFINED_FIELDS,
];

// Monthly
export const MTS_BACKUP_ENERGY_PRICE = 'mtsBackupEnergyPrice';
export const MTS_BACKUP_ENERGY_RESERVATION = 'mtsBackupEnergyReservation';
export const MTS_BACKUP_FIELDS = [MTS_BACKUP_ENERGY_PRICE, MTS_BACKUP_ENERGY_RESERVATION];
export const MTS_DR_CAPACITY_PRICE = 'mtsDrCapacityPrice';
export const MTS_DR_CAPACITY_RESERVATION = 'mtsDrCapacityReservation';
export const MTS_DR_ENERGY_PRICE = 'mtsDrEnergyPrice';
export const MTS_DR_MONTHS_APPLIED = 'mtsDrMonthsApplied'; // not an upload
export const MTS_DR_FIELDS = [MTS_DR_CAPACITY_PRICE, MTS_DR_CAPACITY_RESERVATION,
  MTS_DR_ENERGY_PRICE];
export const MTS_RA_CAPACITY_PRICE = 'mtsRaCapacityPrice';
export const MTS_RA_FIELDS = [MTS_RA_CAPACITY_PRICE];

export const MTS_ALL = [...MTS_RA_FIELDS, ...MTS_BACKUP_FIELDS, ...MTS_DR_FIELDS];

export const makeAllowedValues = lst => _.map(lst, x => ({ value: x, label: x }));

export const makeAllowedValuesWithNull = (lst) => {
  const mapped = makeAllowedValues(lst);
  mapped.unshift({ value: null, label: '-' });
  return mapped;
};

export const optionsYN = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
];

// Allowed values
export const ANALYSIS_HORIZON_MODE_ALLOWED_VALUES = [
  { value: '1', label: 'User-defined' },
  { value: '2', label: 'The shortest DER lifetime' },
  { value: '3', label: 'The longest DER lifetime' },
];
export const DR_PROGRAM_TYPE_ALLOWED_VALUES = makeAllowedValues(['Day of', 'Day ahead']);
export const RA_DISPATCH_MODE_ALLOWED_VALUES = [
  { value: true, label: 'Constrain power' },
  { value: false, label: 'Constrain energy' },
];
export const ENERGY_PRICE_SOURCE_WHOLESALE_ALLOWED_VALUES = [
  {
    value: false,
    label: 'Retail tariff, PPA, or other fixed contract (define energy price structure)',
  },
  {
    value: true,
    label: 'Wholesale energy market, production cost model, or other time-varying source (upload time series data)',
  },
];
export const FR_COMBINED_MARKET_ALLOWED_VALUES = optionsYN;
export const GRID_LOCATION_ALLOWED_VALUES = makeAllowedValues(['Generation', 'Transmission', 'Distribution', 'Customer']);
export const INCLUDE_INTERCONNECTION_CONSTRAINTS_ALLOWED_VALUES = optionsYN;
export const OPTIMIZATION_HORIZON_ALLOWED_VALUES = [
  { value: 'Year', label: 'Years' },
  { value: 'Month', label: 'Months' },
  { value: 'Hour', label: 'Hours' },
];
export const OWNERSHIP_ALLOWED_VALUES = makeAllowedValues(['Customer', 'Utility', '3rd Party']);
export const DR_END_MODE_ALLOWED_VALUES = [
  { value: true, label: 'Event Length' },
  { value: false, label: 'End Hour' },
];
export const RA_EVENT_SELECTION_METHOD_ALLOWED_VALUES = makeAllowedValues(['Peak by Year', 'Peak by Month', 'Peak by Month with Active Hours']);
export const RELIABILITY_POST_OPTIMIZATION_ONLY_ALLOWED_VALUES = [
  {
    value: false,
    label: 'Optimize DER size/operation for reliability',
  },
  {
    value: true,
    label: 'Only calculate the reliability benefit of the DERs',
  },
];
export const SIZING_EQUIPMENT_ALLOWED_VALUES = optionsYN;
export const TIMESTEP_ALLOWED_VALUES = makeAllowedValuesWithNull(['60', '30', '15', '5', '1']);

export const GROWTH_RATE_DESCRIPTION = 'A per year increase from the baseline year. This is the project start year.';

// Field groupings
export const START_PROJECT_FIELDS = [
  ANALYSIS_HORIZON,
  ANALYSIS_HORIZON_MODE,
  DATA_YEAR,
  GRID_LOCATION,
  NAME,
  OUTPUT_DIRECTORY,
  OWNERSHIP,
  START_YEAR,
  TIMESTEP,
];
export const OBJECTIVE_FIELDS = [
  ENERGY_PRICE_SOURCE_WHOLESALE,
  OPTIMIZATION_HORIZON,
  OPTIMIZATION_HORIZON_NUM,
  SIZING_EQUIPMENT,
];
export const SITE_INFORMATION_FIELDS = [
  INCLUDE_INTERCONNECTION_CONSTRAINTS,
  MAX_EXPORT,
  MAX_IMPORT,
];
export const DEFERRAL_FIELDS = [
  DEFERRAL_GROWTH,
  DEFERRAL_PLANNED_LOAD_LIMIT,
  DEFERRAL_PRICE,
  DEFERRAL_REVERSE_POWER_FLOW_LIMIT,
];
export const DEMAND_RESPONSE_FIELDS = [
  DR_NUMBER_EVENTS,
  DR_INCLUDE_WEEKENDS,
  DR_START_HOUR,
  DR_END_HOUR,
  DR_END_MODE,
  DR_EVENT_LENGTH,
  DR_PROGRAM_TYPE,
  DR_GROWTH,
  DR_APPLIED_MONTHS_LABELS,
];
export const FINANCE_FIELDS = [
  FINANCE_DISCOUNT_RATE,
  FINANCE_FEDERAL_TAX_RATE,
  FINANCE_INFLATION_RATE,
  FINANCE_PROPERTY_TAX_RATE,
  FINANCE_STATE_TAX_RATE,
];
export const FR_FIELDS = [
  FR_COMBINED_MARKET,
  FR_DURATION,
  FR_ENERGY_PRICE_GROWTH,
  FR_EOU,
  FR_EOD,
  FR_GROWTH,
];
export const LF_FIELDS = [
  LF_COMBINED_MARKET,
  LF_DURATION,
  LF_GROWTH,
  LF_ENERGY_PRICE_GROWTH,
];
export const NSR_FIELDS = [
  NSR_DURATION,
  NSR_GROWTH,
];
export const RESOURCE_ADEQUACY_FIELDS = [
  RA_NUMBER_EVENTS,
  RA_EVENT_LENGTH,
  RA_DISPATCH_MODE,
  RA_EVENT_SELECTION_METHOD,
  RA_GROWTH,
];
export const RESILIENCE_FIELDS = [
  RELIABILITY_MAX_OUTAGE_DURATION,
  RELIABILITY_POST_OPTIMIZATION_ONLY,
  RELIABILITY_TARGET,
];
export const SR_FIELDS = [
  SR_DURATION,
  SR_GROWTH,
];
export const USER_DEFINED_FIELDS = [
  USER_PRICE,
];
export const DA_FIELDS = [
  DA_GROWTH,
];
