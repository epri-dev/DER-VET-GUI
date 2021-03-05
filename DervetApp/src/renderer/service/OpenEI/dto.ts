import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import findIndex from 'lodash/findIndex';
import groupBy from 'lodash/groupBy';
import head from 'lodash/head';
import last from 'lodash/last';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import uniqWith from 'lodash/uniqWith';

import {
  RateStructureItem,
  UtilityRate,
} from '@/service/OpenEI/response';
import {
  ChargeType,
  WeekDay,
  TariffBillingPeriod,
  WEEKDAY_ALLOWED_VALUES,
} from '@/models/TariffBillingPeriod';

interface PeriodsWithMonthIndex {
  startTime: number;
  endTime: number;
  valueId: number;
  monthIndex?: number;
}

interface PeriodsNoDetails {
  startTime: number;
  endTime: number;
  startMonth: number;
  endMonth: number;
  valueId: number;
}

export const scheduleToPeriodsWithMonthIndex = (
  schedule: number[][],
): PeriodsWithMonthIndex[] => {
  const pds: PeriodsWithMonthIndex[] = [];
  let endTime: number = null;
  each(schedule, (monthSchedule, monthIndex) => {
    let startTime = 0;
    let currentValue = monthSchedule[0];
    each(monthSchedule, (timeValue, timeIndex) => {
      if (currentValue !== timeValue) {
        endTime = timeIndex - 1;
        pds.push({ startTime, endTime, valueId: currentValue, monthIndex });
        startTime = timeIndex;
        currentValue = timeValue;
      }
      if (timeIndex === 23) {
        endTime = timeIndex;
        pds.push({ startTime, endTime, valueId: currentValue, monthIndex });
      }
    });
  });
  return pds;
};

export const groupContiguous = (list: number[]): number[][] => {
  const r: number[][] = [];
  let t: number[] = [];

  each(list, (val, idx, arr) => {
    if (idx === 0) {
      t.push(val);
      return;
    }
    if (arr[idx - 1] !== (val - 1)) {
      r.push(t);
      t = [];
    }
    t.push(val);
  });
  r.push(t);

  return r;
};

export const getUniquePeriods = (
  pdsWithMonthIndex: PeriodsWithMonthIndex[],
): PeriodsWithMonthIndex[] => {
  const custom = (val: any, oth: any) => (
    val.startTime === oth.startTime && val.endTime === oth.endTime && val.valueId === oth.valueId
  );

  return map(uniqWith(pdsWithMonthIndex, custom), item => {
    const copied = cloneDeep(item);
    delete copied.monthIndex;
    return copied;
  });
};

export const groupIntermediatePeriodList = (
  ungrouped: any[], unique: PeriodsWithMonthIndex[],
): any => {
  const grouped = groupBy(ungrouped, item => {
    const copied = cloneDeep(item);
    delete copied.monthIndex;
    return findIndex(unique, copied);
  });

  return mapValues(grouped, list => map(list, item => item.monthIndex));
};

/**
grouped example
{
  0: [0, 1, 2, 3, 10, 11],
  1: [0, 1, 2, 3, 10, 11],
  2: [0, 1, 2, 3, 10, 11],
  3: [4, 5, 6, 7, 8, 9],
  4: [4, 5, 6, 7, 8, 9],
  5: [4, 5, 6, 7, 8, 9],
  6: [4, 5, 6, 7, 8, 9],
  7: [4, 5, 6, 7, 8, 9],
}
*/
export const groupMonthIndicesToPeriods = (
  grouped: any, unique: PeriodsWithMonthIndex[],
): PeriodsNoDetails[] => {
  const pds: PeriodsNoDetails[] = [];
  each(grouped, (value, key) => {
    const pd = unique[Number(key)];
    const listOfLists = groupContiguous(value);
    each(listOfLists, (list: number[]) => {
      pds.push({
        startMonth: head(list) + 1,
        endMonth: last(list) + 1,
        startTime: pd.startTime + 1,
        endTime: pd.endTime + 1,
        valueId: pd.valueId,
      });
    });
  });
  return pds;
};

export const addTariffDetails = (
  res: PeriodsNoDetails[], rates: RateStructureItem[][], chargeType: ChargeType, weekday: WeekDay,
): TariffBillingPeriod[] => {
  const weekdayValue = WEEKDAY_ALLOWED_VALUES.get(weekday).value;
  return map(res, (val, idx) => {
    const value = rates[val.valueId][0].rate;
    delete val.valueId;
    return {
      ...val,
      weekday: weekdayValue,
      chargeType,
      id: idx,
      complete: true,
      value,
    };
  });
};

export const convertScheduleToTariffList = (
  schedule: number[][], rates: RateStructureItem[][], chargeType: ChargeType, weekday: WeekDay,
): TariffBillingPeriod[] => {
  const periodsWithMonthIndex: any[] = scheduleToPeriodsWithMonthIndex(schedule);
  const uniquePeriods = getUniquePeriods(periodsWithMonthIndex);
  const groupedByMonthIndices = groupIntermediatePeriodList(periodsWithMonthIndex, uniquePeriods);
  const periodsNoDetails = groupMonthIndicesToPeriods(groupedByMonthIndices, uniquePeriods);
  return addTariffDetails(periodsNoDetails, rates, chargeType, weekday);
};

export const convertUtilityRateToTariffList = (rate: UtilityRate): TariffBillingPeriod[] => {
  const pds: TariffBillingPeriod[] = [];

  const helper = (
    schedule: number[][], rates: RateStructureItem[][], ct: ChargeType, w: WeekDay,
  ): void => {
    if (schedule !== undefined) {
      pds.push(...convertScheduleToTariffList(schedule, rates, ct, w));
    }
  };

  helper(rate.energyweekdayschedule, rate.energyratestructure, ChargeType.Energy, WeekDay.Weekdays);
  helper(rate.energyweekendschedule, rate.energyratestructure, ChargeType.Energy, WeekDay.Weekends);
  helper(rate.demandweekdayschedule, rate.demandratestructure, ChargeType.Demand, WeekDay.Weekdays);
  helper(rate.demandweekendschedule, rate.demandratestructure, ChargeType.Demand, WeekDay.Weekends);

  return pds;
};
