import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/FieldMetadata';
import { optionsYN } from '@/models/Project/constants';
import {
  SHARED_DYNAMIC_FIELDS,
  createSharedHardcodedMetadata,
} from '@/models/Project/TechnologySpecs/sharedConstants';
import { TECH_SPECS_ICE } from '@/router/constants';

const ICE = 'ICE';

// TODO parse these from schema
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

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS,
  'capitalCost',
  'capitalCostPerkW',
  'efficiency',
  'fixedOMCostIncludingExercise',
  'fuelCost',
  'includeSizeLimits',
  'minimumPower',
  'numGenerators',
  'ratedCapacity',
  'ratedCapacityMaximum',
  'ratedCapacityMinimum',
  'replacementCost',
  'replacementCostPerkW',
  'shouldSize',
  'variableOMCost',
];

const sharedHardcodedMetadata = createSharedHardcodedMetadata('internal combustion engine');

export default class TechnologySpecsICEMetadata {
  constructor(arg) {
    Object.assign(this, arg);
  }

  operateOnDynamicFields(callback) {
    return _.mapValues(_.pick(this, DYNAMIC_FIELDS), callback);
  }

  getDefaultValues() {
    return {
      active: true,
      complete: null,
      errorList: [],
      id: uuidv4(),
      path: TECH_SPECS_ICE,
      tag: ICE,
      technologyType: 'Generator',
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  // to be removed in favor of getMetadataFromSchema
  static getHardcodedMetadata() {
    return new TechnologySpecsICEMetadata({
      capitalCost: new ProjectFieldMetadata({
        displayName: 'Capital Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / generator',
        description: 'What is the capital cost of each internal combustion engine?',
      }),
      capitalCostPerkW: new ProjectFieldMetadata({
        displayName: 'Capital Cost per kW',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW-generator',
        description: 'What is the capital cost per kW for each internal combustion engine?',
      }),
      efficiency: new ProjectFieldMetadata({
        displayName: 'Efficiency',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'gallons / kWh',
        description: 'How many gallons of fuel does it take to generate 1 kWh of electricity? No variable efficiency is considered at this stage.',
      }),
      fixedOMCostIncludingExercise: new ProjectFieldMetadata({
        displayName: 'Fixed O&M Cost, including exercise',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW-year',
        description: 'What is the cost of fixed operations and maintenance (O&M), including the non-fuel expenses from exercising the internal combustion engine?',
      }),
      fuelCost: new ProjectFieldMetadata({
        displayName: 'Fuel Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / gallon',
        description: 'This will be assumed to be constant over the analysis horizon',
      }),
      includeSizeLimits: new ProjectFieldMetadata({
        displayName: 'Include limits on capacity sizing?',
        isRequired: true,
        type: Boolean,
        allowedValues: optionsYN,
        description: 'Advanced sizing settings.',
      }),
      minimumPower: new ProjectFieldMetadata({
        displayName: 'Minimum Power',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'What is the mimimum power the internal combustion engine is capable of safely producing?',
      }),
      numGenerators: new ProjectFieldMetadata({
        displayName: 'Number of Generators to Install',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: 'int',
        description: '',
      }),
      ratedCapacity: new ProjectFieldMetadata({
        displayName: 'Rated Capacity',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW / generator',
        description: 'What is the rated capacity of each internal combustion engine?',
      }),
      ratedCapacityMaximum: new ProjectFieldMetadata({
        displayName: 'Rated Capacity Maximum',
        description: 'Upper limit on power capacity when optimally sizing',
        isRequired: false, // based on if sizing
        minValue: 0,
        type: Number,
        unit: 'kW / generator',
      }),
      ratedCapacityMinimum: new ProjectFieldMetadata({
        displayName: 'Rated Capacity Minimum',
        description: 'Lower limit on power capacity when optimally sizing (this does not set a minimum generating power during operation)',
        isRequired: false, // based on if sizing
        minValue: 0,
        type: Number,
        unit: 'kW / generator',
      }),
      replacementCost: new ProjectFieldMetadata({
        displayName: 'Replacement Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / generator',
        description: 'Total cost of replacing an old internal combustion engine at its end of life (recurring based on lifetime)',
      }),
      replacementCostPerkW: new ProjectFieldMetadata({
        displayName: 'Replacement Cost per kW',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW-generator',
        description: 'Replacement Cost of an Internal Combustion Engine per kW of rated capacity',
      }),
      shouldSize: new ProjectFieldMetadata({
        displayName: 'Sizing',
        isRequired: true,
        type: Boolean,
        allowedValues: SIZING_ALLOWED_VALUES,
      }),
      variableOMCost: new ProjectFieldMetadata({
        displayName: 'Variable O&M cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kWh',
        description: 'What is the cost of variable operations and maintenance for each kWh of AC energy delivered?',
      }),
      ...sharedHardcodedMetadata,
    });
  }
}
