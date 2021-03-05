import map from 'lodash/map';

export interface AllowedValue {
  value: any;
  label: string;
  unit?: string;
}

export const arrayToAllowedValues = (lst: Array<any>): Array<AllowedValue> => (
  map(lst, x => ({ value: x, label: x }))
);

export const enumToAllowedValues = (enm: any): Array<AllowedValue> => (
  arrayToAllowedValues(Object.values(enm))
);
