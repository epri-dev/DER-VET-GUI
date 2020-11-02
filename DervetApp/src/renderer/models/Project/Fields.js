import { required, decimal, minValue } from 'vuelidate/lib/validators';

export default class ProjectField {
  constructor(args) {
    this.value = args.value;
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
    };
  }

  setValue(value) {
    this.value = value;
    return this;
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
      minValue: 0, maxValue: 1, allowedValues: 'foo', unit: 'x', type: 'y',
    };
    return new ProjectField({
      value: args.value,
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
