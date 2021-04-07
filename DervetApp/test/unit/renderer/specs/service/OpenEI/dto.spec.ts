import {
  addTariffDetails,
  convertUtilityRateToTariffList,
  getUniquePeriods,
  groupContiguous,
  groupIntermediatePeriodList,
  groupMonthIndicesToPeriods,
  scheduleToPeriodsWithMonthIndex,
} from '@/service/OpenEI/dto';
import {
  ChargeType,
  WeekDay,
} from '@/models/TariffBillingPeriod';
import {
  expectedWeekdayBillingPeriods,
  rateFixture,
} from '../../fixtures/service/OpenEI/fixtures';

describe('openEI dto', () => {
  const rates = rateFixture.energyratestructure;
  const ungrouped = scheduleToPeriodsWithMonthIndex(rateFixture.energyweekdayschedule);
  const uniqueActual = getUniquePeriods(ungrouped);
  const groupedActual = groupIntermediatePeriodList(ungrouped, uniqueActual);
  const res = groupMonthIndicesToPeriods(groupedActual, uniqueActual);

  it('should group daily schedules', () => {
    expect(ungrouped.length).to.equal(48);
  });

  it('should find unique daily schedules', () => {
    const uniqueExpected = [
      { startTime: 0, endTime: 7, valueId: 0 },
      { startTime: 8, endTime: 20, valueId: 1 },
      { startTime: 21, endTime: 23, valueId: 0 },
      { startTime: 0, endTime: 7, valueId: 2 },
      { startTime: 8, endTime: 11, valueId: 3 },
      { startTime: 12, endTime: 17, valueId: 4 },
      { startTime: 18, endTime: 20, valueId: 3 },
      { startTime: 21, endTime: 23, valueId: 2 },
    ];
    expect(uniqueActual).to.eql(uniqueExpected);
  });

  it('should group daily schedules into a list of months', () => {
    const groupedExpected = {
      0: [0, 1, 2, 3, 10, 11],
      1: [0, 1, 2, 3, 10, 11],
      2: [0, 1, 2, 3, 10, 11],
      3: [4, 5, 6, 7, 8, 9],
      4: [4, 5, 6, 7, 8, 9],
      5: [4, 5, 6, 7, 8, 9],
      6: [4, 5, 6, 7, 8, 9],
      7: [4, 5, 6, 7, 8, 9],
    };
    expect(groupedActual).to.eql(groupedExpected);
  });

  it('should group contiguous values', () => {
    const nonContiguous = [1, 2, 3, 5, 6, 11, 12, 13];
    const actual = groupContiguous(nonContiguous);
    const expected = [[1, 2, 3], [5, 6], [11, 12, 13]];
    expect(actual).to.eql(expected);
  });

  it('should group month indices to periods', () => {
    expect(res).to.eql(expectedWeekdayBillingPeriods);
  });

  it('should add weekend, chargetype, id details to periods', () => {
    const actualWithDetails = addTariffDetails(res, rates, ChargeType.Energy, WeekDay.Weekdays);
    delete actualWithDetails[0].id; // id is a random uuid, will be different every time
    expect(actualWithDetails[0]).to.eql({
      startMonth: 1,
      endMonth: 4,
      startTime: 1,
      endTime: 8,
      value: 0.07152,
      chargeType: ChargeType.Energy,
      weekday: 1,
      complete: true,
    });
    expect(actualWithDetails.length).to.eql(11);
  });

  it('should convert a full utility rate (energy and demand, weekday and weekend', () => {
    const foo = convertUtilityRateToTariffList(rateFixture);
    expect(foo.length).to.eql(22);
  });
});
