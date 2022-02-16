import _ from 'lodash';

// Put all these elsewhere...
const formatError = (displayName: string, message: string) => `${displayName} ${message}`;

export const allowedMsg = (name: string, allowedValues: any) => (
  formatError(name, `must be one of ${_.join(_.map(allowedValues, 'values'))}`)
);
export const requiredMsg = (name: string) => formatError(name, 'is required');
export const decimalMsg = (name: string) => formatError(name, 'must be a number');
export const integerMsg = (name: string) => formatError(name, 'must be an integer');
export const betweenMsg = (name: string, min: number, max: number) => (
  formatError(name, `must be between ${min} and ${max} (inclusive)`)
);
export const minMsg = (name: string, min: number) => formatError(name, `must be >= ${min}`);
export const maxMsg = (name: string, max: number) => formatError(name, `must be <= ${max}`);
