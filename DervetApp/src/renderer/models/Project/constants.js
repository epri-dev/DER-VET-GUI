import _ from 'lodash';

export const ANALYSIS_HORIZON = 'analysisHorizon';
export const ANALYSIS_HORIZON_MODE = 'analysisHorizonMode';
export const DA_GROWTH = 'daGrowth';
export const DATA_YEAR = 'dataYear';
export const DEFERRAL_PLANNED_LOAD_LIMIT = 'deferralPlannedLoadLimit';
export const DEFERRAL_REVERSE_POWER_FLOW_LIMIT = 'deferralReversePowerFlowLimit';
export const DEFERRAL_GROWTH = 'deferralGrowth';
export const DEFERRAL_PRICE = 'deferralPrice';
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
export const RELIABILITY_MAX_OUTAGE_DURATION = 'reliabilityMaxOutageDuration';
export const RELIABILITY_POST_OPTIMIZATION_ONLY = 'reliabilityPostOptimizationOnly';
export const RELIABILITY_TARGET = 'reliabilityTarget';
export const SIZING_EQUIPMENT = 'sizingEquipment';
export const SR_GROWTH = 'srGrowth';
export const SR_DURATION = 'srDuration';
export const START_YEAR = 'startYear';
export const TIMESTEP = 'timestep';
export const USER_PRICE = 'userPrice';

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
  { value: '1', label: 'User-defined analysis horizon' },
  { value: '2', label: 'Auto-calculate analysis horizon by shortest DER lifetime' },
  { value: '3', label: 'Auto-calculate analysis horizon by longest DER lifetime' },
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
export const OPTIMIZATION_HORIZON_ALLOWED_VALUES = makeAllowedValues(['Year', 'Month', 'Hours']);
export const OWNERSHIP_ALLOWED_VALUES = makeAllowedValues(['Customer', 'Utility', '3rd Party']);
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
export const TIMESTEP_ALLOWED_VALUES = makeAllowedValuesWithNull(['1', '5', '15', '30', '60']);

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
];
export const NSR_FIELDS = [
  NSR_DURATION,
  NSR_GROWTH,
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
