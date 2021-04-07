import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_FLEET_EV } from '@/store/actionTypes';
import ProjectFieldMetadata from '@/models/Project/FieldMetadata';
import {
  SHARED_DYNAMIC_FIELDS,
  createSharedHardcodedMetadata,
} from '@/models/Project/TechnologySpecs/sharedConstants';
import { TS_FLEETEV_BASELINE_LOAD_PROFILE } from '@/models/Project/constants';
import { TECH_SPECS_FLEET_EV, TECH_SPECS_FLEET_EV_BASELINE } from '@/router/constants';

import FleetEVBaselineLoadTimeSeries from '@/models/TimeSeries/FleetEVBaselineLoadTimeSeries';

const ELECTRIC_VEHICLE2 = 'Fleet EV';

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
      associatedInputs: [{
        complete: false,
        ts: new FleetEVBaselineLoadTimeSeries([]),
        displayName: 'Baseline Load Profile',
        errorList: ['Not Started'],
        path: TECH_SPECS_FLEET_EV_BASELINE,
        actionSetName: ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_FLEET_EV,
      }],
      associatedInputsComplete: null,
      complete: null,
      componentSpecsComplete: null,
      errorList: [],
      id: uuidv4(),
      path: TECH_SPECS_FLEET_EV, // TODO remove - mixin makes this unnessary
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
      capitalCost: new ProjectFieldMetadata({
        displayName: 'Capital Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$',
        description: 'Capital cost of infrastructure for EV charging',
      }),
      fixedOMCosts: new ProjectFieldMetadata({
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
      // ts: timeseies
      [TS_FLEETEV_BASELINE_LOAD_PROFILE]: new ProjectFieldMetadata({
        DataModel: FleetEVBaselineLoadTimeSeries,
        defaultValue: new FleetEVBaselineLoadTimeSeries([]),
        displayName: 'baseline load profile',
        actionSetName: ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_FLEET_EV,
      }),
      ...sharedHardcodedMetadata,
    });
  }
}
