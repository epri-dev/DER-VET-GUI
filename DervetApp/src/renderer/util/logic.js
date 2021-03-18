import { isFinite } from 'lodash';

// all functions in this file should return a boolean

export const isNotNullAndNotUndefined = value => value !== null && value !== undefined;

export const isNullOrUndefined = value => value === null || value === undefined;

export const isNumeric = value => isFinite(parseFloat(value)) && isFinite(Number(value));
// an empty string, null, or a string with trailing letters is not numeric
// valid scientific notation ('1e3') should return true
// need to check that both Number() and parseFloat() are finite because:
// - Number() returns 0 with empty string input, or null input
// - parseFloat() returns a real number with trailing letters in input

export const isObjectOfLengthZero = value => isNotNullAndNotUndefined(value) && value.length === 0;

export const isValueInRange = (value, lowValue, highValue) => (
  value >= lowValue && value <= highValue
);

export const isArrayAllZeros = arr => arr.every(item => item === 0);
