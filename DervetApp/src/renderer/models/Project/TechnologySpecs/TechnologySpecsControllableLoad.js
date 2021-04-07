import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD } from '@/store/actionTypes';
import ProjectFieldMetadata from '@/models/Project/FieldMetadata';
import {
  MACRS_TERM,
  SHARED_DYNAMIC_FIELDS,
  createSharedHardcodedMetadata,
} from '@/models/Project/TechnologySpecs/sharedConstants';
import { TS_CONTROLLABLE_LOAD_PROFILE } from '@/models/Project/constants';
import { TECH_SPECS_CONTROLLABLE_LOAD, TECH_SPECS_CONTROLLABLE_LOAD_DATA_UPLOAD } from '@/router/constants';

import ControllableLoadTimeSeries from '@/models/TimeSeries/ControllableLoadTimeSeries';

const sharedHardcodedMetadata = createSharedHardcodedMetadata('controllable load');

// remove MACRS from the list of required inputs
const SHARED_DYNAMIC_FIELDS_MINUS_MACRS = _.without(SHARED_DYNAMIC_FIELDS, MACRS_TERM);
const sharedHardcodedMetadataMinusMacrs = _.omit(sharedHardcodedMetadata, MACRS_TERM);

const CONTROLLABLE_LOAD = 'Controllable Load';

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS_MINUS_MACRS,
  'duration',
  'ratedCapacity',
];

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
      associatedInputs: [{
        complete: false,
        ts: new ControllableLoadTimeSeries([]),
        displayName: 'Maximum Load Profile',
        errorList: ['Not Started'],
        path: TECH_SPECS_CONTROLLABLE_LOAD_DATA_UPLOAD,
        actionSetName: ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD,
      }],
      associatedInputsComplete: null,
      complete: null,
      componentSpecsComplete: null,
      errorList: [],
      id: uuidv4(),
      path: TECH_SPECS_CONTROLLABLE_LOAD,
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
      // ts: timeseies
      [TS_CONTROLLABLE_LOAD_PROFILE]: new ProjectFieldMetadata({
        DataModel: ControllableLoadTimeSeries,
        defaultValue: new ControllableLoadTimeSeries([]),
        displayName: 'maximum load profile',
        actionSetName: ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD,
      }),
      ...sharedHardcodedMetadataMinusMacrs,
    });
  }
}
