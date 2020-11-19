import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/Fields';

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
  'capitalCost',
  'constructionDate',
  'efficiency',
  'fixedOMCostIncludingExercise',
  'fuelCost',
  'macrsTerm',
  'maxGenerators',
  'minGenerators',
  'minimumPower',
  'name',
  'numGenerators',
  'operationDate',
  'ratedCapacity',
  'shouldSize',
  'startupTime',
  'variableOMCost',
];

export default class TechnologySpecsDieselGenMetadata {
  // TODO: refactor to use typescript interface + Object.assign(this, args);
  constructor(args) {
    this.capitalCost = args.capitalCost;
    this.constructionDate = args.constructionDate;
    this.efficiency = args.efficiency;
    this.fixedOMCostIncludingExercise = args.fixedOMCostIncludingExercise;
    this.fuelCost = args.fuelCost;
    this.macrsTerm = args.macrsTerm;
    this.maxGenerators = args.maxGenerators;
    this.minGenerators = args.minGenerators;
    this.minimumPower = args.minimumPower;
    this.name = args.name;
    this.numGenerators = args.numGenerators;
    this.operationDate = args.operationDate;
    this.ratedCapacity = args.ratedCapacity;
    this.shouldSize = args.shouldSize;
    this.startupTime = args.startupTime;
    this.variableOMCost = args.variableOMCost;
  }

  operateOnDynamicFields(callback) {
    return _.mapValues(_.pick(this, DYNAMIC_FIELDS), callback);
  }

  getDefaultValues() {
    return {
      active: true,
      complete: null,
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
      constructionDate: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Construction Date',
        isRequired: true,
        type: Date,
        unit: null,
        description: null,
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
        displayName: 'Fixed O&amp;M Cost, including exercise',
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
      macrsTerm: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'MACRS Term',
        isRequired: true,
        type: Number,
        unit: 'years',
        description: 'Which MACRS GDS category does the diesel generator fall into?',
        allowedValues: MACRS_TERM_ALLOWED_VALUES,
      }),
      maxGenerators: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Maximum Number of Generators to Install',
        isRequired: true,
        minValue: 2, // differs from schema; want gt minGenerators
        type: 'int',
        unit: 'generators',
        description: 'What is the maximum number of diesel generators to consider installing?',
        allowedValues: null,
      }),
      minGenerators: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Minimum Number of Generators to Install',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: 'int',
        unit: 'generators',
        description: 'What is the minimum number of diesel generators to consider installing?',
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
      name: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Name',
        isRequired: true,
        type: String,
        unit: null,
        description: null,
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
      startupTime: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Startup Time',
        isRequired: true,
        minValue: 0,
        type: 'int',
        unit: 'minutes',
        description: 'How many minutes are required for the diesel generator to go from an off state to producing its full rated power',
        allowedValues: null,
      }),
      variableOMCost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Variable O&amp;M cost',
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
