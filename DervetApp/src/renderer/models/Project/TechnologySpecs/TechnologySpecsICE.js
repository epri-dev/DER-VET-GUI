import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/Fields';
// import {
//   SHARED_DYNAMIC_FIELDS,
//   createSharedHardcodedMetadata
// } from '@/models/Project/TechnologySpecs/sharedConstants';


const ICE = 'ICE';

// TODO parse these from schema
const SIZING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Have DER-VET determine the optimal number of Internal Combustion Engines to install',
  },
  {
    value: false,
    label: 'Known number of Internal Combustion Engines',
  },
];

const DYNAMIC_FIELDS = [
  'capitalCost',
  'efficiency',
  'fixedOMCostIncludingExercise',
  'fuelCost',
  'minimumPower',
  'numGenerators',
  'ratedCapacity',
  'shouldSize',
  'variableOMCost',
];

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
        defaultValue: null,
        displayName: 'Capital Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / generator',
        description: 'What is the capital cost of each internal combustion engine?',
        allowedValues: null,
      }),
      efficiency: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Efficiency',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'gallons / kWh',
        description: 'How many gallons of fuel does it take to generate 1 kWh of electricity? No variable efficiency is considered at this stage.',
        allowedValues: null,
      }),
      fixedOMCostIncludingExercise: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Fixed O&M Cost, including exercise',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW-year',
        description: 'What is the cost of fixed operations and maintenance, including the non-fuel expenses from exercising the internal combustion engine?',
        allowedValues: null,
      }),
      fuelCost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Fuel Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / gallon',
        description: 'What is the price of fuel (constant over analysis horizon)?',
        allowedValues: null,
      }),
      minimumPower: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Minimum Power',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'What is the mimimum power the internal combustion engine is capable of safely producing?',
        allowedValues: null,
      }),
      numGenerators: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Number of Generators to Install',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: 'int',
        unit: null,
        description: 'What is the number of internal combustion engines to install?',
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
      ratedCapacity: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Rated Capacity',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW / generator',
        description: 'What is the rated capacity of the internal combustion engine?',
        allowedValues: null,
      }),
      shouldSize: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Sizing',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: null,
        allowedValues: SIZING_ALLOWED_VALUES,
      }),
      variableOMCost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Variable O&M cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / MWh',
        description: 'What is the cost of variable operations and maintenance for each MWh of AC energy delivered?',
        allowedValues: null,
      }),
    });
  }
}
