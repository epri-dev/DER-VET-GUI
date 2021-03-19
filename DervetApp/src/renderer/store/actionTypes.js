// TODO use these constants in Results, Project, CalenvironScreen, and Appilcation

// Aplication mutations
export const APPLICATION = 'Application';
export const SET_COMPLETENESS = 'setCompleteness';
export const SET_ERROR_LIST = 'setErrorList';
export const RECEIVE_ERROR = 'receiveError';
export const RESULTS_RECEIVED = 'resultRecieved';
export const SET_QUICK_START_ERROR_LIST = 'setQuickStartErrorList';
export const RESET_APPLICATION_TO_DEFAULT = 'resetApplicationToDefault';

// Project actions
// index page
export const RESET_PROJECT_TO_DEFAULT = 'resetProjectToDefault';
export const LOAD_QUICK_START_PROJECT = 'loadQuickStartProject';
export const LOAD_NEW_PROJECT = 'loadNewProject';
// back up
export const SET_BACKUP_ENERGY_PRICE = 'setBackupPrice';
export const SET_BACKUP_ENERGY_RESERVATION = 'setBackupEnergy';
// battery page
export const REPLACE_TECHNOLOGY_SPECS_BATTERY = 'replaceTechnologySpecsBattery';
// battery cycle page
export const ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY = 'addBatteryCyclesToTechnologySpecsBattery';
// controllable load page
export const REPLACE_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD = 'replaceTechnologySpecsControllableLoad';
// controllable load upload page
export const ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD = 'addLoadProfileToTechnologySpecsControllableLoad';
// DA page
export const SET_DA_GROWTH = 'setDAGrowth';
export const SET_DA_PRICE = 'setDAPrice';
// Demand response page
export const SET_DR_NUMBER_EVENTS = 'setDRNumberEvents';
export const SET_DR_INCLUDE_WEEKENDS = 'setDRIncludeWeekends';
export const SET_DR_START_HOUR = 'setDRStartHour';
export const SET_DR_END_HOUR = 'setDREndHour';
export const SET_DR_END_MODE = 'setDREndMode';
export const SET_DR_EVENT_LENGTH = 'setDREventLength';
export const SET_DR_PROGRAM_TYPE = 'setDRProgramType';
export const SET_DR_APPLIED_MONTHS = 'setDRAppliedMonths';
export const SET_DR_APPLIED_MONTHS_LABELS = 'setDRAppliedMonthsLabels';
export const SET_DR_CAPACITY_RESERVATION = 'setDRCapacityReservation';
export const SET_DR_CAPACITY_PRICE = 'setDRCapacityPrice';
export const SET_DR_ENERGY_PRICE = 'setDREnergyPrice';
export const SET_DR_GROWTH = 'setDRGrowth';
// deferral page
export const SET_DEFERRAL_GROWTH = 'setDeferralGrowth';
export const SET_DEFERRAL_PRICE = 'setDeferralPrice';
export const SET_DEFERRAL_PLANNED_LOAD_LIMIT = 'setDeferralPlannedLoadLimit';
export const SET_DEFERRAL_LOAD = 'setDeferralLoad';
export const SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT = 'setDeferralReversePowerFlowLimit';
// diesel gen
export const REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN = 'replaceTechnologySpecsDieselGen';
// fleet EV
export const REPLACE_TECHNOLOGY_SPECS_FLEET_EV = 'replaceTechnologySpecsFleetEV';
// fleet ev upload page
export const ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_FLEET_EV = 'addLoadProfileToTechnologySpecsFleetEV';
// External incentives file
export const ADD_EXTERNAL_INCENTIVE = 'addExternalIncentive';
export const REPLACE_EXTERNAL_INCENTIVES = 'replaceExternalIncentives';
// Frequency Regulation
export const SET_FR_COMBINED_MARKET = 'setFRCombinedMarket';
export const SET_FR_DOWN_PRICE = 'setFRDownPrice';
export const SET_FR_DURATION = 'setFRDuration';
export const SET_FR_ENERGY_PRICE_GROWTH = 'setFREnergyPriceGrowth';
export const SET_FR_EOU = 'setFReou';
export const SET_FR_EOD = 'setFReod';
export const SET_FR_GROWTH = 'setFRGrowth';
export const SET_FR_PRICE = 'setFRPrice';
export const SET_FR_UP_PRICE = 'setFRUpPrice';
// load following page
export const SET_LF_COMBINED_MARKET = 'setLFCombinedMarket';
export const SET_LF_DOWN_PRICE = 'setLFDownPrice';
export const SET_LF_DURATION = 'setLFDuration';
export const SET_LF_EOU = 'setLFeou';
export const SET_LF_EOD = 'setLFeod';
export const SET_LF_PRICE = 'setLFPrice';
export const SET_LF_UP_PRICE = 'setLFUpPrice';
export const SET_LF_GROWTH = 'setLFGrowth';
export const SET_LF_ENERGY_PRICE_GROWTH = 'setLFEnergyPriceGrowth';
// nsr page
export const SET_NSR_DURATION = 'setNSRDuration';
export const SET_NSR_GROWTH = 'setNSRGrowth';
export const SET_NSR_PRICE = 'setNSRPrice';
// objectives
export const CHOOSE_ENERGY_STRUCTURE = 'chooseEnergyStructure';
export const SET_INCLUDE_SITE_LOAD = 'setIncludeSiteLoad';
export const SET_INCLUDE_SYSTEM_LOAD = 'setIncludeSystemLoad';
export const SET_OPTIMIZATION_HORIZON = 'setOptimizationHorizon';
export const SET_OPTIMIZATION_HORIZON_NUM = 'setOptimizationHorizonNum';
export const SET_SIZING_EQUIPMENT = 'setSizingEquipment';
export const SELECT_OTHER_SERVICES = 'selectOtherServices';
// reliability page
export const SET_CRITICAL_LOAD = 'setCriticalLoad';
export const SET_RELIABILITY_MAX_OUTAGE_DURATION = 'setReliabilityMaxOutageDuration';
export const SET_RELIABILITY_POST_OPTIMIZATION_ONLY = 'setReliabilityPostOptimizationOnly';
export const SET_RELIABILITY_TARGET = 'setReliabilityTarget';
// resource adequacy
export const SET_RA_ACTIVE = 'setRAActive';
export const SET_RA_CAPACITY_PRICE = 'setRACapacityPrice';
export const SET_RA_DISPATCH_MODE = 'setRADispatchMode';
export const SET_RA_EVENT_LENGTH = 'setRAEventLength';
export const SET_RA_EVENT_SELECTION_METHOD = 'setRAEventSelectionMethod';
export const SET_RA_NUMBER_EVENTS = 'setRANumberEvents';
export const SET_RA_GROWTH = 'setRAGrowth';
// single EV
export const REPLACE_TECHNOLOGY_SPECS_SINGLE_EV = 'replaceTechnologySpecsSingleEV';
// site information
export const SET_INCLUDE_POI_CONSTRAINTS = 'setIncludePOIConstraints';
export const SET_MAX_IMPORT_FROM_GRID = 'setMaxImportFromGrid';
export const SET_MAX_EXPORT_TO_GRID = 'setMaxExportToGrid';
export const SET_SITE_LOAD = 'setSiteLoad';
// sr page
export const SET_SR_DURATION = 'setSRDuration';
export const SET_SR_GROWTH = 'setSRGrowth';
export const SET_SR_PRICE = 'setSRPrice';
// system load
export const SET_SYSTEM_LOAD = 'setSystemLoad';
// technology spec page
export const ACTIVATE_TECH = 'activateTech';
export const ADD_TECH = 'addTech';
export const DEACTIVATE_TECH = 'deactivateTech';
export const MAKE_LIST_OF_ACTIVE_TECHNOLOGIES = 'makeListOfActiveTechnologies';
export const REPLACE_LIST_FIELD = 'replaceListField';
export const REMOVE_TECH = 'removeTech';
// technology timeseries
export const ADD_GENERATION_PROFILE_TO_TECHNOLOGY_SPECS_PV = 'addGenerationProfileToTechnologySpecsPV';
// timeseries uploads
export const SET_TS_ERROR = 'setTSError';
export const SET_TS_REQUIRED = 'setTSRequired';
// user defined service
export const SET_USER_ENERGY_MAX = 'setUserEnergyMax';
export const SET_USER_ENERGY_MIN = 'setUserEnergyMin';
export const SET_USER_POWER_EXPORT_MAX = 'setUserPowerExportMax';
export const SET_USER_POWER_EXPORT_MIN = 'setUserPowerExportMin';
export const SET_USER_POWER_IMPORT_MAX = 'setUserPowerImportMax';
export const SET_USER_POWER_IMPORT_MIN = 'setUserPowerImportMin';
export const SET_USER_PRICE = 'setUserPrice';
// financial
export const ADD_RETAIL_TARIFF_BILLING_PERIOD = 'addRetailTariffBillingPeriod';
export const ADD_MANY_RETAIL_TARIFF_BILLING_PERIODS = 'addManyRetailTariffBillingPeriods';
export const REPLACE_RETAIL_TARIFF_BILLING_PERIODS = 'replaceRetailTariffBillingPeriods';
export const REPLACE_RETAIL_TARIFF_FILE_IMPORT_NOTES = 'replaceRetailTariffFileImportNotes';
export const REMOVE_RETAIL_TARIFF_BILLING_PERIOD = 'removeRetailTariffBillingPeriod';
export const REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS = 'removeAllRetailTariffBillingPeriods';
