import path from 'path';
import { testInputsDirectory } from './ProjectDtoProjectFixtures';

export const makeModelParamsBackup = {
  '': {
    active: 'yes',
    keys: {},
  },
};

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
    cycle_life_table_eol_condition: {
      opt_value: '80',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'float',
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
      type: 'float',
    },
  },
});

export const makeModelParamsControllableLoad = id => ({
  [id]: {
    active: 'yes',
    keys: {
      construction_year: {
        opt_value: '2017',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'Period',
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
      duration: {
        opt_value: '2',
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
      expected_lifetime: {
        opt_value: '7',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      name: {
        opt_value: 'demand response',
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
        opt_value: '2018',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'Period',
      },
      power_rating: {
        opt_value: '100',
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
      salvage_value: {
        opt_value: 'Sunk Cost',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string/int',
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
      startup_time: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
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
    },
  },
});

export const makeModelParamsDR = {
  '': {
    active: 'yes',
    keys: {
      day_ahead: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
      days: {
        opt_value: '8',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      growth: {
        opt_value: '1.47',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      length: {
        opt_value: 'nan',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string/int',
      },
      program_end_hour: {
        opt_value: '24',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string/int',
      },
      program_start_hour: {
        opt_value: '10',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      weekend: {
        opt_value: '1',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
    },
  },
};

export const makeModelParamsElectricVehicle1 = id => ({
  [id]: {
    active: 'yes',
    keys: {
      ccost: {
        opt_value: '800',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      ch_max_rated: {
        opt_value: '600',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      ch_min_rated: {
        opt_value: '125',
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
      decommissioning_cost: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      ene_target: {
        opt_value: '50',
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
      expected_lifetime: {
        opt_value: '7',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      fixed_om: {
        opt_value: '50',
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
        opt_value: 'single ev',
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
        opt_value: '2018',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'Period',
      },
      plugin_time: {
        opt_value: '14',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      plugout_time: {
        opt_value: '20',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      rcost: {
        opt_value: '250',
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
      salvage_value: {
        opt_value: 'Sunk Cost',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string/int',
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
      startup_time: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
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
    },
  },
});

export const makeModelParamsElectricVehicle2 = id => ({
  [id]: {
    active: 'yes',
    keys: {
      ccost: {
        opt_value: '600',
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
      decommissioning_cost: {
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
      expected_lifetime: {
        opt_value: '7',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      fixed_om: {
        opt_value: '100',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      lost_load_cost: {
        opt_value: '60',
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
      max_load_ctrl: {
        opt_value: '20',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      name: {
        opt_value: 'fleet ev',
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
        opt_value: '2018',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'Period',
      },
      rcost: {
        opt_value: '500',
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
      salvage_value: {
        opt_value: 'Sunk Cost',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string/int',
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
      startup_time: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
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
    },
  },
});

export const makeModelParamsIceDiesel = id => ({
  [id]: {
    active: 'yes',
    keys: {
      ccost: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      ccost_kW: {
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
      decommissioning_cost: {
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
      efficiency: {
        opt_value: '0.15',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      expected_lifetime: {
        opt_value: '13',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      fixed_om_cost: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      fuel_cost: {
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
      max_rated_capacity: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      min_power: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      min_rated_capacity: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      n: {
        opt_value: '2',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      name: {
        opt_value: 'gen',
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
      rated_capacity: {
        opt_value: '4000',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      rcost: {
        opt_value: '200',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      rcost_kW: {
        opt_value: '200',
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
      salvage_value: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string/int',
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
      startup_time: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
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
      variable_om_cost: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
    },
  },
});

export const makeModelParamsLF = {
  '': {
    active: 'yes',
    keys: {
      CombinedMarket: {
        opt_value: '1',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
      d_ts_constraints: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
      duration: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      energyprice_growth: {
        opt_value: '1.5',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      growth: {
        opt_value: '2',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      u_ts_constraints: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
    },
  },
};

export const makeModelParamsPV = id => ({
  [id]: {
    active: 'yes',
    keys: {
      PPA: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
      PPA_cost: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      PPA_inflation_rate: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      ccost_kW: {
        opt_value: '1660',
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
      curtail: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
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
      'ecc%': {
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
      fixed_om_cost: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      gamma: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      grid_charge: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
      grid_charge_penalty: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
      growth: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      inv_max: {
        opt_value: '1000000000',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      loc: {
        opt_value: 'AC',
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
      max_rated_capacity: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
      min_rated_capacity: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
      name: {
        opt_value: 'Installation 1',
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
      nu: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
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
      rated_capacity: {
        opt_value: '1000',
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
      salvage_value: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string/int',
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
      startup_time: {
        opt_value: '0',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
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
    },
  },
});

export const makeModelParamsRA = {
  '': {
    active: 'yes',
    keys: {
      days: {
        opt_value: '24',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
      dispmode: {
        opt_value: '1',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'bool',
      },
      growth: {
        opt_value: '0.86',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'float',
      },
      idmode: {
        opt_value: 'Peak by Year',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string',
      },
      length: {
        opt_value: '6',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'int',
      },
    },
  },
};

export const makeModelParamsResults = resultsDir => ({
  '': {
    active: 'yes',
    keys: {
      dir_absolute_path: {
        opt_value: resultsDir,
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string',
      },
      errors_log_path: {
        opt_value: resultsDir,
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string',
      },
      label: {
        opt_value: '',
        sensitivity: {
          active: 'no',
          coupled: 'None',
          value: 'nan',
        },
        type: 'string',
      },
    },
  },
});
