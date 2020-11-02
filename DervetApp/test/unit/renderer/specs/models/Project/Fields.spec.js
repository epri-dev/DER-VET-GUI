import ProjectField from '@/models/Project/Fields';
import { required, decimal, minValue } from 'vuelidate/lib/validators';

describe('Field model', () => {
  it('should initialize from schema properly', () => {
    const actual = ProjectField.fromSchema({
      value: 0,
      displayName: 'Cost per kW',
      isRequired: true,
      description: 'Capital cost per kW of rated power capacity (applied in year 0 of the analysis)',
      schemaTag: 'foo',
      schemaKey: 'ccost_kW',
    });
    expect(actual.value).to.eql(0);
  });

  it('should translate to a validation schema', () => {
    // Refactor into shared w/ other tests
    const cost = new ProjectField({
      value: 0,
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
