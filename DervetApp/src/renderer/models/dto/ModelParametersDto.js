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

export const convertToYesNo = condition => (condition ? YES : NO);

export const convertToOneZero = condition => (condition ? ONE : ZERO);

export const convertDateToYear = dateString => (new Date(dateString)).getFullYear();

export const calculateEndYear = (startYear, analysisHorizon) => (
  (Number(startYear) + Number(analysisHorizon)).toString()
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
      cycle_life_filename: makeBaseKey('./inputs/000-001-cycle.csv', STRING), // TODO LL: generate file
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
    customer_tariff_filename: makeBaseKey('./inputs/000-001-tariff.csv', STRING), // TODO generate file
    external_incentives: makeBaseKey(externalIncentivesExist, BOOL),
    federal_tax_rate: makeBaseKey(project.federalTaxRate, FLOAT),
    inflation_rate: makeBaseKey(project.inflationRate, FLOAT),
    npv_discount_rate: makeBaseKey(project.discountRate, FLOAT),
    property_tax_rate: makeBaseKey(project.propertyTaxRate, FLOAT),
    state_tax_rate: makeBaseKey(project.stateTaxRate, FLOAT),
    yearly_data_filename: makeBaseKey('./inputs/000-001-yearly.csv', STRING), // TODO generate file
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
    monthly_data_filename: makeBaseKey('./inputs/000-001-monthly.csv', STRING), // TODO LL generate file
    n: makeBaseKey(project.optimizationHorizon, STRING_INT), // TODO optimizationHorizonNum if hrs
    opt_years: makeBaseKey(project.dataYear, LIST_INT),
    ownership: makeBaseKey(project.ownership.toLowerCase(), STRING),
    slack: makeBaseKey(ZERO, BOOL), // TODO: hardcoded in old GUI
    start_year: makeBaseKey(project.startYear, PERIOD),
    time_series_filename: makeBaseKey('./inputs/000-001-timeseries.csv', STRING), // TODO LL generate file
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
