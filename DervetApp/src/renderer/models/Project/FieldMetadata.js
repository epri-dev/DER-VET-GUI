import { required, decimal, maxValue, minValue, between, integer } from 'vuelidate/lib/validators';

export default class ProjectField {
  constructor(args) {
    this.defaultValue = args.defaultValue === undefined ? null : args.defaultValue;
    this.displayName = args.displayName;
    this.isRequired = args.isRequired;
    this.type = args.type;
    this.minValue = args.minValue;
    this.maxValue = args.maxValue;
    this.unit = args.unit;
    this.description = args.description;
    this.allowedValues = args.allowedValues;
    this.initDisplayName = args.initDisplayName;
    this.initUnit = args.initUnit;
    this.actionSetName = args.actionSetName;
  }

  toValidationSchema() {
    return {
      ...(this.isRequired && { required }),
      ...((this.type === Number || this.type === 'float' || this.type === 'int') && { decimal }),
      ...(this.type === 'int' && { integer }),
      ...(((typeof this.minValue) === 'number') && { minValue: minValue(this.minValue) }),
      ...(((typeof this.maxValue) === 'number') && { maxValue: maxValue(this.maxValue) }),
      ...(((typeof this.maxValue) === 'number') && ((typeof this.minValue) === 'number')
        && { between: between(this.minValue, this.maxValue) }),
    };
  }
}
