// TODO use these constants in Results, Project, CalenvironScreen, and Appilcation

// Aplication mutations
export const APPLICATION = 'Application';
export const SET_COMPLETENESS = 'SET_COMPLETENESS';
export const SET_ERROR_LIST = 'SET_ERROR_LIST';
export const SET_RUN_IN_PROGRESS = 'SET_RUN_IN_PROGRESS';
export const SET_RUN_NOT_IN_PROGRESS = 'SET_RUN_NOT_IN_PROGRESS';
export const SET_RESULT_SUCCESS = 'SET_RESULT_SUCCESS';
export const SET_RESULT_ERROR = 'SET_RESULT_ERROR';
export const SET_NEW_ERROR_LIST = 'SET_NEW_ERROR_LIST';

// Project mutations
// index page
export const RESET_PROJECT_TO_DEFAULT = 'RESET_PROJECT_TO_DEFAULT';
export const LOAD_NEW_PROJECT = 'LOAD_NEW_PROJECT';
export const LOAD_QUICK_START_PROJECT = 'LOAD_QUICK_START_PROJECT';
// backup
export const SET_BACKUP_PRICE = 'SET_BACKUP_PRICE';
export const SET_BACKUP_ENERGY = 'SET_BACKUP_ENERGY';
// battery page
export const REPLACE_TECHNOLOGY_SPECS_BATTERY = 'REPLACE_TECHNOLOGY_SPECS_BATTERY';
// battery cycle page
export const ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY = 'ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY';
// controllable load page
export const REPLACE_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD = 'REPLACE_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD';
// controllable load upload page
export const ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD = 'ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD';
// DA page
export const SET_DA_GROWTH = 'SET_DA_GROWTH';
export const SET_DA_PRICE = 'SET_DA_PRICE';
// Demand response page
export const SET_DR_NUMBER_EVENTS = 'SET_DR_NUMBER_EVENTS';
export const SET_DR_INCLUDE_WEEKENDS = 'SET_DR_INCLUDE_WEEKENDS';
export const SET_DR_START_HOUR = 'SET_DR_START_HOUR';
export const SET_DR_END_HOUR = 'SET_DR_END_HOUR';
export const SET_DR_END_MODE = 'SET_DR_END_MODE';
export const SET_DR_EVENT_LENGTH = 'SET_DR_EVENT_LENGTH';
export const SET_DR_PROGRAM_TYPE = 'SET_DR_PROGRAM_TYPE';
export const SET_DR_APPLIED_MONTHS = 'SET_DR_APPLIED_MONTHS';
export const SET_DR_APPLIED_MONTHS_LABELS = 'SET_DR_APPLIED_MONTHS_LABELS';
export const SET_DR_CAPACITY_RESERVATION = 'SET_DR_CAPACITY_RESERVATION';
export const SET_DR_CAPACITY_AWARDS = 'SET_DR_CAPACITY_AWARDS';
export const SET_DR_ENERGY_AWARDS = 'SET_DR_ENERGY_AWARDS';
export const SET_DR_GROWTH = 'SET_DR_GROWTH';
// deferral page
export const SET_DEFERRAL_GROWTH = 'SET_DEFERRAL_GROWTH';
export const SET_DEFERRAL_PRICE = 'SET_DEFERRAL_PRICE';
export const SET_DEFERRAL_PLANNED_LOAD_LIMIT = 'SET_DEFERRAL_PLANNED_LOAD_LIMIT';
export const SET_DEFERRAL_LOAD = 'SET_DEFERRAL_LOAD';
export const SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT = 'SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT';
// diesel gen page
export const REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN = 'REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN';
// fleet ev page
export const REPLACE_TECHNOLOGY_SPECS_FLEET_EV = 'REPLACE_TECHNOLOGY_SPECS_FLEET_EV';
// fleet ev upload page
export const ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_FLEET_EV = 'ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_FLEET_EV';
// External incentives file
export const ADD_EXTERNAL_INCENTIVE = 'ADD_EXTERNAL_INCENTIVE';
export const REPLACE_EXTERNAL_INCENTIVES = 'REPLACE_EXTERNAL_INCENTIVES';
// Frequency Regulation
export const SET_FR_COMBINED_MARKET = 'SET_FR_COMBINED_MARKET';
export const SET_FR_DOWN_PRICE = 'SET_FR_DOWN_PRICE';
export const SET_FR_DURATION = 'SET_FR_DURATION';
export const SET_FR_ENERGY_GROWTH = 'SET_FR_ENERGY_GROWTH';
export const SET_FR_EOU = 'SET_FR_EOU';
export const SET_FR_EOD = 'SET_FR_EOD';
export const SET_FR_GROWTH = 'SET_FR_GROWTH';
export const SET_FR_PRICE = 'SET_FR_PRICE';
export const SET_FR_UP_PRICE = 'SET_FR_UP_PRICE';
// load following page
export const SET_LF_COMBINED_MARKET = 'SET_LF_COMBINED_MARKET';
export const SET_LF_DOWN_PRICE = 'SET_LF_DOWN_PRICE';
export const SET_LF_DURATION = 'SET_LF_DURATION';
export const SET_LF_EOU = 'SET_LF_EOU';
export const SET_LF_EOD = 'SET_LF_EOD';
export const SET_LF_PRICE = 'SET_LF_PRICE';
export const SET_LF_UP_PRICE = 'SET_LF_UP_PRICE';
export const SET_LF_GROWTH = 'SET_LF_GROWTH';
export const SET_LF_ENERGY_GROWTH = 'SET_LF_ENERGY_GROWTH';
// nsr page
export const SET_NSR_DURATION = 'SET_NSR_DURATION';
export const SET_NSR_GROWTH = 'SET_NSR_GROWTH';
export const SET_NSR_PRICE = 'SET_NSR_PRICE';
// objectives
export const CHOOSE_ENERGY_STRUCTURE = 'CHOOSE_ENERGY_STRUCTURE';
export const SET_INCLUDE_SITE_LOAD = 'SET_INCLUDE_SITE_LOAD';
export const SET_INCLUDE_SYSTEM_LOAD = 'SET_INCLUDE_SYSTEM_LOAD';
export const SET_OPTIMIZATION_HORIZON = 'SET_OPTIMIZATION_HORIZON';
export const SET_OPTIMIZATION_HORIZON_NUM = 'SET_OPTIMIZATION_HORIZON_NUM';
export const SET_SIZING_EQUIPMENT = 'SET_SIZING_EQUIPMENT';
export const SELECT_OTHER_SERVICES = 'SELECT_OTHER_SERVICES';
// resource adequacy
export const SET_RA_ACTIVE = 'SET_RA_ACTIVE';
export const SET_RA_CAPACITY_PRICE = 'SET_RA_CAPACITY_PRICE';
export const SET_RA_DISPATCH_MODE = 'SET_RA_DISPATCH_MODE';
export const SET_RA_EVENT_LENGTH = 'SET_RA_EVENT_LENGTH';
export const SET_RA_EVENT_SELECTION_METHOD = 'SET_RA_EVENT_SELECTION_METHOD';
export const SET_RA_NUMBER_EVENTS = 'SET_RA_NUMBER_EVENTS';
export const SET_RA_GROWTH = 'SET_RA_GROWTH';
// site information
export const SET_INCLUDE_POI_CONSTRAINTS = 'SET_INCLUDE_POI_CONSTRAINTS';
export const SET_MAX_IMPORT_FROM_GRID = 'SET_MAX_IMPORT_FROM_GRID';
export const SET_MAX_EXPORT_TO_GRID = 'SET_MAX_EXPORT_TO_GRID';
export const SET_SITE_LOAD = 'SET_SITE_LOAD';
// sr page
export const SET_SR_DURATION = 'SET_SR_DURATION';
export const SET_SR_GROWTH = 'SET_SR_GROWTH';
export const SET_SR_PRICE = 'SET_SR_PRICE';
// system load
export const SET_SYSTEM_LOAD = 'SET_SYSTEM_LOAD';
// technology spec page
export const ACTIVATE_TECH_BATTERY = 'ACTIVATE_TECH_BATTERY';
export const ACTIVATE_TECH_CONTROLLABLE_LOAD = 'ACTIVATE_TECH_CONTROLLABLE_LOAD';
export const ACTIVATE_TECH_DIESEL_GEN = 'ACTIVATE_TECH_DIESEL_GEN';
export const ACTIVATE_TECH_FLEET_EV = 'ACTIVATE_TECH_FLEET_EV';
export const ACTIVATE_TECH_ICE = 'ACTIVATE_TECH_ICE';
export const ACTIVATE_TECH_SINGLE_EV = 'ACTIVATE_TECH_SINGLE_EV';
export const ACTIVATE_TECH_SOLAR_PV = 'ACTIVATE_TECH_SOLAR_PV';
export const ADD_TECHNOLOGY_SPECS_BATTERY = 'ADD_TECHNOLOGY_SPECS_BATTERY';
export const ADD_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD = 'ADD_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD';
export const ADD_TECHNOLOGY_SPECS_DIESEL_GEN = 'ADD_TECHNOLOGY_SPECS_DIESEL_GEN';
export const ADD_TECHNOLOGY_SPECS_FLEET_EV = 'ADD_TECHNOLOGY_SPECS_FLEET_EV';
export const ADD_TECHNOLOGY_SPECS_ICE = 'ADD_TECHNOLOGY_SPECS_ICE';
export const ADD_TECHNOLOGY_SPECS_SINGLE_EV = 'ADD_TECHNOLOGY_SPECS_SINGLE_EV';
export const ADD_TECHNOLOGY_SPECS_SOLAR_PV = 'ADD_TECHNOLOGY_SPECS_SOLAR_PV';
export const ADD_TO_LIST_OF_ACTIVE_TECHNOLOGIES = 'ADD_TO_LIST_OF_ACTIVE_TECHNOLOGIES';
export const DEACTIVATE_TECH_BATTERY = 'DEACTIVATE_TECH_BATTERY';
export const DEACTIVATE_TECH_CONTROLLABLE_LOAD = 'DEACTIVATE_TECH_CONTROLLABLE_LOAD';
export const DEACTIVATE_TECH_DIESEL_GEN = 'DEACTIVATE_TECH_DIESEL_GEN';
export const DEACTIVATE_TECH_FLEET_EV = 'DEACTIVATE_TECH_FLEET_EV';
export const DEACTIVATE_TECH_ICE = 'DEACTIVATE_TECH_ICE';
export const DEACTIVATE_TECH_SINGLE_EV = 'DEACTIVATE_TECH_SINGLE_EV';
export const DEACTIVATE_TECH_SOLAR_PV = 'DEACTIVATE_TECH_SOLAR_PV';
export const REMOVE_TECH_BATTERY = 'REMOVE_TECH_BATTERY';
export const REMOVE_TECH_CONTROLLABLE_LOAD = 'REMOVE_TECH_CONTROLLABLE_LOAD';
export const REMOVE_TECH_DIESEL_GEN = 'REMOVE_TECH_DIESEL_GEN';
export const REMOVE_TECH_FLEET_EV = 'REMOVE_TECH_FLEET_EV';
export const REMOVE_TECH_ICE = 'REMOVE_TECH_ICE';
export const REMOVE_TECH_SINGLE_EV = 'REMOVE_TECH_SINGLE_EV';
export const REMOVE_TECH_SOLAR_PV = 'REMOVE_TECH_SOLAR_PV';
export const REPLACE_LIST_FIELD = 'REPLACE_LIST_FIELD';
export const RESET_LIST_OF_ACTIVE_TECHNOLOGIES = 'RESET_LIST_OF_ACTIVE_TECHNOLOGIES';
// user defined service
export const SET_USER_ENERGY_MAX = 'SET_USER_ENERGY_MAX';
export const SET_USER_ENERGY_MIN = 'SET_USER_ENERGY_MIN';
export const SET_USER_POWER_MAX = 'SET_USER_POWER_MAX';
export const SET_USER_POWER_MIN = 'SET_USER_POWER_MIN';
export const SET_USER_PRICE = 'SET_USER_PRICE';
