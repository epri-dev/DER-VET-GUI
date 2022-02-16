import _ from 'lodash';

export interface AllowedValue {
  value: any;
  label: string;
  unit?: string;
}

export const arrayToAllowedValues = (lst: any[]): AllowedValue[] => (
  _.map(lst, x => ({ value: x, label: x }))
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

export const includeSystemLoad = (project: any): boolean => (
  project.objectivesDR || project.objectivesRA
);

// Checks that each row is non-empty, or does not contain all null values
export const trimEmptyRows = (data: any[][]): any[][] => (
  _.filter(data, row => !(row.length === 0 || _.every(row, i => i === null)))
);
