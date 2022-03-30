import { AllowedValue } from '@/models/Project/Metadata/AllowedValues/AllowedValue';
import {
  arrayToAllowedValues,
  arrayToAllowedValuesWithNull,
  enumToAllowedValues,
} from '@/models/Project/Metadata/AllowedValues/generators';

import { makeTestHeader } from '../../../../shared';

describe('util/project', () => {
  makeTestHeader('-- ALLOWED VALUES GENERATOR --');

  it('should convert an enum to a list of allowed values', () => {
    enum ChargeType {
      Energy = 'Energy',
      Demand = 'Demand',
    }
    const actual = enumToAllowedValues(ChargeType, true);
    const expected: AllowedValue[] = [
      { label: '-', value: null },
      { label: 'Energy', value: 'Energy' },
      { label: 'Demand', value: 'Demand' },
    ];
    expect(actual).to.eql(expected);
  });

  it('should convert an array to a list of allowed values', () => {
    const actual = arrayToAllowedValues([1, 2]);
    const expected: AllowedValue[] = [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
    ];
    expect(actual).to.eql(expected);
  });

  it('should convert an array to a list of allowed values with null', () => {
    const actual = arrayToAllowedValuesWithNull([1, 2]);
    const expected: AllowedValue[] = [
      { label: '-', value: null },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
    ];
    expect(actual).to.eql(expected);
  });
});
