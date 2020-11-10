import { required, decimal, maxValue, minValue } from 'vuelidate/lib/validators';

export default class ProjectField {
  constructor(args) {
    this.defaultValue = args.defaultValue;
    this.displayName = args.displayName;
    this.isRequired = args.isRequired;
    this.type = args.type;
    this.minValue = args.minValue;
    this.maxValue = args.maxValue;
    this.unit = args.unit;
    this.description = args.description;
    this.allowedValues = args.allowedValues;
  }

  toValidationSchema() {
    return {
      ...(this.isRequired && { required }),
      ...(this.type === Number && { decimal }),
      ...(((typeof this.minValue) === 'number') && { minValue: minValue(this.minValue) }),
      ...(((typeof this.maxValue) === 'number') && { maxValue: maxValue(this.maxValue) }),
    };
  }

  /**
  args:
    value
    displayName
    isRequired
    description
    schemaTag
    schemaKey
  */
  static fromSchema(args) {
    // const d = getFromSchema(schemaTag, schemaKey);
    const d = {
      minValue: 0, maxValue: 1, allowedValues: 'allowedVals', unit: 'unit', type: 'type',
    };
    return new ProjectField({
      defaultValue: args.defaultValue,
      displayName: args.displayName,
      isRequired: args.isRequired,
      description: args.description,
      minValue: d.minValue,
      maxValue: d.maxValue,
      allowedValues: d.allowedValues,
      unit: d.unit,
      type: d.type,
    });
  }
}
