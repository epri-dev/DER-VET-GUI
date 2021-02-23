// all functions in this file should return a boolean

export const isNotNullAndNotUndefined = value => value !== null && value !== undefined;

export const isValueInRange = (value, lowValue, highValue) => (
  value >= lowValue && value <= highValue
);

export const isObjectOfLengthZero = value => isNotNullAndNotUndefined(value) && value.length === 0;
