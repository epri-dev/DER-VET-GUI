import { UtilityRate } from '@/service/OpenEI/response';
import * as utilityRateFixture from './utility_rate.json';

export const rateFixture = (utilityRateFixture.items[0] as UtilityRate);

export const expectedWeekdayBillingPeriods = [
  {
    startMonth: 1,
    endMonth: 4,
    startTime: 1,
    endTime: 8,
    valueId: 0,
  },
  {
    startMonth: 11,
    endMonth: 12,
    startTime: 1,
    endTime: 8,
    valueId: 0,
  },
  {
    startMonth: 1,
    endMonth: 4,
    startTime: 9,
    endTime: 21,
    valueId: 1,
  },
  {
    startMonth: 11,
    endMonth: 12,
    startTime: 9,
    endTime: 21,
    valueId: 1,
  },
  {
    startMonth: 1,
    endMonth: 4,
    startTime: 22,
    endTime: 24,
    valueId: 0,
  },
  {
    startMonth: 11,
    endMonth: 12,
    startTime: 22,
    endTime: 24,
    valueId: 0,
  },
  {
    startMonth: 5,
    endMonth: 10,
    startTime: 1,
    endTime: 8,
    valueId: 2,
  },
  {
    startMonth: 5,
    endMonth: 10,
    startTime: 9,
    endTime: 12,
    valueId: 3,
  },
  {
    startMonth: 5,
    endMonth: 10,
    startTime: 13,
    endTime: 18,
    valueId: 4,
  },
  {
    startMonth: 5,
    endMonth: 10,
    startTime: 19,
    endTime: 21,
    valueId: 3,
  },
  {
    startMonth: 5,
    endMonth: 10,
    startTime: 22,
    endTime: 24,
    valueId: 2,
  },
];
