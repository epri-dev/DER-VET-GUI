import { AllowedValue, enumToAllowedValues } from '@/util/project';

describe('util/project', () => {
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
});
