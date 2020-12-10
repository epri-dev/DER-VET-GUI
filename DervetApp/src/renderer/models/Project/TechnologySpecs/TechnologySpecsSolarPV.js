import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/Fields';
import { SHARED_DYNAMIC_FIELDS, createSharedHardcodedMetadata } from '@/models/Project/TechnologySpecs/sharedConstants';

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

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS,
  'cost',
  'fixedOMCosts',
  'inverterMax',
  'loc',
  'ratedCapacity',
  'shouldSize',
];

export default class TechnologySpecsSolarPVMetadata {
  constructor(args) {
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
      cost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Cost per kW<sub>AC</sub>',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$/kW<sub>AC</sub>',
        description: 'Capital cost per kW<sub>AC</sub> of rated power capacity (applied in year 0 of the analysis)',
        allowedValues: null,
      }),
      fixedOMCosts: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Fixed O&M Costs',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW-year',
        description: 'What is the cost of fixed operations and maintenance for the PV system?',
        allowedValues: null,
      }),
      generationProfile: null,
      inverterMax: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Solar (+storage) Inverter Rating (kVA)',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW<sub>AC</sub>',
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
      ratedCapacity: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Rated Capacity',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: Number,
        unit: 'kW<sub>AC</sub>',
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
      ...createSharedHardcodedMetadata(this.tag),
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
