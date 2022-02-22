import { TechnologyMetadata } from '@/models/Project/Metadata/TechnologySpecs/Technology';
import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { YES_NO_OPTIONS } from '@/models/Project/Metadata/AllowedValues/constants';

const SIZING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Determine the capacity of each generator',
  },
  {
    value: false,
    label: 'Known size',
  },
];

export default class TechnologySpecsICEMetadata extends TechnologyMetadata {
  capitalCost: ValueFieldMetadata = {
    displayName: 'Capital Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / generator',
    description: 'What is the capital cost of each internal combustion engine?',
  };
  capitalCostPerkW: ValueFieldMetadata = {
    displayName: 'Capital Cost per kW',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / kW-generator',
    description: 'What is the capital cost per kW for each internal combustion engine?',
  };
  efficiency: ValueFieldMetadata = {
    displayName: 'Efficiency',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'gallons / kWh',
    description: 'How many gallons of fuel does it take to generate 1 kWh of electricity? No variable efficiency is considered at this stage.',
  };
  fixedOMCostIncludingExercise: ValueFieldMetadata = {
    displayName: 'Fixed O&M Cost, including exercise',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / kW-year',
    description: 'What is the cost of fixed operations and maintenance (O&M), including the non-fuel expenses from exercising the internal combustion engine?',
  };
  fuelCost: ValueFieldMetadata = {
    displayName: 'Fuel Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / gallon',
    description: 'This will be assumed to be constant over the analysis horizon',
  };
  includeSizeLimits: ValueFieldMetadata = {
    displayName: 'Include limits on capacity sizing?',
    isRequired: true,
    type: Boolean,
    allowedValues: YES_NO_OPTIONS,
    description: 'Advanced sizing settings.',
  };
  minimumPower: ValueFieldMetadata = {
    displayName: 'Minimum Power',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW',
    description: 'What is the mimimum power the internal combustion engine is capable of safely producing?',
  };
  numGenerators: ValueFieldMetadata = {
    displayName: 'Number of Generators to Install',
    isRequired: true,
    minValue: 1, // differs from schema; want gt 0
    type: 'int',
    description: '',
  };
  ratedCapacity: ValueFieldMetadata = {
    displayName: 'Rated Capacity',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW / generator',
    description: 'What is the rated capacity of each internal combustion engine?',
  };
  ratedCapacityMaximum: ValueFieldMetadata = {
    displayName: 'Rated Capacity Maximum',
    description: 'Upper limit on power capacity when optimally sizing',
    isRequired: false, // based on if sizing
    minValue: 0,
    type: Number,
    unit: 'kW / generator',
  };
  ratedCapacityMinimum: ValueFieldMetadata = {
    displayName: 'Rated Capacity Minimum',
    description: 'Lower limit on power capacity when optimally sizing (this does not set a minimum generating power during operation)',
    isRequired: false, // based on if sizing
    minValue: 0,
    type: Number,
    unit: 'kW / generator',
  };
  replacementCost: ValueFieldMetadata = {
    displayName: 'Replacement Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / generator',
    description: 'Total cost of replacing an old internal combustion engine at its end of life (recurring based on lifetime)',
  };
  replacementCostPerkW: ValueFieldMetadata = {
    displayName: 'Replacement Cost per kW',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / kW-generator',
    description: 'Replacement Cost of an Internal Combustion Engine per kW of rated capacity',
  };
  shouldSize: ValueFieldMetadata = {
    displayName: 'Sizing',
    isRequired: true,
    type: Boolean,
    allowedValues: SIZING_ALLOWED_VALUES,
  };
  variableOMCost: ValueFieldMetadata = {
    displayName: 'Variable O&M cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / kWh',
    description: 'What is the cost of variable operations and maintenance for each kWh of AC energy delivered?',
  };
}
