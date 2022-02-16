import _ from 'lodash';

import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { objectToCsv } from '@/util/file';
import { AllowedValue } from '@/util/project';
import convertToUpperCase from '@/util/string';
import {
  validateCsvHeaders,
  validateCsvRowLength,
  nonEmpty,
  valueInHourRange,
  valueInMonthRange,
} from '@/util/validation';

export enum ChargeType {
  Energy = 'Energy',
  Demand = 'Demand',
}

export enum WeekDay {
  Weekends = 'Weekends',
  Weekdays = 'Weekdays',
  Both = 'Both',
}

export interface TariffBillingPeriod {
  startMonth: number;
  endMonth: number;
  startTime: number;
  endTime: number;
  excludingStartTime?: number;
  excludingEndTime?: number;
  weekday: number; // TODO use Weekday enum
  value: number;
  chargeType: ChargeType;
  name?: string;
}

// TODO currently only used in OpenEI code: eventually use Map for allowed values in radio button
export const WEEKDAY_ALLOWED_VALUES_MAP: Map<WeekDay, AllowedValue> = new Map([
  [WeekDay.Weekends, { value: 0, label: 'Weekends' }],
  [WeekDay.Weekdays, { value: 1, label: 'Weekdays' }],
  [WeekDay.Both, { value: 2, label: 'Both weekends and weekdays' }],
]);

const WEEKDAY_ALLOWED_VALUES = [
  {
    value: 0,
    label: 'Weekends',
  },
  {
    value: 1,
    label: 'Weekdays',
  },
  {
    value: 2,
    label: 'Both weekends and weekdays',
  },
];

const CHARGE_ALLOWED_VALUES = [
  {
    value: 'Energy',
    label: 'Energy Price',
    unit: '$/kWh',
  },
  {
    value: 'Demand',
    label: 'Demand Rate',
    unit: '$/kW',
  },
];

export const RETAIL_TARIFF_HEADERS = [
  'Billing Period',
  'Start Month',
  'End Month',
  'Start Time',
  'End Time',
  'Excluding Start Time',
  'Excluding End Time',
  'Weekday?',
  'Value',
  'Charge',
  'Name',
];

export const BILLING_PERIOD_VALUE_FIELDS = [
  'startMonth',
  'endMonth',
  'startTime',
  'endTime',
  'excludingStartTime',
  'excludingEndTime',
  'weekday',
  'value',
  'chargeType',
  'name',
];

export default class RetailTariffBillingPeriodMetadata {
  startMonth: ValueFieldMetadata = {
    displayName: 'Start Month',
    isRequired: true,
    minValue: 1,
    maxValue: 12,
    type: 'int',
  };
  endMonth: ValueFieldMetadata = {
    displayName: 'End Month',
    isRequired: true,
    minValueIf: { field: 'startMonth', condition: (x: any) => (valueInMonthRange(x) ? x : 1) },
    maxValue: 12,
    type: 'int',
  };
  startTime: ValueFieldMetadata = {
    displayName: 'Start Hour',
    isRequired: true,
    minValue: 1,
    maxValue: 24,
    type: 'int',
  };
  endTime: ValueFieldMetadata = {
    displayName: 'End Hour',
    isRequired: true,
    minValueIf: { field: 'startTime', condition: (x: any) => (valueInHourRange(x) ? x : 1) },
    maxValue: 24,
    type: 'int',
  };
  excludingStartTime: ValueFieldMetadata = {
    displayName: 'Excluding Start Hour',
    requiredIf: { field: 'excludingEndTime', condition: nonEmpty },
    isRequired: false,
    minValueIf: { field: 'startTime', condition: (x: any) => (valueInHourRange(x) ? x : 1) },
    maxValueIf: { field: 'endTime', condition: (x: any) => (valueInHourRange(x) ? x : 24) },
    type: 'int',
    description: 'Indicate an optional beginning hour to exclude.',
  };
  excludingEndTime: ValueFieldMetadata = {
    displayName: 'Excluding End Hour',
    requiredIf: { field: 'excludingStartTime', condition: nonEmpty },
    isRequired: false,
    minValueIf: { field: 'excludingStartTime', condition: (x: any) => (valueInHourRange(x) ? x : 1) },
    maxValueIf: { field: 'endTime', condition: (x: any) => (valueInHourRange(x) ? x : 24) },
    type: 'int',
    description: 'Indicate an optional ending hour to exclude.',
  };
  weekday: ValueFieldMetadata = {
    displayName: 'Weekday?',
    isRequired: true,
    type: String,
    allowedValues: WEEKDAY_ALLOWED_VALUES,
  };
  value: ValueFieldMetadata = {
    displayName: 'Value',
    isRequired: true,
    minValue: 0,
    type: 'float',
  };
  chargeType: ValueFieldMetadata = {
    displayName: 'Charge Type',
    isRequired: true,
    type: String,
    allowedValues: CHARGE_ALLOWED_VALUES,
  };
  name: ValueFieldMetadata = {
    displayName: 'Name (optional)',
    isRequired: false,
    type: String,
  };
}

export const validateRetailTariffCsv = (rows: any[][]): string => {
  const headerError = validateCsvHeaders(rows, RETAIL_TARIFF_HEADERS);
  const rowLengthError = validateCsvRowLength(rows, 11);
  return headerError || rowLengthError;
};

export const csvToRetailTariff = (rows: any[][]): TariffBillingPeriod[] => {
  rows = rows.slice(1); // remove header
  return _.map(rows, (row: any[]): TariffBillingPeriod => ({
    startMonth: row[1],
    endMonth: row[2],
    startTime: row[3],
    endTime: row[4],
    excludingStartTime: row[5],
    excludingEndTime: row[6],
    weekday: row[7],
    value: row[8],
    chargeType: convertToUpperCase(row[9]) as ChargeType,
    name: row[10],
  }));
};

export const billingPeriodsToCsv = (billingPeriods: any) => {
  const fields = [
    'id',
    'startMonth',
    'endMonth',
    'startTime',
    'endTime',
    'excludingStartTime',
    'excludingEndTime',
    'weekday',
    'value',
    'chargeType',
    'name',
  ];

  // Add ID to billing periods
  _.each(billingPeriods, (bp, idx) => bp.id = idx + 1);

  return objectToCsv(billingPeriods, fields, RETAIL_TARIFF_HEADERS);
};
