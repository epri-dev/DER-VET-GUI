import _ from 'lodash';

export const includeSystemLoad = (project: any): boolean => (
  project.objectivesDR || project.objectivesRA
);

export const areFuelCostsRequired = (project: any): boolean => (
  !_.isEmpty(project.technologySpecsDieselGen) || !_.isEmpty(project.technologySpecsICE)
);

// Checks that each row is non-empty, or does not contain all null values
export const trimEmptyRows = (data: any[][]): any[][] => (
  _.filter(data, row => !(row.length === 0 || _.every(row, i => i === null)))
);
