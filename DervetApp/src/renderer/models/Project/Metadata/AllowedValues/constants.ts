import {
  arrayToAllowedValues,
  arrayToAllowedValuesWithNull,
} from '@/models/Project/Metadata/AllowedValues/generators';

export const YES_NO_OPTIONS = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
];

export const ANALYSIS_HORIZON_MODES = [
  { value: '1', label: 'User-defined' },
  { value: '2', label: 'The shortest DER lifetime' },
  { value: '3', label: 'The longest DER lifetime' },
];

export const DR_END_MODES = [
  { value: true, label: 'Event Length' },
  { value: false, label: 'End Hour' },
];

export const DR_PROGRAM_TYPES = arrayToAllowedValues(['Day of', 'Day ahead']);

export enum FuelType {
  Gas = 'gas',
  Liquid = 'liquid',
  Other = 'other',
}

export const FUEL_TYPES = [
  { value: FuelType.Gas, label: 'Gas' },
  { value: FuelType.Liquid, label: 'Liquid' },
  { value: FuelType.Other, label: 'Other' },
];

export const ENERGY_PRICE_SOURCE_WHOLESALE_OPTIONS = [
  {
    value: false,
    label: 'Retail tariff, PPA, or other fixed contract (define energy price structure)',
  },
  {
    value: true,
    label: 'Wholesale energy market, production cost model, or other time-varying source (upload time series data)',
  },
];

export const GRID_LOCATIONS = arrayToAllowedValues(['Generation', 'Transmission', 'Distribution', 'Customer']);

export const OPTIMIZATION_HORIZONS = [
  { value: 'Year', label: 'Years' },
  { value: 'Month', label: 'Months' },
  { value: 'Hour', label: 'Hours' },
];

export const OWNERSHIP_OPTIONS = arrayToAllowedValues(['Customer', 'Utility', '3rd Party']);

export const RA_DISPATCH_MODES = [
  { value: true, label: 'Constrain power' },
  { value: false, label: 'Constrain energy' },
];

export const RA_EVENT_SELECTION_METHODS = arrayToAllowedValues(['Peak by Year', 'Peak by Month', 'Peak by Month with Active Hours']);

export const RELIABILITY_POST_OPTIMIZATION_ONLY_OPTIONS = [
  {
    value: false,
    label: 'Optimize DER size/operation for reliability',
  },
  {
    value: true,
    label: 'Only calculate the reliability benefit of the DERs',
  },
];

export const TIMESTEPS = arrayToAllowedValuesWithNull([60, 30, 15, 5, 1]);
