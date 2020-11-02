import TechnologySpecsSolarPV from '@/models/Project/TechnologySpecsSolarPV';
import { required, decimal, minValue } from 'vuelidate/lib/validators';

describe('TechnologySpecsSolarPV model', () => {
  it('should initialize from schema properly', () => {
    const actual = TechnologySpecsSolarPV.getDefaults();
    expect(actual.cost.value).to.equal(0);
  });

  it('should initialize from hardcoded properly', () => {
    const actual = TechnologySpecsSolarPV.getHardcodedDefaults();
    expect(actual.cost.value).to.equal(0);
  });

  it('should create a validation schema', () => {
    const specs = TechnologySpecsSolarPV.getHardcodedDefaults();
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
