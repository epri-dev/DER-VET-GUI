import _ from 'lodash';

export const ANALYSIS_HORIZON = 'analysisHorizon';
export const ANALYSIS_HORIZON_MODE = 'analysisHorizonMode';
export const DATA_YEAR = 'dataYear';
export const GRID_LOCATION = 'gridLocation';
export const INPUTS_DIRECTORY = 'inputsDirectory';
export const NAME = 'name';
export const OWNERSHIP = 'ownership';
export const START_YEAR = 'startYear';
export const TIMESTEP = 'timestep';
export const RESULTS_DIRECTORY = 'resultsDirectory';

const makeAllowedValues = lst => _.map(lst, x => ({ value: x, label: x }));

const makeAllowedValuesWithNull = (lst) => {
  const mapped = makeAllowedValues(lst);
  mapped.unshift({ value: null, label: '-' });
  return mapped;
};

// Allowed values
export const ANALYSIS_HORIZON_MODE_ALLOWED_VALUES = [
  { value: '1', label: 'User-defined analysis horizon' },
  { value: '2', label: 'Auto-calculate analysis horizon by shortest DER lifetime' },
  { value: '3', label: 'Auto-calculate analysis horizon by longest DER lifetime' },
  { value: '4', label: 'Use carrying cost' },
];
export const GRID_LOCATION_ALLOWED_VALUES = makeAllowedValues(['Generation', 'Transmission', 'Distribution', 'Customer']);
export const OWNERSHIP_ALLOWED_VALUES = makeAllowedValues(['Customer', 'Utility', '3rd Party']);
export const TIMESTEP_ALLOWED_VALUES = makeAllowedValuesWithNull(['1', '5', '15', '30', '60']);

// Field groupings
export const START_PROJECT_FIELDS = [
  ANALYSIS_HORIZON,
  ANALYSIS_HORIZON_MODE,
  DATA_YEAR,
  GRID_LOCATION,
  INPUTS_DIRECTORY,
  NAME,
  OWNERSHIP,
  START_YEAR,
  TIMESTEP,
  RESULTS_DIRECTORY,
];
