import map from 'lodash/map';

export interface AllowedValue {
  value: any;
  label: string;
  unit?: string;
}

export const arrayToAllowedValues = (lst: any[]): AllowedValue[] => (
  map(lst, x => ({ value: x, label: x }))
);

export const enumToAllowedValues = (enm: any): AllowedValue[] => (
  arrayToAllowedValues(Object.values(enm))
);
