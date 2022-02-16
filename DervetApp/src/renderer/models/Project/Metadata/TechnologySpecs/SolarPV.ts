import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { TimeSeriesFieldMetadata } from '@/models/Project/Metadata/TimeSeriesField';
import { TechnologyMetadata } from '@/models/Project/Metadata/TechnologySpecs/Technology';
import { TS_SOLARPV_GENERATION_PROFILE, optionsYN } from '@/models/Project/constants';
import { enumToAllowedValues } from '@/util/project';

export const LOC = 'loc';

export enum LocType {
  AC = 'AC',
  DC = 'DC',
}

const SIZING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Have DER-VET size the Solar PV',
  },
  {
    value: false,
    label: 'Known size',
  },
];

const LOC_ALLOWED_VALUES = enumToAllowedValues(LocType);

export default class SolarPVMetadata extends TechnologyMetadata {
  allowGridCharge: ValueFieldMetadata = {
    allowedValues: optionsYN,
    description: 'Allow the PV+ESS AC-coupled system to charge from the grid',
    displayName: 'Allow Grid Charging',
    isRequired: true,
    type: Boolean,
  };
  cost: ValueFieldMetadata = {
    description: 'Capital cost per kW<sub>AC</sub> of rated power capacity (applied in year 0 of the analysis)',
    displayName: 'Cost per kW<sub>AC</sub>',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$/kW<sub>AC</sub>',
  };
  fixedOMCosts: ValueFieldMetadata = {
    description: 'What is the cost of fixed operations and maintenance for the PV system?',
    displayName: 'Fixed O&M Costs',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / kW-year',
  };
  gamma: ValueFieldMetadata = {
    description: 'Percent of the timestep for which PV is at its minimum generation (suggested value: 43)<br><br>If you do not want to consider inter-timestep variability in PV generation enter 100 for both values above',
    displayName: 'Timestep Percentage of PV Minimum Generation',
    isRequired: false, // based off IF reliability is included as a service
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '%',
  };
  includeCurtailment: ValueFieldMetadata = {
    allowedValues: optionsYN,
    description: 'Select \'yes\' to allow the PV to curtail its generation below its maximum generating level (which is set by the system size and the weather). This adds PV curtailment as an optimization variable (longer runtime) but can avoid constraint conflicts associated with overgeneration',
    displayName: 'Allow curtailment?',
    isRequired: true,
    type: Boolean,
  };
  includePPA: ValueFieldMetadata = {
    allowedValues: optionsYN,
    description: 'Do you want to calculate the annual PV energy cost as a Power Purchase Agreement (PPA)?',
    displayName: 'Power Purchasing Agreement?',
    isRequired: true,
    type: Boolean,
  };
  includeSizeLimits: ValueFieldMetadata = {
    allowedValues: optionsYN,
    description: 'Advanced sizing settings.',
    displayName: 'Include limits on capacity sizing?',
    isRequired: true,
    type: Boolean,
  };
  inverterMax: ValueFieldMetadata = {
    description: 'The maximum net import or export power flow through the inverter',
    displayName: 'Solar (+storage) Inverter Rating (kVA)',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW<sub>AC</sub>',
  };
  loc: ValueFieldMetadata = {
    allowedValues: LOC_ALLOWED_VALUES,
    description: 'Solar plus storage AC or DC coupled system',
    displayName: 'Coupled System Type',
    isRequired: true,
    type: String,
  };
  nu: ValueFieldMetadata = {
    description: 'Minimum percent of the PV generation within a timestep (suggested value: 20)',
    displayName: 'Minimum Percentage of PV Generation',
    isRequired: false, // based off IF reliability is included as a service
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '%',
  };
  ppaCost: ValueFieldMetadata = {
    description: 'What is the cost of the power purchase agreement?',
    displayName: 'PPA Cost',
    isRequired: false, // based on includePPA
    minValue: 0,
    type: Number,
    unit: '$/kW<sub>AC</sub>h',
  };
  ppaInflationRate: ValueFieldMetadata = {
    description: 'An escalation rate exclusively for the Solar PPA Cost (For operation year 2 onwards)',
    displayName: 'Inflation Rate',
    isRequired: false, // based on includePPA
    minValue: -100,
    maxValue: 100,
    type: Number,
    unit: '%',
  };
  ratedCapacity: ValueFieldMetadata = {
    displayName: 'Rated Capacity',
    isRequired: true,
    minValue: 1, // differs from schema; want gt 0
    type: Number,
    unit: 'kW<sub>AC</sub>',
  };
  ratedCapacityMaximum: ValueFieldMetadata = {
    description: 'Upper limit on PV AC power capacity when optimally sizing',
    displayName: 'Rated Capacity Maximum',
    isRequired: false, // based on if sizing
    minValue: 0,
    type: Number,
    unit: 'kW<sub>AC</sub>',
  };
  ratedCapacityMinimum: ValueFieldMetadata = {
    description: 'Lower limit on PV AC power capacity when optimally sizing (this does not set a minimum power during operation)',
    displayName: 'Rated Capacity Minimum',
    isRequired: false, // based on if sizing
    minValue: 0,
    type: Number,
    unit: 'kW<sub>AC</sub>',
  };
  replacementCost: ValueFieldMetadata = {
    description: 'Total cost of replacing the system at its end of life in $/kW of AC power capacity',
    displayName: 'Replacement Cost per kW<sub>AC</sub>',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$/kW<sub>AC</sub>',
  };
  shouldSize: ValueFieldMetadata = {
    allowedValues: SIZING_ALLOWED_VALUES,
    displayName: 'Sizing',
    isRequired: true,
    type: Boolean,
  };
  tsSolarPVGenerationProfile: TimeSeriesFieldMetadata = {
    columnHeaderName: 'PV Gen (kW/rated kW)',
    displayName: 'solar generation profile',
    isMonthly: false,
    sampleDataFileName: 'PVGeneration',
    tsName: TS_SOLARPV_GENERATION_PROFILE,
    unit: 'kW/rated kW',
  };
}
