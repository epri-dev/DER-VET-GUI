// TODO use these constants in the router, sidebar, and router-links
// Root routes
export const INDEX = '/';
export const WIZARD_OVERVIEW = '/wizard-overview';
export const WIZARD_COMPONENT = '/wizard-model-components';
export const WIZARD_RUN_CASE = '/wizard-run-case';
export const RESULTS = '/results';

const overview = subPath => `${WIZARD_OVERVIEW}/${subPath}`;
const component = subPath => `${WIZARD_COMPONENT}/${subPath}`;
const runCase = subPath => `${WIZARD_RUN_CASE}/${subPath}`;
const results = subPath => `${RESULTS}/${subPath}`;

// Wizard sub-routes
export const START_PROJECT = overview('start-project');
export const TECH_SPECS = overview('technology-specs');
export const OBJECTIVES = overview('objectives');
export const CAL_ENVIRO_SCREEN = overview('cal-enviro-screen');

export const TECH_SPECS_BATTERY = component('technology-specs-battery');
export const TECH_SPECS_CONTROLLABLE_LOAD = component('technology-specs-controllable-load');
export const TECH_SPECS_DIESEL = component('technology-specs-diesel-gen');
export const TECH_SPECS_FLEET_EV = component('technology-specs-fleet-ev');
export const TECH_SPECS_ICE = component('technology-specs-ice');
export const TECH_SPECS_PV = component('technology-specs-solar-pv');
export const TECH_SPECS_SINGLE_EV = component('technology-specs-single-ev');

export const TECH_SPECS_PV_DATA_GENERATION = component('technology-specs-solar-pv-upload');
export const TECH_SPECS_BATTERY_DATA_CYCLES = component('technology-specs-battery-cycle');
export const TECH_SPECS_CONTROLLABLE_LOAD_DATA_UPLOAD = component('technology-specs-controllable-load-upload');
export const TECH_SPECS_FLEET_EV_BASELINE = component('technology-specs-fleet-ev-baseline-upload');

export const FINANCIAL_INPUTS_MISCELLANEOUS = component('financial-inputs-miscellaneous');
export const FINANCIAL_INPUTS_EXTERNAL_INCENTIVES = component('financial-inputs-external-incentives');
export const FINANCIAL_INPUTS_RETAIL_TARIFF = component('financial-inputs-retail-tariff');
export const FINANCIAL_INPUTS_RETAIL_TARIFF_IMPORT = component('financial-inputs-retail-tariff-import');
export const FINANCIAL_INPUTS_RETAIL_TARIFF_BILLING_PERIOD = component('financial-inputs-retail-tariff-billing-period');

export const OBJECTIVES_BACKUP_POWER = component('objectives-parameters-backup');
export const OBJECTIVES_DR = component('objectives-parameters-dr');
export const OBJECTIVES_SITE_INFORMATION = component('objectives-parameters-site-information');
export const OBJECTIVES_SYSTEM_INFORMATION = component('objectives-parameters-system-information');
export const OBJECTIVES_DEFERRAL = component('objectives-parameters-deferral');
export const OBJECTIVES_FR = component('objectives-parameters-fr');
export const OBJECTIVES_LF = component('objectives-parameters-lf');
export const OBJECTIVES_NSR = component('objectives-parameters-nsr');
export const OBJECTIVES_RA = component('objectives-parameters-ra');
export const OBJECTIVES_RESILIENCE = component('objectives-parameters-reliability');
export const OBJECTIVES_SR = component('objectives-parameters-sr');
export const OBJECTIVES_USER_DEFINED = component('objectives-parameters-user-defined');
export const OBJECTIVES_DA = component('objectives-parameters-da');
export const SENSITIVITY_ANALYSIS = component('sensitivity-analysis');

export const SUMMARY = runCase('summary');
export const RUN_ANALYSIS = runCase('run-analysis');

// Results sub-routes
export const RESULTS_DESIGN = results('design');
export const RESULTS_RELIABILITY = results('reliability');
export const RESULTS_DEFERRAL = results('deferral');
export const RESULTS_DISPATCH = results('dispatch');
export const RESULTS_FINANCIAL = results('financial');
