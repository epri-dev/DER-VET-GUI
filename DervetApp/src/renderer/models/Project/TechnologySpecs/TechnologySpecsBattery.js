import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/Fields';

const Battery = 'Battery';

// TODO parse these from schema ?
const ENERGY_SIZING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Have DER-VET size the Energy Capacity',
  },
  {
    value: false,
    label: 'Known size',
  },
];
const POWER_SIZING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Have DER-VET size the Power Capacity',
  },
  {
    value: false,
    label: 'Known size',
  },
];
const MAX_DURATION_SIZING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];
const DIFF_CHARGE_DISCHARGE_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];
const LIMIT_DAILY_CYCLING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];
const AUXILIARY_LOAD_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];
const STARTUP_COST_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];
const CYCLE_DEGRADATION_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];
const MACRS_TERM_ALLOWED_VALUES = [
  {
    value: null,
    label: '-',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 15,
    label: '15',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 27.5,
    label: '27.5',
  },
  {
    value: 39,
    label: '39',
  },
];

const DYNAMIC_FIELDS = [
  'auxiliaryLoad',
  'calendarDegradationRate',
  'capitalCost',
  'capitalCostPerkW',
  'capitalCostPerkWh',
  'chargingCapacity',
  'constructionDate',
  'dailyCycleLimit',
  'dischargingCapacity',
  'endOfLifeExpenses',
  'energyCapacity',
  'fixedOMCosts',
  'name',
  'includeAuxiliaryLoad',
  'includeCycleDegradation',
  'includeStartupCost',
  'lowerSOCLimit',
  'macrsTerm',
  'maxDuration',
  'operationDate',
  'powerCapacity',
  'roundtripEfficiency',
  'selfDischargeRate',
  'shouldDiffChargeDischarge',
  'shouldEnergySize',
  'shouldLimitDailyCycling',
  'shouldMaxDuration',
  'shouldPowerSize',
  'targetSOC',
  'upperSOCLimit',
  'variableOMCosts',
];

export default class TechnologySpecsBatteryMetadata {
  // TODO: refactor to use typescript interface + Object.assign(this, args);
  constructor(args) {
    this.auxiliaryLoad = args.auxiliaryLoad;
    this.calendarDegradationRate = args.calendarDegradationRate;
    this.capitalCost = args.capitalCost;
    this.capitalCostPerkW = args.capitalCostPerkW;
    this.capitalCostPerkWh = args.capitalCostPerkWh;
    this.chargingCapacity = args.chargingCapacity;
    this.constructionDate = args.constructionDate;
    this.dailyCycleLimit = args.dailyCycleLimit;
    this.dischargingCapacity = args.dischargingCapacity;
    this.endOfLifeExpenses = args.endOfLifeExpenses;
    this.energyCapacity = args.energyCapacity;
    this.fixedOMCosts = args.fixedOMCosts;
    this.name = args.name;
    this.includeAuxiliaryLoad = args.includeAuxiliaryLoad;
    this.includeCycleDegradation = args.includeCycleDegradation;
    this.includeStartupCost = args.includeStartupCost;
    this.lowerSOCLimit = args.lowerSOCLimit;
    this.macrsTerm = args.macrsTerm;
    this.maxDuration = args.maxDuration;
    this.operationDate = args.operationDate;
    this.powerCapacity = args.powerCapacity;
    this.roundtripEfficiency = args.roundtripEfficiency;
    this.selfDischargeRate = args.selfDischargeRate;
    this.shouldDiffChargeDischarge = args.shouldDiffChargeDischarge;
    this.shouldEnergySize = args.shouldEnergySize;
    this.shouldLimitDailyCycling = args.shouldLimitDailyCycling;
    this.shouldMaxDuration = args.shouldMaxDuration;
    this.shouldPowerSize = args.shouldPowerSize;
    this.targetSOC = args.targetSOC;
    this.upperSOCLimit = args.upperSOCLimit;
    this.variableOMCosts = args.variableOMCosts;
  }

  operateOnDynamicFields(callback) {
    return _.mapValues(_.pick(this, DYNAMIC_FIELDS), callback);
  }

  getDefaultValues() {
    return {
      active: true,
      batteryCycles: [
        /*
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
        */
      ],
      complete: null,
      id: uuidv4(),
      tag: Battery,
      technologyType: 'Energy Storage System',
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  // to be removed in favor of getMetadataFromSchema
  static getHardcodedMetadata() {
    return new TechnologySpecsBatteryMetadata({
      auxiliaryLoad: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Auxilary Load',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: Number,
        unit: 'kW',
        description: 'On average, how much auxiliary power does the storage system draw to operate, including computers, fans, HVAC, etc., but not including power used to charge or discharge the batteries?',
        allowedValues: null,
      }),
      calendarDegradationRate: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Calendar Degradation Rate',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'int',
        unit: '% / year',
        description: 'The calendar degradation combines with cycling degradation to get total degradation. * Note: Not compatible with size optimization.',
        allowedValues: null,
      }),
      capitalCost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Capital Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$',
        description: 'What is the capital cost for the storage system?',
        allowedValues: null,
      }),
      capitalCostPerkW: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Capital Cost per kW',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW',
        description: 'What is the capital cost per kW for the storage discharge power capacity?',
        allowedValues: null,
      }),
      capitalCostPerkWh: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Capital Cost per kWh',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kWh',
        description: 'What is the capital cost per kWh for the storage energy capacity?',
        allowedValues: null,
      }),
      chargingCapacity: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Charging Capacity',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'What is the charging capacity (kW)?',
        allowedValues: null,
      }),
      constructionDate: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Construction Date',
        isRequired: true,
        type: Date,
        unit: null,
        description: null,
        allowedValues: null,
      }),
      dailyCycleLimit: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Daily Cycle Limit',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: Number,
        unit: 'hours',
        description: 'Limit the daily total discharge and ene throughput not to exceed the (number of cycles * max energy storage capacity)',
        allowedValues: null,
      }),
      dischargingCapacity: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Discharging Capacity',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'What is the discharging capacity (kW)?',
        allowedValues: null,
      }),
      endOfLifeExpenses: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'End of Life Expenses',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$',
        description: 'How much will it cost to decommission the battery at its end of life? This cost is applied at the end of life of the battery system in nominal dollars.',
        allowedValues: null,
      }),
      energyCapacity: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Energy Capacity',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: Number,
        unit: 'kWh',
        description: 'What is the energy capacity of the battery storage?',
        allowedValues: null,
      }),
      fixedOMCosts: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Fixed O&amp;M Costs',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW-year',
        description: 'What is the cost of fixed operations and maintenance for the battery storage system?',
        allowedValues: null,
      }),
      name: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Name',
        isRequired: true,
        type: String,
        unit: null,
        description: null,
        allowedValues: null,
      }),
      includeAuxiliaryLoad: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Include Housekeeping Calculations?',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: 'Include Housekeeping Power" – Apply a constant AC power consumption that does not discharge the battery directly. This is usually associated with HVAC requirements and keeping all equipment on.',
        allowedValues: AUXILIARY_LOAD_ALLOWED_VALUES,
      }),
      includeCycleDegradation: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Include degradation due to cycling?',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: 'When selected, this will calculate degradation due to cycling based on the cycle life curve and combine this degradation with the calculated calendar degradation. * Note: Not compatible with deferral service.',
        allowedValues: CYCLE_DEGRADATION_ALLOWED_VALUES,
      }),
      includeStartupCost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Include startup cost in the dispatch optimization?',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: null,
        allowedValues: STARTUP_COST_ALLOWED_VALUES,
      }),
      lowerSOCLimit: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Lower SOC Limit',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: 'Energy Storage SOC lower bound',
        allowedValues: null,
      }),
      macrsTerm: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'MACRS Term',
        isRequired: true,
        type: Number,
        unit: 'years',
        description: 'Which MACRS GDS category does the battery storage system fall into?',
        allowedValues: MACRS_TERM_ALLOWED_VALUES,
      }),
      maxDuration: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Maximum Duration',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: Number,
        unit: 'hours',
        description: 'Constrain the duration of the battery to this number of hours',
        allowedValues: null,
      }),
      operationDate: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Operation Date',
        isRequired: true,
        type: Date,
        unit: null,
        description: null,
        allowedValues: null,
      }),
      powerCapacity: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Power Capacity',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: Number,
        unit: 'kW',
        description: 'What is the power capacity of the battery storage?',
        allowedValues: null,
      }),
      roundtripEfficiency: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Roundtrip Efficiency',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: 'What is the AC roundtrip efficiency of the storage system? Only this single number is considered - no variable efficiency is modeled.',
        allowedValues: null,
      }),
      selfDischargeRate: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Self-Discharge Rate',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / hour',
        description: 'What percent of the remaining stored energy will be wasted by the batteries every hour due to self-discharge?',
        allowedValues: null,
      }),
      shouldDiffChargeDischarge: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Different Charge and Discharge Power Capacities?',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: null,
        allowedValues: DIFF_CHARGE_DISCHARGE_ALLOWED_VALUES,
      }),
      shouldEnergySize: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Energy Capacity Sizing',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: null,
        allowedValues: ENERGY_SIZING_ALLOWED_VALUES,
      }),
      shouldLimitDailyCycling: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Limit Daily Cycling?',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: 'Constrain the battery storage system\'s daily discharge energy. When selected, this input limits the amount of discharge energy a battery can do in any 24-hr period to a maximum of its rated energy capacity * daily cycle limit.',
        allowedValues: LIMIT_DAILY_CYCLING_ALLOWED_VALUES,
      }),
      shouldMaxDuration: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Set the max duration of the size?',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: null,
        allowedValues: MAX_DURATION_SIZING_ALLOWED_VALUES,
      }),
      shouldPowerSize: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Power Capacity Sizing',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: null,
        allowedValues: POWER_SIZING_ALLOWED_VALUES,
      }),
      targetSOC: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Target SOC',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '%',
        description: 'What state of charge should the battery storage system return to at the end of each optimization window?',
        allowedValues: null,
      }),
      upperSOCLimit: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Upper SOC Limit',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '%',
        description: 'Energy Storage SOC upper bound',
        allowedValues: null,
      }),
      variableOMCosts: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Variable O&amp;M Costs',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / MWh-year',
        description: 'What is the variable cost of operations and maintenance for the battery storage system?',
        allowedValues: null,
      }),
    });
  }
}
