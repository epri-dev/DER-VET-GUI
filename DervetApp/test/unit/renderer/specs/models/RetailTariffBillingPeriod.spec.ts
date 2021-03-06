import {
  ChargeType,
  TariffBillingPeriod,
  csvToRetailTariff,
} from '@/models/Project/Metadata/Finances/RetailTariffBillingPeriod';

describe('RetailTariffBillingPeriodMetadata model', () => {
  it('should construct a class instance from parsed CSV', () => {
    const testCsv = [
      ['Billing Period', 'Start Month', 'End Month', 'Start Time', 'End Time', 'Excluding Start Time', 'Excluding End Time', 'Weekday?', 'Value', 'Charge', 'Name_optional'],
      [1, 1, 10, 9, 10, 2, 2, 0, 10, 'Demand', 'bp1'],
    ];
    const expected: TariffBillingPeriod = {
      startMonth: 1,
      endMonth: 10,
      startTime: 9,
      endTime: 10,
      excludingStartTime: 2,
      excludingEndTime: 2,
      weekday: 0,
      value: 10,
      chargeType: 'Demand' as ChargeType,
      name: 'bp1',
    };

    const actual = csvToRetailTariff(testCsv).shift();
    expect(actual).to.eql(expected);
  });
});
