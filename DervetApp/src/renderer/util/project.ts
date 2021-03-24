import map from 'lodash/map';

export interface AllowedValue {
  value: any;
  label: string;
  unit?: string;
}

export const arrayToAllowedValues = (lst: any[]): AllowedValue[] => (
  map(lst, x => ({ value: x, label: x }))
);

export const arrayToAllowedValuesWithNull = (lst: any[]): AllowedValue[] => {
  const allowed = arrayToAllowedValues(lst);
  allowed.unshift({ value: null, label: '-' });
  return allowed;
};

export const enumToAllowedValues = (enm: any, withNull = false): AllowedValue[] => {
  const lst = Object.values(enm);
  return withNull ? arrayToAllowedValuesWithNull(lst) : arrayToAllowedValues(lst);
};
