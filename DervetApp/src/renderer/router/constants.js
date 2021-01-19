// TODO use these constants in the router, sidebar, and router-links
// Root routes
export const INDEX_PATH = '/';
export const WIZARD_START_PATH = '/wizard-overview';
export const WIZARD_COMPONENT_PATH = '/wizard-model-components';
export const WIZARD_RUN_CASE_PATH = '/wizard-run-case';
export const RESULTS_PATH = '/results';

// Wizard sub-routes
export const START_PROJECT_PATH = `${WIZARD_START_PATH}/start-project`;
export const TECH_SPECS_PATH = `${WIZARD_START_PATH}/technology-specs`;
export const OBJECTIVES_PATH = `${WIZARD_START_PATH}/objectives`;
export const CAL_ENVIRO_SCREEN_PATH = `${WIZARD_START_PATH}/cal-enviro-screen`;

export const TECH_SPECS_BATTERY_PATH = `${WIZARD_COMPONENT_PATH}/technology-specs-battery`;
export const TECH_SPECS_CONTROLLABLE_LOAD_PATH = `${WIZARD_COMPONENT_PATH}/technology-specs-controllable-load`;
export const TECH_SPECS_DIESEL_PATH = `${WIZARD_COMPONENT_PATH}/technology-specs-diesel-gen`;
export const TECH_SPECS_HOME_EV_PATH = `${WIZARD_COMPONENT_PATH}/technology-specs-home-ev`;
export const TECH_SPECS_ICE_PATH = `${WIZARD_COMPONENT_PATH}/technology-specs-ice`;
export const TECH_SPECS_PV_PATH = `${WIZARD_COMPONENT_PATH}/technology-specs-solar-pv`;
export const TECH_SPECS_SINGLE_EV_PATH = `${WIZARD_COMPONENT_PATH}/technology-specs-single-ev`;

export const TECH_SPECS_PV_DATA_GENERATION_PATH = `${WIZARD_COMPONENT_PATH}/technology-specs-solar-pv-upload`;
export const TECH_SPECS_BATTERY_DATA_CYCLES_PATH = `${WIZARD_COMPONENT_PATH}/technology-specs-battery-cycle`;

export const FINANCIAL_INPUTS_PATH = `${WIZARD_COMPONENT_PATH}/financial-inputs`;
export const FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH = `${WIZARD_COMPONENT_PATH}/financial-inputs-external-incentives`;
export const FINANCIAL_INPUTS_RETAIL_TARIFF_PATH = `${WIZARD_COMPONENT_PATH}/financial-inputs-retail-tariff`;
export const OBJECTIVES_BACKUP_POWER_PATH = `${WIZARD_COMPONENT_PATH}/objectives-backup-power`;
export const OBJECTIVES_SITE_INFORMATION_PATH = `${WIZARD_COMPONENT_PATH}/objectives-parameters-site-information`;
export const OBJECTIVES_DEFERRAL_PATH = `${WIZARD_COMPONENT_PATH}/objectives-parameters-deferral`;
export const OBJECTIVES_FR_PATH = `${WIZARD_COMPONENT_PATH}/objectives-parameters-fr`;
export const OBJECTIVES_NSR_PATH = `${WIZARD_COMPONENT_PATH}/objectives-parameters-nsr`;
export const OBJECTIVES_RESILIENCE_PATH = `${WIZARD_COMPONENT_PATH}/objectives-parameters-reliability`;
export const OBJECTIVES_SR_PATH = `${WIZARD_COMPONENT_PATH}/objectives-parameters-sr`;
export const OBJECTIVES_USER_DEFINED_PATH = `${WIZARD_COMPONENT_PATH}/objectives-parameters-user-defined`;
export const OBJECTIVES_DA_PATH = `${WIZARD_COMPONENT_PATH}/objectives-parameters-da`;
export const SENSITIVITY_ANALYSIS_PATH = `${WIZARD_COMPONENT_PATH}/sensitivity-analysis`;

export const SUMMARY_PATH = `${WIZARD_RUN_CASE_PATH}/summary`;
export const RUN_ANALYSIS_PATH = `${WIZARD_RUN_CASE_PATH}/run-analysis`;
// Results sub-routes
export const RESULTS_DESIGN_PATH = `${RESULTS_PATH}/design`;
export const RESULTS_RELIABILITY_PATH = `${RESULTS_PATH}/reliability`;
export const RESULTS_DEFERRAL_PATH = `${RESULTS_PATH}/deferral`;
export const RESULTS_DISPATCH_PATH = `${RESULTS_PATH}/dispatch`;
export const RESULTS_FINANCIAL_PATH = `${RESULTS_PATH}/financial`;
