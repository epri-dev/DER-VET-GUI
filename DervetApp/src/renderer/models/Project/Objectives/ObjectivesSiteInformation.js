import ProjectFieldMetadata from '@/models/Project/Fields';
import operateOnKeysList from '@/util/object';

const INCLUDE_INTERCONNECTION_CONSTRAINTS = 'includeInterconnectionConstraints';
const MAX_EXPORT = 'maxExport';
const MAX_IMPORT = 'maxImport';

// TODO parse these from schema
const INCLUDE_INTERCONNECTION_CONSTRAINTS_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];

const DYNAMIC_FIELDS = [
  INCLUDE_INTERCONNECTION_CONSTRAINTS,
  MAX_EXPORT,
  MAX_IMPORT,
];

export default class ObjectivesSiteInformationMetadata {
  constructor(arg) {
    Object.assign(this, arg);
  }

  operateOnDynamicFields(callback) {
    return operateOnKeysList(this, DYNAMIC_FIELDS, callback);
  }

  getDefaultValues() {
    return {
      active: true,
      complete: null,
      includeSiteLoad: false,
      siteLoad: null,
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  getValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  static getHardcodedMetadata() {
    return new ObjectivesSiteInformationMetadata({
      [INCLUDE_INTERCONNECTION_CONSTRAINTS]: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Apply interconnection constraints',
        isRequired: true,
        type: Boolean,
        allowedValues: INCLUDE_INTERCONNECTION_CONSTRAINTS_ALLOWED_VALUES,
      }),
      [MAX_EXPORT]: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Maximum Power Exported',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'Maximum magnitude that can flow from grid to microgrid through the point of interconnection',
      }),
      [MAX_IMPORT]: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Maximum Power Imported',
        isRequired: true,
        maxValue: 0,
        type: Number,
        unit: 'kW',
        description: 'Maximum magnitude that can flow from microgrid to grid through the point of interconnection',
      }),
    });
  }
}
