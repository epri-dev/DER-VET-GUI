import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { TechnologyMetadata } from '@/models/Project/Metadata/TechnologySpecs/Technology';
import { YES_NO_OPTIONS } from '@/models/Project/Metadata/AllowedValues/constants';

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

export default class BatteryMetadata extends TechnologyMetadata {
  auxiliaryLoad: ValueFieldMetadata = {
    displayName: 'Auxilary Load',
    isRequired: true,
    minValue: 1, // differs from schema; want gt 0
    type: Number,
    unit: 'kW',
    description: 'On average, how much auxiliary power does the storage system draw to operate, including computers, fans, HVAC, etc., but not including power used to charge or discharge the batteries?',
  };
  calendarDegradationRate: ValueFieldMetadata = {
    displayName: 'Calendar Degradation Rate',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: 'float',
    unit: '% / year',
    description: 'The calendar degradation combines with cycling degradation to get total degradation. * Note: Not compatible with size optimization.',
  };
  capitalCost: ValueFieldMetadata = {
    displayName: 'Capital Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$',
    description: '',
  };
  capitalCostPerkW: ValueFieldMetadata = {
    displayName: 'Capital Cost per kW',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / kW',
    description: 'What is the capital cost per kW for the storage discharge power capacity?',
  };
  capitalCostPerkWh: ValueFieldMetadata = {
    displayName: 'Capital Cost per kWh',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / kWh',
    description: 'What is the capital cost per kWh for the storage energy capacity?',
  };
  chargingCapacity: ValueFieldMetadata = {
    displayName: 'Charging Capacity',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW',
    description: 'What is the charging capacity (kW)?',
  };
  cycleLifeCurve: ValueFieldMetadata = {
    displayName: 'Cycle Life Curve',
    type: 'Object', // TODO make this nicer
    defaultValue: [
      { ulimit: 0.1, val: 63000 },
      { ulimit: 0.15, val: 42000 },
      { ulimit: 0.2, val: 31500 },
      { ulimit: 0.3, val: 17500 },
      { ulimit: 0.4, val: 10500 },
      { ulimit: 0.5, val: 7000 },
      { ulimit: 0.6, val: 5833 },
      { ulimit: 0.7, val: 5016 },
      { ulimit: 0.8, val: 4375 },
      { ulimit: 0.9, val: 3850 },
      { ulimit: 1.0, val: 3500 },
    ],
  };
  dailyCycleLimit: ValueFieldMetadata = {
    displayName: 'Daily Cycle Limit',
    isRequired: true,
    minValue: 1, // differs from schema; want gt 0
    type: Number,
    unit: 'cycles',
    description: 'Limit the daily total discharge and energy throughput not to exceed the (number of cycles * max energy storage capacity)',
  };
  dischargingCapacity: ValueFieldMetadata = {
    displayName: 'Discharging Capacity',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW',
    description: 'What is the discharging capacity (kW)?',
  };
  energyCapacity: ValueFieldMetadata = {
    displayName: 'Energy Capacity',
    isRequired: true,
    minValue: 1, // differs from schema; want gt 0
    type: Number,
    unit: 'kWh',
    description: 'What is the energy capacity of the battery storage?',
  };
  energyCapacityMaximum: ValueFieldMetadata = {
    displayName: 'Energy Rating Maximum',
    description: 'Upper limit on energy capacity when optimally sizing',
    isRequired: false, // based on if sizing
    minValue: 0,
    type: Number,
    unit: 'kWh',
  };
  energyCapacityMinimum: ValueFieldMetadata = {
    displayName: 'Energy Rating Minimum',
    description: 'Lower limit on energy capacity when optimally sizing (this does not set a minimum state of energy during operation)',
    isRequired: false, // based on if sizing
    minValue: 0,
    type: Number,
    unit: 'kWh',
  };
  fixedOMCosts: ValueFieldMetadata = {
    displayName: 'Fixed O&M Costs',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / kW-year',
    description: 'What is the cost of fixed operations and maintenance for the battery storage system?',
  };
  includeAuxiliaryLoad: ValueFieldMetadata = {
    displayName: 'Include Housekeeping Calculations?',
    isRequired: true,
    type: Boolean,
    unit: null,
    description: 'Include Housekeeping Power? – Apply a constant AC power consumption that does not discharge the battery directly. This is usually associated with HVAC requirements and keeping all equipment on.',
    allowedValues: YES_NO_OPTIONS,
  };
  includeCycleDegradation: ValueFieldMetadata = {
    displayName: 'Include degradation due to cycling?',
    isRequired: true,
    type: Boolean,
    unit: null,
    description: 'When selected, this will calculate degradation due to cycling based on the cycle life curve and combine this degradation with the calculated calendar degradation. * Note: Not compatible with deferral service.',
    allowedValues: YES_NO_OPTIONS,
  };
  includeSizeLimits: ValueFieldMetadata = {
    displayName: 'Include limits on capacity sizing?',
    isRequired: false,
    type: Boolean,
    allowedValues: YES_NO_OPTIONS,
    description: 'Advanced sizing settings.',
  };
  lowerSOCLimit: ValueFieldMetadata = {
    displayName: 'Lower SOC Limit',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '%',
    description: 'Energy Storage SOC lower bound',
  };
  maxDuration: ValueFieldMetadata = {
    displayName: 'Maximum Duration',
    isRequired: true,
    minValue: 1, // differs from schema; want gt 0
    type: Number,
    unit: 'hours',
    description: 'Constrain the duration of the battery to this number of hours',
  };
  powerCapacity: ValueFieldMetadata = {
    displayName: 'Power Capacity',
    isRequired: true,
    minValue: 1, // differs from schema; want gt 0
    type: Number,
    unit: 'kW',
    description: 'What is the power capacity of the battery storage?',
  };
  powerCapacityMaximum: ValueFieldMetadata = {
    displayName: 'Power Rating Maximum',
    description: 'Upper limit on power capacity when optimally sizing',
    isRequired: false, // based on if sizing
    minValue: 0,
    type: Number,
    unit: 'kW',
  };
  powerCapacityMinimum: ValueFieldMetadata = {
    displayName: 'Power Rating Minimum',
    description: 'Lower limit on power capacity when optimally sizing (this does not set a minimum power during operation)',
    isRequired: false, // based on if sizing
    minValue: 0,
    type: Number,
    unit: 'kW',
  };
  replacementCost: ValueFieldMetadata = {
    displayName: 'Replacement Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$',
    description: 'Total fixed cost of replacing the old battery cells with new ones and performing any other associated work. This is added to the replacement cost per kW and replacement cost per kWh to determine the total cost of replacement. (recurring cost based on replacement year)',
  };
  replacementCostPerkW: ValueFieldMetadata = {
    displayName: 'Replacement Cost per kW',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / kW',
    description: 'Replacement Cost in $/kW of storage discharge power capacity',
  };
  replacementCostPerkWh: ValueFieldMetadata = {
    displayName: 'Replacement Cost per kWh',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / kWh',
    description: 'Replacement Cost in $/kWh of storage energy capacity',
  };
  roundtripEfficiency: ValueFieldMetadata = {
    displayName: 'Roundtrip Efficiency',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '%',
    description: 'What is the AC roundtrip efficiency of the storage system? Only this single number is considered - no variable efficiency is modeled.',
  };
  selfDischargeRate: ValueFieldMetadata = {
    displayName: 'Self-Discharge Rate',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / hour',
    description: 'What percent of the remaining stored energy will be wasted by the batteries every hour due to self-discharge?',
  };
  shouldDiffChargeDischarge: ValueFieldMetadata = {
    displayName: 'Different Charge and Discharge Power Capacities?',
    isRequired: true,
    type: Boolean,
    unit: null,
    description: null,
    allowedValues: YES_NO_OPTIONS,
  };
  shouldEnergySize: ValueFieldMetadata = {
    displayName: 'Energy Capacity Sizing',
    isRequired: true,
    type: Boolean,
    unit: null,
    description: null,
    allowedValues: ENERGY_SIZING_ALLOWED_VALUES,
  };
  shouldLimitDailyCycling: ValueFieldMetadata = {
    displayName: 'Limit Daily Cycling?',
    isRequired: true,
    type: Boolean,
    unit: null,
    description: 'Constrain the battery storage system\'s daily discharge energy. When selected, this input limits the amount of discharge energy a battery can do in any 24-hr period to a maximum of its rated energy capacity * daily cycle limit.',
    allowedValues: YES_NO_OPTIONS,
  };
  shouldMaxDuration: ValueFieldMetadata = {
    displayName: 'Set the max duration of the size?',
    isRequired: true,
    type: Boolean,
    unit: null,
    description: null,
    allowedValues: YES_NO_OPTIONS,
  };
  shouldPowerSize: ValueFieldMetadata = {
    displayName: 'Power Capacity Sizing',
    isRequired: true,
    type: Boolean,
    unit: null,
    description: null,
    allowedValues: POWER_SIZING_ALLOWED_VALUES,
  };
  stateOfHealth: ValueFieldMetadata = {
    displayName: 'State of Health',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: 'float',
    unit: '%',
    description: 'State of heath at end of life (percentage of original energy capacity that will trigger a replacement of the equipment)',
  };
  targetSOC: ValueFieldMetadata = {
    displayName: 'Target SOC',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: 'float',
    unit: '%',
    description: 'What state of charge should the battery storage system return to at the end of each optimization window?',
  };
  upperSOCLimit: ValueFieldMetadata = {
    displayName: 'Upper SOC Limit',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: 'float',
    unit: '%',
    description: 'Energy Storage SOC upper bound',
  };
  variableOMCosts: ValueFieldMetadata = {
    displayName: 'Variable O&M Costs',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / MWh-year',
    description: 'What is the variable cost of operations and maintenance for the battery storage system?',
  };
}
