import path from 'path';

export const testInputsDirectory = path.join('path', 'to', 'inputs');

export const makeProjectBattery = id => ({
  active: true,
  auxiliaryLoad: 0,
  batteryCycles: [
    { ulimit: 0.05, val: 75000 },
    { ulimit: 0.1, val: 40500 },
    { ulimit: 0.15, val: 27000 },
    { ulimit: 0.2, val: 20250 },
    { ulimit: 0.3, val: 11250 },
    { ulimit: 0.4, val: 6750 },
    { ulimit: 0.5, val: 4500 },
    { ulimit: 0.6, val: 3750 },
    { ulimit: 0.7, val: 3225 },
    { ulimit: 0.8, val: 2813 },
    { ulimit: 0.9, val: 2475 },
    { ulimit: 1, val: 2250 },
  ],
  calendarDegradationRate: 0,
  capitalCost: 0,
  capitalCostPerkW: 800,
  capitalCostPerkWh: 250,
  chargingCapacity: 0,
  complete: true,
  constructionDate: '2017-01-01',
  dailyCycleLimit: 0,
  dischargingCapacity: 0,
  endOfLifeExpenses: 0,
  energyCapacity: 2000,
  fixedOMCosts: 10,
  id,
  includeAuxiliaryLoad: false,
  includeCycleDegradation: false,
  includeStartupCost: false,
  lowerSOCLimit: 0,
  macrsTerm: 3,
  maxDuration: 0,
  name: 'BESS 1',
  operationDate: '2017-01-01',
  powerCapacity: 0,
  roundtripEfficiency: 91,
  selfDischargeRate: 0,
  shouldDiffChargeDischarge: false,
  shouldEnergySize: true,
  shouldLimitDailyCycling: false,
  shouldMaxDuration: false,
  shouldPowerSize: true,
  tag: 'Battery',
  targetSOC: 50,
  technologyType: 'Energy Storage System',
  upperSOCLimit: 100,
  variableOMCosts: 0,
});

export const makeModelParamsBattery = id => ({
  active: 'yes',
  keys: {
    OMexpenses: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    acr: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    ccost: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    ccost_kw: {
      opt_value: '800',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    ccost_kwh: {
      opt_value: '250',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    ch_max_rated: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    ch_min_rated: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    construction_year: {
      opt_value: '2017',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'Period',
    },
    cycle_life_filename: {
      opt_value: path.join(testInputsDirectory, `cycle_${id}.csv`),
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'string',
    },
    daily_cycle_limit: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    decommissioning_cost: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    dis_max_rated: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    dis_min_rated: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    duration_max: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    'ecc%': {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    ene_max_rated: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    expected_lifetime: {
      opt_value: '99',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'int',
    },
    fixedOM: {
      opt_value: '10',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    hp: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    incl_cycle_degrade: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'bool',
    },
    incl_ts_charge_limits: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'bool',
    },
    incl_ts_discharge_limits: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'bool',
    },
    incl_ts_energy_limits: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'bool',
    },
    llsoc: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    macrs_term: {
      opt_value: '3',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    name: {
      opt_value: 'BESS 1',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'string',
    },
    nsr_response_time: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'int',
    },
    operation_year: {
      opt_value: '2017',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'Period',
    },
    p_start_ch: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    p_start_dis: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    rcost: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    rcost_kW: {
      opt_value: '100',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    rcost_kWh: {
      opt_value: '800',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    replaceable: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'bool',
    },
    replacement_construction_time: {
      opt_value: '1',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'int',
    },
    rte: {
      opt_value: '91',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    salvage_value: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'string/int',
    },
    sdr: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    soc_target: {
      opt_value: '50',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    sr_response_time: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'int',
    },
    startup: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'bool',
    },
    startup_time: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'int',
    },
    state_of_health: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    ter: {
      opt_value: '7',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    ulsoc: {
      opt_value: '100',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    user_ch_rated_max: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    user_ch_rated_min: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    user_dis_rated_max: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    user_dis_rated_min: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    user_ene_rated_max: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    user_ene_rated_min: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
    },
    yearly_degrade: {
      opt_value: '0',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'int',
    },
  },
});
