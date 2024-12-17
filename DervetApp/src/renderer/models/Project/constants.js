import Page from '@/models/Application/Page';

export const ANALYSIS_HORIZON = 'analysisHorizon';
export const ANALYSIS_HORIZON_MODE = 'analysisHorizonMode';
export const DA_GROWTH = 'daGrowth';
export const DATA_YEAR = 'dataYear';
export const DEFERRAL_PLANNED_LOAD_LIMIT = 'deferralPlannedLoadLimit';
export const DEFERRAL_REVERSE_POWER_FLOW_LIMIT = 'deferralReversePowerFlowLimit';
export const DEFERRAL_GROWTH = 'deferralGrowth';
export const DEFERRAL_PRICE = 'deferralPrice';
export const DESCRIPTION = 'description';
export const DR_NUMBER_EVENTS = 'drNumberEvents';
export const DR_GROWTH = 'drGrowth';
export const DR_INCLUDE_WEEKENDS = 'drIncludeWeekends';
export const DR_START_HOUR = 'drStartHour';
export const DR_END_HOUR = 'drEndHour';
export const DR_END_MODE = 'drEndMode';
export const DR_EVENT_LENGTH = 'drEventLength';
export const DR_PROGRAM_TYPE = 'drProgramType';
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
export const FUEL_PRICE_GAS = 'fuelPriceGas';
export const FUEL_PRICE_LIQUID = 'fuelPriceLiquid';
export const FUEL_PRICE_OTHER = 'fuelPriceOther';
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
export const OBJECTIVES_BACKUP_POWER = 'objectivesBackupPower';
export const OBJECTIVES_DA = 'objectivesDA';
export const OBJECTIVES_DR = 'objectivesDR';
export const OBJECTIVES_DEFERRAL = 'objectivesDeferral';
export const OBJECTIVES_FR = 'objectivesFR';
export const OBJECTIVES_LF = 'objectivesLF';
export const OBJECTIVES_NSR = 'objectivesNSR';
export const OBJECTIVES_RA = 'objectivesRA';
export const OBJECTIVES_RETAIL_ENERGY_CHARGE_REDUCTION = 'objectivesRetailEnergyChargeReduction';
export const OBJECTIVES_RETAIL_DEMAND_CHARGE_REDUCTION = 'objectivesRetailDemandChargeReduction';
export const OBJECTIVES_RESILIENCE = 'objectivesResilience';
export const OBJECTIVES_SR = 'objectivesSR';
export const OBJECTIVES_USER_DEFINED = 'objectivesUserDefined';
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
export const USER_INFEASIBLE = 'userInfeasible';
export const USER_PRICE = 'userPrice';

// Timeseries
export const TS_DA_PRICE = 'tsDaPrice';
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
export const TS_USER_POWER_EXPORT_MAX = 'tsUserPowerExportMax';
export const TS_USER_POWER_EXPORT_MIN = 'tsUserPowerExportMin';
export const TS_USER_POWER_IMPORT_MAX = 'tsUserPowerImportMax';
export const TS_USER_POWER_IMPORT_MIN = 'tsUserPowerImportMin';

export const TS_USER_DEFINED_FIELDS = [
  TS_USER_ENERGY_MAX,
  TS_USER_ENERGY_MIN,
  TS_USER_POWER_EXPORT_MAX,
  TS_USER_POWER_EXPORT_MIN,
  TS_USER_POWER_IMPORT_MAX,
  TS_USER_POWER_IMPORT_MIN,
];
// technology timeseries
export const TS_SOLARPV_GENERATION_PROFILE = 'tsSolarPVGenerationProfile';
export const TS_CONTROLLABLE_LOAD_PROFILE = 'tsControllableLoadProfile';

export const TS_ALL = [
  TS_DA_PRICE,
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
export const MTS_DR_FIELDS = [
  MTS_DR_CAPACITY_PRICE,
  MTS_DR_CAPACITY_RESERVATION,
  MTS_DR_ENERGY_PRICE,
  MTS_DR_MONTHS_APPLIED,
];
export const MTS_RA_CAPACITY_PRICE = 'mtsRaCapacityPrice';
export const MTS_RA_FIELDS = [MTS_RA_CAPACITY_PRICE];

export const MTS_ALL = [
  ...MTS_RA_FIELDS,
  ...MTS_BACKUP_FIELDS,
  ...MTS_DR_FIELDS,
];

export const GROWTH_RATE_DESCRIPTION = 'A per year increase from the baseline year. This is the project start year.';

// Field groupings
export const START_PROJECT_FIELDS = [
  ANALYSIS_HORIZON,
  ANALYSIS_HORIZON_MODE,
  DATA_YEAR,
  DESCRIPTION,
  GRID_LOCATION,
  NAME,
  OUTPUT_DIRECTORY,
  OWNERSHIP,
  START_YEAR,
  TIMESTEP,
];

export const OBJECTIVE_FIELDS = [
  ENERGY_PRICE_SOURCE_WHOLESALE, // not normal
  OPTIMIZATION_HORIZON,
  OPTIMIZATION_HORIZON_NUM,
  SIZING_EQUIPMENT,
  OBJECTIVES_BACKUP_POWER,
  OBJECTIVES_DA,
  OBJECTIVES_DR,
  OBJECTIVES_DEFERRAL,
  OBJECTIVES_FR,
  OBJECTIVES_LF,
  OBJECTIVES_NSR,
  OBJECTIVES_RA,
  OBJECTIVES_RETAIL_ENERGY_CHARGE_REDUCTION,
  OBJECTIVES_RETAIL_DEMAND_CHARGE_REDUCTION,
  OBJECTIVES_RESILIENCE,
  OBJECTIVES_SR,
  OBJECTIVES_USER_DEFINED,
];
export const SITE_INFORMATION_FIELDS = [
  INCLUDE_INTERCONNECTION_CONSTRAINTS,
  MAX_EXPORT,
  MAX_IMPORT,
  TS_SITE_LOAD,
];
export const SYSTEM_INFORMATION_FIELDS = [
  TS_SYSTEM_LOAD,
];
export const BACKUP_FIELDS = [
  MTS_BACKUP_ENERGY_PRICE,
  MTS_BACKUP_ENERGY_RESERVATION,
];
export const DEFERRAL_FIELDS = [
  DEFERRAL_GROWTH,
  DEFERRAL_PLANNED_LOAD_LIMIT,
  DEFERRAL_PRICE,
  DEFERRAL_REVERSE_POWER_FLOW_LIMIT,
  TS_DEFERRAL_LOAD,
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
  MTS_DR_CAPACITY_PRICE,
  MTS_DR_CAPACITY_RESERVATION,
  MTS_DR_ENERGY_PRICE,
  MTS_DR_MONTHS_APPLIED,
];
export const FINANCE_FIELDS = [
  FINANCE_DISCOUNT_RATE,
  FINANCE_FEDERAL_TAX_RATE,
  FINANCE_INFLATION_RATE,
  FINANCE_PROPERTY_TAX_RATE,
  FINANCE_STATE_TAX_RATE,
];

const FUEL_COST_FIELDS = [
  FUEL_PRICE_GAS,
  FUEL_PRICE_LIQUID,
  FUEL_PRICE_OTHER,
];

export const FR_FIELDS = [
  FR_COMBINED_MARKET,
  FR_DURATION,
  FR_ENERGY_PRICE_GROWTH,
  FR_EOU,
  FR_EOD,
  FR_GROWTH,
  TS_FR_PRICE,
  TS_FR_DOWN_PRICE,
  TS_FR_UP_PRICE,
];
export const LF_FIELDS = [
  LF_COMBINED_MARKET,
  LF_DURATION,
  LF_GROWTH,
  LF_ENERGY_PRICE_GROWTH,
  TS_LF_EOU,
  TS_LF_EOD,
  TS_LF_PRICE,
  TS_LF_UP_PRICE,
  TS_LF_DOWN_PRICE,
];
export const NSR_FIELDS = [
  NSR_DURATION,
  NSR_GROWTH,
  TS_NSR_PRICE,
];
export const RESOURCE_ADEQUACY_FIELDS = [
  RA_NUMBER_EVENTS,
  RA_EVENT_LENGTH,
  RA_DISPATCH_MODE,
  RA_EVENT_SELECTION_METHOD,
  RA_GROWTH,
  TS_RA_ACTIVE,
  MTS_RA_CAPACITY_PRICE,
];
export const RESILIENCE_FIELDS = [
  RELIABILITY_MAX_OUTAGE_DURATION,
  RELIABILITY_POST_OPTIMIZATION_ONLY,
  RELIABILITY_TARGET,
  TS_CRITICAL_LOAD,
];
export const SR_FIELDS = [
  SR_DURATION,
  SR_GROWTH,
  TS_SR_PRICE,
];

export const USER_DEFINED_FIELDS = [
  USER_PRICE,
  TS_USER_ENERGY_MAX,
  TS_USER_ENERGY_MIN,
  TS_USER_POWER_EXPORT_MAX,
  TS_USER_POWER_EXPORT_MIN,
  TS_USER_POWER_IMPORT_MAX,
  TS_USER_POWER_IMPORT_MIN,
];

export const DA_FIELDS = [
  DA_GROWTH,
  TS_DA_PRICE,
];

// Probably move this and all field groupings to Application
// TODO remove in favor of PageMetadata
export class FieldListFactory {
  static get(page) {
    if (page === Page.ProjectConfiguration) {
      return START_PROJECT_FIELDS;
    } if (page === Page.Financial) {
      return FINANCE_FIELDS;
    } if (page === Page.FuelCosts) {
      return FUEL_COST_FIELDS;
    } if (page === Page.Objectives) {
      return OBJECTIVE_FIELDS;
    } if (page === Page.ObjectivesBackup) {
      return BACKUP_FIELDS;
    } if (page === Page.ObjectivesDA) {
      return DA_FIELDS;
    } if (page === Page.ObjectivesDR) {
      return DEMAND_RESPONSE_FIELDS;
    } if (page === Page.ObjectivesDeferral) {
      return DEFERRAL_FIELDS;
    } if (page === Page.ObjectivesFR) {
      return FR_FIELDS;
    } if (page === Page.ObjectivesLF) {
      return LF_FIELDS;
    } if (page === Page.ObjectivesNSR) {
      return NSR_FIELDS;
    } if (page === Page.ObjectivesReliabilityTarget) {
      return RESILIENCE_FIELDS;
    } if (page === Page.ObjectivesSiteInformation) {
      return SITE_INFORMATION_FIELDS;
    } if (page === Page.ObjectivesSR) {
      return SR_FIELDS;
    } if (page === Page.ObjectivesSystemInformation) {
      return SYSTEM_INFORMATION_FIELDS;
    } if (page === Page.ObjectivesRA) {
      return RESOURCE_ADEQUACY_FIELDS;
    } if (page === Page.ObjectivesUserDefined) {
      return USER_DEFINED_FIELDS;
    } if (page === Page.Technologies) {
      return [];
    }
    throw Error('Page not found');
  }
}
