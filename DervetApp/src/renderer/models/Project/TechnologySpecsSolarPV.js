import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/Fields';

const PV = 'PV';

// TODO parse these from schema
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
const LOC_ALLOWED_VALUES = [
  {
    value: null,
    label: '-',
  },
  {
    value: 'AC',
    label: 'AC',
  },
  {
    value: 'DC',
    label: 'DC',
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
  'constructionDate',
  'cost',
  'inverterMax',
  'loc',
  'macrsTerm',
  'name',
  'operationDate',
  'ratedCapacity',
  'shouldSize',
];

export default class TechnologySpecsSolarPVMetadata {
  // TODO: refactor to use typescript interface + Object.assign(this, args);
  constructor(args) {
    this.constructionDate = args.constructionDate;
    this.cost = args.cost;
    this.inverterMax = args.inverterMax;
    this.loc = args.loc;
    this.macrsTerm = args.macrsTerm;
    this.name = args.name;
    this.operationDate = args.operationDate;
    this.ratedCapacity = args.ratedCapacity;
    this.shouldSize = args.shouldSize;
  }

  operateOnDynamicFields(callback) {
    return _.mapValues(_.pick(this, DYNAMIC_FIELDS), callback);
  }

  getDefaultValues() {
    return {
      active: true,
      tag: PV,
      technologyType: 'Intermittent Resource',
      id: uuidv4(),
      generationProfile: null,
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  // to be removed in favor of getMetadataFromSchema
  static getHardcodedMetadata() {
    return new TechnologySpecsSolarPVMetadata({
      constructionDate: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Construction Date',
        isRequired: true,
        type: Date,
        unit: null,
        description: null,
        allowedValues: null,
      }),
      cost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Cost per kW',
        isRequired: true,
        type: Number,
        minValue: 0,
        unit: '$/kW',
        description: 'Capital cost per kW of rated power capacity (applied in year 0 of the analysis)',
        allowedValues: null,
      }),
      generationProfile: null,
      inverterMax: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Solar (+storage) Inverter Rating (kVA)',
        isRequired: true,
        minValue: 0,
        // greaterThan: 0,
        type: Number,
        unit: 'kW',
        description: null,
        allowedValues: null,
      }),
      loc: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Coupled System Type',
        isRequired: true,
        type: String,
        unit: null,
        description: 'Solar plus storage AC or DC coupled system',
        allowedValues: LOC_ALLOWED_VALUES,
      }),
      macrsTerm: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'MACRS Term',
        isRequired: true,
        type: Number,
        unit: 'years',
        description: 'Which MACRS GDS category does solar PV fall into?',
        allowedValues: MACRS_TERM_ALLOWED_VALUES,
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
        type: Number,
        unit: 'kW',
        description: null,
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
    });
  }

  static getMetadataFromSchema() {
    return new TechnologySpecsSolarPVMetadata({
      cost: ProjectFieldMetadata.fromSchema({
        defaultValue: 0,
        displayName: 'Cost per kW',
        isRequired: true,
        description: 'Capital cost per kW of rated power capacity (applied in year 0 of the analysis)',
        schemaTag: PV,
        schemaKey: 'ccost_kW',
      }),
    });
  }
}
