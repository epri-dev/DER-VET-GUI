import _ from 'lodash';

import ProjectFieldMetadata from '@/models/Project/Fields';
import {
  SHARED_DYNAMIC_FIELDS,
  createSharedHardcodedMetadata,
} from '@/models/Project/TechnologySpecs/sharedConstants';


const ELECTRIC_VEHICLE2 = 'ElectricVehicle2';

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS,
  'capitalCost',
  'fixedOMCosts',
  'lostLoadCost',
  'maximumLoadCtrl',
  'replacementCost',
];

const sharedHardcodedMetadata = createSharedHardcodedMetadata('fleet EV');

export default class TechnologySpecsFleetEVMetadata {
  constructor(arg) {
    Object.assign(this, arg);
  }

  operateOnDynamicFields(callback) {
    return _.mapValues(_.pick(this, DYNAMIC_FIELDS), callback);
  }

  getDefaultValues() {
    return {
      active: true,
      baselineLoad: null,
      complete: null,
      errorList: [],
      id: null,
      tag: ELECTRIC_VEHICLE2,
      technologyType: 'Electric Vehicle',
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  // to be removed in favor of getMetadataFromSchema
  static getHardcodedMetadata() {
    return new TechnologySpecsFleetEVMetadata({
      baselineLoad: null,
      capitalCost: new ProjectFieldMetadata({
        displayName: 'Capital Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$',
        description: 'Capital cost of infrastructure for EV charging',
      }),
      fixedOMCost: new ProjectFieldMetadata({
        displayName: 'Fixed O&M Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / yr',
        description: 'Cost of maintaining the charging infrastructure',
      }),
      lostLoadCost: new ProjectFieldMetadata({
        displayName: 'Cost of Lost Load',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$',
        description: 'What is the cost of reducing the EV load?',
      }),
      maximumLoadCtrl: new ProjectFieldMetadata({
        displayName: 'Maximum Load Control',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: 'The percentage of EV load that can be relied upon for grid services',
      }),
      replacementCost: new ProjectFieldMetadata({
        displayName: 'Replacement Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ ',
        description: 'Total cost of replacing infrastructure for EV charging',
      }),
      ...sharedHardcodedMetadata,
    });
  }
}
