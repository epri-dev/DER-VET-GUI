import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/Fields';
import { SHARED_DYNAMIC_FIELDS, createSharedHardcodedMetadata } from '@/models/Project/TechnologySpecs/sharedConstants';

const DieselGen = 'DieselGen';

// TODO parse these from schema
const SIZING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Have DER-VET determine the optimal number of Diesel Generators to install',
  },
  {
    value: false,
    label: 'Known number of Diesel Generators',
  },
];

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS,
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

export default class TechnologySpecsDieselGenMetadata {
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
      tag: DieselGen,
      technologyType: 'Generator',
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  // to be removed in favor of getMetadataFromSchema
  static getHardcodedMetadata() {
    return new TechnologySpecsDieselGenMetadata({
      capitalCost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Capital Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / generator',
        description: 'What is the capital cost of each diesel generator?',
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
        description: 'What is the cost of fixed operations and maintenance, including the non-fuel expenses from exercising the diesel generator?',
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
        description: 'What is the mimimum power the diesel generator is capable of safely producing?',
        allowedValues: null,
      }),
      numGenerators: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Number of Generators to Install',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: 'int',
        unit: null,
        description: 'What is the number of diesel generators to install?',
        allowedValues: null,
      }),
      ratedCapacity: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Rated Capacity',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW / generator',
        description: 'What is the rated capacity of the diesel generator?',
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
      ...createSharedHardcodedMetadata(this.tag),
    });
  }
}
