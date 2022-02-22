import _ from 'lodash';

import { AllowedValue } from '@/models/Project/Metadata/AllowedValues/AllowedValue';

export const arrayToAllowedValues = (lst: any[]): AllowedValue[] => (
  _.map(lst, x => ({ value: x, label: x.toString() }))
);

export const arrayToAllowedValuesWithNull = (lst: any[]): AllowedValue[] => (
  _.concat({ value: null, label: '-' }, arrayToAllowedValues(lst))
);

export const enumToAllowedValues = (enm: any, withNull = false): AllowedValue[] => {
  const lst = Object.values(enm);
  return withNull ? arrayToAllowedValuesWithNull(lst) : arrayToAllowedValues(lst);
};
