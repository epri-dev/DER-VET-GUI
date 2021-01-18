import ProjectField from '@/models/Project/FieldMetadata';
import { required, decimal, minValue } from 'vuelidate/lib/validators';

describe('Field model', () => {
  it('should translate to a validation schema', () => {
    // Refactor into shared w/ other tests
    const cost = new ProjectField({
      defaultValue: 0,
      displayName: 'Cost per kW',
      isRequired: true,
      type: Number,
      minValue: 0,
      unit: '$/kW',
      description: 'Capital cost per kW of rated power capacity (applied in year 0 of the analysis)',
      allowedValues: null,
    });
    const actual = cost.toValidationSchema();
    const expected = { required, decimal, minValue: minValue(0) };
    expect(Object.keys(actual)).to.eql(Object.keys(expected));
  });
});
