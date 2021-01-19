import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/Fields';
import {
  SHARED_DYNAMIC_FIELDS,
  createSharedHardcodedMetadata,
} from '@/models/Project/TechnologySpecs/sharedConstants';


const CONTROLLABLE_LOAD = 'ControllableLoad';

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS,
  'duration',
  'ratedCapacity',
];

const sharedHardcodedMetadata = createSharedHardcodedMetadata('controllable load');

export default class TechnologySpecsControllableLoadMetadata {
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
      id: uuidv4(),
      load: null,
      errorList: [],
      tag: CONTROLLABLE_LOAD,
      technologyType: 'Controllable Load',
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  // to be removed in favor of getMetadataFromSchema
  static getHardcodedMetadata() {
    return new TechnologySpecsControllableLoadMetadata({
      duration: new ProjectFieldMetadata({
        displayName: 'Duration',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: Number,
        unit: 'hours',
        description: 'Maximum time that the load can be shut off or turned down for.',
      }),
      ratedCapacity: new ProjectFieldMetadata({
        displayName: 'Rated Capacity',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW ',
        description: 'Maximum offset from the original load.',
      }),
      ...sharedHardcodedMetadata,
    });
  }
}
