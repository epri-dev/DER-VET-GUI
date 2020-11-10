import TechnologySpecsSolarPVMetadata from '@/models/Project/TechnologySpecsSolarPV';
import { required, decimal, minValue } from 'vuelidate/lib/validators';

describe('TechnologySpecsSolarPVMetadata model', () => {
  it('should initialize from schema properly', () => {
    const actual = TechnologySpecsSolarPVMetadata.getHardcodedMetadata().getDefaultValues();
    expect(actual.cost).to.equal(0);
  });

  it('should initialize from hardcoded properly', () => {
    const actual = TechnologySpecsSolarPVMetadata.getHardcodedMetadata();
    expect(actual.cost.defaultValue).to.equal(0);
  });

  it('should create a validation schema', () => {
    const specs = TechnologySpecsSolarPVMetadata.getHardcodedMetadata();
    const expected = {
      constructionDate: { },
      cost: { required, decimal, minValue: minValue(0) },
      inverterMax: { required, decimal, minValue: minValue(0) },
      loc: { required },
      macrsTerm: { required, decimal },
      name: { required },
      operationDate: { },
      ratedCapacity: { required, decimal },
      shouldSize: { required },
    };
    const actual = specs.toValidationSchema();
    expect(Object.keys(actual)).to.eql(Object.keys(expected));
  });
});
