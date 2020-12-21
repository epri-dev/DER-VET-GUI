import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/Fields';
import { optionsYN } from '@/models/Project/constants';
import {
  SHARED_DYNAMIC_FIELDS,
  createSharedHardcodedMetadata,
} from '@/models/Project/TechnologySpecs/sharedConstants';


// const ICE = 'ICE';

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS,

];

const sharedHardcodedMetadata = createSharedHardcodedMetadata('home EV');

export default class TechnologySpecsHomeEVMetadata {
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
      // tag: ICE,
      // technologyType: 'Generator',
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  // to be removed in favor of getMetadataFromSchema
  static getHardcodedMetadata() {
    return new TechnologySpecsHomeEVMetadata({
      ...sharedHardcodedMetadata,
    });
  }
}
