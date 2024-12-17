import _ from 'lodash';

import { required, decimal, minValue } from 'vuelidate/lib/validators';
import SolarPVMetadata from '@/models/Project/Metadata/TechnologySpecs/SolarPV';
import {
  metadataCollectionToValidationSchema,
} from '@/service/ProjectPage';
import { makeTestHeader } from '../../shared';

describe('SolarPVMetadata', () => {
  const solarPVMetadata = new SolarPVMetadata();

  makeTestHeader('-- SOLAR PV METADATA -- ');

  it('should initialize properly', () => {
    expect(_.keys(solarPVMetadata)).to.have.lengthOf(30);
  });

  it('should create a validation schema', () => {
    const actual = metadataCollectionToValidationSchema(solarPVMetadata);
    const expected = {
      allowGridCharge: { },
      constructionYear: { },
      cost: { required, decimal, minValue: minValue(0) },
      decomissioningCost: { },
      description: { },
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
    expect(Object.keys(actual).sort()).to.eql(Object.keys(expected).sort());
  });
});
