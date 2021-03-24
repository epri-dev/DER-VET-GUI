import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/FieldMetadata';
import {
  SHARED_DYNAMIC_FIELDS,
  createSharedHardcodedMetadata,
} from '@/models/Project/TechnologySpecs/sharedConstants';
import { TECH_SPECS_SINGLE_EV } from '@/router/constants';

const ELECTRIC_VEHICLE1 = 'ElectricVehicle1';

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS,
  'capitalCost',
  'energyTarget',
  'fixedOMCosts',
  'maximumChargingPower',
  'minimumChargingPower',
  'plugInHour',
  'plugOutHour',
  'replacementCost',
];

const sharedHardcodedMetadata = createSharedHardcodedMetadata('single EV');

export default class TechnologySpecsSingleEVMetadata {
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
      path: TECH_SPECS_SINGLE_EV,
      tag: ELECTRIC_VEHICLE1,
      technologyType: 'Electric Vehicle',
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  // to be removed in favor of getMetadataFromSchema
  static getHardcodedMetadata() {
    return new TechnologySpecsSingleEVMetadata({
      capitalCost: new ProjectFieldMetadata({
        displayName: 'Capital Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$',
        description: 'Capital cost of infrastructure for EV charging',
      }),
      energyTarget: new ProjectFieldMetadata({
        displayName: 'Energy Target',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kWh',
        description: 'Energy to be collected during charge',
      }),
      fixedOMCosts: new ProjectFieldMetadata({
        displayName: 'Fixed O&M Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / yr',
        description: 'Cost of maintaining the charging infrastructure',
      }),
      maximumChargingPower: new ProjectFieldMetadata({
        displayName: 'Maximum Charging Power',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'Maximum allowed charging power',
      }),
      minimumChargingPower: new ProjectFieldMetadata({
        displayName: 'Minimum Charging Power',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'Minimum allowed charging power',
      }),
      plugInHour: new ProjectFieldMetadata({
        displayName: 'Plug-in Hour',
        isRequired: true,
        minValue: 0,
        maxValue: 22,
        type: 'int',
        unit: 'hb',
        description: 'Hour of the day when EV is plugged-in',
      }),
      plugOutHour: new ProjectFieldMetadata({
        displayName: 'Plug-out Hour',
        isRequired: true,
        minValue: 0,
        maxValue: 23,
        type: 'int',
        unit: 'hb',
        description: 'Hour of the day when EV is plugged-out',
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
