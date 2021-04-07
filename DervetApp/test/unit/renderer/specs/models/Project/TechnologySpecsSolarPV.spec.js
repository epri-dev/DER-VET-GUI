import TechnologySpecsSolarPVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';
import { required, decimal, minValue } from 'vuelidate/lib/validators';

describe('TechnologySpecsSolarPVMetadata model', () => {
  it('should initialize from schema properly', () => {
    const actual = TechnologySpecsSolarPVMetadata.getHardcodedMetadata().getDefaultValues();
    expect(actual.cost).to.equal(null);
  });

  it('should initialize from hardcoded properly', () => {
    const actual = TechnologySpecsSolarPVMetadata.getHardcodedMetadata();
    expect(actual.cost.defaultValue).to.equal(null);
  });

  it('should create a validation schema', () => {
    const specs = TechnologySpecsSolarPVMetadata.getHardcodedMetadata();
    const expected = {
      allowGridCharge: { },
      constructionYear: { },
      cost: { required, decimal, minValue: minValue(0) },
      decomissioningCost: { },
      expectedLifetime: { },
      fixedOMCosts: { },
      gamma: { },
      includeCurtailment: { },
      includePPA: { },
      includeSizeLimits: { },
      inverterMax: { required, decimal, minValue: minValue(0) },
      isReplaceable: { },
      loc: { required },
      macrsTerm: { required, decimal },
      name: { required },
      nu: { },
      operationYear: { },
      ppaCost: { },
      ppaInflationRate: { },
      ratedCapacity: { required, decimal },
      ratedCapacityMaximum: { },
      ratedCapacityMinimum: { },
      replacementCost: { },
      replacementConstructionTime: { },
      salvageValue: { },
      salvageValueOption: { },
      shouldSize: { required },
      ter: { },
    };
    const actual = specs.toValidationSchema();
    expect(Object.keys(actual).sort()).to.eql(Object.keys(expected).sort());
  });
});
