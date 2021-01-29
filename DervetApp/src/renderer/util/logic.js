export const notNullAndUndefined = value => value !== null && value !== undefined;

export const valueInRange = (value, lowValue, highValue) => (
  value >= lowValue && value <= highValue
);

export const isObjectOfLengthZero = value =>
  notNullAndUndefined(value) && value.length !== 0;
