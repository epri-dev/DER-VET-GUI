import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import {
  SHARED_DYNAMIC_FIELDS,
  createSharedHardcodedMetadata,
} from '@/models/Project/TechnologySpecs/sharedConstants';


const CHP = 'CHP';

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS,

];

const sharedHardcodedMetadata = createSharedHardcodedMetadata('CHP');

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
      tag: CHP,
      technologyType: 'Generator',
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
